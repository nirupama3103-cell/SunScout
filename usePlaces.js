import { useState, useEffect } from 'react'
import { CITY_COORDS } from './constants.js' // Make sure this contains { CA: {lat, lon}, Dallas: {lat, lon}, ... }
import { fetchNearbyPlaces, manualActivities } from './places.js'

/**
 * Merges live Google Places results with manual "Hero" spots.
 * Refetches whenever the 'city' changes.
 */
export function usePlaces(city = 'CA') {
  // 1. Initial state: filter manual spots by the current city immediately
  const [activities, setActivities] = useState(() => 
    manualActivities.filter(a => a.city === city)
  )
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState('static')

  useEffect(() => {
    async function load() {
      // Get the specific coordinates for the selected city
      const coords = CITY_COORDS[city]
      
      if (!coords) {
        console.warn(`[usePlaces] No coordinates found for city: ${city}`)
        return
      }

      setLoading(true)
      try {
        // 2. Fetch live data using the coordinates AND the city name
        const live = await fetchNearbyPlaces(coords.lat, coords.lon, city)
        
        if (live && live.length > 0) {
          // The fetchNearbyPlaces function already merges manual + live 
          // and deduplicates, so we can just set the result.
          setActivities(live)
          setSource('live')
        } else {
          // Fallback to manual only if live fetch returns nothing
          setActivities(manualActivities.filter(a => a.city === city))
          setSource('static')
        }
      } catch (error) {
        console.error(`[usePlaces] Failed to fetch live places for ${city}:`, error)
        setSource('static')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [city]) // 3. CRITICAL: Refetch every time the city tab changes

  return { activities, loading, source }
}
