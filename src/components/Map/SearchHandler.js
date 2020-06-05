import Bottleneck from 'bottleneck';
import { create } from 'domain';
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
    if (place.business_status && place.business !== 'OPERATIONAL') {
      return undefined
    }

    return prev.push({
      address: place.formatted_address,
      businessStatus: place.business_status || '', //"OPERATIONAL"
      id: place.id,
      name: place.name,
      isOpen: places.opening_hours.isOpen(),
      placeId: place.place_id,
      priceLevel: String(place.price_level), //num
      photos: (place.photos && place.photos[0]) || null, //{}[]
      rating: String(place.rating), //num
      ratingCount: String(place.user_ratings_total) //num
    })
  }, [])
}