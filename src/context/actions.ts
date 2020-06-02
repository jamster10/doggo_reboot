import { Locale } from "./UserContext";
import { Search } from ".";

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const setUserLocation = (locale: Locale) =>
	<const>{
		type: SET_USER_LOCATION,
		payload: locale,
	};

export const SET_SEARCH_CALLBACK = "SET_SEARCH_CALLBACK";
export const setSearchCallback = (callback: (params: string[]) => void) =>
	<const>{
		type: SET_SEARCH_CALLBACK,
		payload: callback,
	};

export const SET_QUERY = "SET_QUERY";
export const setQuery = ({ origin, destination, params }: Search) =>
	<const>{
		type: SET_QUERY,
		payload: { origin, destination, params },
	};

export type UserActionTypes = ReturnType<typeof setUserLocation>;
export type SearchActionTypes = ReturnType<
	typeof setSearchCallback | typeof setQuery
>;
