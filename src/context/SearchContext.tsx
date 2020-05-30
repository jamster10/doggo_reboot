import React from "react";
import { SearchActionTypes } from "./actions";

export interface Search {
	beginSearch: () => void;
	origin: string | null;
	destination: string | null;
}

const initialState = {
	beginSearch: () => null,
	origin: null,
	destination: null
};

export const SearchContext = React.createContext<{
	state: Search;
	dispatch: React.Dispatch<SearchActionTypes>;
}>({
	state: initialState,
	dispatch: () => null,
});

const { Provider } = SearchContext;

export const SearchProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(state: Search, action: SearchActionTypes) => {
			switch (action.type) {
				case "SET_SEARCH_CALLBACK":
					return {
						...state,
						beginSearch: action.payload,
					};
				case "SET_QUERY_LOCATIONS":
					return {
						...state,
						origin: action.payload.origin,
						destination: action.payload.destination,
					};
				default:
					return state;
			}
		},
		initialState
	);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
