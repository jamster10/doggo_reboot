import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	const { pathname } = useLocation();
	const message = getMessage(pathname);

	return (
		<Container>
			<Header>{message}</Header>
			<Div>{children}</Div>
		</Container>
	);
};

const getMessage = (path: string): string => {
	switch (path) {
		case "/my-places":
			return "My Places";
		case "/sign-up":
			return "Sign up to save your places.";
		case "/login":
			return "Welcome back!";
		default:
			return "Welcome to Doggo!";
	}
};

const Container = styled.div`
	height: calc(100vh - 57px);
	max-width: 350px;
	position: relative;
	padding: 0px 30px;
	right: 1000;
	flex: 1;
	border-left: 1px solid black;
`;
const Header = styled.div`
	padding: 20px;
	text-align: center;
	font-size: medium;
	border-bottom: 1px solid black;
	margin-bottom: 12px;
`;

const Div = styled.div`
	padding: 24px 12px;
`;
