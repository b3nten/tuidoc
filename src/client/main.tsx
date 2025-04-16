import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyColorMode } from "./modules/theme";
import { ThemeProvider } from "./modules/ui/style.tsx";
import Button from "./modules/ui/button.tsx";
import Dialog from "./modules/ui/dialog.tsx";
import Blockquote from "./modules/ui/blockquote.tsx";

applyColorMode();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<Button border>Click me</Button>
			<Blockquote />
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
		</ThemeProvider>
	</StrictMode>
);
