import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";
import { ElementType } from "react";

export type TextProps<T extends ElementType> = PolymorphicBaseProps<T>

let Text = <T extends ElementType = "p">(
	props: TextProps<T>
) => <PolymorphicBase
	{...props}
	as={props.as ?? "p"}
	is-="typography-block"
/>

export default Text;