import {
	type HTMLAttributes,
	useMemo,
	cloneElement,
	ReactElement, createElement,
} from "react";
import {
	AsChild,
	boxType,
	useMergedStyles
} from "./util.ts";
import { useCss } from "./style.tsx";

export type BaseBoxProps = {
	border?: boolean | "square" | "round" | "double"
	contain?: "!top" | "!bottom" | "none"
	borderColor?: string
	borderRadius?: string
	borderWidth?: string
	doubleBorderWidth?: string
}

export type CssProp = {
	css?: Record<string, any>,
}

export type BoxProps = AsChild<HTMLDivElement> & BaseBoxProps & CssProp;

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
		css,
		...restProps
	} = props;

	let cssFn = useCss()

	let box = useMemo(() => {
		if(!border) return;
		let result = boxType(border)
		if(contain) {
			result += ` contain:${contain}`
		}
		return result;
	}, [border, contain])

	let mergedStyles = useMergedStyles(
		(asChild
			? (children as ReactElement<any, any>).props?.style ?? {}
			: (restProps as HTMLAttributes<HTMLDivElement>).style) ?? {},
		{
			"--box-border-color": borderColor,
			"--box-border-radius": borderRadius,
			"--box-border-width": borderWidth,
			"--box-double-border-width": doubleBorderWidth,
		},
		cssFn(css ?? {})
	)

	if(asChild) {
		return cloneElement(children as ReactElement<any, any>, {
			...(children as ReactElement<any, any>).props,
			style: mergedStyles,
			"box-": box,
		})
	} else {
		return createElement("div", {
			...restProps,
			"box-": box,
			children,
			style: mergedStyles,
		})
	}
}

export default Box;