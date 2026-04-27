import { useState, useEffect } from 'react';
import { CITY_COORDS } from './constants'; 

export function usePlaces(city = 'CA') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      if (!coords) return;
      setLoading(true);
      try {
        const res = await fetch('/api/places', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat: coords.lat, lon: coords.lon, type: 'park' })
        });
        const data = await res.json();
        setPlaces(data.places || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [city]);

  return { places, loading };
}
