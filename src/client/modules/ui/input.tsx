import { cloneElement, JSX } from "react";
import { AsChild, extractBoxProps, isJSXElement } from "./util.ts";
import Box, { BaseBoxProps } from "./box.tsx";

type InputProps = AsChild<HTMLInputElement> & {
	size?: "small" | "large";
} & BaseBoxProps

let Input = (props: InputProps) => {

	let [boxProps, restProps] = extractBoxProps(props);

	let {
		asChild,
		children,
		style,
		size,
		...restElementProps
	} = restProps

	let borderStyle = {
		"display": "inline-block",
		"padding": ".7lh .9ch",
	}

	if(asChild && isJSXElement(children)) {
		let child = children as JSX.Element;
		return (
			<Box {...boxProps} style={borderStyle}>
				{cloneElement(
					child,
					{
						...restElementProps,
						"is-": "input",
						"size-": size,
					}
				)}
			</Box>
		)
	} else {
		return <Box {...boxProps} style={borderStyle}>
			<input
				{...restElementProps}
				style={style}
				is-="input"
				size-={size}
			/>
		</Box>
	}
}

export default Input;