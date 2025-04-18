import { Condition, createHooks, CreateHooksResult, type Selector } from "@css-hooks/react";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useCallback,
	useMemo,
	useLayoutEffect
} from "react";

interface IStyleContext {
	styleSheet: () => string
	css: (style: Record<string, any>) => any
	on: CreateHooksResult<any, any>["on"]
	not: CreateHooksResult<any, any>["not"]
	or: CreateHooksResult<any, any>["or"]
	and: CreateHooksResult<any, any>["and"]
}

export const StyleContext = createContext<IStyleContext | undefined>(undefined)

export let defaultHooks = [
	"&:hover",
	"&:active",
	"&:focus",
	"&:focus-visible",
	"&:focus-within",
	"&:disabled",
	"&:checked",
	"&:valid",
	"&:invalid",
	"&:required",
	"&:optional",
	"&:first-child",
	"&:last-child",
] satisfies Selector[]

/**
 * Return's a function to parse CSS objects to an object compatable with React's `style` prop.
 */
export let useCss = () =>
	useContext(StyleContext)?.css ?? ((style: Record<string, any>) => style);

let isNot = (str: string) => str.startsWith("&:!")
let isAnd = (str: string) => str.startsWith("&:")
let parseNot = (str: string) => str.replace("&:!", "&:") as Selector;

export let colorModeQuery = typeof window !== "undefined"
	? window.matchMedia("(prefers-color-scheme: dark)")
	: undefined;

export let ThemeProvider = (props: PropsWithChildren<{
	/**
	 * A list of selectors to use for the base element's css prop. By default, it uses
	 * the exported `defaultHooks` array.
	 */
	hooks?: Selector[],
	/**
	 * The name of the color theme to use. This is used to set the
	 * `data-webtui-theme` attribute on the `html` element.
	 *  If { dark: string, light: string } is passed, it will
	 *  use the user's color scheme preference.
	 */
	colorTheme?: string | { dark?: string, light?: string },
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
			return result;
		}
		return recurse(style)
	}, [])

	let ctx = useMemo(() => ({ css, on, or, and, not, styleSheet }), [])

	useLayoutEffect(() => {
		if(typeof window === "undefined") return;

		let set = (s: string) =>
			document.documentElement.setAttribute("data-webtui-theme", s)

		switch(typeof props.colorTheme) {
			case "undefined":
				document.documentElement.removeAttribute("data-webtui-theme");
				break;
			case "string":
				set(props.colorTheme);
				break;
			case "object":
				colorModeQuery?.matches
					? set(props.colorTheme.dark ?? "dark")
					: set("light");
		}

		let onChange = (e: MediaQueryListEvent) => {
			if(typeof props.colorTheme !== "object") return;
			if(e.matches) {
				set(props.colorTheme.dark ?? "dark")
			} else {
				set(props.colorTheme?.light ?? "light")
			}
		}

		colorModeQuery?.addEventListener("change", onChange)

		return () => void colorModeQuery?.removeEventListener("change", onChange)
	}, typeof props.colorTheme === "string"
		? [props.colorTheme]
		: [props.colorTheme?.dark, props.colorTheme?.dark]
	);

	return <>
		<style data-webtui-react-hooks dangerouslySetInnerHTML={{__html: styleSheet() }} />
		<StyleContext.Provider value={ctx}>
			{props.children}
		</StyleContext.Provider>
	</>
}