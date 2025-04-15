import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { CssProp } from "./box.tsx";

type TextProps = AsChild<HTMLParagraphElement> & CssProp

let Text = (props: TextProps) => {
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
				"is-": "typography-block"
			})}
		</Box>
	} else {
		return <Box css={css} asChild>
			<p
				{...restProps}
				is-="typography-block"
			>{children}</p>
		</Box>
	}
}

export default Text;