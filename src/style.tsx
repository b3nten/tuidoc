import { Condition, createHooks, CreateHooksResult, type Selector } from "@css-hooks/react";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useCallback,
	useMemo,
	useLayoutEffect, CSSProperties
} from "react";
import { Tooltip } from "radix-ui";

interface IStyleContext {
	styleSheet: () => string
	css: (style: Record<string, any>) => any
	on: CreateHooksResult<any, any>["on"]
	not: CreateHooksResult<any, any>["not"]
	or: CreateHooksResult<any, any>["or"]
	and: CreateHooksResult<any, any>["and"]
}

export const StyleContext = createContext<IStyleContext | undefined>(undefined)

export let defaultHooks = {
	hover: "&:hover",
	active: "&:active",
	focus: "&:focus",
	focusVisible: "&:focus-visible",
	focusWithin: "&:focus-within",
	disabled: "&:disabled",
	checked: "&:checked",
	valid: "&:valid",
	invalid: "&:invalid",
	required: "&:required",
	optional: "&:optional",
	firstChild: "&:first-child",
	lastChild: "&:last-child",
	"[data-state='on']": "[data-state='on']",
	"[data-state='off']": "[data-state='off']",
} satisfies Record<string, string>

export interface ExtendedCssProperties extends CSSProperties {
	hover?: ExtendedCssProperties,
	active?: ExtendedCssProperties,
	focus?: ExtendedCssProperties,
	focusVisible?: ExtendedCssProperties,
	focusWithin?: ExtendedCssProperties,
	disabled?: ExtendedCssProperties,
	checked?: ExtendedCssProperties,
	valid?: ExtendedCssProperties,
	invalid?: ExtendedCssProperties,
	required?: ExtendedCssProperties,
	optional?: ExtendedCssProperties,
	firstChild?: ExtendedCssProperties,
	lastChild?: ExtendedCssProperties,
	"[data-state='on']"?: ExtendedCssProperties,
	"[data-state='off']"?: ExtendedCssProperties,
}

/**
 * Return's a function to parse CSS objects to an object compatable with React's `style` prop.
 */
export let useCss = () =>
	useContext(StyleContext)?.css ?? ((style: Record<string, any>) => style);

let isNot = (str: string) => str.startsWith("&:!")
let parseNot = (str: string) => str.replace("&:!", "&:") as Selector;

export let colorModeQuery = typeof window !== "undefined"
	? window.matchMedia("(prefers-color-scheme: dark)")
	: undefined;

export let ThemeProvider = (props: PropsWithChildren<{
	/**
	 * A list of selectors to use for the base element's css prop. By default, it uses
	 * the exported `defaultHooks` array.
	 */
	selectors?: Record<string, string>,
	/**
	 * The name of the color theme to use. This is used to set the
	 * `data-webtui-theme` attribute on the `html` element.
	 *  If { dark: string, light: string } is passed, it will
	 *  use the user's color scheme preference.
	 */
	colorTheme?: string | { dark?: string, light?: string },
}>) => {
	let selectors = {
		...defaultHooks,
		...props.selectors,
	} as Record<string, Selector>

	let { not, and, on, or, styleSheet } =
		useRef(createHooks(
			...new Set<Selector>([...Object.values(selectors)])
		)).current

	let map = (selector: string) => selectors[selector] ?? selector

	let makeSelector = useCallback((selectors: string[]) => {
		let last = selectors[selectors.length - 1] as Selector
		let result: any = isNot(last)
			? not(map(parseNot(last)) as Selector)
			: and(map(last))
		for(let i = selectors.length - 2; i >= 0; i--) {
			if(isNot(selectors[i])) {
				result = and(result, not(map(parseNot(selectors[i]))))
			} else {
				result = and(map(selectors[i]), result)
			}
		}
		return result as Condition<Selector>
	}, [])

	let css = useCallback((style: Record<string, any>) => {
		let result: Record<string, any> = {}

		let recurse = (obj: any, prefix: any[] = []) => {
			for(let key in obj) {
				if(typeof obj[key] === "object") {
					let parentSelectors = [...prefix, key]
					result = on(makeSelector(parentSelectors), obj[key])(result)
					recurse(obj[key], parentSelectors)
				} else if (!prefix.length) {
					result[key] = style[key]
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
		? [props.colorTheme, undefined]
		: [props.colorTheme?.dark, props.colorTheme?.dark]
	);

	return <>
		<style data-webtui-react-hooks dangerouslySetInnerHTML={{__html: styleSheet() }} />
		<Tooltip.Provider>
			<StyleContext.Provider value={ctx}>
				{props.children}
			</StyleContext.Provider>
		</Tooltip.Provider>
	</>
}