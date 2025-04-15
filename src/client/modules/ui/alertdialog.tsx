import { AlertDialog as DialogImpl, VisuallyHidden } from "radix-ui";
import Box from "./box.tsx";
import { PropsWithChildren } from "react";
import Text from "./Text.tsx";

interface AlertDialog {
	title?: string;
	description?: string;
	overlay?: boolean | React.ReactElement;
}

const DialogContentBoxStyle = {
	position: "fixed",
	left: "50%",
	transform: "translateX(-50%)",
	top: "50%",
	zIndex: 10,
	minWidth: "50vw",
	backgroundColor: "var(--background0)",
}

let AlertDialog = (props: PropsWithChildren<AlertDialog>) => {
	return <DialogImpl.Portal>
		<Box className="fixed inset-0">
			<div className="fixed -z-10 inset-0 pointer-events-none bg-[var(--background0)]/80"></div>
			<DialogImpl.Content>
				{props.description && (
					<VisuallyHidden.Root asChild>
						<DialogImpl.Description>{props.description}</DialogImpl.Description>
					</VisuallyHidden.Root>
				)}
				<Box
					className={"fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-[var(--background1)] min-w-[50vw]"}
				>
					<Box border contain={"!top"}>
						{props.title && (
							<DialogImpl.Title asChild>
								<Text className={"inline-block !bg-[var(--background1)] px-1 translate-x-1 text-red-300"}>
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