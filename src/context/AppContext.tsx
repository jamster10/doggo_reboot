import React from "react";
import { AppStateActionTypes } from "./actions";

export interface PlaceData {
	address: string;
	businessStatus: string;
	id: string;
	name: string;
	isOpen: string;
	placeId: string;
	priceLevel: string;
	photos: {};
	rating: string;
	ratingCount: string;
}

export interface AppState {
	placesData: PlaceData[];
}

const initialState: AppState = {
	placesData: [],
};

export const AppContext = React.createContext<{
	state: AppState;
	dispatch: React.Dispatch<AppStateActionTypes>;
}>({
	state: initialState,
	dispatch: () => null,
});

const { Provider } = AppContext;

export const AppProvider: React.FC = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		(state: AppState, action: AppStateActionTypes) => {
			switch (action.type) {
				case "ADD_PLACES_DATA":
					return {
						...state,
						placesData: [...state.placesData, ...action.payload],
					};
				default:
					return state;
			}
		},
		initialState
	);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
