import {
	cloneElement,
	JSX,
} from "react";
import { AsChild, extractBoxProps } from "./util.ts";
import Box, { BaseBoxProps, CssProp } from "./box.tsx";

type UnorderedListProps = AsChild<HTMLUListElement> & {
	marker?: "bullet" | "tree" | "open tree" | "open tree open" | "tree open"
} & BaseBoxProps & CssProp

let UnorderedList = (props: UnorderedListProps) => {
	let [boxProps, restProps] = extractBoxProps(props);
	
	let {
		asChild,
		children,
		css,
		marker,
		...restUlProps
	} = restProps;

	if(asChild) {
		let child = children as JSX.Element;
		return <Box css={css} {...boxProps} asChild>
			{cloneElement(child, {
				...child.props,
				...restUlProps,
				"marker-": marker,
				"is-": "typography-block"
			})}
		</Box>
	} else {
		return <Box css={css} {...boxProps} asChild>
			<ul
				{...restProps}
				{...restUlProps}
				is-="typography-block"
				marker-={marker}
			>{children}</ul>
		</Box>
	}
}

export default UnorderedList;