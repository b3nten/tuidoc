import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import { themeSlice } from "./theme";

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
	},
})

export let actions = {
	theme: themeSlice.actions,
}

export let State = {
	useSelection: useSelector.withTypes<RootState>(),
	useActions: () => ({
		actions,
		dispatch: useDispatch()
	})
}

export type RootState = ReturnType<typeof store.getState>