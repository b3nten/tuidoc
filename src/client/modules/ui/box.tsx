import {
	type HTMLAttributes,
	useMemo,
	cloneElement,
	ReactElement, createElement,
} from "react";
import { AsChild, boxType, useMergedStyles } from "./util.ts";

export type BaseBoxProps = {
	border?: boolean | "square" | "round" | "double"
	contain?: "!top" | "!bottom" | "none"
	borderColor?: string
	borderRadius?: string
	borderWidth?: string
	doubleBorderWidth?: string
}

export type BoxStyleProps = {
	css?: any,
}

export type BoxProps = AsChild<HTMLDivElement> & BaseBoxProps & BoxStyleProps;

let Box = (props: BoxProps) => {
	let {
		asChild,
		border,
		contain,
		borderColor,
		borderRadius,
		borderWidth,
		doubleBorderWidth,
		children,
		...restProps
	} = props;

	let box = useMemo(() => {
		if(!border) return;
		let result = boxType(border)
		if(contain) {
			result += ` contain:${contain}`
		}
		return result;
	}, [border, contain])

	let style = useMergedStyles(
		(asChild
			? (children as ReactElement<any, any>).props.style
			: (restProps as HTMLAttributes<HTMLDivElement>).style) ?? {},
		{
			"--box-border-color": borderColor,
			"--box-border-radius": borderRadius,
			"--box-border-width": borderWidth,
			"--box-double-border-width": doubleBorderWidth,
		}
	)

	if(asChild) {
		let child = children as ReactElement<any, any>
		return cloneElement(child, {
			...child.props,
			style,
			"box-": box,
		})
	} else {
		return createElement("div", {
			...restProps,
			"box-": box,
			children,
			style,
		})
	}
}

export default Box;