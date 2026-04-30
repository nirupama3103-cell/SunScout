export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

const imageMap = {
  stem: "1581092918056-0c4c3acd3789",
  sport: "1526676037777-05a232554f77",
  art: "1513364776144-60967b0f800f",
  park: "1596464716127-f2a82984de30",
  zoo: "1503919919749-642dd40f5d6d",
  hiking: "1441974231531-c6227db76b6e",
  movie: "1485846234645-a62644f84728",
  ymca: "1571902258032-65a988355675"
};

const rawActivities = [
  // --- SUNNYVALE (Best 5) ---
  { name: "YMCA Summer Sports League", city: "Sunnyvale", cat: "Paid Camps", type: "ymca" },
  { name: "Sunnyvale Library STEM Lab", city: "Sunnyvale", cat: "Free Summer", type: "stem" },
  { name: "Washington Park Splash Pad", city: "Sunnyvale", cat: "Weekend", type: "park" },
  { name: "Full Circle Farm Art Camp", city: "Sunnyvale", cat: "Paid Camps", type: "art" },
  { name: "Community Center Movie Night", city: "Sunnyvale", cat: "Free Summer", type: "movie" },

  // --- SAN JOSE (Best 5) ---
  { name: "Discovery Museum Indoor Play", city: "San Jose", cat: "Indoor", type: "art" },
  { name: "Happy Hollow Zoo Day", city: "San Jose", cat: "Weekend", type: "zoo" },
  { name: "SJ Public Library Coding", city: "San Jose", cat: "Free Summer", type: "stem" },
  { name: "Alum Rock Hiking Trail", city: "San Jose", cat: "Weekend", type: "hiking" },
  { name: "Silver Creek YMCA Swimming", city: "San Jose", cat: "Paid Camps", type: "ymca" },

  // --- SARATOGA (Best 5) ---
  { name: "Saratoga Library Storytime", city: "Saratoga", cat: "Free Summer", type: "movie" },
  { name: "Wildwood Park Nature Hike", city: "Saratoga", cat: "Weekend", type: "hiking" },
  { name: "Saratoga Arts Youth Camp", city: "Saratoga", cat: "Paid Camps", type: "art" },
  { name: "Prospect Center Indoor Gym", city: "Saratoga", cat: "Indoor", type: "sport" },
  { name: "Hakone Gardens Family Day", city: "Saratoga", cat: "Weekend", type: "park" },

  // --- MOUNTAIN VIEW (Best 5) ---
  { name: "Shoreline Lake Kayak Camp", city: "Mountain View", cat: "Paid Camps", type: "sport" },
  { name: "MV Library Robotics", city: "Mountain View", cat: "Free Summer", type: "stem" },
  { name: "Rengstorff Park Movie", city: "Mountain View", cat: "Free Summer", type: "movie" },
  { name: "Deer Hollow Farm Visit", city: "Mountain View", cat: "Weekend", type: "zoo" },
  { name: "Eagle Park Indoor Pool", city: "Mountain View", cat: "Indoor", type: "ymca" },

  // --- PALO ALTO (Best 5) ---
  { name: "Junior Museum & Zoo", city: "Palo Alto", cat: "Indoor", type: "zoo" },
  { name: "Magical Bridge Playground", city: "Palo Alto", cat: "Free Summer", type: "park" },
  { name: "Palo Alto YMCA Fitness", city: "Palo Alto", cat: "Paid Camps", type: "ymca" },
  { name: "Mitchell Park STEM Workshop", city: "Palo Alto", cat: "Free Summer", type: "stem" },
  { name: "Foothills Park Hiking", city: "Palo Alto", cat: "Weekend", type: "hiking" }
];

export const ACTIVITIES = rawActivities.map((act, index) => ({
  id: `sc-${index}`,
  name: act.name,
  city: act.city,
  county: "Santa Clara",
  category: act.cat,
  image: `https://images.unsplash.com/photo-${imageMap[act.type]}?w=500&q=80`,
  mapUrl: `https://www.google.com/maps/search/${act.name.replace(/ /g, '+')}+${act.city}`,
  description: `Top-rated ${act.cat} activity for families in ${act.city}.`
}));
