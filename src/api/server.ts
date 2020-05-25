// import axios from "axios";

import { User } from "../context";

export const createUser = async (newUser: User): Promise<User> => {
	return await new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					username: "Kristof",
				}),
			1000
		);
	});
};
