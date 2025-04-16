import { PolymorphicBase, PolymorphicBaseProps } from "./base.tsx";
import { ElementType } from "react";

type BlockQuoteProps<T extends ElementType> = PolymorphicBaseProps<T, {}>

let Text = <T extends ElementType = "blockquote">(props: BlockQuoteProps<T>) => {
	return <PolymorphicBase
		{...props}
		as={props.as ?? "blockquote"}
		is-={"typography-block"}
	/>
}

export default Text;