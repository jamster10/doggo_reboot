import React from "react";
import styled from "styled-components";

import { userContext } from "../../context";
import { NavLinks } from "./NavLinks";

export const Navbar = (): JSX.Element => {
	const { state, dispatch } = React.useContext(userContext);
	console.log(state.currentUser);
	if (state.currentUser === null) {
		console.log("no user");
	}

	return (
		<Header>
			<LogoContainer>
				<img
					style={{ height: 32 }}
					src={require("../../assets/logo.svg")}
					alt="logo"
				/>
				<h1>DogGo!</h1>
			</LogoContainer>
			<NavContainer>
				<NavLinks />
			</NavContainer>
		</Header>
	);
};

const Header = styled.header`
	height: 56px;
	width: 100%;
	display: flex;
	border-bottom: 1px solid black;
	justify-content: space-between;
`;

const Div = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
`;

const LogoContainer = styled(Div)`
	margin-left: 200px;
`;
const NavContainer = styled(Div)`
	margin-right: 80px;
`;
