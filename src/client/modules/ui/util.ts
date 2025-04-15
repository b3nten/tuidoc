import { CSSProperties, HTMLAttributes, JSX, ReactElement, useMemo } from "react";
import { BaseBoxProps, CssProp } from "./box.tsx";

export const EMPTY_OBJECT = Object.freeze({})

export let noop = () => void 0;

export let useMergedStyles = (
	userStyles: Record<string, any>,
	rules: Record<string, any>,
	hooks?: Record<string, any>
): CSSProperties => useMemo(
	() => Object.assign({}, userStyles, rules, hooks ?? {}), [userStyles, rules, hooks])

export type AsChild<DefaultElementProps> =
	({ asChild?: false } & HTMLAttributes<DefaultElementProps>)
	| ({ asChild: true; children: ReactElement })

export let boxType = (box: any) => typeof box === "string" ? box : (box ? "square" : undefined);

export function isJSXElement(element: any): element is JSX.Element {
	return typeof element === "object" && element !== null && "type" in element && "props" in element;
}

export let extractBoxProps = <T extends BaseBoxProps & CssProp>(props: T) => {
	let {
		border,
		contain,
		borderColor,
		borderRadius,
		borderWidth,
		doubleBorderWidth,
		css,
		...restProps
	} = props;
	return [{
		border,
		contain,
		borderColor,
		borderRadius,
		borderWidth,
		doubleBorderWidth,
		css,
	}, restProps] as [
		BaseBoxProps & CssProp,
		Omit<T, keyof BaseBoxProps> & (T extends AsChild<infer U> ? Partial<HTMLAttributes<U>> : never)
	]
}