import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

let mapTheme = (theme: string, mode: string) => {
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
	let mode = localStorage.getItem("tui:mode") ?? "auto";
	let theme = localStorage.getItem("tui:theme") ?? "catppuccin";
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
				localStorage.setItem("tui:theme", action.payload);
			}
		},
		setMode: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
			state.themeValues = mapTheme(state.theme, action.payload)
			state.mode = action.payload
			localStorage.setItem("tui:mode", action.payload);
		}
	},
})
