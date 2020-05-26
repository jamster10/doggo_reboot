import React from "react";

import { useForm } from "../../hooks";
import { Input, Label } from "../DesignComponents";
import styled from "styled-components";
// import { Checkbox } from './Checkbox'

interface SearchFields {
	origin: string;
	destination: string;
}

const initialFields: SearchFields = {
	origin: "",
	destination: "",
};

interface Props {
	isVisible: boolean;
}

export const SearchForm = ({ isVisible }: Props): JSX.Element => {
	const [values, handleChange] = useForm<SearchFields>(initialFields);

	const handleSearch = () => {};

	return (
		<Form isVisible={isVisible}>
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
		</Form>
	);
};

const Form = styled.form`
	display: ${(props: Props) => {
		return props.isVisible ? "block" : "none";
	}};
`;
