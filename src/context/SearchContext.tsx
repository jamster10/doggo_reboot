import React from "react";
import { SearchActionTypes } from "./actions";

export interface Search {
	beginSearch: (params: string[]) => void;
	origin: string | null;
	destination: string | null;
	params: string[];
	isReady: boolean;
}

const initialState: Search = {
	beginSearch: (params: string[]) => null,
	origin: null,
	destination: null,
	params: [],
	isReady: false,
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
				case "SET_READY":
					return {
						...state,
						isReady: true,
					};
				case "SET_SEARCH_CALLBACK":
					return {
						...state,
						beginSearch: action.payload,
					};
				case "SET_QUERY":
					return {
						...state,
						origin: action.payload.origin,
						destination: action.payload.destination,
						params: action.payload.params,
					};
				default:
					return state;
			}
		},
		initialState
	);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
