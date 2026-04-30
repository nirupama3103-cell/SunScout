export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

export const ACTIVITIES = [
  // --- SAN JOAQUIN (FIXED IMAGES) ---
  { 
    name: "Children's Museum of Stockton", city: "Stockton", county: "San Joaquin", category: "indoor", 
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Childrens+Museum+of+Stockton",
    description: "Hands-on play and learning for younger children." 
  },
  { 
    name: "Lodi Lake Nature Area", city: "Lodi", county: "San Joaquin", category: "weekend", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Lodi+Lake+Park",
    description: "Kayaking, nature trails, and family picnic spots." 
  },
  { 
    name: "Grand Theatre Center for the Arts", city: "Tracy", county: "San Joaquin", category: "free summer", 
    image: "https://images.unsplash.com/photo-1514525253344-f814d873ee5d?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Grand+Theatre+Tracy",
    description: "Community art exhibitions and free youth workshops." 
  },
  { 
    name: "Manteca BMX Track", city: "Manteca", county: "San Joaquin", category: "paid", 
    image: "https://images.unsplash.com/photo-1509139562677-44bfec098ce3?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Manteca+BMX",
    description: "Summer racing clinics and professional skills camps." 
  },

  // --- SANTA CLARA ---
  { 
    name: "Sunnyvale Public Library", city: "Sunnyvale", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Public+Library",
    description: "Free summer reading and DIY nature programs." 
  },
  { 
    name: "Tech Interactive", city: "San Jose", county: "Santa Clara", category: "indoor", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/The+Tech+Interactive+San+Jose",
    description: "World-class science and technology exhibits." 
  },

  // --- ALAMEDA ---
  { 
    name: "Chabot Space & Science Center", city: "Oakland", county: "Alameda", category: "weekend", 
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Chabot+Space+Science+Center",
    description: "Observatory tours, planetarium shows, and STEM fun." 
  },

  // --- SAN MATEO ---
  { 
    name: "CuriOdyssey Science", city: "San Mateo", county: "San Mateo", category: "indoor", 
    image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/CuriOdyssey",
    description: "Interactive science experiments and animal exhibits." 
  },

  // --- SAN FRANCISCO ---
  { 
    name: "Exploratorium", city: "Downtown", county: "San Francisco", category: "indoor", 
    image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Exploratorium+San+Francisco",
    description: "Interactive museum exploring science, art, and perception." 
  }
];
