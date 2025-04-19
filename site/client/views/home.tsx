import { Heading, Box, Text } from "../../../src/mod";
import { Book, GithubIcon, Lightbulb } from "lucide-react";

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
					as={ "ul" }
					className={ "space-y-1 pl-6" }
					css={ {
						flexDirection: "column",
						alignItems: "start",
						display: "flex",
					} }
				>
					<Box
						as={ "li" }
						className="flex items-center space-x-1"
					>
						<Book size={ "16px" } className="opacity-50"/>
						<span>Docs</span>
					</Box>
					<Box
						as={ "li" }
						className="flex items-center space-x-1"
					>
						<Lightbulb size={ "16px" } className="opacity-50"/><span>Examples</span>
					</Box>
					<Box
						as={ "li" }
						className="flex items-center space-x-1"
					>
						<GithubIcon size={ "16px" } className="opacity-50"/><span>Github</span>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

