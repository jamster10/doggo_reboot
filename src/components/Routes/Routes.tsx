import React from "react";
import { Route, Switch } from "react-router-dom";

import { Login, SearchForm, SignUp } from "../";

export const Routes = (): JSX.Element => {
	return (
		<>
			<Route
				path="/"
				children={({ match }: { match: { isExact: boolean } }) => (
					<SearchForm isVisible={match.isExact} />
				)}
			/>
			<Switch>
				<Route exact path="/sign-up" component={SignUp} />
				<Route
					exact
					path="/my-places"
					render={() => <div>My Places</div>}
				/>
				<Route exact path="/login" component={Login} />
			</Switch>
		</>
	);
};
