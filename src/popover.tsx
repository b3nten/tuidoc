import { Popover as PopoverImpl } from "radix-ui";
import { PropsWithChildren } from "react";
import Box from "./box";

let Content = (props: PropsWithChildren<PopoverImpl.PopoverContentProps>) => {
	return (
		<PopoverImpl.Portal>
			<PopoverImpl.Content sideOffset={5} {...props}>
				<Box
					css={{
						backgroundColor: "var(--background2)",
						padding: ".5lh .5ch"
					}}
				>
					{props.children}
					<PopoverImpl.Arrow
						fill={"var(--background2)"}
					/>
				</Box>
			</PopoverImpl.Content>
		</PopoverImpl.Portal>
	)
}

export default {
	Content,
	Root: PopoverImpl.Root,
	Trigger: PopoverImpl.Trigger,
}