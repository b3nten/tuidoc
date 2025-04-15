import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { CssProp } from "./box.tsx";

type ListItemProps = AsChild<HTMLLIElement> & CssProp

let ListItem = (props: ListItemProps) => {
	let {
		asChild,
		children,
		css,
		...restProps
	} = props;

	if(asChild) {
		let child = children as JSX.Element;
		return <Box css={css} asChild>
			{cloneElement(child, {
				...child.props,
				"is-": "typography-block",
			})}
		</Box>
	} else {
		return <Box css={css} asChild>
			<li
				{...restProps}
				is-={"typography-block"}
			>
				{children}
			</li>
		</Box>
	}
}

export default ListItem;