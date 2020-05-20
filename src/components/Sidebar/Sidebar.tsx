import React from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	const { path } = useRouteMatch();
	const message = path === "/my-places" ? "My Places" : "Welcome to Doggo!";

	return (
		<Container>
			<Header>{message}</Header>
			<Div>{children}</Div>
		</Container>
	);
};

const Container = styled.div`
	height: calc(100vh - 57px);
	max-width: 350px;
	position: relative;
	right: 1000;
	flex: 1;
	border-left: 1px solid black;
`;
const Header = styled.div`
	padding: 20px;
	text-align: center;
	font-size: medium;
	border-bottom: 1px solid black;
	
`;

const Div = styled.div`
	padding: 24px 12px;
`;
