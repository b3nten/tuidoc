import { ElementType } from "react";
import { Box, BoxProps } from "./box.tsx";
import { PolymorphicBase } from "./base.tsx";

type InputProps<T extends ElementType> = BoxProps<T> & {
	size?: "small" | "large";
}

let borderStyle = {
	"display": "inline-block",
	"padding": ".7lh .9ch",
}

let Input = <T extends ElementType>(props: InputProps<T>) => {

	let {
		as,
		border,
		borderColor,
		borderWidth,
		borderRadius,
		size,
		...restProps
	} = props;

	let input = <PolymorphicBase
		as={as ?? "input"}
		size-={size}
		is-="input"
		{...restProps}
	/>

	if(props.border) {
		return <Box
			as={"div"}
			border={border}
			borderColor={borderColor}
			borderWidth={borderWidth}
			borderRadius={borderRadius}
			style={borderStyle}
		>
			{input}
		</Box>
	} else {
		return input;
	}
}

export default Input;