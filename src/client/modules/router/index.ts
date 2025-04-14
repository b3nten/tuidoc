type RouteNode<T = any> = {
	payload: T,
	parent?: RouteNode,
	children: Record<string, RouteNode>,
	segment: string,
	dynamic?: RouteNode,
	catchall?: RouteNode,
}

let createNode = <T>(args: { payload?: T, parent?: RouteNode, segment: string }): RouteNode<T> => {
	return {
		payload: args.payload,
		children: {},
		parent: args.parent,
		segment: args.segment,
	}
}

type RouteResult<T extends any = any> = {
	routes: Array<T>,
	params: Record<string, string>,
}

let isDynamic = (segment: string) => segment.startsWith(":") && !segment.endsWith("*");
let isCatchall = (segment: string) => segment.startsWith(":") && segment.endsWith("*");
let len = (x: any[] | Object) => Array.isArray(x) ? x.length : Object.keys(x).length;

class Router {
	add = (route: string, payload: any) => {
		if(route === "") {
			this.#root.payload = payload;
			return;
		}

		if(route === "/") {
			this.#root.children["/"] = createNode({
				payload,
				parent:
				this.#root,
				segment: "/"
			});
			return;
		}

		let segments = route.split("/").filter(Boolean)

		let current = this.#root;

		for(let i = 0; i < segments.length - 1; i++) {
			let seg = segments[i];
			let node: RouteNode;

			if(isDynamic(seg)) {
				if(!current.dynamic) {
					node = createNode({ parent: current, segment: seg });
					current.dynamic = node;
				} else {
					node = current.dynamic;
				}
			} else if (isCatchall(seg)) {
				if(!current.catchall) {
					node = createNode({ parent: current, segment: seg });
					current.catchall = node;
				} else {
					node = current.catchall;
				}
			} else {
				if(!current.children[seg]) {
					node = createNode({ parent: current, segment: seg });
					current.children[seg] = node;
				} else {
					node = current.children[seg];
				}
			}

			current = node;
		}
		let seg = segments[segments.length - 1];
		let node = createNode({ payload, parent: current, segment: seg });
		if(isDynamic(seg)) {
			if(current.dynamic) throw new Error(`Duplicate dynamic segment ${seg}`);
			current.dynamic = node;
		} else if(isCatchall(seg)) {
			if(current.catchall) throw new Error(`Duplicate catchall segment ${seg}`);
			current.catchall = node;
		} else {
			if(current.children[seg]) throw new Error(`Duplicate segment ${seg}`);
			current.children[seg] = node;
		}
	}

	get = (path: string): RouteResult | Error => {
		if(typeof path !== "string" || path === "")
			return new Error(`Invalid path. Must be a non-empty string, received ${path}`);

		// "/" route with exact match shortcut
		if (path === "/" && this.#root.children["/"]) {
			return { routes: [this.#root.children["/"].payload], params: {} }
		}

		return this.#matchPath(path)
	}

	toString = () => {
		return JSON.stringify(
			this.#root,
			(k, v) => k === "parent" ? undefined : v,
			2,
		)
	}

	#root = createNode({ payload: "__ROOT__", segment: "__ROOT__" })

	#matchPath = (
		path: string,
	): RouteResult | Error => {
		enum CheckType { Exact, Dynamic, Catchall }

		let result = { routes: [], params: {} },
			segments = path.split("/").filter(Boolean),
			type: CheckType = CheckType.Exact,
			current = this.#root,
			rbuf: RouteNode[] = [this.#root];

		outer: for(let i = 0; i < segments.length;) {
			let seg = segments[i];

			switch(type) {
				case CheckType.Exact: {
					if(current.children[seg]) {
						current = current.children[seg];
						rbuf.push(current);
						i++;
						continue;
					} else {
						type = CheckType.Dynamic
						continue;
					}
				}
				case CheckType.Dynamic: {
					if(current.dynamic) {
						current = current.dynamic;
						rbuf.push(current);
						result.params[current.segment] = seg;
						i++;
						type = CheckType.Exact;
						continue;
					} else {
						type = CheckType.Catchall;
						continue;
					}
				}
				case CheckType.Catchall: {
					if(current.catchall) {
						current = current.catchall;

						// further possible exact matches
						if(len(current.children)) {
							for(let j = i; j < segments.length; j++) {
								if(current.children[segments[j]]) {
									result.params[current.segment] = segments.slice(i, j).join("/");
									current = current.children[segments[j]];
									rbuf.push(current);
									i = j+1;
									type = CheckType.Exact;
									continue outer;
								}
							}
						}

						// check for dynamic
						if (current.dynamic && segments[i+1]) {
							console.log("??")
						}

						// catchall is the last segment
						result.params[current.segment] = segments.slice(i+1).join("/");
						rbuf.push(current);
						break outer;
					} else {
						if(i === 0) {
							return new Error(`No matching routes found for ${path}`);
						} else {
							i--;
							current = rbuf.pop()!;
							type = CheckType.Dynamic;
						}
					}
				}
			}
		}

		console.log(JSON.stringify(
			rbuf,
			(k, v) => k === "parent" || k === "children" ? undefined : v,
			2
		))

		if(!rbuf[rbuf.length -1].payload) {
			throw new Error(`No matching routes found for ${path}`);
		}

		return result;
	}

}

let r = new Router;

r.add("/a", { route: "/a" })
r.add("/a/b", { route: "/a/b" })
r.add("/a/b/c/d/e", { route: "/a/b/c/d/e" })
r.add("/a/b/:catch*/x", { route: "/a/b/:catch*/x" })

// console.log(String(r))

console.log(r.get("/a/b/c/d/x"))
