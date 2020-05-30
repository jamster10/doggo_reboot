import styled from "styled-components";

export const Label = styled.label`
	display: block;
	margin-bottom: 4px;
`;

export const Input = styled.input`
	background-color: unset;
	display: block;
	margin-bottom: 16px;
	border: 1px solid black;
	height: 25px;
	width: 100%;
	border-radius: 5px;
	padding: 4px 8px;
`;

export const Button = styled.button`
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
