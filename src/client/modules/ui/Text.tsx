import { PolymorphicBase, PolymorphicBaseProps } from "./base.tsx";
import { ElementType } from "react";

type TextProps<T extends ElementType> = PolymorphicBaseProps<T>

let Text = <T extends ElementType = "p">(props: TextProps<T>) => {
	return <PolymorphicBase
		{...props}
		as={props.as ?? "p"}
		is-="typography-block"
	/>
}

export default Text;