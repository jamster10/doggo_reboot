import React from "react";
import styled from "styled-components";

interface CheckboxProps {
	isChecked: boolean;
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
	isChecked,
	label,
	name,
	onChange,
}: CheckboxProps) => (
	<CheckboxContainer>
		<StyledCheckbox
			type="checkbox"
			name={name}
			id={name}
			checked={isChecked}
			onChange={onChange}
		/>
		<label htmlFor={name}>{label}</label>
	</CheckboxContainer>
);

const StyledCheckbox = styled.input`
	height: 16px;
	width: 16px;
	margin-right: 4px;
	margin-left: 4px;
	margin-bottom: 16px;
`;

const CheckboxContainer = styled.div`
	display: flex;
	margin-right: 16px;
`;
