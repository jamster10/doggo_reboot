import { Locale } from "./UserContext";

export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const setUserLocation = (locale: Locale) =>
	<const>{
		type: SET_USER_LOCATION,
		payload: locale,
	};

export type UserActionTypes = ReturnType<typeof setUserLocation>;
