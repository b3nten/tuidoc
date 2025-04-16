import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyColorMode } from "./modules/theme";
import Box from "./modules/ui/box.tsx";
import { Styles, useCss } from "./modules/ui/style.tsx";
import { Selector } from "@css-hooks/react";
import Button from "./modules/ui/button.tsx";
import Dialog from "./modules/ui/dialog.tsx";

applyColorMode();

let selectors: Selector[] = ["&:hover", "&:active", "&:disabled"]

let TestComponent = () => {
	let css = useCss();
	return <button style={css(customStyle)}>hello</button>
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Styles hooks={selectors}>
			<Box
				css={{
					color: "blue",
					"&:hover": {
					color: "red",
					}
				}}
				border
			>
				Hello!
			</Box>
			<Button border>Click me</Button>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Button small>Open Dialog</Button>
				</Dialog.Trigger>
				<Dialog.Content title={"Dialog Title"} description={"Dialog Description"}>
					Hello!
					<Dialog.Close asChild>
						<Button small>Close</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>
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
