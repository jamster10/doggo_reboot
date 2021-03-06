import Bottleneck from 'bottleneck';
// import { queryTerms } from './queryTerms'  //maybe config file?

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 200
});

const moreResultslimiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000
});

const queryTerms = {
  bars: ['dog', 'bar'],
  parks: ['dog', 'park'],
  "pet store": ['', 'pet_store'],
  lodging: ['pet-friendly', 'lodging'],
  vet: ["dog", "veterinary_care"]
}

export default async function searchHandler (placesService, routeBounds, searchSelections, map, resultsHandler) {

  for (const bound of routeBounds) {
    for (const query of searchSelections) {
      const options = { query: queryTerms[query][0], bounds: bound, type: queryTerms[query][1] }
      await limiter.schedule(() => placesService.textSearch(options, callback));
    }
  }

  async function callback (results, status, pagination) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      handleResults(results)
      if (pagination.hasNextPage) {
        setTimeout(() => pagination.nextPage(), 2000)
      }
    }
  }

  function handleResults (results) {
    const bounds = new window.google.maps.LatLngBounds();

    results.forEach((place) => {
      // if (!bound.contains(place.geometry.location)) {

      const image = {
        url: place.icon,
        size: new window.google.maps.Size(50, 50),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };
      const marker = new window.google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      window.google.markers.push(marker)
      bounds.extend(place.geometry.location);
    })
    const placeData = createPlaces(results) || []
    console.log(placeData)
    resultsHandler(placeData)
  }
}

const createPlaces = (places) => {
  return places.reduce((prev, place) => {
    if (place.business_status && place.business_status !== 'OPERATIONAL') {
      return prev
    }
    prev.push({
      address: place.formatted_address || 'unknown address',
      businessStatus: place.business_status || '', //"OPERATIONAL"
      id: place.id,
      name: place.name,
      isOpen: place.opening_hours?.open_now || 'unknown hours',
      placeId: place.place_id,
      priceLevel: String(place.price_level) || 'unknown price level', //num
      photos: (place.photos && place.photos[0]).getUrl() || null, //{}[]
      rating: String(place.rating) || '3', //num
      ratingCount: String(place.user_ratings_total) || '0' //num
    })
    return prev
  }, [])
}
const dummyPlace = {
  address: '123 Main St',
      businessStatus: "OPERATIONAL",
      id: '23f2efr3453g',
      name: 'Kristof Bar',
      isOpen: true,
      placeId: 'dsdcwef_2s2s',
      priceLevel: '3',
      photos: null,
      rating: "3",
      ratingCount: '100'
}