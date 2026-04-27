import { useState, useEffect } from 'react';
import { CITY_COORDS } from './constants.js'; 
import { fetchNearbyPlaces } from './places.js'; 

export function usePlaces(city = 'CA') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      if (!coords) return;

      setLoading(true);
      try {
        const live = await fetchNearbyPlaces(coords.lat, coords.lon, city);
        setPlaces(live || []);
      } catch (error) {
        console.error("Places fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]); 

  return { places, loading };
}
