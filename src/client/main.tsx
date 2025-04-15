import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyColorMode } from "./modules/theme";
import Box from "./modules/ui/box.tsx";
import { Styles, useCss } from "./modules/ui/style.tsx";
import Heading from "./modules/ui/header.tsx";
import Button from "./modules/ui/button.tsx";
import UnorderedList from "./modules/ui/unorderedlist.tsx";
import ListItem from "./modules/ui/listitem.tsx";
import Text from "./modules/ui/Text.tsx";
import Dialog from "./modules/ui/dialog.tsx";
import AlertDialog from "./modules/ui/alertdialog.tsx";
import { Selector } from "@css-hooks/react";

applyColorMode();

let selectors: Selector[] = ["&:hover", "&:active", "&:disabled"]

let TestComponent = () => {
	let css = useCss();
	return <button style={css(customStyle)}>hello</button>
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Styles hooks={selectors}>
			<Box border>
				<Heading.H1>
					Hello, WebTUI!
				</Heading.H1>
				<Button border size="small">
					Button
				</Button>
				<Box
					asChild
					css={{
						backgroundColor: "red" ,
						"&:hover": {
							backgroundColor: "blue",
							color: "gray",
							"&:!disabled": {
								color: "white",
							},
						}
					}}
				>
					<button>Hello!</button>
				</Box>
				<UnorderedList marker={"tree"}>
					<ListItem>Foo</ListItem>
					<ListItem>Bar</ListItem>
					<ListItem>Baz</ListItem>
				</UnorderedList>
				<Text>This is cool!</Text>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button>
							Open Dialog
						</Button>
					</Dialog.Trigger>
					<Dialog.Content title={"Dialog Title"} description={"Dialog Description"}>
						<Dialog.Close asChild>
							<Button className={"mt-4"} border>close</Button>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Root>

				<AlertDialog.Root>
					<AlertDialog.Trigger asChild>
						<Button>
							Open Alert
						</Button>
					</AlertDialog.Trigger>
					<AlertDialog.Content title={"Dialog Title"} description={"Dialog Description"}>
						<AlertDialog.Cancel asChild>
							<Button className={"mt-4"} border>close</Button>
						</AlertDialog.Cancel>
					</AlertDialog.Content>
				</AlertDialog.Root>

				<button>unstykled button</button>

				<Box border data-webtui-theme={"custom"}>
					<Button border={"round"} borderWidth={"2px"}>
						Styled button
					</Button>
					<button className={"px-2 py-1 border-1 border[var(--box-border-color)] ..."}>
						Custom button
					</button>
				</Box>

				<TestComponent />

			</Box>
		</Styles>
	</StrictMode>
);

let customStyle = {
	backgroundColor: "red",
	color: "white",

	'&:is(:hover, :disabled)': {
		fontSize: "4rem"
	},

	'&:hover': {
		backgroundColor: "blue",
		'&:!disabled': {
			backgroundColor: "gray",
		},
	},
	'&:active': {
		backgroundColor: "green",
	},
}
