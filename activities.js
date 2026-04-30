export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

const rawData = [
  // --- SARATOGA ---
  { name: "Saratoga Library Kids' Zone", city: "Saratoga", cat: "free summer", img: "1481622235018-b7a999d14796" },
  { name: "Wildwood Park Trails", city: "Saratoga", cat: "weekend", img: "1441974231531-c6227db76b6e" },
  { name: "Saratoga Community Center Play", city: "Saratoga", cat: "indoor", img: "1526676037777-05a232554f77" },
  { name: "Montalvo Arts Center Youth", city: "Saratoga", cat: "paid", img: "1460518451285-2cd9c8c9c5ad" },
  { name: "Hakone Gardens Discovery", city: "Saratoga", cat: "weekend", img: "1590059040018-1bd93f9509ae" },

  // --- MOUNTAIN VIEW ---
  { name: "MV Public Library STEM", city: "Mountain View", cat: "free summer", img: "1581092918056-0c4c3acd3789" },
  { name: "Shoreline Lake Boating", city: "Mountain View", cat: "weekend", img: "1544551763-77ef2d09c847" },
  { name: "Rengstorff Park Splash", city: "Mountain View", cat: "free summer", img: "1596464716127-f2a82984de30" },
  { name: "Computer History Museum", city: "Mountain View", cat: "indoor", img: "1518770660439-4636190af475" },
  { name: "Deer Hollow Farm", city: "Mountain View", cat: "weekend", img: "1500382017468-9049fed747ef" },

  // --- PALO ALTO ---
  { name: "Mitchell Park Library", city: "Palo Alto", cat: "free summer", img: "1521587760476-6c12a4b040da" },
  { name: "Palo Alto Junior Museum", city: "Palo Alto", cat: "indoor", img: "1503919919749-642dd40f5d6d" },
  { name: "Magical Bridge Playground", city: "Palo Alto", cat: "weekend", img: "1537655780520-1e9a48e6409b" },
  { name: "Gamble Garden Exploration", city: "Palo Alto", cat: "free summer", img: "1464333507111-995579f1236f" },
  { name: "The Guild Theatre Youth Events", city: "Palo Alto", cat: "paid", img: "1514525253344-f814d873ee5d" }
];

export const ACTIVITIES = rawData.map((item, index) => ({
  id: `act-${index}`,
  name: item.name,
  city: item.city,
  county: "Santa Clara",
  category: item.cat,
  image: `https://images.unsplash.com/photo-${item.img}?w=500&q=80`,
  mapUrl: `https://www.google.com/maps/search/${item.name.replace(/ /g, '+')}+${item.city}`,
  description: `Top-rated community activity in ${item.city} for ages 0-teens.`
}));
