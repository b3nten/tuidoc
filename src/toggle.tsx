import { Toggle as ToggleImpl, ToggleGroup as ToggleGroupImpl } from "radix-ui";
import Box from "./box";
import { PropsWithChildren } from "react";

export let Toggle = (props: PropsWithChildren<ToggleImpl.ToggleProps>) => {
	let { children, ...rest } = props;
	return (
		<ToggleImpl.Root asChild {...rest}>
			<Box
				as="button"
				css={{
					border: "2px solid var(--foreground2)",
					padding: "0.125lh 0.25ch",
					background: "var(--background0)",
					"[data-state='on']": {
						background: "var(--background3)",
					},
				}}
			>
				{children}
			</Box>
		</ToggleImpl.Root>
	)
}

let ToggleGroupRoot = (props: PropsWithChildren<ToggleGroupImpl.ToggleGroupMultipleProps | ToggleGroupImpl.ToggleGroupSingleProps>) => {
	let { children, ...rest } = props;
	return (
		<ToggleGroupImpl.Root {...rest} asChild>
			<Box
				css={{
					border: "2px solid var(--box-border-color)",
					display: "inline-block",
				}}
			>
				{children}
			</Box>
		</ToggleGroupImpl.Root>
	)
}

let ToggleGroupItem = (props: PropsWithChildren<ToggleGroupImpl.ToggleGroupItemProps>) => (
	<ToggleGroupImpl.Item {...props} asChild>
		<Box
			as="button"
			css={{
				padding: "0.125lh 0.25ch",
				background: "var(--background0)",
				"[data-state='on']": {
					background: "var(--background3)",
				},
				cursor: "default",
			}}
		>
			{props.children}
		</Box>
	</ToggleGroupImpl.Item>
)

export let ToggleGroup = {
	Root: ToggleGroupRoot,
	Item: ToggleGroupItem,
}