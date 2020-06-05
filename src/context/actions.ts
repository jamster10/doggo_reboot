import { Locale } from "./UserContext";
import { PlaceData } from "./AppContext";
import { Search } from ".";

//APP CONTEXT
export const ADD_PLACES_DATA = "ADD_PLACES_DATA";
export const addPlacesData = (placesData: PlaceData[]) =>
	<const>{
		type: ADD_PLACES_DATA,
		payload: placesData,
	};

//USER CONTEXT
export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const setUserLocation = (locale: Locale) =>
	<const>{
		type: SET_USER_LOCATION,
		payload: locale,
	};

//SEARCH CONTEXT
export const SET_SEARCH_CALLBACK = "SET_SEARCH_CALLBACK";
export const setSearchCallback = (callback: (params: string[]) => void) =>
	<const>{
		type: SET_SEARCH_CALLBACK,
		payload: callback,
	};

export const SET_READY = "SET_READY";
export const setReady = () =>
	<const>{
		type: SET_READY,
	};

export const SET_QUERY = "SET_QUERY";
export const setQuery = ({ origin, destination, params }: Search) =>
	<const>{
		type: SET_QUERY,
		payload: { origin, destination, params },
	};

export type AppStateActionTypes = ReturnType<typeof addPlacesData>;
export type UserActionTypes = ReturnType<typeof setUserLocation>;
export type SearchActionTypes = ReturnType<
	typeof setSearchCallback | typeof setQuery | typeof setReady
>;
