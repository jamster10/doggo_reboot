import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignUp } from "../";

export const Routes = () => {
	return (
		<Switch>
			<Route exact path="/sign-up" component={SignUp} />
			<Route
				exact
				path="/my-places"
				render={() => <div>My Places</div>}
			/>
			<Route exact path="/login" render={() => <div>Login</div>} />
			<Route exact path="/search" render={() => <div>Search</div>} />
		</Switch>
	);
};
