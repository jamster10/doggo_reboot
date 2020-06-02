import React from "react";
import styled from "styled-components";

import { Button, Input, Label } from "../DesignComponents";
import { Checkbox } from "./Checkbox";
import { SearchContext } from "../../context";

interface Props {
	isVisible: boolean;
}

interface CheckboxState {
	bars: boolean;
	parks: boolean;
	"pet store": boolean;
	lodging: boolean;
	vet: boolean;
}

const names = ["bars", "parks", "pet store", "lodging", "vet"];
const initialCheckBoxState: CheckboxState = {
	bars: false,
	parks: false,
	"pet store": false,
	lodging: false,
	vet: false,
};
export const SearchForm = ({ isVisible }: Props): JSX.Element => {
	const [checkboxes, setCheckboxes] = React.useState<CheckboxState>(
		initialCheckBoxState
	);
	const { state, dispatch } = React.useContext(SearchContext);

	const originRef = React.useRef<null | HTMLInputElement>(null);
	const destinationRef = React.useRef<null | HTMLInputElement>(null);

	const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.currentTarget;
		setCheckboxes((c) => ({
			...c,
			[name]: !checkboxes[name as keyof CheckboxState],
		}));
	};

	const handleSearch = () => {
		if (originRef.current && destinationRef.current) {
			const destination = destinationRef.current.value;
			const origin = originRef.current.value;

			dispatch({
				type: "SET_QUERY",
				payload: {
					origin,
					destination,
					params: getSearchParams(checkboxes),
				},
			});
			state.beginSearch(getSearchParams(checkboxes));
		}
	};

	const Checkboxes = names.map((n) => (
		<Checkbox
			key={n}
			isChecked={checkboxes[n as keyof CheckboxState]}
			label={makeLabel(n)}
			name={n}
			onChange={toggleCheckbox}
		/>
	));

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
			<CheckboxContainer>{Checkboxes}</CheckboxContainer>
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
const CheckboxContainer = styled.div`
	display: flex;
	flex: 0 0 33.333333%;
	flex-wrap: wrap;
`;

const makeLabel = (name: string): string => {
	return name !== "pet store"
		? name.slice(0, 1).toUpperCase() + name.slice(1)
		: "Pet Store";
};

const getSearchParams = (checkboxes: CheckboxState): string[] =>
	Object.keys(checkboxes).filter((k) => checkboxes[k as keyof CheckboxState]);
