import { BoxProps } from "./box.tsx";
import { PolymorphicBase } from "./base.ts";

export type UnorderedListProps = Omit<BoxProps<"ul">, "as"> & {
	marker?: "bullet" | "tree" | "open tree" | "open tree open" | "tree open"
}

let UnorderedList = (props: UnorderedListProps) =>
	<PolymorphicBase {...props} is-="typography-block" marker-={props.marker} as="ul">
		{props.children}
	</PolymorphicBase>

export default UnorderedList;
