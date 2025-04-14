import {
	type HTMLAttributes,
	cloneElement,
	ReactElement,
	JSX,
} from "react";
import { AsChild, useMergedStyles } from "./util.ts";
import Box, { BoxStyleProps } from "./box.tsx";

type BadgeProps = AsChild<HTMLSpanElement> & {
	variant?: string;
	badgeColor?: string;
	badgeTextColor?: string;
} & BoxStyleProps

let Badge = (props: BadgeProps) => {
	let {
		asChild,
		children,
		variant,
		badgeColor,
		badgeTextColor,
		css,
		...restProps
	} = props;

	let style = useMergedStyles(
		(asChild
			? (children as ReactElement<any, any>).props.style
			: (restProps as HTMLAttributes<HTMLDivElement>).style) ?? {},
		{
			"--badge-color": badgeColor,
			"--badge-text-color": badgeTextColor,
		}
	)

	if(asChild) {
		let child = children as JSX.Element;
		return <Box css={css} asChild>
			{cloneElement(child, {
				...child.props,
				style,
				"is-": "badge",
				"variant-": variant,
			})}
		</Box>
	} else {
		return <Box css={css} asChild>
			<span
				{...restProps}
				style={style}
				is-="badge"
				variant-={variant}
			>{children}</span>
		</Box>
	}
}

export default Badge;