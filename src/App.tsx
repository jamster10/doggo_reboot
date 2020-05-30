import React from "react";
import styled from "styled-components";

import { getUserLocation } from "./api";
import { MapContainer, Navbar } from "./components";
import { SearchProvider, UserContext } from "./context";

declare global {
	interface Window {
		google: {
			maps: any;
		};
		initMap: () => void;
	}
}

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
				<SearchProvider>
					<MapContainer />
				</SearchProvider>
			</Main>
		</>
	);
}

const Main = styled.main`
	height: 100%;
`;

export default App;
