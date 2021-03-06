import React from "react";
import styled from "styled-components";

import {
	AppContext,
	PlaceData,
	SearchContext,
	UserContext,
} from "../../context";
import { LoadingGif, Sidebar } from "..";
import { AutocompleteDirectionsHandler } from "./autoCompleteDirectionsHandler";

interface AutocompleteHandler {
	route: () => void;
}

export const MapContainer = () => {
	const { state: userState } = React.useContext(UserContext);
	const { dispatch: appDispatch } = React.useContext(AppContext);
	const { dispatch: searchDispatch } = React.useContext(SearchContext);

	const mapRef = React.useRef(null);
	const [
		autocompleteHandler,
		setAutocompleteHandler,
	] = React.useState<null | AutocompleteHandler>(null);

	React.useEffect(() => {
		if (autocompleteHandler) {
			const beginSearch = autocompleteHandler.route.bind(
				autocompleteHandler
			);
			searchDispatch({
				type: "SET_SEARCH_CALLBACK",
				payload: beginSearch,
			});
			searchDispatch({
				type: "SET_READY",
			});
		}
	}, [autocompleteHandler, searchDispatch]);

	React.useEffect(() => {
		if (mapRef.current && userState.userLocation?.city) {
			loadScript();
		}
	}, [mapRef, userState.userLocation]);

	const resultsHandler = (resultsBatch: PlaceData[]) => {
		appDispatch({
			type: "ADD_PLACES_DATA",
			payload: resultsBatch,
		});
	};

	const initMap = () => {
		const map = new window.google.maps.Map(mapRef.current, {
			streetViewControl: false,
			mapTypeId: window.google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			center: {
				lat: userState.userLocation?.lat,
				lng: userState.userLocation?.lon,
			},
			zoom: 8,
		});
		setAutocompleteHandler(
			new AutocompleteDirectionsHandler(map, resultsHandler)
		);
	};
	window.initMap = initMap;

	return (
		<Div>
			<LeftSection>
				{!autocompleteHandler && <LoadingGif />}
				<MapDiv isLoaded={!!autocompleteHandler} ref={mapRef}></MapDiv>
			</LeftSection>
			<Sidebar />
		</Div>
	);
};

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
	height: ${({ isLoaded }: { isLoaded: boolean }) =>
		isLoaded ? "calc(100vh - 57px)" : "calc(100vh - 200px)"};
`;

const LeftSection = styled.div`
	flex: 2;
	height: calc(100vh - 57px);
`;

const Div = styled.div`
	position: relative;
	display: flex;
	height: calc(100vh-57px);
	overflow-y: 'hidden'
	flex-wrap: no-wrap;
`;
