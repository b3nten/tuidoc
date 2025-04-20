import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

let themeValues = {
	catppuccin: {
		light: "catppuccin-latte",
		dark: "catppuccin-mocha",
	},
	nord: {
		light: "nord-light",
		dark: "nord",
	},
}

export let mapTheme = (theme: string, mode: string) => {
	if(mode === "auto") {
		return themeValues[theme as keyof typeof themeValues]
	}
	if(mode === "dark") {
		return themeValues[theme as keyof typeof themeValues].dark
	}
	if(mode === "light") {
		return themeValues[theme as keyof typeof themeValues].light
	}
}

let initialState = () => {
	let mode = Cookies.get("tui:mode") ?? "auto";
	let theme = Cookies.get("tui:theme") ?? "catppuccin";
	return {
		mode,
		theme,
		themeValues: mapTheme(theme, mode)
	}
}

export let themeSlice = createSlice({
	name: 'theme',
	initialState: initialState(),
	reducers: {
		setTheme: (state, action: PayloadAction<string>) => {
			if(themeValues[action.payload as keyof typeof themeValues]) {
				state.theme = action.payload;
				state.themeValues = mapTheme(action.payload, state.mode)
				Cookies.set("tui:theme", action.payload, { expires: 365 })
			}
		},
		setMode: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
			console.log(state.theme, action.payload)
			state.themeValues = mapTheme(state.theme, action.payload)
			state.mode = action.payload
			Cookies.set("tui:mode", action.payload, { expires: 365 })
		}
	},
})
