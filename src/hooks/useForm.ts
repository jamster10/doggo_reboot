import React from "react";

type ChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useForm = <T>(initialState: T): [T, ChangeFunction] => {
	const [values, setValues] = React.useState<T>(initialState);

	return [
		values,
		(e) => {
			setValues({
				...values,
				[e.currentTarget.name]: e.currentTarget.value,
			});
		},
	];
};
