/**
 * Google Places API (New) — Nearby Search
 * Docs: https://developers.google.com/maps/documentation/places/web-service/nearby-search
 *
 * Setup:
 *  1. Enable "Places API (New)" in Google Cloud Console
 *  2. Add your key to .env.local as VITE_GOOGLE_PLACES_API_KEY
 *
 * Note: The Places API (New) does not support CORS browser requests directly.
 * For production, proxy through a Vercel serverless function (see api/places.js).
 * In dev, we hit /api/places which Vite proxies to the serverless function.
 */

import { placeTypeToIcon } from './constants.js'

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY

/** Place types to search for free family activities */
const SEARCH_TYPES = [
  'park',
  'library',
  'museum',
  'aquarium',
  'art_gallery',
  'campground',
  'movie_theater',
]

/**
 * Fetch nearby places via our own serverless proxy at /api/places.
 * Falls back to an empty array on any error so the static data always shows.
 *
 * @param {number} lat
 * @param {number} lon
 * @param {number} radiusMeters  default 8000 (~5 miles)
 * @returns {Promise<Activity[]>}
 */
export async function fetchNearbyPlaces(lat, lon, radiusMeters = 8000) {
  if (!API_KEY) {
    console.warn('[Places] No API key — set VITE_GOOGLE_PLACES_API_KEY to enable live data.')
    return []
  }

  const results = []

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
        results.push(...data.places.map(p => normalizePlaceResult(p, lat, lon)))
      }
    } catch (err) {
      console.error(`[Places] Error fetching type "${type}":`, err)
    }
  }

  // Deduplicate by placeId
  const seen = new Set()
  return results.filter(p => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
}

/**
 * Haversine distance in miles between two lat/lon pairs
 */
function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8 // Earth radius in miles
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
 * Normalize a Google Places (New) place object → our Activity shape
 */
function normalizePlaceResult(place, userLat, userLon) {
  const placeLat = place.location?.latitude ?? userLat
  const placeLon = place.location?.longitude ?? userLon
  const dist = haversineMiles(userLat, userLon, placeLat, placeLon)

  const types = place.types ?? []
  const isIndoor = types.some(t =>
    ['library', 'museum', 'art_gallery', 'aquarium', 'movie_theater', 'shopping_mall'].includes(t)
  )

  return {
    id: place.id,
    placeId: place.id,
    name: place.displayName?.text ?? 'Unknown Place',
    icon: placeTypeToIcon(types),
    type: isIndoor ? 'indoor' : 'outdoor',
    ages: ['toddler', 'kids', 'teens'],
    dist: Math.round(dist * 10) / 10,
    tags: ['free', isIndoor ? 'indoor' : 'outdoor'],
    lat: placeLat,
    lon: placeLon,
    desc: place.editorialSummary?.text ?? place.primaryTypeDisplayName?.text ?? types[0] ?? '',
    open: place.currentOpeningHours?.openNow ?? true,
    rating: place.rating,
    website: place.websiteUri,
    googleMapsUri: place.googleMapsUri,
  }
}
