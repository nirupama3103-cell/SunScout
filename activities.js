export const CITIES_BY_COUNTY = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino", "Saratoga", "Mountain View", "Palo Alto"],
  "Alameda": ["Oakland", "Berkeley", "Fremont", "Hayward", "Pleasanton"],
  "San Mateo": ["San Mateo", "Redwood City", "Burlingame", "Foster City", "Half Moon Bay"],
  "San Francisco": ["Downtown", "Sunset", "Richmond", "Mission", "Marina"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

export const ACTIVITIES = [
  // --- SUNNYVALE (Eventbrite: Free Summer Camp) ---
  { 
    name: "Sunnyvale STEM Workshop", city: "Sunnyvale", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Community+Center",
    description: "Free hands-on STEM sessions for kids 0-teens." 
  },
  { 
    name: "Sunnyvale Indoor Sports", city: "Sunnyvale", county: "Santa Clara", category: "indoor", 
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Sunnyvale+Sports+Center",
    description: "Indoor basketball and gym activities for youth." 
  },

  // --- SAN JOSE ---
  { 
    name: "San Jose Art & Design Camp", city: "San Jose", county: "Santa Clara", category: "paid", 
    image: "https://images.pexels.com/photos/159823/kids-girl-pencil-drawing-159823.jpeg?auto=compress&cs=tinysrgb&w=400", 
    mapUrl: "https://www.google.com/maps/search/Childrens+Discovery+Museum+San+Jose",
    description: "Creative summer arts camp for all age groups." 
  },

  // --- CUPERTINO ---
  { 
    name: "Cupertino Library Robotics", city: "Cupertino", county: "Santa Clara", category: "weekend", 
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Cupertino+Library",
    description: "Weekend robotics club for teens and elementary students." 
  },

  // --- SARATOGA ---
  { 
    name: "Saratoga Nature Exploration", city: "Saratoga", county: "Santa Clara", category: "free summer", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Wildwood+Park+Saratoga",
    description: "Free community nature walks and outdoor summer learning." 
  },

  // --- MOUNTAIN VIEW ---
  { 
    name: "MV Computer History Museum", city: "Mountain View", county: "Santa Clara", category: "indoor", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Computer+History+Museum",
    description: "Exploring the digital world—great for middle and high schoolers." 
  },

  // --- PALO ALTO ---
  { 
    name: "Palo Alto Junior Zoo", city: "Palo Alto", county: "Santa Clara", category: "weekend", 
    image: "https://images.unsplash.com/photo-1503919919749-642dd40f5d6d?w=500&q=80", 
    mapUrl: "https://www.google.com/maps/search/Palo+Alto+Junior+Museum+and+Zoo",
    description: "Weekend zoo visits and animal interaction for younger children." 
  }
];
