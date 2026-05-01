import cityDataRaw from './sunscout_all_cities.json';

export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

const CITY_COORDS = {
  "Sunnyvale":[37.3688,-122.0363],"San Jose":[37.3382,-121.8863],
  "Cupertino":[37.3229,-122.0322],"Saratoga":[37.2638,-122.0230],
  "Mountain View":[37.3861,-122.0839],"Palo Alto":[37.4419,-122.1430],
  "Oakland":[37.8044,-122.2712],"Berkeley":[37.8716,-122.2727],
  "Fremont":[37.5485,-121.9886],"Hayward":[37.6688,-122.0808],
  "Pleasanton":[37.6624,-121.8747],"San Mateo":[37.5630,-122.3255],
  "Redwood City":[37.4852,-122.2364],"Burlingame":[37.5841,-122.3661],
  "Foster City":[37.5585,-122.2711],"Half Moon Bay":[37.4636,-122.4286],
  "Downtown":[37.7749,-122.4194],"Sunset":[37.7558,-122.4934],
  "Richmond":[37.7751,-122.4900],"Mission":[37.7599,-122.4148],
  "Marina":[37.8030,-122.4360],"Stockton":[37.9577,-121.2908],
  "Lodi":[38.1302,-121.2724],"Tracy":[37.7397,-121.4252],
  "Manteca":[37.7974,-121.2161]
};

const IMAGES = [
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500",
  "https://picsum.photos/seed/act2/500/300",
  "https://picsum.photos/seed/act3/500/300",
  "https://picsum.photos/seed/act4/500/300",
  "https://picsum.photos/seed/act5/500/300"
];

export async function fetchActivitiesForCity(city, county) {
  // 1. Get curated data from JSON
  let cityActivities = cityDataRaw[county]?.[city] || [];

  // 2. Fetch extra dynamic data from APIs
  const [libRes, ccRes] = await Promise.allSettled([
    fetch("/api/places?query=" + encodeURIComponent("library kids " + city)).then(r => r.json()),
    fetch("/api/places?query=" + encodeURIComponent("community center " + city)).then(r => r.json())
  ]);

  const apiResults = [];
  const places = [
    ...((libRes.status === "fulfilled" && libRes.value.places) || []),
    ...((ccRes.status === "fulfilled" && ccRes.value.places) || [])
  ];

  places.forEach((p, i) => {
    apiResults.push({
      id: p.id || ("api-" + i),
      name: p.displayName?.text || p.name || "Local Activity",
      city: city,
      category: "free summer",
      image: `https://picsum.photos/seed/${p.id || i}/500/300`,
      mapUrl: "https://www.google.com/maps/search/" + encodeURIComponent((p.name || "") + " " + city),
      description: p.formattedAddress || "Free local library/community activity."
    });
  });

  const combined = [...cityActivities, ...apiResults];

  // 3. Fallback logic: if NO results found, show default park/indoor activities
  if (combined.length === 0) {
    return [
      {
        id: `${city}-park`,
        name: `${city} Regional Park & Trails`,
        city: city,
        category: "free summer",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
        mapUrl: `https://www.google.com/maps/search/${city}+parks+hiking`,
        description: "Explore local hiking trails and nature spots nearby."
      },
      {
        id: `${city}-indoor`,
        name: "Local Library & Indoor Play",
        city: city,
        category: "indoor",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
        mapUrl: `https://www.google.com/maps/search/${city}+public+library`,
        description: "Perfect for a hot day—check out local library events."
      }
    ];
  }

  return combined;
}