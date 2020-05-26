import React from "react";
import styled from "styled-components";

import { UserContext } from "../../context";
import { Sidebar } from "..";
import { AutocompleteDirectionsHandler } from "./autoCompleteDirectionsHandler";

// import RouteBoxer from './routeBoxer'

declare global {
	interface Window {
		google: any;
		initMap: () => void;
	}
}

export const MapContainer = React.memo(() => {
	const { state } = React.useContext(UserContext);
	const mapRef = React.useRef(null);

	React.useEffect(() => {
		if (mapRef.current && state.userLocation?.city) {
			loadScript();
		}
	}, [mapRef, state.userLocation]);

	const initMap = async () => {
		const map = new window.google.maps.Map(mapRef.current, {
			streetViewControl: false,
			mapTypeId: window.google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			center: {
				lat: state.userLocation?.lat,
				lng: state.userLocation?.lon,
			},
			zoom: 8,
		});
		new AutocompleteDirectionsHandler(map);
	};
	window.initMap = initMap;

	return (
		<Div>
			<MapDiv ref={mapRef}></MapDiv>
			<Sidebar />
		</Div>
	);
});

const loadScript = (
	url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_G_MAPS_KEY}&libraries=places&callback=initMap`
) => {
	const index = window.document.getElementsByTagName("script")[0];
	const script = window.document.createElement("script");
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode!.insertBefore(script, index);
};

const MapDiv = styled.div`
	height: calc(100vh-57px);
	flex: 2;
`;

const Div = styled.div`
	display: flex;
	flex-wrap: no-wrap;
`;
