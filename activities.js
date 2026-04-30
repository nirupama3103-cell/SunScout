export const ACTIVITIES = [
  { 
    name: "Sunnyvale Public Library", 
    city: "Sunnyvale", 
    county: "Santa Clara", 
    category: "free summer", 
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Public+Library",
    description: "Free summer reading programs and DIY nature exploration." 
  },
  { 
    name: "Cupertino Library Art Class", 
    city: "Cupertino", 
    county: "Santa Clara", 
    category: "free summer", 
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", 
    mapUrl: "https://www.google.com/maps/search/Cupertino+Library",
    description: "Free weekly art and STEM workshops for kids." 
  },
  { 
    name: "Academy of Sciences", 
    city: "San Francisco", 
    county: "San Francisco", 
    category: "indoor", 
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400", 
    mapUrl: "https://www.google.com/maps/search/California+Academy+of+Sciences",
    description: "Indoor planetarium and aquarium exploration." 
  }
];

export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Palo Alto", "Saratoga", "Mountain View"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "Alameda": ["Oakland", "Berkeley", "Fremont"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame"]
};
