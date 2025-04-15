import { cloneElement, JSX } from "react";
import { extractBoxProps, useMergedStyles, AsChild, isJSXElement } from "./util.ts";
import Box, { BaseBoxProps } from "./box.tsx";

type ButtonProps = AsChild<HTMLButtonElement> & {
	primary?: string
	secondary?: string
	variant?: string
	size?: string
} & BaseBoxProps

let Button = (props: ButtonProps) => {
	let [boxProps, restProps] = extractBoxProps(props);

	let {
		children,
		asChild,
		variant,
		size,
		secondary,
		primary,
		...restElementProps
	} = restProps;

	let style = useMergedStyles(
		restElementProps.style ?? {},
		{
			"--button-primary": primary,
			"--button-secondary": secondary,
		}
	)

	if(asChild && isJSXElement(children)) {
		return (
			<Box {...boxProps} asChild>
				{cloneElement(
					children as JSX.Element,
					{
						...(children as JSX.Element).props,
						...restElementProps,
						style,
						"is-": "button",
						"variant-": variant,
						"size-": size,
					}
				)}
			</Box>
		)
	} else {
		return <Box {...boxProps} asChild>
			<button
				{...restElementProps}
				style={style}
				is-="button"
				variant-={variant}
				size-={size}
			>
				{children}
			</button>
		</Box>
	}
}

export default Button;