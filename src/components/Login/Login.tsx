import React from "react";
import styled from "styled-components";

import { Input, Label } from '../DesignComponents'
import { useForm } from "../../hooks";

interface LoginFields {
	username: string;
	password: string;
}

type FormErrors = LoginFields;

const initialFields: LoginFields | FormErrors = {
	username: "",
	password: "",
};

export const Login = (): JSX.Element => {
	const [errors, setErrors] = React.useState<FormErrors>(initialFields);
	const [values, handleChange] = useForm<LoginFields>(initialFields);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formErrors = checkInputs(values);
		if (formErrors) {
			setErrors(formErrors);
			return;
		}
	};

	const { username, password } = values;
	return (
		<>
			<form>
				<Label htmlFor="username">Username:</Label>
				<Input
					type="text"
					name="username"
					id="username"
					maxLength={15}
					value={username}
					onChange={handleChange}
				/>
				<Label htmlFor="password">Password:</Label>
				<Input
					type="text"
					name="password"
					id="password"
					maxLength={60} 
					minLength={8}
					value={password}
					onChange={handleChange}
				/>
				<ButtonContainer>
					<Button onClick={handleSubmit}>Login!</Button>
				</ButtonContainer>
			</form>
		</>
	);
};

const checkInputs = (fields: LoginFields): FormErrors | undefined => {
	let hasErrors = false;
	const errors = {} as FormErrors;
	let field: keyof LoginFields;
	for (field in fields) {
		if (!fields[field]) {
			hasErrors = true;
			errors[field] = "This is a required field";
		}
	}

	if (fields.username.length > 15) {
		hasErrors = true;
		errors.username = "This field can be a maximum of 10 characters.";
	}

	if (hasErrors) return errors;
};

const ButtonContainer = styled.div`
	text-align: center;
	padding-top: 12px;
	width: 100%;
`;

const Button = styled.button`
	height: 40px;
	padding: 10px 20px;
	border: 1px solid black;
	background-color: transparent;
	&:hover {
		color: white;
		border: 1px solid white;
	}
	cursor: pointer;
`;
