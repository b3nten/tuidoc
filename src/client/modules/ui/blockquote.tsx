import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { CssProp } from "./box.tsx";

type BlockQuoteProps = AsChild<HTMLQuoteElement> & CssProp

let Text = (props: BlockQuoteProps) => {
	let {
		asChild,
		children,
		css,
		...restProps
	} = props;

	if(asChild) {
		return <Box css={css} asChild>
			{cloneElement(children as JSX.Element, {
				...(children as JSX.Element).props,
				"is-": "typography-block"
			})}
		</Box>
	} else {
		return <Box css={css} asChild>
			<blockquote
				{...restProps}
				is-="typography-block"
			>
				{children}
			</blockquote>
		</Box>
	}
}

export default Text;