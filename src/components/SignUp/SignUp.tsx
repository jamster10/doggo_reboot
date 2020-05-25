import React from "react";
import styled from "styled-components";

import { useForm } from "../../hooks";

interface SignUpFields {
	username: string;
	password: string;
	confirmPassword: string;
}

type FormErrors = SignUpFields;

const initialFields: SignUpFields | FormErrors = {
	username: "",
	password: "",
	confirmPassword: "",
};

export const SignUp = () => {
	const [errors, setErrors] = React.useState<FormErrors>(initialFields);
	const [values, handleChange] = useForm<SignUpFields>(initialFields);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formErrors = checkInputs(values);
		if (formErrors) {
			setErrors(formErrors);
			return;
		}
	};

	const { username, password, confirmPassword } = values;
	return (
		<>
			<form>
				<Label htmlFor="username">Username:</Label>
				<Input
					type="text"
					name="username"
					id="username"
					value={username}
					onChange={handleChange}
				/>
				<Label htmlFor="password">Password:</Label>
				<Input
					type="text"
					name="password"
					id="password"
					value={password}
					onChange={handleChange}
				/>
				<Label htmlFor="confirmPassword">Confirm Password:</Label>
				<Input
					type="text"
					id="confirmPassword"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
				/>
				<ButtonContainer>
					<Button onClick={handleSubmit}>Sign Up!</Button>
				</ButtonContainer>
			</form>
		</>
	);
};

const checkInputs = (fields: SignUpFields): FormErrors | undefined => {
	let hasErrors = false;
	const errors = {} as FormErrors;
	let field: keyof SignUpFields;
	for (field in fields) {
		if (!fields[field]) {
			hasErrors = true;
			errors[field] = "This is a required field";
		}
	}

	if (fields.username.length > 10) {
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

const Label = styled.label`
	display: block;
	margin-bottom: 4px;
`;
const Input = styled.input`
	background-color: unset;
	display: block;
	padding: 4px 8px;
	margin-bottom: 16px;
	border: 1px solid black;
	height: 25px;
	width: 100%;
	border-radius: 5px;
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
`;
