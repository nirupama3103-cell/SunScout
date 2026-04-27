// 1. Remove .js extension to help Vite resolve the path correctly
import { placeTypeToIcon } from './constants'

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

/** Manual "Hero" activities for your target cities */
export const manualActivities = [
  {
    id: 'ca-lib-1',
    city: 'CA',
    name: 'Sunnyvale Public Library',
    icon: '📚',
    desc: 'Story time and summer reading programs.',
    dist: 0.8,
    open: true,
    ages: ['toddler', 'kids'],
    type: 'indoor',
    lat: 37.37, lon: -122.03 
  },
  {
    id: 'tx-fri-1',
    city: 'Frisco',
    name: 'Frisco Public Library',
    icon: '🏢',
    desc: 'Massive new library with amazing kids zone.',
    dist: 1.2,
    open: true,
    ages: ['all'],
    type: 'indoor',
    lat: 33.15, lon: -96.82
  },
  {
    id: 'tx-dal-1',
    city: 'Dallas',
    name: 'Klyde Warren Park',
    icon: '⛲',
    desc: 'The best splash pads and food trucks downtown.',
    dist: 0.5,
    open: true,
    ages: ['all'],
    type: 'outdoor',
    lat: 32.78, lon: -96.80
  }
];

const SEARCH_TYPES = ['park', 'library', 'museum', 'aquarium']

/**
 * Fetch nearby places via the local serverless proxy.
 */
export async function fetchNearbyPlaces(lat, lon, city = 'CA', radiusMeters = 8000) {
  const localManual = manualActivities.filter(a => a.city === city);

  // 2. Ensure this calls the local proxy path defined in your vercel.json
  let liveResults = []
  for (const type of SEARCH_TYPES) {
    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lon, type, radius: radiusMeters }),
      })
      
      if (!res.ok) continue
      const data = await res.json()
      
      // The API proxy returns { places: [...] }
      if (data.places) {
        liveResults.push(...data.places.map(p => normalizePlaceResult(p, lat, lon, city)))
      }
    } catch (err) {
      console.error(`[Places] Error fetching type "${type}":`, err)
    }
  }

  const allResults = [...localManual, ...liveResults]
  const seen = new Set()
  return allResults.filter(p => {
    if (seen.has(p.id) || seen.has(p.name)) return false
    seen.add(p.id || p.name)
    return true
  })
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8 
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function normalizePlaceResult(place, userLat, userLon, currentCity) {
  const pLat = place.location?.latitude ?? userLat
  const pLon = place.location?.longitude ?? userLon
  const dist = haversineMiles(userLat, userLon, pLat, pLon)
  const types = place.types ?? []
  
  const isIndoor = types.some(t => ['library', 'museum', 'aquarium'].includes(t))

  return {
    id: place.id,
    city: currentCity,
    name: place.displayName?.text || 'Local Spot',
    icon: placeTypeToIcon ? placeTypeToIcon(types[0]) : '📍',
    desc: place.editorialSummary?.text || 'A great local spot to explore.',
    dist: parseFloat(dist.toFixed(1)),
    lat: pLat, 
    lon: pLon,
    open: place.businessStatus === 'OPERATIONAL',
    ages: ['all', 'toddler', 'kids'],
    type: isIndoor ? 'indoor' : 'outdoor'
  }
}
