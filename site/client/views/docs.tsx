import { Box, Text, Heading, Button, Tooltip, ListItem, UnorderedList } from "../../../src/mod";
import { useState } from "react";
import { useRoute } from "wouter";
import { Pages } from "../lib/pages.ts";
import { NotFound } from "../components/notfound.tsx";
import Link from "../components/link.tsx";

export default () => {
	let [, params] = useRoute("*")

	let [section, setSection] = useState<"sidebar" | "content">("content")

	let page = Pages.tryGetPage("/docs/" + params?.["*"])

	if(!page) {
		return <NotFound to={ "/" }/>
	}

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
						as={"h2"}
						css={{
							padding: "0 1ch",
							display: "inline-block",
							backgroundColor: "var(--background0)",
						}}
					>
						Documentation
					</Text>
					<Box className={"flex flex-col space-y-4 overflow-scroll px-4 py-2"}>
						<details open={true}>
							<summary>Intro</summary>
							<UnorderedList marker={"open tree"}>
								<ListItem>
									<Link to={"/"}>
										index
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/installation"}>
										installation
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/getting-started"}>
										get-started
									</Link>
								</ListItem>
							</UnorderedList>
						</details>
						<details open={true}>
							<summary>Guide</summary>
							<UnorderedList marker={"open tree"}>
								<ListItem>
									<Link to={"/guide/the-server"}>
										the-server
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/guide/the-client"}>
										the-client
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/guide/html"}>
										#html
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/guide/manifest"}>
										#manifest
									</Link>
								</ListItem>
							</UnorderedList>
						</details>
						<details open={true}>
							<Tooltip content={"Deployment options"}>
								<summary>Deployment</summary>
							</Tooltip>
							<UnorderedList marker={"open tree"}>
								<ListItem>
									<Link to={"/deployment/node"}>
										node
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/deployment/cloudflare"}>
										cloudflare
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/deployment/netlify"}>
										netlify
									</Link>
								</ListItem>
								<ListItem>
									<Link to={"/deployment/custom"}>
										custom-adaptors
									</Link>
								</ListItem>
							</UnorderedList>
						</details>
					</Box>
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
					<Heading.H1
						css={{
							padding: "0 1ch",
							display: "inline-block",
							backgroundColor: "var(--background0)",
						}}
					>
						{page.meta.title}
					</Heading.H1>
					<Box
						as={"article"}
						css={{
							padding: "1ch",
							overflowY: "scroll",
							height: "calc(100% - 2rem)",
							maxWidth: "1024px",
						}}
						className={"typography"}
					>
						<page.Component
							components={{
								h1: Heading.H1,
								h2: Heading.H2,
								h3: Heading.H3,
								h4: Heading.H4,
								h5: Heading.H5,
								h6: Heading.H6,
								p: Text,
							}}
						/>
					</Box>
				</Box>
			</div>
			<Box className={"w-full md:hidden flex justify-stretch gap-2"}>
				<Button
					size={"small"}
					className={"w-full"}
					onClick={() => setSection("sidebar")}
				>
					<Tooltip content={"Show the sidebar navigation"} >
						<p>Sidebar</p>
					</Tooltip>
				</Button>
				<Button
					size={"small"}
					className={"w-full"}
					onClick={() => setSection("content")}
				>
					<Tooltip content={"Show the documentation"}>
						Docs
					</Tooltip>
				</Button>
			</Box>
		</div>
	)
}