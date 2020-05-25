import React from "react";

import { useForm } from "../../hooks";
import { Input, Label } from "../DesignComponents";

interface SearchFields {
	origin: string;
	destination: string;
}

const initialFields: SearchFields = {
	origin: "",
	destination: "",
};

export const SearchForm = (): JSX.Element => {
	const [values, handleChange] = useForm<SearchFields>(initialFields);
	const handleSearch = () => {};

	return (
		<form>
			<Label htmlFor="origin">Start:</Label>
			<Input
				type="text"
				name="origin"
				id="origin"
				value={values.origin}
				onChange={handleChange}
			/>
			<Label htmlFor="destination">End:</Label>
			<Input
				type="text"
				name="destination"
				id="destination"
				value={values.destination}
				onChange={handleChange}
			/>
			<button className="search-btn" type="button" onClick={handleSearch}>
				Search!
			</button>
		</form>
	);
};
