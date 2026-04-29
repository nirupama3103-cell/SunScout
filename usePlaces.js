import { useState, useEffect } from 'react';
import { CITY_COORDS, placeTypeToIcon } from './constants';
import { fetchNearbyPlaces } from './places';

const TAB_QUERIES = {
  allFun: 'park',
  freeFun: 'public library splash pad free activities',
  summer: 'summer program recreation center sunnyvale',
  paidCamps: 'summer camp sunnyvale',
};

function mapPlace(place, coords, i) {
  return {
    id: place.id || i,
    name: place.displayName ? place.displayName.text : 'Unknown Place',
    displayName: place.displayName,
    formattedAddress: place.formattedAddress,
    googleMapsUri: place.googleMapsUri,
    lat: place.location ? place.location.latitude : null,
    lon: place.location ? place.location.longitude : null,
    icon: placeTypeToIcon(place.types || []),
    dist: place.location ? (
      Math.round(
        Math.sqrt(
          Math.pow((place.location.latitude - coords.lat) * 69, 2) +
          Math.pow((place.location.longitude - coords.lon) * 55, 2)
        ) * 10
      ) / 10
    ) : null,
    open: place.currentOpeningHours ? place.currentOpeningHours.openNow : null,
    editorialSummary: place.editorialSummary,
  };
}

export function usePlaces(city = 'CA', tab = 'allFun') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      if (!coords) return;
      setLoading(true);
      setPlaces([]);
      try {
        const query = TAB_QUERIES[tab] || 'park';
        const data = await fetchNearbyPlaces(coords.lat, coords.lon, query);
        const mapped = (data || []).map((place, i) => mapPlace(place, coords, i));
        setPlaces(mapped);
      } catch (error) {
        console.error('Places fetch failed:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city, tab]);

  return { places, loading };
}
