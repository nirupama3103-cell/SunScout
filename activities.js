export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

export const ACTIVITIES = [
  // --- SUNNYVALE ---
  { 
    name: "Sunnyvale Public Library", city: "Sunnyvale", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1507738911748-9c73658d697a?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Public+Library",
    description: "Free storytime, LEGO builders club, and summer reading prizes." 
  },
  { 
    name: "Washington Park Splash Pad", city: "Sunnyvale", county: "Santa Clara", category: "weekend", 
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Washington+Park+Sunnyvale+Splash+Pad",
    description: "Local favorite for water play and family picnics." 
  },
  { 
    name: "Sunnyvale Community Center Events", city: "Sunnyvale", county: "Santa Clara", category: "indoor", 
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Community+Center",
    description: "Eventbrite-listed youth theater and indoor art workshops." 
  },

  // --- SAN JOSE ---
  { 
    name: "Dr. Roberto Cruz Alum Rock Library", city: "San Jose", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Alum+Rock+Library+San+Jose",
    description: "Free summer lunch programs and youth coding workshops." 
  },
  { 
    name: "Happy Hollow Park & Zoo", city: "San Jose", county: "Santa Clara", category: "paid", 
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Happy+Hollow+Park+Zoo",
    description: "Family-friendly amusement park, zoo, and puppet theater." 
  },

  // --- CUPERTINO ---
  { 
    name: "Cupertino Library STEM Lab", city: "Cupertino", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Cupertino+Library",
    description: "State-of-the-art STEM equipment for teen projects." 
  },
  { 
    name: "Blackberry Farm", city: "Cupertino", county: "Santa Clara", category: "weekend", 
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Blackberry+Farm+Cupertino",
    description: "Swimming pools, picnic sites, and playground fun." 
  }
];
