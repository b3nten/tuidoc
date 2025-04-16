import Box, { BoxProps } from "./box.tsx";
import {  useMergedStyles } from "./util.ts";
import { ElementType } from "react";

type BaseButtonProps = {
	primary?: string
	secondary?: string
	variant?: string
	size?: string
	small?: boolean
	large?: boolean
}

export type ButtonProps<T extends ElementType> = BoxProps<T> & BaseButtonProps

let Button = <T extends ElementType = "button">(props: ButtonProps<T>) => {
	let { primary, secondary, variant, size, small, large, as, style, ...restProps } = props;
	return <Box
		{...restProps as any}
		as={props.as ?? "button"}
		is-={"button"}
		size-={large ? "large" : small ? "small" : size}
		style={useMergedStyles(style, {
			"--button-primary": primary,
			"--button-secondary": secondary,
		})}
	/>
}

export default Button;