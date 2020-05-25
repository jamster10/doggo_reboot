import React from "react";
import styled from "styled-components";

import { getUserLocation } from "./api";
import { MapContainer, Navbar, Sidebar } from "./components";
import { UserContext } from "./context";
import { Routes } from "./components/Routes";

function App() {
	const { dispatch } = React.useContext(UserContext);

	React.useEffect(() => {
		const setLocation = async () => {
			dispatch({
				type: "SET_USER_LOCATION",
				payload: await getUserLocation(),
			});
		};
		setLocation();
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<Main>
				<MapContainer />
				<Sidebar>
					<Routes/>
				</Sidebar>
			</Main>
		</>
	);
}

const Main = styled.main`
	height: 100%;
	display: flex;
	flex-wrap: no-wrap;
`;

export default App;
