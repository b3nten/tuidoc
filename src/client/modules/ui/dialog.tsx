import { Dialog as DialogImpl } from "radix-ui";
import Box from "./box.tsx";
import { PropsWithChildren } from "react";
import Heading from "./header.tsx";

export let DialogRoot = DialogImpl.Root;

export let DialogTrigger = DialogImpl.Trigger;

export let DialogContent = (props: PropsWithChildren<{ title?: string }>) => {
	return <DialogImpl.Portal>
		<Box className="fixed inset-0">

			<DialogOverlay/>

			<Box
				className={"fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 bg-[var(--background0)] min-w-[50vw]"}
			>
				<Box border contain={"!top"}>
					{props.title && (
						<Dialog.Title asChild>
							<Heading.H2 className={"inline-block !bg-[var(--background0)] px-1 translate-x-1"}>
								{props.title}
							</Heading.H2>
						</Dialog.Title>
					)}
					<Box className={"p-4"}>
						{props.children}
					</Box>
				</Box>
			</Box>

		</Box>
	</DialogImpl.Portal>
}

let DialogOverlay = (props: any) => {
	return <div className="fixed -z-10 inset-0 pointer-events-none bg-[var(--background0)]/80"></div>
}

export let DialogTitle = DialogImpl.DialogTitle;

export let DialogClose = DialogImpl.Close;

export let DialogDescription = DialogImpl.DialogDescription;

export let Dialog = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Content: DialogContent,
	Title: DialogTitle,
	Close: DialogClose,
	Description: DialogDescription,
}