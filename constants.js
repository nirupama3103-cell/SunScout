export const LAT = 37.3688
export const LON = -122.0363
export const CITY = 'Sunnyvale, CA'

export const TAB_COLORS = {
  today:   { hex: '#FF4444', r: 255, g: 68,  b: 68  },
  weekend: { hex: '#FF8C00', r: 255, g: 140, b: 0   },
  week:    { hex: '#ccaa00', r: 204, g: 170, b: 0   },
  month:   { hex: '#4CAF50', r: 76,  g: 175, b: 80  },
  summer:  { hex: '#2196F3', r: 33,  g: 150, b: 243 },
}

export const TAB_LABELS = {
  today:   'Today',
  weekend: 'This Weekend',
  week:    'This Week',
  month:   'This Month',
  summer:  'All Summer',
}

/** Static fallback activity data — shown when Google Places is unavailable */
export const STATIC_ACTIVITIES = [
  {
    id: 1,
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
    placeId: null,
  },
  {
    id: 2,
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
    placeId: null,
  },
  {
    id: 3,
    name: 'Sunnyvale Community Center Pool',
    icon: '🏊',
    type: 'outdoor',
    ages: ['kids', 'teens'],
    dist: 1.5,
    tags: ['free', 'outdoor'],
    lat: 37.372,
    lon: -122.025,
    desc: 'Free swim Tues & Thurs, ages 6–17',
    open: true,
    placeId: null,
  },
  {
    id: 4,
    name: 'McKinley Elementary Playground',
    icon: '🛝',
    type: 'outdoor',
    ages: ['toddler', 'kids'],
    dist: 0.6,
    tags: ['free', 'outdoor'],
    lat: 37.365,
    lon: -122.04,
    desc: 'Open weekends & after 3pm weekdays',
    open: true,
    placeId: null,
  },
  {
    id: 5,
    name: 'Sunnyvale Farmers Market',
    icon: '🥦',
    type: 'outdoor',
    ages: ['toddler', 'kids', 'teens'],
    dist: 1.1,
    tags: ['free', 'outdoor'],
    lat: 37.378,
    lon: -122.042,
    desc: 'Free entry, Sat 9am–1pm, kids cooking demos',
    open: false,
    placeId: null,
  },
  {
    id: 6,
    name: 'Fremont Hills Trail',
    icon: '🥾',
    type: 'outdoor',
    ages: ['kids', 'teens'],
    dist: 3.2,
    tags: ['free', 'outdoor'],
    lat: 37.36,
    lon: -122.01,
    desc: 'Easy 2mi loop, wildlife spotting',
    open: true,
    placeId: null,
  },
  {
    id: 7,
    name: 'Sunnyvale Art Center',
    icon: '🎨',
    type: 'indoor',
    ages: ['kids', 'teens'],
    dist: 2.0,
    tags: ['free', 'indoor'],
    lat: 37.37,
    lon: -122.045,
    desc: 'Free drop-in art Fridays 2–5pm',
    open: true,
    placeId: null,
  },
  {
    id: 8,
    name: 'AMC Movie Kids Mornings',
    icon: '🎬',
    type: 'indoor',
    ages: ['toddler', 'kids'],
    dist: 1.8,
    tags: ['free', 'indoor', 'hot-day'],
    lat: 37.382,
    lon: -122.038,
    desc: '$1 movies Tues/Wed 10am all summer',
    open: false,
    placeId: null,
  },
]

/** Map a Google Places type to an emoji icon */
export function placeTypeToIcon(types = []) {
  if (types.includes('park'))            return '🌳'
  if (types.includes('library'))         return '📚'
  if (types.includes('museum'))          return '🏛️'
  if (types.includes('aquarium'))        return '🐠'
  if (types.includes('zoo'))             return '🦁'
  if (types.includes('movie_theater'))   return '🎬'
  if (types.includes('amusement_park'))  return '🎡'
  if (types.includes('art_gallery'))     return '🎨'
  if (types.includes('stadium'))         return '🏟️'
  if (types.includes('swimming_pool'))   return '🏊'
  if (types.includes('campground'))      return '⛺'
  if (types.includes('natural_feature')) return '🥾'
  if (types.includes('point_of_interest')) return '📍'
  return '🗺️'
}

/** WMO weather code → human description */
export function wmoDesc(code) {
  if (code === 0)          return 'Clear sky ☀️'
  if (code <= 2)           return 'Partly cloudy ⛅'
  if (code === 3)          return 'Overcast ☁️'
  if (code <= 9)           return 'Foggy 🌫️'
  if (code <= 29)          return 'Rain 🌧️'
  if (code <= 39)          return 'Snow 🌨️'
  if (code <= 59)          return 'Drizzle 🌦️'
  if (code <= 69)          return 'Rainy 🌧️'
  if (code <= 79)          return 'Snowy 🌨️'
  if (code <= 84)          return 'Rain showers 🌦️'
  if (code <= 99)          return 'Thunderstorm ⛈️'
  return 'Variable 🌤️'
}
