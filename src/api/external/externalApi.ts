import axios from "axios";
import { Locale } from "../../context";

export const getUserLocation = async (): Promise<Locale> => {
	const res = await axios("https://extreme-ip-lookup.com/json/");
	return {
		lat: Number(res.data.lat),
		lon: Number(res.data.lon),
		city: res.data.city,
	};
};
