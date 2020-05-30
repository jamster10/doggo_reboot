import RouteBoxer from './routeBoxer'

export function AutocompleteDirectionsHandler (map) {
  let google = window.google

  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new google.maps.DirectionsService();
  this.directionsRenderer = new google.maps.DirectionsRenderer();
  this.directionsRenderer.setMap(map);
  this.routeBoxArray = []

  const originInput = document.getElementById('origin');
  const destinationInput = document.getElementById('destination');


  const originAutocomplete =
    new google.maps.places.Autocomplete(originInput);
  // Specify just the place data fields that you need.
  originAutocomplete.setFields(['place_id']);

  var destinationAutocomplete =
    new google.maps.places.Autocomplete(destinationInput);
  // Specify just the place data fields that you need.
  destinationAutocomplete.setFields(['place_id']);

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  const RouteBoxerInstance = RouteBoxer()
  this.routeBoxer = new RouteBoxerInstance()
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

AutocompleteDirectionsHandler.prototype.route = function () {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }

  const handleResponse = (res, status) => {
    if (status === 'OK') {
      this.directionsRenderer.setDirections(res);

      const path = res.routes[0].overview_path;
      const boxes = this.routeBoxer.box(path, 15);

      clearRouteBoxes(this.routeBoxArray);
      this.routeBoxArray = drawBoxes(boxes, this.map);
    } else {
      //add a error handling function
      window.alert('Directions request failed due to ' + status);
    }
  }

  this.directionsService.route(
    {
      origin: { placeId: this.originPlaceId },
      destination: { placeId: this.destinationPlaceId },
      travelMode: this.travelMode
    },
    handleResponse
  );
};


const drawBoxes = (routeboxes, map) => {
  routeboxes.map(item => new window.google.maps.Rectangle({
    bounds: item,
    fillOpacity: 0,
    strokeOpacity: 1.0,
    strokeColor: '#000000',
    strokeWeight: 1,
    map: map
  }))
}

const clearRouteBoxes = (boxpolys) => {
  boxpolys.forEach(item => item.setMap(null))
}

function clearMarkers (markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = [];
}
