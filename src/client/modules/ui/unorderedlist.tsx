import { BoxProps } from "./box.tsx";
import { PolymorphicBase } from "./base.tsx";

type UnorderedListProps = Omit<BoxProps<"ul">, "as"> & {
	marker?: "bullet" | "tree" | "open tree" | "open tree open" | "tree open"
}

let UnorderedList = (props: UnorderedListProps) => {
	return <PolymorphicBase {...props} is-="typography-block" marker-={props.marker} as="ul">
		{props.children}
	</PolymorphicBase>
}

export default UnorderedList;
