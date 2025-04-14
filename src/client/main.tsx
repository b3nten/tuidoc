import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyColorMode } from "./modules/theme";
import Box from "./modules/ui/box.tsx";
import { Styles } from "./modules/ui/style.tsx";
import Badge from "./modules/ui/badge.tsx";
import Heading from "./modules/ui/header.tsx";
import Button from "./modules/ui/button.tsx";
import UnorderedList from "./modules/ui/unorderedlist.tsx";
import ListItem from "./modules/ui/listitem.tsx";
import Text from "./modules/ui/Text.tsx";
import { Dialog } from "./modules/ui/dialog.tsx";

applyColorMode();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Styles>
			<Box border>
				<Heading.H1>
					Hello, WebTUI!
				</Heading.H1>
				<Button border size="small">
					Button
				</Button>
				<Box>
					<Badge>
						badge
					</Badge>
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
					<Dialog.Content title={"Dialog Title"}>
						<Dialog.Description>Description</Dialog.Description>
						<Dialog.Close asChild><Button size={"small"} border>close</Button></Dialog.Close>
					</Dialog.Content>
				</Dialog.Root>
			</Box>
		</Styles>
	</StrictMode>
);
