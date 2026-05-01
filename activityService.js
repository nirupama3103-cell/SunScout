export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

export const CITY_COORDS = {
  "Sunnyvale": [37.3688, -122.0363], "San Jose": [37.3382, -121.8863],
  "Cupertino": [37.3229, -122.0322], "Saratoga": [37.2638, -122.0230],
  "Mountain View": [37.3861, -122.0839], "Palo Alto": [37.4419, -122.1430],
  "Oakland": [37.8044, -122.2712], "Berkeley": [37.8716, -122.2727],
  "Fremont": [37.5485, -121.9886], "Hayward": [37.6688, -122.0808],
  "Pleasanton": [37.6624, -121.8747], "San Mateo": [37.5630, -122.3255],
  "Redwood City": [37.4852, -122.2364], "Burlingame": [37.5841, -122.3661],
  "Foster City": [37.5585, -122.2711], "Half Moon Bay": [37.4636, -122.4286],
  "Downtown": [37.7749, -122.4194], "Sunset": [37.7558, -122.4934],
  "Richmond": [37.7751, -122.4900], "Mission": [37.7599, -122.4148],
  "Marina": [37.8030, -122.4360], "Stockton": [37.9577, -121.2908],
  "Lodi": [38.1302, -121.2724], "Tracy": [37.7397, -121.4252],
  "Manteca": [37.7974, -121.2161]
};

const IMAGES = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80",
  "https://images.unsplash.com/photo-1571902258032-65a988355675?w=500&q=80",
  "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80"
];

// Strictly match the categories in your App.jsx pills
const CATS = ["indoor activities", "weekend activities", "summer free fun", "paid activities"];

const generateStatic = () => {
  let all = [];
  Object.keys(CITIES_BY_COUNTY).forEach(county => {
    CITIES_BY_COUNTY[county].forEach(city => {
      for (let i = 0; i < 5; i++) {
        all.push({
          id: city + "-" + i,
          name: city + " " + ["Museum", "Splash Pad", "Library", "Park", "STEM Camp"][i],
          city: city,
          county: county,
          category: CATS[i % 4], // Cycles through your 4 main pills
          image: IMAGES[i],
          mapUrl: `https://www.google.com/maps/search/${encodeURIComponent(city + " children activity")}`,
          description: "Top-rated indoor and outdoor activity for families."
        });
      }
    });
  });
  return all;
};

export let ACTIVITIES = generateStatic();

export async function fetchActivitiesForCity(city, county) {
  // 1. Fallback to static data if API fails
  const localStatic = ACTIVITIES.filter(a => a.city === city);
  
  try {
    const coords = CITY_COORDS[city] || [37.3688, -122.0363];
    const [lat, lng] = coords;

    // Performing parallel fetches for Eventbrite, Libraries, and Community centers
    const results = await Promise.allSettled([
      fetch(`/api/eventbrite?lat=${lat}&lng=${lng}`).then(r => r.json()),
      fetch(`/api/places?query=${encodeURIComponent("library kids " + city)}&category=library`).then(r => r.json()),
      fetch(`/api/places?query=${encodeURIComponent("community center " + city)}`).then(r => r.json())
    ]);

    // Processing results and merging with static data for a rich UI
    const apiData = results
      .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
      .flatMap(r => r.value);

    return apiData.length > 0 ? apiData : localStatic;
  } catch (e) {
    console.error("Fetch failed, returning static data", e);
    return localStatic;
  }
}