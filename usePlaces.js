import { useState, useEffect } from 'react'
import { LAT, LON, STATIC_ACTIVITIES } from '../lib/constants.js'
import { fetchNearbyPlaces } from '../lib/places.js'

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
      const live = await fetchNearbyPlaces(LAT, LON)
      if (live.length > 0) {
        setActivities([...STATIC_ACTIVITIES, ...live])
        setSource('live')
      }
      setLoading(false)
    }
    load()
  }, [])

  return { activities, loading, source }
}
