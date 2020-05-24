import React from "react";
import styled from "styled-components";
import { userContext } from "../../context";

declare global {
	interface Window {
		google: any;
		initMap: () => void;
	}
}

export const MapContainer = React.memo(() => {
	const { state } = React.useContext(userContext);
	const mapRef = React.useRef(null);

	React.useEffect(() => {
		if (mapRef.current && state.userLocation?.city) {
			loadScript();
		}
	}, [mapRef, state.userLocation]);

	const initMap = () => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: {
				lat: state.userLocation?.lat,
				lng: state.userLocation?.lon,
			},
			zoom: 8,
		});
	};
	window.initMap = initMap;

	return <Div ref={mapRef}></Div>;
});

const loadScript = () => {
	const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_G_MAPS_KEY}&libraries=places&callback=initMap`;

	const index = window.document.getElementsByTagName("script")[0];
	const script = window.document.createElement("script");
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode!.insertBefore(script, index);
};

const Div = styled.div`
	height: calc(100vh-57px);
	flex: 2;
`;
