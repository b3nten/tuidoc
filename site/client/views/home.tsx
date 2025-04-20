import { Heading, Box, Text, Tooltip } from "../../../src/mod";
import { Book, GithubIcon, Lightbulb } from "lucide-react";
import Link from "../components/link.tsx";

export default () => {
	return (
		<Box className={ "flex flex-col justify-center mx-auto max-w-2xl space-y-4 p-4 text-center sm:text-left" }>
			<Heading.H1>
				UI Design that goes hard in React
			</Heading.H1>
			<Text>
				WebTUI::React is a React wrapper around the WebTUI design system,
				that brings the beauty of Terminal UIs to the browser
			</Text>
			<Box
				border
				contain={ "!top" }
			>
				<Text
					css={ {
						display: "inline-block",
						padding: "0 1ch",
						backgroundColor: "var(--background0)",
						marginBottom: "1ch",
					} }
				>
					Contents
				</Text>
				<Box
					as={"ul"}
					css={{
						display: "flex",
						flexDirection: "column",
						gap: ".15lh",
						paddingLeft: "1ch",
					}}
				>
					<Box as={"li"}>
						<Tooltip content={"go to documentation"}>
							<Box
								as={Link}
								href={"/docs"}
								css={{
									display: "flex",
									alignItems: "center",
									gap: "0.5ch",
								}}
							>
								<Book size={"16px"} className="opacity-50" />
								<span>Docs</span>
							</Box>
						</Tooltip>
					</Box>
					<Box as={"li"}>
						<Tooltip content={"link to examples"}>
							<Box as={Link}
								 href={"/examples"}
								 css={{
									 display: "flex",
									 alignItems: "center",
									 gap: "0.5ch",
								 }}
							>
								<Lightbulb size={"16px"} className="opacity-50" />
								<span>Examples</span>
							</Box>
						</Tooltip>
					</Box>
					<Box as={"li"}>
						<Tooltip content={"link to github repo"}>
							<Box
								as={"a"}
								href={"https://github.com"}
								target={"_blank"}
								css={{
									display: "flex",
									alignItems: "center",
									gap: "0.5ch",
								}}
							>
								<GithubIcon size={"16px"} className="opacity-50" />
								<span>Github</span>
							</Box>
						</Tooltip>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

