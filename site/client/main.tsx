import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "../../src/style.tsx";
import { Provider } from 'react-redux'
import { State, store } from "./lib/state";
import { Route, Switch } from "wouter";
import Home from "./views/Home";

let App = () => {
	let theme = State.useSelection(state => state.theme)
	return (
		<ThemeProvider
			colorTheme={{
				dark: theme.dark,
				light: theme.light,
			}}
		>
			<Switch>
				<Route path={"/"}>
					<Home />
				</Route>
			</Switch>
		</ThemeProvider>
	)
}


createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
