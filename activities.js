export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

const imgIDs = {
  stem: "1581092918056-0c4c3acd3789",
  ymca: "1571902258032-65a988355675",
  park: "1596464716127-f2a82984de30",
  art: "1513364776144-60967b0f800f",
  movie: "1485846234645-a62644f84728",
  zoo: "1503919919749-642dd40f5d6d",
  hiking: "1441974231531-c6227db76b6e",
  sport: "1526676037777-05a232554f77"
};

const rawData = [
  // --- SUNNYVALE ---
  { name: "Sunnyvale Public Library", city: "Sunnyvale", cat: "Free Summer", type: "stem" },
  { name: "YMCA Youth Sports", city: "Sunnyvale", cat: "Paid Camps", type: "ymca" },
  { name: "Washington Park Splash", city: "Sunnyvale", cat: "Weekend", type: "park" },
  { name: "Community Center Art", city: "Sunnyvale", cat: "Indoor", type: "art" },
  { name: "Outdoor Cinema Night", city: "Sunnyvale", cat: "Free Summer", type: "movie" },

  // --- SAN JOSE ---
  { name: "SJ Library Coding", city: "San Jose", cat: "Free Summer", type: "stem" },
  { name: "Discovery Museum", city: "San Jose", cat: "Indoor", type: "art" },
  { name: "Happy Hollow Zoo Day", city: "San Jose", cat: "Weekend", type: "zoo" },
  { name: "South Bay YMCA Camp", city: "San Jose", cat: "Paid Camps", type: "ymca" },
  { name: "Alum Rock Trail Walk", city: "San Jose", cat: "Weekend", type: "hiking" },

  // --- SARATOGA ---
  { name: "Saratoga Library Crafts", city: "Saratoga", cat: "Free Summer", type: "art" },
  { name: "Wildwood Nature Hike", city: "Saratoga", cat: "Weekend", type: "hiking" },
  { name: "Prospect Center Gym", city: "Saratoga", cat: "Indoor", type: "sport" },
  { name: "Montalvo Youth Arts", city: "Saratoga", cat: "Paid Camps", type: "art" },
  { name: "Hakone Gardens Tour", city: "Saratoga", cat: "Weekend", type: "park" },

  // --- MOUNTAIN VIEW ---
  { name: "MV Library Tech Lab", city: "Mountain View", cat: "Free Summer", type: "stem" },
  { name: "Rengstorff Park Pool", city: "Mountain View", cat: "Weekend", type: "park" },
  { name: "Shoreline Kayaking", city: "Mountain View", cat: "Paid Camps", type: "sport" },
  { name: "MV Community Center", city: "Mountain View", cat: "Indoor", type: "art" },
  { name: "Deer Hollow Farm Visit", city: "Mountain View", cat: "Free Summer", type: "zoo" },

  // --- PALO ALTO ---
  { name: "Mitchell Park Library", city: "Palo Alto", cat: "Free Summer", type: "stem" },
  { name: "Palo Alto Junior Zoo", city: "Palo Alto", cat: "Indoor", type: "zoo" },
  { name: "Magical Bridge Play", city: "Palo Alto", cat: "Weekend", type: "park" },
  { name: "PA YMCA Fitness Camp", city: "Palo Alto", cat: "Paid Camps", type: "ymca" },
  { name: "Gamble Garden Tour", city: "Palo Alto", cat: "Free Summer", type: "hiking" }
];

export const ACTIVITIES = rawData.map((a, i) => ({
  id: `sc-final-${i}`,
  name: a.name,
  city: a.city,
  county: "Santa Clara",
  category: a.cat,
  image: `https://images.unsplash.com/photo-${imgIDs[a.type]}?w=500&q=80`,
  mapUrl: `https://www.google.com/maps/search/${a.name.replace(/ /g, '+')}+${a.city}`,
  description: `Best ${a.cat} activity for ages 0-teens in ${a.city}.`
}));
