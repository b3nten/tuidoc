import { createHooks, type Selector } from "@css-hooks/react";
import { type PropsWithChildren, createContext, useContext, useRef } from "react";

let StyleContext = createContext<ReturnType<typeof createHooks> | null>(null)

export let useCss = () => {
	let context = useContext(StyleContext)
	if(!context) {
		throw new Error("StyleContext not found")
	}
	return context
}

export let Styles = (props: PropsWithChildren<{
	hooks?: Selector[],
}>) => {
	let hooks = useRef(createHooks(...(props.hooks ?? []))).current
	return <>
		<style dangerouslySetInnerHTML={{__html: hooks.styleSheet() }} />
		<StyleContext.Provider value={hooks}>
			{props.children}
		</StyleContext.Provider>
	</>
}