import { BoxProps } from "./box.tsx";
import { PolymorphicBase } from "./base.ts";

export type OrderedListProps = Omit<BoxProps<"ol">, "as">

let OrderedList = (props: OrderedListProps) =>
	<PolymorphicBase {...props} is-="typography-block" as="ol">
		{props.children}
	</PolymorphicBase>

export default OrderedList;