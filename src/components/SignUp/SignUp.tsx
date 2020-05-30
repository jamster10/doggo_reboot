import React from "react";
import styled from "styled-components";

import { Button, Input, Label } from '../DesignComponents'
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
				<Label htmlFor="confirmPassword">Confirm Password:</Label>
				<Input
					type="text"
					id="confirmPassword"
					name="confirmPassword"
					maxLength={60} 
					minLength={8}
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
