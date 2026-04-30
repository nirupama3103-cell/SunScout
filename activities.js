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
    image: "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Public+Library",
    description: "Free summer reading programs and DIY nature workshops for kids." 
  },
  { 
    name: "Movement Sunnyvale", city: "Sunnyvale", county: "Santa Clara", category: "indoor", 
    image: "https://images.pexels.com/photos/3039160/pexels-photo-3039160.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Movement+Sunnyvale",
    description: "Indoor rock climbing and youth bouldering classes." 
  },

  // --- SAN JOSE ---
  { 
    name: "The Tech Interactive", city: "San Jose", county: "Santa Clara", category: "indoor", 
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/The+Tech+Interactive+San+Jose",
    description: "Hands-on science and technology exhibits in the heart of San Jose." 
  },
  { 
    name: "Happy Hollow Park & Zoo", city: "San Jose", county: "Santa Clara", category: "paid", 
    image: "https://images.pexels.com/photos/704454/pexels-photo-704454.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Happy+Hollow+Park+Zoo",
    description: "Family-friendly amusement park, zoo, and puppet theater." 
  },

  // --- CUPERTINO ---
  { 
    name: "Cupertino Library STEM", city: "Cupertino", county: "Santa Clara", category: "free summer", 
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Cupertino+Library",
    description: "Weekly STEM workshops and community art camps." 
  },

  // --- MOUNTAIN VIEW ---
  { 
    name: "Computer History Museum", city: "Mountain View", county: "Santa Clara", category: "weekend", 
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Computer+History+Museum",
    description: "Weekend tours showcasing the history of the digital age." 
  },

  // --- PALO ALTO ---
  { 
    name: "Junior Museum & Zoo", city: "Palo Alto", county: "Santa Clara", category: "weekend", 
    image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Palo+Alto+Junior+Museum",
    description: "Interactive science exhibits and local wildlife encounters." 
  }
];
