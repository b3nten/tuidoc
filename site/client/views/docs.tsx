import { Box, Text, Heading, Button, Tooltip } from "../../../src/mod";
import { ReactNode, Suspense, use, useState } from "react";

let Cache = {}

let Documents = Object.entries(import.meta.glob("../../../pages/docs/*.mdx"))
	.reduce((acc, [path, doc]) => {
		acc[path.replace("../../../pages/docs/", "").replace(".mdx", "")] = doc
		return acc;
	}, {})


let getDocument = (name: string) => {
	if(Cache[name]) {
		return Cache[name]
	}
	if(!Documents[name]) {
		return Promise.reject(new Error("Document not found"))
	}
	return Documents[name]()
}

interface AwaitProps<T> {
	promise: Promise<T>
	children: (result: T) => ReactNode
}
let Await = <T extends unknown>(props: AwaitProps<T>) => props.children(use(props.promise))

export default () => {
	let [section, setSection] = useState<"sidebar" | "content">("content")
	return (
		<div className={"w-full h-full"}>
			<div className={"flex w-full h-[calc(100%-2rem)] md:h-full"}>
				<Box
					as={"aside"}
					border
					contain={"!top"}
					className={"w-screen md:max-w-[300px]"}
					css={{
						display: section === "sidebar" ? "block" : "none",
						small: {
							display: "block"
						}
					}}
				>
					<Text
						css={{
							padding: "0 1ch",
							display: "inline-block",
							backgroundColor: "var(--background0)",
						}}
					>Documentation</Text>
				</Box>
				<Box
					border
					contain={"!top"}
					className={"w-full grow"}
					css={{
						display: section === "content" ? "block" : "none",
						small: {
							display: "block"
						}
					}}
				>
					<Suspense
						fallback={
							<Text
								css={{
									padding: "0 1ch",
									display: "inline-block",
									backgroundColor: "var(--background0)",
								}}
							>
								Loading...
							</Text>
						}
					>
						<Await promise={getDocument("home")}>
							{doc => (
								<>
									<Heading.H1
										css={{
											padding: "0 1ch",
											display: "inline-block",
											backgroundColor: "var(--background0)",
										}}
									>
										{doc.meta.title}
									</Heading.H1>
									<doc.default />
								</>
							)}
						</Await>
					</Suspense>
				</Box>
			</div>
			<Box className={"w-full md:hidden flex justify-stretch gap-2"}>
				<Button
					size={"small"}
					className={"w-full"}
					onClick={() => setSection("sidebar")}
				>
					<Tooltip content={"Show the sidebar navigation"}>
						<p>Sidebar</p>
					</Tooltip>
				</Button>
				<Button
					size={"small"}
					className={"w-full"}
					onClick={() => setSection("content")}
				>
					Content
				</Button>
			</Box>
		</div>
	)
}