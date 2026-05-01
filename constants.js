export const REGIONS = {
  SC: { name: 'Santa Clara', cities: ['Sunnyvale', 'San Jose', 'Cupertino', 'Saratoga', 'Mountain View', 'Palo Alto'] },
  SM: { name: 'San Mateo', cities: ['San Mateo', 'Redwood City', 'Burlingame', 'Menlo Park', 'Foster City'] },
  ALAMEDA: { name: 'Alameda', cities: ['Oakland', 'Fremont', 'Berkeley', 'Pleasanton', 'Dublin'] },
  SF: { name: 'San Francisco', cities: ['Downtown', 'Sunset', 'Richmond', 'Mission', 'Marina'] },
  SJ: { name: 'San Joaquin', cities: ['Stockton', 'Lodi', 'Tracy', 'Manteca', 'Lathrop'] }
};

// Strictly matching the labels and icons in Gemini_Generated_Image_270bof270bof270b_4.jpg
export const WALLETS = {
  INDOOR: '● Indoor Activities',
  WEEKEND: '● Weekend Activities',
  SUMMER: '● Summer Free Fun',
  PAID: '● Paid Activities'
};

export const MOODS = {
  RUN: 'Run Wild 🏃‍♀️',
  COOL: 'Cool Down 💦',
  SMART: 'Smarty Pants 🧠',
  BREAK: 'Off Duty 😴'
};

// Vital for useWeather.js logic - Coordinates for Sunnyvale and nearby regions
export const CITY_COORDS = {
  "Sunnyvale": { lat: 37.3688, lon: -122.0363 },
  "San Jose": { lat: 37.3382, lon: -121.8863 },
  "Cupertino": { lat: 37.3229, lon: -122.0322 },
  "Saratoga": { lat: 37.2638, lon: -122.0230 },
  "Mountain View": { lat: 37.3861, lon: -122.0839 },
  "Palo Alto": { lat: 37.4419, lon: -122.1430 },
  "San Mateo": { lat: 37.5630, lon: -122.3255 },
  "Redwood City": { lat: 37.4852, lon: -122.2364 },
  "Stockton": { lat: 37.9577, lon: -121.2908 },
  "Downtown": { lat: 37.7749, lon: -122.4194 }
};