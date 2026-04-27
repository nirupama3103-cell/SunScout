import { useState, useEffect } from 'react';
import { CITY_COORDS } from './constants.js'; // Fix: Import coords object
import { fetchNearbyPlaces } from './places.js'; // Ensure this helper is present

/**
 * usePlaces hook to fetch live activity data based on the selected city.
 */
export function usePlaces(city = 'CA') {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('static');

  useEffect(() => {
    async function load() {
      // 1. Get the specific coordinates for the current city
      const coords = CITY_COORDS[city];
      
      if (!coords) {
        console.warn(`[usePlaces] No coordinates found for city: ${city}`);
        return;
      }

      setLoading(true);
      try {
        // 2. Fetch live data using dynamic coordinates from constants.js
        const live = await fetchNearbyPlaces(coords.lat, coords.lon, city);
        
        if (live && live.length > 0) {
          setPlaces(live);
          setSource('live');
        } else {
          setSource('static');
        }
      } catch (error) {
        console.error(`[usePlaces] Failed to fetch live places for ${city}:`, error);
        setSource('static');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [city]); // 3. CRITICAL: Re-run the fetch every time the city tab changes

  return { places, loading, source };
}
