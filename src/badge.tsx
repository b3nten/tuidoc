import { ElementType, } from "react";
import { useMergedStyles } from "./util.ts";
import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";

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
	return <PolymorphicBase
		{...restProps}
		as={as ?? "span"}
		is-={"badge"}
		style={useMergedStyles(
			style,
			{
				"--badge-color": badgeColor,
				"--badge-text-color": badgeTextColor,
			}
		)}
	/>
}

export default Badge;