import { useState, useEffect } from 'react'
import { LAT, LON, STATIC_ACTIVITIES } from './constants.js'
import { fetchNearbyPlaces } from './places.js'

/**
 * Merges live Google Places results with our static fallback data.
 * Static data always shows first; live results are appended.
 */
export function usePlaces() {
  const [activities, setActivities] = useState(STATIC_ACTIVITIES)
  const [loading, setLoading]       = useState(false)
  const [source, setSource]         = useState('static') // 'static' | 'live'

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const live = await fetchNearbyPlaces(LAT, LON)
        if (live && live.length > 0) {
          setActivities([...STATIC_ACTIVITIES, ...live])
          setSource('live')
        }
      } catch (error) {
        console.error("Failed to fetch live places:", error)
        // Fallback is already set to STATIC_ACTIVITIES
      }
      setLoading(false)
    }
    load()
  }, [])

  return { activities, loading, source }
}
