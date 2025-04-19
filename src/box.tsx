import { CSSProperties, ElementType, useMemo } from "react";
import { useMergedStyles } from "./util.ts";
import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";

export type BaseBoxProps = {
	border?: boolean | "square" | "round" | "double"
	contain?: "!top" | "!bottom" | "none"
	borderColor?: string
	borderRadius?: string
	borderWidth?: string
	doubleBorderWidth?: string
	pad?: "x" | "y" | "x y" | "y x" | "none"
}

export type BoxProps<T extends ElementType> = PolymorphicBaseProps<T, BaseBoxProps>

export let Box = <T extends ElementType = "div">(props: BoxProps<T>) => {
	let {
		as,
		css,
		border,
		contain,
		borderColor,
		borderRadius,
		borderWidth,
		doubleBorderWidth,
		pad = "x y",
		children,
		...restProps
	} = props;

	let box = useMemo(() => {
		if(!props.border) return;
		let result = typeof props.border === "string"
			? props.border
			: (props.border ? "square" : undefined);
		if(props.contain) {
			result += ` contain:${props.contain}`
		}
		return result;
	}, [props.border, props.contain])

	return <PolymorphicBase
		{...restProps}
		as={as ?? "div"}
		css={css}
		box-={box}
		pad-={border && pad}
	>
		{children}
		{border && (
			<div
				className={"box"}
				style={{
					"--box-border-color": borderColor,
					"--box-border-radius": borderRadius,
					"--box-border-width": borderWidth,
					"--box-double-border-width": doubleBorderWidth,
				} as CSSProperties}
			/>
		)}
		{border === "double" && (
			<div
				className={"box2"}
				style={{
					"--box-border-color": borderColor,
					"--box-border-radius": borderRadius,
					"--box-border-width": borderWidth,
					"--box-double-border-width": doubleBorderWidth,
				} as CSSProperties}
			/>
		)}
	</PolymorphicBase>
}

export default Box;