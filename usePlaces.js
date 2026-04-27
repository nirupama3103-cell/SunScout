import { useState, useEffect } from 'react';
import { CITY_COORDS } from './constants.js'; 

/**
 * Merges live Google Places results with manual "Hero" spots.
 * Refetches whenever the 'city' changes.
 */
export function usePlaces(city = 'CA') {
  // 1. Initial state: filter manual spots by the current city immediately
  // Note: Ensure manualActivities is imported or defined in this file
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('static');

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city];
      
      if (!coords) {
        console.warn(`[usePlaces] No coordinates found for city: ${city}`);
        return;
      }

      setLoading(true);
      try {
        // 2. Fetch live data using coordinates
        // Ensure fetchNearbyPlaces is imported or defined
        const live = await fetchNearbyPlaces(coords.lat, coords.lon, city);
        
        if (live && live.length > 0) {
          setActivities(live);
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
  }, [city]); 

  return { activities, loading, source };
}
