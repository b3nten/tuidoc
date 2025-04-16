import { AlertDialog as DialogImpl, VisuallyHidden } from "radix-ui";
import Box from "./box.tsx";
import { PropsWithChildren } from "react";
import Text from "./Text.tsx";

interface AlertDialog {
	title?: string;
	description?: string;
	overlay?: boolean | React.ReactElement;
}

let AlertDialog = (props: PropsWithChildren<AlertDialog>) => {
	return <DialogImpl.Portal>
		<Box css={{ position: "fixed", inset: 0 }}>
			<Box
				css={{
					position: "fixed",
					inset: 0,
					zIndex: -10,
					backgroundColor: "var(--background0)",
					opacity: 0.8,
					pointerEvents: "none",
					transition: "opacity 0.2s ease-in-out",
				}}
			/>
			<DialogImpl.Content>
				{props.description && (
					<VisuallyHidden.Root asChild>
						<DialogImpl.Description>{props.description}</DialogImpl.Description>
					</VisuallyHidden.Root>
				)}
				<Box
					css={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						zIndex: 10,
						backgroundColor: "var(--background1)",
						minWidth: "50vw",
					}}
				>
					<Box border contain={"!top"}>
						{props.title && (
							<DialogImpl.Title asChild>
								<Text
									css={{
										display: "inline-block",
										backgroundColor: "var(--background1)",
										padding: "0.5rem 1rem",
										transform: "translateX(0.5rem)",
										transition: "transform 0.2s ease-in-out",
									}}
								>
									{props.title}
								</Text>
							</DialogImpl.Title>
						)}
						<Box>
							{props.children}
						</Box>
					</Box>
				</Box>
			</DialogImpl.Content>
		</Box>
	</DialogImpl.Portal>
}

let DialogRoot = DialogImpl.Root;

let DialogTrigger = DialogImpl.Trigger;

let DialogCancel = DialogImpl.Cancel;

let DialogAction = DialogImpl.Action;

export default {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Content: AlertDialog,
	Cancel: DialogCancel,
	Action: DialogAction,
}