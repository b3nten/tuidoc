import { ToggleGroup, Box, Heading } from "../../../src/mod"
import { useState } from "react";
import { Link, Route, Switch, useRoute } from "wouter";

export default () => {
	let [value, setValue] = useState("simple")
	let setRoute = (v: string) => setValue(v.length === 0 ? value : v)
	let [, params] = useRoute(":example");
	return (
		<Box className={"w-full h-full flex flex-col"} border borderColor={"var(--background0)"}>
			<Box className={"flex items-center gap-2"}>
				<Heading.H1>
					Examples
				</Heading.H1>
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
			</Box>
			<Box
				border
				pad={"none"}
				className={"grow mt-[1lh] min-h-[500px] overflow-scroll"}
			>
				<Switch>
					<Route nest path={"/simple"}>
						<iframe
							key={"simples"}
							style={{
								width: "100%",
								height: "100%",
								zIndex: 100,
								padding: 0,
								margin: 0,
							}}
							src="https://codesandbox.io/p/sandbox/react-new?file=/src/index.js"
						></iframe>
					</Route>
					<Route nest path={"/complex"}>
						<iframe
							key={"complex"}
							style={{
								width: "100%",
								height: "100%",
								zIndex: 100,
								padding: 0,
								margin: 0,
							}}
							src="https://codesandbox.io/p/sandbox/react-new?file=/src/index.js"
						></iframe>
					</Route>
					<Route nest path={"/"}>
						<iframe
							key={"simple"}
							style={{
								width: "100%",
								height: "100%",
								zIndex: 100,
								padding: 0,
								margin: 0,
							}}
							src="https://codesandbox.io/p/sandbox/react-new?file=/src/index.js"
						></iframe>
					</Route>
				</Switch>
			</Box>
		</Box>

	)
}