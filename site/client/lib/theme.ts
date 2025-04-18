import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export let themeSlice = createSlice({
	name: 'theme',
	initialState: {
		light: "catppuccin-latte",
		dark: "catppuccin-mocha",
	},
	reducers: {
		setLight: (state, action: PayloadAction<string>) => {
			state.light = action.payload
		},
		setDark: (state, action: PayloadAction<string>) => {
			state.dark = action.payload
		},
	},
})