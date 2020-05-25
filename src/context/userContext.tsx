import React from "react";
import { UserActionTypes } from "./actions";

export interface Locale {
	lat: number;
	lon: number;
	city: string;
}

export interface User {
		username: string
}

export interface UserInfo {
	currentUser: null | User;
	userLocation: null | Locale;
}

const initialState = {
	currentUser: null,
	userLocation: null,
};

export const UserContext = React.createContext<{
	state: UserInfo;
	dispatch: React.Dispatch<UserActionTypes>;
}>({
	state: initialState,
	dispatch: () => null,
});

const { Provider } = UserContext;

export const UserProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(state: UserInfo, action: UserActionTypes) => {
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
