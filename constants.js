/** * City Coordinates for multi-city support
 * These are used by usePlaces.js to fetch live data 
 */
export const CITY_COORDS = {
  CA:     { lat: 37.3688, lon: -122.0363, name: 'Sunnyvale, CA' },
  Dallas: { lat: 32.7767, lon: -96.7970, name: 'Dallas, TX' },
  Frisco: { lat: 33.1507, lon: -96.8236, name: 'Frisco, TX' },
  Aubrey: { lat: 33.3015, lon: -96.9850, name: 'Aubrey, TX' },
  NY:     { lat: 40.7128, lon: -74.0060, name: 'New York, NY' }
};

// Keep your colors but mapped to the city keys if you're using them as tabs
export const TAB_COLORS = {
  CA:      { hex: '#FF4444', r: 255, g: 68,  b: 68  },
  Dallas:  { hex: '#FF8C00', r: 255, g: 140, b: 0   },
  Frisco:  { hex: '#ccaa00', r: 204, g: 170, b: 0   },
  NY:      { hex: '#2196F3', r: 33,  g: 150, b: 243 },
  // Keep original keys as fallback just in case
  today:   { hex: '#FF4444', r: 255, g: 68,  b: 68  },
}

export const TAB_LABELS = {
  CA:      'Sunnyvale',
  Dallas:  'Dallas',
  Frisco:  'Frisco',
  Aubrey:  'Aubrey',
  NY:      'New York',
  today:   'Today', // fallback
}

/** * Keep your static activities here for the "Yesterday" Sunnyvale data.
 * These act as a fallback if the Google API fails.
 */
export const STATIC_ACTIVITIES = [
  {
    id: 1,
    city: 'CA', // Added city tag
    name: 'Sunnyvale Public Library',
    icon: '📚',
    type: 'indoor',
    ages: ['toddler', 'kids', 'teens'],
    dist: 0.8,
    tags: ['free', 'indoor'],
    lat: 37.3688,
    lon: -122.0363,
    desc: 'Story time, free Wi-Fi, summer reading program',
    open: true,
  },
  {
    id: 2,
    city: 'CA', // Added city tag
    name: 'Las Palmas Park Splash Pad',
    icon: '💦',
    type: 'outdoor',
    ages: ['toddler', 'kids'],
    dist: 1.2,
    tags: ['free', 'outdoor', 'hot-day'],
    lat: 37.375,
    lon: -122.03,
    desc: 'Free splash pad, open 10am–6pm daily',
    open: true,
  },
  // ... rest of your 8 activities from yesterday (make sure to add city: 'CA' to each)
]

export function placeTypeToIcon(types = []) {
  if (types.includes('park'))            return '🌳'
  if (types.includes('library'))         return '📚'
  if (types.includes('museum'))          return '🏛️'
  if (types.includes('aquarium'))        return '🐠'
  if (types.includes('zoo'))              return '🦁'
  if (types.includes('movie_theater'))   return '🎬'
  if (types.includes('amusement_park'))  return '🎡'
  if (types.includes('art_gallery'))     return '🎨'
  if (types.includes('stadium'))         return '🏟️'
  if (types.includes('swimming_pool'))   return '🏊'
  if (types.includes('campground'))      return '⛺'
  if (types.includes('natural_feature')) return '🥾'
  return '📍'
}

export function wmoDesc(code) {
  if (code === 0) return 'Clear sky ☀️'
  if (code <= 3) return 'Cloudy ☁️'
  if (code <= 69) return 'Rainy 🌧️'
  if (code <= 99) return 'Thunderstorm ⛈️'
  return 'Variable 🌤️'
}
