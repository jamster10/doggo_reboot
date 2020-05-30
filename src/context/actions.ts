import { Locale } from "./UserContext";

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const setUserLocation = (locale: Locale) =>
	<const>{
		type: SET_USER_LOCATION,
		payload: locale,
	};

export const SET_SEARCH_CALLBACK = "SET_SEARCH_CALLBACK";
export const setSearchCallback = (callback: ()=>void) =>
	<const>{
		type: SET_SEARCH_CALLBACK,
		payload: callback,
	};

export const SET_QUERY_LOCATIONS = "SET_QUERY_LOCATIONS";
export const setQueryLocations = ({origin = '', destination = ''}) =>
	<const>{
		type: SET_QUERY_LOCATIONS,
		payload: {origin, destination},
	};

export type UserActionTypes = ReturnType<typeof setUserLocation>;
export type SearchActionTypes = ReturnType<typeof setSearchCallback | typeof setQueryLocations>;
