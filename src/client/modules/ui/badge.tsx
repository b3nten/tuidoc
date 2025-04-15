import {
	type HTMLAttributes,
	cloneElement,
	ReactElement,
	JSX,
} from "react";
import { AsChild, useMergedStyles } from "./util.ts";
import Box, { CssProp } from "./box.tsx";

type BadgeProps = AsChild<HTMLSpanElement> & {
	variant?: string;
	badgeColor?: string;
	badgeTextColor?: string;
} & CssProp

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
		return <Box css={css} asChild>
			{cloneElement(children as JSX.Element, {
				...(children as JSX.Element).props,
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
			>
				{children}
			</span>
		</Box>
	}
}

export default Badge;