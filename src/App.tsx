import React from "react";
import styled from "styled-components";

import { Navbar, Sidebar } from "./components";

function App() {
	return (
		<>
			<Navbar />
			<Main>
				<Sidebar>
					<div>Test</div>
				</Sidebar>
			</Main>
		</>
	);
}

const Main = styled.main`
	height: 100%;
`;

export default App;
