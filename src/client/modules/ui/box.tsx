import { ElementType, useMemo } from "react";
import { boxType, useMergedStyles } from "./util.ts";
import { PolymorphicBase, PolymorphicBaseProps } from "./base.tsx";

export type BaseBoxProps = {
	border?: boolean | "square" | "round" | "double"
	contain?: "!top" | "!bottom" | "none"
	borderColor?: string
	borderRadius?: string
	borderWidth?: string
	doubleBorderWidth?: string
}

export type BoxProps<T extends ElementType> = PolymorphicBaseProps<T, BaseBoxProps>

export let Box = <T extends ElementType = "div">(props: BoxProps<T>) => {
	let {
		as,
		css,
		style,
		border,
		contain,
		borderColor,
		borderRadius,
		borderWidth,
		doubleBorderWidth,
		...restProps
	} = props;

	let box = useMemo(() => {
		if(!props.border) return;
		let result = boxType(props.border)
		if(props.contain) {
			result += ` contain:${props.contain}`
		}
		return result;
	}, [props.border, props.contain])

	let mergedStyle = useMergedStyles(
		{
			"--box-border-color": borderColor,
			"--box-border-radius": borderRadius,
			"--box-border-width": borderWidth,
			"--box-double-border-width": doubleBorderWidth,
		},
		style,
	);

	return <PolymorphicBase
		{...restProps}
		as={as ?? "div"}
		css={css}
		box-={box}
		style={mergedStyle}
	/>
}

export default Box;