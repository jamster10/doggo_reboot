import React from "react";
import styled from "styled-components";

import { SearchContext, UserContext } from "../../context";
import { Sidebar } from "..";
import { AutocompleteDirectionsHandler } from "./autoCompleteDirectionsHandler";

interface AutocompleteHandler {
	route: () => void;
}

export const MapContainer = React.memo(() => {
	const { state } = React.useContext(UserContext);
	const { dispatch: searchDispatch } = React.useContext(SearchContext);

	const mapRef = React.useRef(null);

	const [
		autocompletHandler,
		setAutocompleteHandler,
	] = React.useState<null | AutocompleteHandler>(null);

	React.useEffect(() => {
		if (autocompletHandler) {
			const beginSearch = autocompletHandler.route.bind(
				autocompletHandler
			);
			searchDispatch({
				type: "SET_SEARCH_CALLBACK",
				payload: beginSearch,
			});
		}
	}, [autocompletHandler, searchDispatch]);

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
		setAutocompleteHandler(new AutocompleteDirectionsHandler(map));
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
