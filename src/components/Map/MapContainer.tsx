import React from "react";
import styled from "styled-components";

declare global {
	interface Window {
		google: any;
		initMap: () => void;
	}
}

export const MapContainer = (): JSX.Element => {
	const mapRef = React.useRef(null);

	React.useEffect(() => {
		console.log(process.env.REACT_APP_G_MAPS_KEY);
		if (mapRef.current) {
      console.log(mapRef.current);
      loadScript()
		}
	}, [mapRef]);

	const initMap = () => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8,
		});
	};
	window.initMap = initMap;

	return <Div ref={mapRef}></Div>;
};

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
flex: 2
`
