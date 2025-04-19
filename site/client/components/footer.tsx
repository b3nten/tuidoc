let onEmpty = (str: string) =>
	str === "/" ? "index" : str[0] === "/" ? str.substring(1) : str

export default (props: { ext?: string }) => {
	let path = onEmpty(location.pathname)
	return (
		<div className={"fixed bottom-0 inset-x-0 flex justify-between"}>
			<div>
				<span is-="badge" variant-="blue">NORMAL</span>
				<span is-="badge" variant-="background1">
				master
			</span>
				<span is-="badge" variant-="background0">{path}.{props.ext ?? "jsx"}</span>
			</div>
			<div className={"hidden md:block"}>
				<span is-="badge" variant-="background0">utf-8</span>
				<span is-="badge" variant-="background1">
				Top
			</span>
				<span is-="badge" variant-="blue">
				<span id="line">1</span>
				<span>:1</span>
			</span>
			</div>
		</div>
	)
}