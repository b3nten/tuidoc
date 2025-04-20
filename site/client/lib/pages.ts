import { ReactElement } from "react";

export type PageMeta = {
	title: string
	description?: string
}

let stripTrailingSlash = (path: string) => {
	if(path.endsWith("/")) {
		return path.slice(0, -1)
	}
	return path
}

export class Pages {
	static getPage(path: string) {
		if(path in this.results) {
			return this.results[path]
		}
		if(stripTrailingSlash(path) + "/index" in this.results) {
			return this.results[stripTrailingSlash(path) + "/index"]
		}
		throw new Error(`Page not found: ${path}`)
	}

	static tryGetPage(path: string) {
		try {
			return this.getPage(path)
		} catch (e) {
			return undefined
		}
	}

	static results = Object.entries(
		import.meta.glob<any>("../../../pages/**/*.mdx", { eager: true })
	).reduce((acc, [path, doc]) => {
		path = path.replace("../../../pages", "").replace(".mdx", "")
		acc[path] = {
			Component: doc.default,
			meta: doc.meta ?? {}
		}
		return acc;
	}, {} as Record<string, { Component: (props: unknown) => ReactElement, meta: PageMeta }>)
}