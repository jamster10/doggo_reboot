import React from "react";
import styled from "styled-components";

import { getUserLocation } from "./api";
import { MapContainer, Navbar} from "./components";
import { UserContext } from "./context";

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
			</Main>
		</>
	);
}

const Main = styled.main`
	height: 100%;
`;

export default App;
