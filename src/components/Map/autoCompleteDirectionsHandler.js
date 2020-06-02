import RouteBoxer from './routeBoxer';
import searchHandler from './SearchHandler';

export function AutocompleteDirectionsHandler (map) {
  let google = window.google;
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.directionsService = new google.maps.DirectionsService();
  this.directionsRenderer = new google.maps.DirectionsRenderer();
  this.directionsRenderer.setMap(map);
  this.routeBoxArray = [];

  const originInput = document.getElementById('origin');
  const destinationInput = document.getElementById('destination');

  const originAutocomplete =
    new google.maps.places.Autocomplete(originInput);
  originAutocomplete.setFields(['place_id']);

  var destinationAutocomplete =
    new google.maps.places.Autocomplete(destinationInput);
  destinationAutocomplete.setFields(['place_id']);

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  const RouteBoxerInstance = RouteBoxer();
  this.routeBoxer = new RouteBoxerInstance();

  this.placesService = new window.google.maps.places.PlacesService(map);
}

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
  autocomplete, mode) {
  autocomplete.bindTo('bounds', this.map);

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    if (!place.place_id) {
      window.alert('Please select an option from the dropdown list.');
      return;
    }

    if (mode === 'ORIG') {
      this.originPlaceId = place.place_id;
    } else {
      this.destinationPlaceId = place.place_id;
    }
  });
};

AutocompleteDirectionsHandler.prototype.route = function (params) {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }

  const handleResponse = (res, status) => {
    if (status === 'OK') {
      this.directionsRenderer.setDirections(res);

      //create boxes for routeBoxer
      const path = res.routes[0].overview_path;
      const boxes = this.routeBoxer.box(path, 15);

      //remove existing boxes and add new ones
      clearRouteBoxes(this.routeBoxArray);

      this.routeBoxArray = drawBoxes(boxes, this.map);
      //find nearby places using Googles Nearby type search
      // searchHandler(this.placesService, boxes, params, this.map, this.resultsHandler);

    } else {
      //add a error handling function
      window.alert('Directions request failed due to ' + status);
    }
  }

  this.directionsService.route(
    {
      origin: { placeId: this.originPlaceId },
      destination: { placeId: this.destinationPlaceId },
      travelMode: 'DRIVING'
    },
    handleResponse
  );
};

const drawBoxes = (routeboxes, map) =>
  routeboxes.map(item => new window.google.maps.Rectangle({
    bounds: item,
    fillOpacity: 0,
    strokeOpacity: 1.0,
    strokeColor: '#000000',
    strokeWeight: 1,
    map: map
  }));



const clearRouteBoxes = (boxpolys) => {
  boxpolys.forEach(item => item.setMap(null));
}

function clearMarkers (markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = [];
}
