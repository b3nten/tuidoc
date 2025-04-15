import {
	cloneElement,
	JSX,
} from "react";
import { AsChild, extractBoxProps } from "./util.ts";
import Box, { BaseBoxProps, CssProp } from "./box.tsx";

type OrderedListProps = AsChild<HTMLUListElement> & BaseBoxProps & CssProp

let OrderedList = (props: OrderedListProps) => {
	let [boxProps, restProps] = extractBoxProps(props);

	let {
		asChild,
		children,
		css,
		...restOlProps
	} = restProps;

	if(asChild) {
		let child = children as JSX.Element;
		return <Box css={css} {...boxProps} asChild>
			{cloneElement(child, {
				...child.props,
				...restOlProps,
				"is-": "typography-block"
			})}
		</Box>
	} else {
		return <Box css={css} {...boxProps} asChild>
			<ul
				{...restProps}
				{...restOlProps}
				is-="typography-block"
			>{children}</ul>
		</Box>
	}
}

export default OrderedList;