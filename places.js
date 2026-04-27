/**
 * Google Places API (New) — Nearby Search Logic
 * Location: /src/services/places.js (or wherever your API logic lives)
 */

import { placeTypeToIcon } from './constants.js'

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
    mapX: 3, mapY: 2 
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
    mapX: 5, mapY: 4
  },
  {
    id: 'tx-aub-1',
    city: 'Aubrey',
    name: 'Aubrey City Park',
    icon: '🌳',
    desc: 'Quiet park with great shade for hot days.',
    dist: 2.1,
    open: true,
    ages: ['toddler', 'kids'],
    type: 'outdoor',
    mapX: 2, mapY: 3
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
    mapX: 6, mapY: 7
  },
  {
    id: 'ny-1',
    city: 'NY',
    name: 'Central Park Zoo Area',
    icon: '🐒',
    desc: 'Free views of the clock and statues.',
    dist: 0.3,
    open: true,
    ages: ['kids'],
    type: 'outdoor',
    mapX: 8, mapY: 5
  }
];

const SEARCH_TYPES = ['park', 'library', 'museum', 'aquarium', 'art_gallery']

/**
 * Fetch nearby places via our own serverless proxy.
 * Merges live Google data with your manual "Hero" spots.
 */
export async function fetchNearbyPlaces(lat, lon, city = 'CA', radiusMeters = 8000) {
  // 1. Get manual spots for the current city
  const localManual = manualActivities.filter(a => a.city === city);

  if (!API_KEY) {
    console.warn('[Places] No API key — showing manual data only.');
    return localManual;
  }

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
      
      if (data.places) {
        liveResults.push(...data.places.map(p => normalizePlaceResult(p, lat, lon, city)))
      }
    } catch (err) {
      console.error(`[Places] Error fetching type "${type}":`, err)
    }
  }

  // 2. Deduplicate and merge
  const allResults = [...localManual, ...liveResults]
  const seen = new Set()
  return allResults.filter(p => {
    if (seen.has(p.id) || seen.has(p.name)) return false
    seen.add(p.id || p.name)
    return true
  })
}

/**
 * Haversine distance in miles
 */
function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8 
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Normalized Google Result → SunScout Shape
 */
function normalizePlaceResult(place, userLat, userLon, currentCity) {
  const placeLat = place.location?.latitude ?? userLat
  const placeLon = place.location?.longitude ?? userLon
  const dist = haversineMiles(userLat, userLon, placeLat, placeLon)
  const types = place.types ?? []
  
  const isIndoor = types.some(t =>
    ['library', 'museum', 'art_gallery', 'aquarium', 'shopping_mall'].includes(t)
  )

  return {
    id: place.id,
    city: currentCity,
    name: place.displayName?.text || 'Local Spot',
    icon: placeTypeToIcon ? placeTypeToIcon(types[0]) : '📍',
    desc: place.editorialSummary?.text || 'A great local spot to explore.',
    dist: parseFloat(dist.toFixed(1)),
    open: place.businessStatus === 'OPERATIONAL',
    ages: 'all',
    type: isIndoor ? 'indoor' : 'outdoor',
    // Randomized grid position for the mock map
    mapX: Math.floor(Math.random() * 9) + 1,
    mapY: Math.floor(Math.random() * 5) + 1,
    tags: types.slice(0, 2)
  }
}
