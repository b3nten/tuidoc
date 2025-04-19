import { ToggleGroup, Box, Heading } from "../../../src/mod"
import { useState } from "react";
import { Link, Route, Switch, useRoute } from "wouter";

export default () => {
	let [value, setValue] = useState("simple")
	let setRoute = (v: string) => setValue(v.length === 0 ? value : v)
	let [, params] = useRoute(":example");
	return (
		<Box className={"w-full h-full"} border borderColor={"var(--background0)"}>
			<Box >
				<Heading.H1>
					Examples
				</Heading.H1>
			</Box>
			<Box>
				<ToggleGroup.Root
					type={"single"}
					value={params?.example ?? "simple"}
					onValueChange={setRoute}
				>
					<ToggleGroup.Item value={"simple"} asChild>
						<Link href={"/simple"}>Simple</Link>
					</ToggleGroup.Item>
					<ToggleGroup.Item value={"complex"} asChild>
						<Link href={"/complex"}>Complex</Link>
					</ToggleGroup.Item>
				</ToggleGroup.Root>
			</Box>
			<Box border pad={"y"}>
				<Switch>
					<Route nest path={"/simple"}>
						<div>Simple</div>
					</Route>
					<Route nest path={"/complex"}>
						<div>Complex</div>
					</Route>
					<Route nest path={"/"}>
						<div>Simple</div>
					</Route>
				</Switch>
			</Box>
		</Box>

	)
}