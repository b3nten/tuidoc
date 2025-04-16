import { PolymorphicBase, PolymorphicBaseProps } from "./base.tsx";
import { ElementType } from "react";

type ListItemProps<T extends ElementType> = PolymorphicBaseProps<T>

let Text = <T extends ElementType = "li">(props: ListItemProps<T>) => {
	return <PolymorphicBase
		{...props}
		as={props.as ?? "li"}
		is-="typography-block"
	/>
}

export default Text;