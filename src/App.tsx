import React from "react";
import styled from "styled-components";

import { MapContainer, Navbar, Sidebar } from "./components";

function App() {
	return (
		<>
			<Navbar />
			<Main>
				<MapContainer/>
				<Sidebar>
					<div>Test</div>
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
