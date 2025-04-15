import { Condition, createHooks, CreateHooksResult, type Selector } from "@css-hooks/react";
import { type PropsWithChildren, createContext, useContext, useRef, useCallback, useMemo } from "react";

interface IStyleContext {
	styleSheet: () => string
	css: (style: Record<string, any>) => any
	on: CreateHooksResult<any, any>["on"]
	not: CreateHooksResult<any, any>["not"]
	or: CreateHooksResult<any, any>["or"]
	and: CreateHooksResult<any, any>["and"]
}

let StyleContext = createContext<IStyleContext | undefined>(undefined)

export let useCss = () =>
	useContext(StyleContext)?.css ?? ((style: Record<string, any>) => style);

export let useCssHooks = () => useContext(StyleContext);

let isNot = (str: string) => str.startsWith("&:!")
let isAnd = (str: string) => str.startsWith("&:")
let parseNot = (str: string) => str.replace("&:!", "&:") as Selector;

export let defaultHooks = [

]

export let Styles = (props: PropsWithChildren<{
	hooks?: Selector[],
}>) => {
	let { not, and, on, or, styleSheet } =
		useRef(createHooks(...(props.hooks ?? defaultHooks))).current

	let makeSelector = useCallback((selectors: string[]) => {
		let last = selectors[selectors.length - 1] as Selector
		let result: any = isNot(last)
			? not(last.replace("!", "") as Selector)
			: and(last)
		for(let i = selectors.length - 2; i >= 0; i--) {
			if(isNot(selectors[i])) {
				result = and(result, not(parseNot(selectors[i])))
			} else if(isAnd(selectors[i])) {
				result = and(selectors[i], result)
			}
		}
		console.log(result)
		return result as Condition<Selector>
	}, [])

	let css = useCallback((style: Record<string, any>) => {
		let result: Record<string, any> = style;

		let recurse = (obj: any, prefix: any[] = []) => {
			for(let key in obj) {
				if(key.startsWith("&:")) {
					let parentSelectors = [...prefix, key]
					result = on(makeSelector(parentSelectors), obj[key])(result)
					recurse(obj[key], parentSelectors)
				}
			}
		}

		recurse(style)
		return result
	}, [])

	let ctx = useMemo(() => ({ css, on, or, and, not, styleSheet }), [])

	return <>
		<style dangerouslySetInnerHTML={{__html: styleSheet() }} />
		<StyleContext.Provider value={ctx}>
			{props.children}
		</StyleContext.Provider>
	</>
}