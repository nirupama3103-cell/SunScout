import { placeTypeToIcon } from './constants' // Use standard imports

export async function fetchNearbyPlaces(lat, lon, city = 'CA', radiusMeters = 8000) {
  // ... existing manualActivities filter ...

  try {
    const res = await fetch('/api/places', { // Path must match Step 1
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lon, type: 'park', radius: radiusMeters }),
    })
    
    const data = await res.json()
    // Returns data.places to the usePlaces hook
    return data.places || [] 
  } catch (err) {
    console.error(err)
    return []
  }
}
