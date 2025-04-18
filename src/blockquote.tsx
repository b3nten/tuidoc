import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";
import { ElementType } from "react";

export type BlockquoteProps<T extends ElementType> = PolymorphicBaseProps<T, {}>

let BlockQuote = <T extends ElementType = "blockquote">(
	props: BlockquoteProps<T>
) => <PolymorphicBase
	{...props}
	as={props.as ?? "blockquote"}
	is-={"typography-block"}
/>

export default BlockQuote;