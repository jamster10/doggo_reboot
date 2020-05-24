import React from "react";
import { UserActionTypes } from "./actions";

export type Locale = {
	lat: number;
	lon: number;
	city: string;
};

export interface User {
	currentUser: null | string;
	userLocation: null | Locale;
}

const initialState = {
	currentUser: null,
	userLocation: null,
};

export const userContext = React.createContext<{
	state: User;
	dispatch: React.Dispatch<UserActionTypes>;
}>({
	state: initialState,
	dispatch: () => null,
});

const { Provider } = userContext;

export const UserProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(state: User, action: UserActionTypes) => {
			switch (action.type) {
				case "SET_USER_LOCATION":
					return {
						...state,
						userLocation: action.payload,
					};
				default:
					return state;
			}
		},
		initialState
	);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
