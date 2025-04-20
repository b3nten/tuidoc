import { Tooltip as TooltipImpl } from "radix-ui";
import { PropsWithChildren, ReactNode } from "react";
import Box from "./box";

export let Root = TooltipImpl.Root;

export let Trigger = TooltipImpl.Trigger;

export let Content = (props: PropsWithChildren<TooltipImpl.TooltipContentProps>) => {
	let { children, ...rest } = props;
	return (
		<TooltipImpl.Portal>
			<TooltipImpl.Content sideOffset={5} {...rest}>
				<Box
					border
					pad={"none"}
					css={{
						backgroundColor: "var(--background2)",
						// padding: "0.5lh 0.5ch",
					}}
				>
					{children}
					<TooltipImpl.Arrow
						 fill={"var(--background2)"}
					/>
				</Box>
			</TooltipImpl.Content>
		</TooltipImpl.Portal>
	)
}

export let Tooltip = (props: PropsWithChildren<{ content: ReactNode }>) => {
	let { content, ...rest } = props;
	return (
		<TooltipImpl.Root>
			{typeof props.children === "string" ? (
				<TooltipImpl.Trigger asChild>
					<span>{props.children}</span>
				</TooltipImpl.Trigger>
			) : (
				<TooltipImpl.Trigger asChild>
					{props.children}
				</TooltipImpl.Trigger>
			)}
			<TooltipImpl.Portal>
				<TooltipImpl.Content sideOffset={5} {...rest}>
					<Box
						border
						pad={"none"}
						css={{
							backgroundColor: "var(--background2)",
							padding: "0.5lh 0.5ch",
						}}
					>
						{content}
					</Box>
				</TooltipImpl.Content>
			</TooltipImpl.Portal>
		</TooltipImpl.Root>

	)
}
