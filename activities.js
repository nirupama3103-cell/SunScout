export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

export const ACTIVITIES = [
  // --- SANTA CLARA ---
  { 
    name: "Sunnyvale Public Library", city: "Sunnyvale", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Public+Library",
    description: "Free summer reading and DIY nature programs." 
  },
  { 
    name: "Cupertino Library Art Class", city: "Cupertino", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", 
    mapUrl: "https://www.google.com/maps/search/Cupertino+Library",
    description: "Free weekly art and STEM workshops." 
  },
  { 
    name: "Computer History Museum", city: "Mountain View", county: "Santa Clara", category: "indoor", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", 
    mapUrl: "https://www.google.com/maps/search/Computer+History+Museum",
    description: "Explore the history of computing with interactive exhibits." 
  },

  // --- ALAMEDA ---
  { 
    name: "Oakland Zoo Adventures", city: "Oakland", county: "Alameda", category: "weekend", 
    image: "https://images.unsplash.com/photo-1504194184404-4aa3a74d32bc?w=400", 
    mapUrl: "https://www.google.com/maps/search/Oakland+Zoo",
    description: "Wildlife and nature interaction programs." 
  },
  { 
    name: "Lawrence Hall of Science", city: "Berkeley", county: "Alameda", category: "paid", 
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400", 
    mapUrl: "https://www.google.com/maps/search/Lawrence+Hall+of+Science",
    description: "STEM-focused summer camps and planetarium shows." 
  },

  // --- SAN MATEO ---
  { 
    name: "CuriOdyssey Science", city: "San Mateo", county: "San Mateo", category: "indoor", 
    image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=400", 
    mapUrl: "https://www.google.com/maps/search/CuriOdyssey",
    description: "Interactive science and animal exhibits." 
  },
  { 
    name: "Leo J. Ryan Park Splash Pad", city: "Foster City", county: "San Mateo", category: "free summer", 
    image: "https://images.unsplash.com/photo-1537651174759-170bc0a46600?w=400", 
    mapUrl: "https://www.google.com/maps/search/Leo+J+Ryan+Park",
    description: "Cool off at the waterfront splash pad and park." 
  },

  // --- SAN FRANCISCO ---
  { 
    name: "Exploratorium", city: "Downtown", county: "San Francisco", category: "indoor", 
    image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=400", 
    mapUrl: "https://www.google.com/maps/search/Exploratorium",
    description: "The museum of science, art, and human perception." 
  },

  // --- SAN JOAQUIN ---
  { 
    name: "Children's Museum of Stockton", city: "Stockton", county: "San Joaquin", category: "indoor", 
    image: "https://images.unsplash.com/photo-1566140967404-b8b393ed4f3d?w=400", 
    mapUrl: "https://www.google.com/maps/search/Childrens+Museum+of+Stockton",
    description: "Hands-on play and learning for younger children." 
  },
  { 
    name: "Lodi Lake Park", city: "Lodi", county: "San Joaquin", category: "weekend", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", 
    mapUrl: "https://www.google.com/maps/search/Lodi+Lake+Park",
    description: "Nature trails, kayaking, and family picnic spots." 
  }
];
