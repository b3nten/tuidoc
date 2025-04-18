import { ElementType } from "react";
import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";

export type HeadingProps<T extends ElementType> = PolymorphicBaseProps<T, {}>

let makeHeading = (as: any) => <T extends ElementType = "h1">(
	props: HeadingProps<T>
) => <PolymorphicBase
	{...props}
	as={props.as ?? as}
	is-={"typography-block"}
/>

export default {
	H1: makeHeading("h1"),
	H2: makeHeading("h2"),
	H3: makeHeading("h3"),
	H4: makeHeading("h4"),
	H5: makeHeading("h5"),
	H6: makeHeading("h6"),
}