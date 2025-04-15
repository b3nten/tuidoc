import { Dialog as DialogImpl, VisuallyHidden } from "radix-ui";
import Box from "./box.tsx";
import { PropsWithChildren } from "react";
import Text from "./Text.tsx";

interface DialogContentProps {
	title?: string;
	description?: string;
	overlay?: boolean | React.ReactElement;
}

export let DialogContent = (props: PropsWithChildren<DialogContentProps>) => {
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
					className={"fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-[var(--background0)] min-w-[50vw]"}
				>
					<Box border contain={"!top"}>
						{props.title && (
							<DialogImpl.Title asChild>
								<Text className={"inline-block !bg-[var(--background0)] px-1 translate-x-1"}>
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

export let DialogRoot = DialogImpl.Root;

export let DialogTrigger = DialogImpl.Trigger;

export let DialogClose = DialogImpl.Close;

export default {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Content: DialogContent,
	Close: DialogClose,
}