import { useState, useEffect } from 'react';
import { CITY_COORDS } from './constants';
import { fetchNearbyPlaces } from './places';

export function usePlaces(city = 'CA') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      if (!coords) return;
      setLoading(true);
      setPlaces([]); // ✅ Clear old places immediately when city changes
      try {
        const data = await fetchNearbyPlaces(coords.lat, coords.lon, 'park');
        setPlaces(data || []);
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
