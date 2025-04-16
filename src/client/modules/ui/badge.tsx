import { ElementType, } from "react";
import { useMergedStyles } from "./util.ts";
import { PolymorphicBase, PolymorphicBaseProps } from "./base.tsx";

export type BadgeProps<T extends ElementType> = PolymorphicBaseProps<T, {
	variant?: string,
	badgeColor?: string,
	badgeTextColor?: string,
}>

let Badge = <T extends ElementType = "span">(props: BadgeProps<T>) => {
	let {
		as,
		variant,
		badgeColor,
		badgeTextColor,
		style,
		...restProps
	} = props;

	let mergedStyles = useMergedStyles(
		style,
		{
			"--badge-color": badgeColor,
			"--badge-text-color": badgeTextColor,
		}
	)

	return <PolymorphicBase
		{...restProps}
		as={as ?? "span"}
		is-={"badge"}
		style={mergedStyles}
	/>
}

export default Badge;