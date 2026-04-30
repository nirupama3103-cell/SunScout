export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

// Standardizing labels to match your UI Buttons exactly
const CATS = ["Indoor", "Weekend", "Free Summer", "Paid Camps"];

const generateData = () => {
  let all = [];
  Object.keys(CITIES_BY_COUNTY).forEach(county => {
    CITIES_BY_COUNTY[county].forEach(city => {
      // Create at least 5 items for each city
      for(let i=0; i<5; i++) {
        all.push({
          id: `${city}-${i}`,
          name: `${city} ${["Community", "YMCA", "Library", "Park", "Eventbrite"][i]} Activity`,
          city: city,
          county: county,
          category: CATS[i % 4],
          image: `https://images.unsplash.com/photo-${["1581092918056-0c4c3acd3789", "1571902258032-65a988355675", "1596464716127-f2a82984de30", "1513364776144-60967b0f800f", "1441974231531-c6227db76b6e"][i]}?w=500&q=80`,
          mapUrl: `https://www.google.com/maps/search/${city}+Activity`,
          description: "Top-rated activity for kids age 0-teens."
        });
      }
    });
  });
  return all;
};

export const ACTIVITIES = generateData();
