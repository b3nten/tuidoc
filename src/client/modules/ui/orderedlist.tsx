import { BoxProps } from "./box.tsx";
import { PolymorphicBase } from "./base.tsx";

type OrderedListProps = Omit<BoxProps<"ol">, "as">

let OrderedList = (props: OrderedListProps) => {
	return <PolymorphicBase {...props} is-="typography-block" as="ol">
		{props.children}
	</PolymorphicBase>
}

export default OrderedList;