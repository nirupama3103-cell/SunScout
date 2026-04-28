import { useState, useEffect } from 'react';
import { CITY_COORDS, placeTypeToIcon } from './constants';
import { fetchNearbyPlaces } from './places';

export function usePlaces(city = 'CA') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      if (!coords) return;
      setLoading(true);
      setPlaces([]);
      try {
        const data = await fetchNearbyPlaces(coords.lat, coords.lon, 'park');
        const mapped = (data || []).map((place, i) => ({
          id: place.id || i,
          name: place.displayName?.text || 'Unknown Place',
          displayName: place.displayName,
          formattedAddress: place.formattedAddress,
          googleMapsUri: place.googleMapsUri,
          lat: place.location?.latitude,
          lon: place.location?.longitude,
          icon: placeTypeToIcon(place.types || []),
          dist: place.location ? (
            Math.round(
              Math.sqrt(
                Math.pow((place.location.latitude - coords.lat) * 69, 2) +
                Math.pow((place.location.longitude - coords.lon) * 55, 2)
              ) * 10
            ) / 10
          ) : null,
          open: place.currentOpeningHours?.openNow,
          editorialSummary: place.editorialSummary,
        }));
        setPlaces(mapped);
      } catch (error) {
        console.error('Places fetch failed:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  return { places, loading };
}
