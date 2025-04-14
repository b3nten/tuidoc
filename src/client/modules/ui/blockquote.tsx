import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { BoxStyleProps } from "./box.tsx";

type BlockQuoteProps = AsChild<HTMLQuoteElement> & BoxStyleProps

let Text = (props: BlockQuoteProps) => {
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
			<blockquote
				{...restProps}
				is-="typography-block"
			>{children}</blockquote>
		</Box>
	}
}

export default Text;