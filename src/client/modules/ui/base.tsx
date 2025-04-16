import {
	type ComponentPropsWithoutRef,
	type ElementType,
	type JSX,
	cloneElement,
	createElement,
} from "react";
import { useCss } from "./style.tsx";
import { type DistributiveOmit, useMergedStyles } from "./util.ts";

export type BaseWrapperProps = {
	asChild?: boolean,
	css?: Record<string, any>,
	style?: Record<string, any>,
	children: JSX.Element;
}

export let BaseWrapper = (props: BaseWrapperProps) => {
	let cssFn = useCss();
	return cloneElement(
		props.children,
		{
			style: useMergedStyles(
				props.css && cssFn(props.css),
				props.style,
				props.children.props.style,
			),
		}
	)
}

type PolymorphicCommon<T extends ElementType = ElementType> = { as?: T, css?: Record<string, any> }

export type PolymorphicBaseProps<
	C extends ElementType,
	Props = {},
> = PolymorphicCommon<C> &
	Props &
	DistributiveOmit<ComponentPropsWithoutRef<C>, keyof Props | "as" | "css">

export let PolymorphicBase = <T extends ElementType>(props: PolymorphicBaseProps<T>) => {
	let cssFn = useCss();

	let {
		css,
		style,
		as,
		children,
		...restProps
	} = props;

	(restProps as any).style = useMergedStyles(
		css && cssFn(css),
		style,
	);

	return createElement(props.as ?? "div", restProps, children)
}