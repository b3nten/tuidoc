import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { BoxStyleProps } from "./box.tsx";

type ListItemProps = AsChild<HTMLLIElement> & BoxStyleProps

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
			})}
		</Box>
	} else {
		return <Box css={css} asChild>
			<li
				{...restProps}
			>{children}</li>
		</Box>
	}
}

export default ListItem;