import axios from "axios";

import { Locale } from "../context";

export const getUserLocation = async (): Promise<Locale> => {
	try {
		const res = await axios("https://zextreme-ip-lookup.com/json/");
		console.log(res);
		return {
			lat: Number(res.data.lat),
			lon: Number(res.data.lon),
			city: res.data.city,
		};
	} catch {
		console.log("Unable to use your location");
		return {
			lat: 30.266926,
			lon: -97.750519,
			city: "None",
		};
	}
};
