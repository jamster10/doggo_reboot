import React from "react";
import styled from "styled-components";

import { Button, Input, Label } from "../DesignComponents";
import { SearchContext } from "../../context";

interface Props {
	isVisible: boolean;
}

export const SearchForm = ({ isVisible }: Props): JSX.Element => {
	const { state, dispatch } = React.useContext(SearchContext);
	const originRef = React.useRef<null | HTMLInputElement>(null);
	const destinationRef = React.useRef<null | HTMLInputElement>(null);

	const handleSearch = () => {
		if (originRef.current && destinationRef.current) {
			const destination = destinationRef.current.value;
			const origin = originRef.current.value;

			dispatch({
				type: "SET_QUERY_LOCATIONS",
				payload: {
					origin,
					destination,
				},
			});
			state.beginSearch();
		}
	};

	return (
		<Form isVisible={isVisible}>
			<Label htmlFor="origin">Start:</Label>
			<Input type="text" name="origin" id="origin" ref={originRef} />
			<Label htmlFor="destination">End:</Label>
			<Input
				type="text"
				name="destination"
				id="destination"
				ref={destinationRef}
			/>
			<Button type="button" onClick={handleSearch}>
				Search!
			</Button>
		</Form>
	);
};

const Form = styled.form`
	display: ${(props: Props) => {
		return props.isVisible ? "block" : "none";
	}};
`;
