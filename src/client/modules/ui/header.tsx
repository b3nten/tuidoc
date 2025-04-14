import {
	cloneElement,
	JSX,
} from "react";
import { AsChild } from "./util.ts";
import Box, { BoxStyleProps } from "./box.tsx";

type HeadingProps = AsChild<HTMLHeadingElement> & BoxStyleProps

let makeHeading = (Component: any) => (props: HeadingProps) => {
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
			<Component
				{...restProps}
				is-="typography-block"
			>{children}</Component>
		</Box>
	}
}

let Heading = {
	H1: makeHeading("h1"),
	H2: makeHeading("h2"),
	H3: makeHeading("h3"),
	H4: makeHeading("h4"),
	H5: makeHeading("h5"),
	H6: makeHeading("h6"),
}

export default Heading;