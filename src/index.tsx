import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SearchProvider, UserProvider } from "./context";
import { GlobalStyle } from "./GlobalStyles";

const Root = () => {
	return (
		<UserProvider>
			<SearchProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SearchProvider>
		</UserProvider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
