import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyColorMode } from "./modules/theme";
import Box from "./modules/ui/box.tsx";
import { Styles } from "./modules/ui/style.tsx";
import Badge from "./modules/ui/badge.tsx";
import Input from "./modules/ui/input.tsx";
import Heading from "./modules/ui/header.tsx";
import Button from "./modules/ui/button.tsx";
import UnorderedList from "./modules/ui/unorderedlist.tsx";
import ListItem from "./modules/ui/listitem.tsx";
import Text from "./modules/ui/Text.tsx";

applyColorMode();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Styles>
			<Heading.H1>
				Hello world!
			</Heading.H1>
			<Box border>
				<a>Hello!</a>
			</Box>
			<Button onClick={console.log}>is button</Button>
			<Button asChild border>
				<a>link btn</a>
			</Button>

			<UnorderedList marker={"open tree"}>
				<ListItem>Foo</ListItem>
				<ListItem>Bar</ListItem>
			</UnorderedList>

			<Text>
				Hello world!
			</Text>

			<Badge>
				hello
			</Badge>
			<Badge asChild badgeColor="red">
				<p>aschild</p>
			</Badge>
			<Input border />
		</Styles>
	</StrictMode>
);
