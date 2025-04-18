import { PolymorphicBase, PolymorphicBaseProps } from "./base.ts";
import { ElementType } from "react";

export type ListItemProps<T extends ElementType> = PolymorphicBaseProps<T>

let ListItem = <T extends ElementType = "li">(props: ListItemProps<T>) =>
	<PolymorphicBase
		{...props}
		as={props.as ?? "li"}
		is-="typography-block"
	/>

export default ListItem;