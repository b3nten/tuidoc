import { Select as SelectImpl } from "radix-ui"
import { PropsWithChildren } from "react";
import Box from "./box";

let Root = (props: PropsWithChildren<{ placeholder?: string, value?: string, onValueChange?: any }>) => {
	let { children, placeholder, value, onValueChange } = props
	return (
		<SelectImpl.Root value={value} onValueChange={onValueChange} >
			<SelectImpl.Trigger asChild>
				<Box
					border
					pad={"none"}
					css={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0.5lh 0.5ch",
					}}
				>
					<SelectImpl.Value placeholder={placeholder} />
					<SelectImpl.Icon />
				</Box>
			</SelectImpl.Trigger>
			<SelectImpl.Portal>
				<SelectImpl.Content
					position={"popper"}
					asChild
				>
					<Box
						pad={"none"}
						css={{
							backgroundColor: "var(--background2)",
							width: "var(--radix-select-trigger-width)",
							border: "var(--box-border-width) solid var(--box-border-color)",
							borderTop: "none",
						}}
					>
						<SelectImpl.Viewport asChild>
							<Box
								css={{
									display: "flex",
									flexDirection: "column",
									overflow: "hidden",
									gap: ".5lh",
									padding: "0.25lh 0.5lh",
								}}
							>
								{children}
							</Box>
						</SelectImpl.Viewport>
					</Box>
				</SelectImpl.Content>
			</SelectImpl.Portal>
		</SelectImpl.Root>
	)
}

let Item = (props: PropsWithChildren<SelectImpl.SelectItemProps>) => {
	let { children, ...rest} = props
	return (
		<SelectImpl.Item {...rest}>
			<SelectImpl.ItemText>
				{children}
			</SelectImpl.ItemText>
		</SelectImpl.Item>
	)
}

export default {
	Root,
	Item
}
