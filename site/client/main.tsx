import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "../../src/mod";
import { Provider } from 'react-redux'
import { State, store } from "./lib/state";
import { Route, Switch } from "wouter";
import Home from "./views/home";
import { Nav } from "./components/nav";
import Box from "../../src/box";
import Footer from "./components/footer";

declare module "../../src/style" {
	export interface ExtendedCssProperties {
		tiny?: ExtendedCssProperties
		small?: ExtendedCssProperties
		medium?: ExtendedCssProperties
		large?: ExtendedCssProperties
		wide?: ExtendedCssProperties
	}
}

let App = () => {
	let theme = State.useSelection(state => state.theme)

	return (
		<ThemeProvider
			colorTheme={theme.themeValues}
			selectors={{
				tiny: "@media (width >= 40rem)",
				small: "@media (width >= 48rem)",
				medium: "@media (width >= 64rem)",
				large: "@media (width >= 80rem)",
				wide: "@media (width >= 96rem)",
			}}
		>
			<Switch>
				<Box
					css={{
						tiny: {
							padding: "1rem",
						},
					}}
				>
					<Nav />
					<Route path={"/"}>
						<Home />
					</Route>
					<Footer />
				</Box>
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
