import {
	type ComponentPropsWithoutRef,
	type ElementType,
	createElement,
	use,
} from "react";
import { ExtendedCssProperties, StyleContext } from "./style.tsx";
import {
	type DistributiveOmit,
	useMergedStyles
} from "./util.ts";

type PolymorphicCommon<T extends ElementType = ElementType> =
	{ as?: T, css?: ExtendedCssProperties }

export type PolymorphicBaseProps<
	C extends ElementType,
	Props = {},
> = PolymorphicCommon<C> &
	Props &
	DistributiveOmit<
		ComponentPropsWithoutRef<C>,
		keyof Props | keyof PolymorphicCommon<C>
	>

export let PolymorphicBase = <T extends ElementType = "div">(
	props: PolymorphicBaseProps<T>
) => {
	let {
		css,
		style,
		as,
		children,
		...restProps
	} = props;

	(restProps as any).style = useMergedStyles(
		css && use(StyleContext)?.css?.(css),
		style,
	);

	return createElement(
		props.as ?? "div",
		restProps,
		children
	)
}