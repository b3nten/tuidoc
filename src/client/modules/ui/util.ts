import { CSSProperties, HTMLAttributes, JSX, ReactElement, useMemo } from "react";
import { BaseBoxProps, BoxStyleProps } from "./box.tsx";

export let useMergedStyles = (userStyles: Record<string, any>, rules: Record<string, any>): CSSProperties =>
	useMemo(() => {
		let newStyles = Object.assign(
			{},
			userStyles,
			rules,
		)
		return Object.fromEntries(
			Object.entries(newStyles).filter(([, v]) => v !== undefined),
		)
	}, [...Object.values(userStyles), ...Object.values(rules)])

export type AsChild<DefaultElementProps> =
	({ asChild?: false } & HTMLAttributes<DefaultElementProps>)
	| ({ asChild: true; children: ReactElement })

export let boxType = (box: any) => typeof box === "string" ? box : (box ? "square" : undefined);

export function isJSXElement(element: any): element is JSX.Element {
	return typeof element === "object" && element !== null && "type" in element && "props" in element;
}

export let extractBoxProps = <T extends BaseBoxProps & BoxStyleProps>(props: T) => {
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
		BaseBoxProps & BoxStyleProps,
		Omit<T, keyof BaseBoxProps> & (T extends AsChild<infer U> ? Partial<HTMLAttributes<U>> : never)
	]
}