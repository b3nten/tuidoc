import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Main, ThemeProvider } from "../../src/mod";
import { Provider } from 'react-redux'
import { State, store } from "./lib/state";
import { Route, Switch } from "wouter";
import Home from "./views/home";
import { Nav } from "./components/nav";
import Box from "../../src/box";
import Footer from "./components/footer";
import Docs from "./views/docs";
import Examples from "./views/examples";

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
			<Box
				css={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Nav />
				<Main
					css={{
						flexGrow: 1,
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						overflowX: "hidden",
						overflowY: "scroll",
					}}
				>
					<Switch>
						<Route path={"/"}>
							<Home />
						</Route>
						<Route path={"/docs*"} nest>
							<Docs />
						</Route>
						<Route path={"/examples*"} nest>
							<Examples />
						</Route>
					</Switch>
				</Main>
				<Footer />
			</Box>
		</ThemeProvider>
	)
}


createRoot(document.querySelector("app-root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
