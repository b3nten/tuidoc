import { Box, Badge, Footer } from "../../../src/mod"

let onEmpty = (str: string) =>
	str === "/" ? "index" : str[0] === "/" ? str.substring(1) : str

export default (props: { ext?: string }) => {
	let path = onEmpty(location.pathname)
	return (
		<Footer className={"flex justify-between"}>
			<Box>
				<Badge variant="blue">NORMAL</Badge>
				<Badge variant="background1">master</Badge>
				<Badge variant="background0">{path}.{props.ext ?? "jsx"}</Badge>
			</Box>
			<Box className={"hidden md:block"}>
				<Badge variant="background0">utf-8</Badge>
				<Badge variant="background1">Top</Badge>
				<Badge variant="blue">
					<span>1</span>
					<span>:1</span>
				</Badge>
			</Box>
		</Footer>
	)
}