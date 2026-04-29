export const COLORS = {
  Alex: "#FF6B6B",
  Jordan: "#4ECDC4",
  Morgan: "#45B7D1",
  Casey: "#96CEB4",
  Riley: "#FFEAA7",
  Aubrey: "#DDA0DD",
};

export const PEOPLE = Object.keys(COLORS);

export const TAB_LABELS = {
  outdoor: "Outdoor",
  food: "Food & Drink",
  arts: "Arts & Culture",
  wellness: "Wellness",
  shopping: "Shopping",
  events: "Events",
};

export const STATIC_ACTIVITIES = {
  outdoor: [
    { id: "s1", name: "Morning Hike at Rancho San Antonio", category: "outdoor", duration: "2-3 hrs", cost: "Free", vibe: "Active", address: "Rancho San Antonio, Cupertino, CA", description: "Popular trails with bay views." },
    { id: "s2", name: "Kayaking at Stevens Creek", category: "outdoor", duration: "1-2 hrs", cost: "$", vibe: "Adventurous", address: "Stevens Creek Reservoir, Cupertino, CA", description: "Calm water kayaking." },
    { id: "s3", name: "Picnic at Sunnyvale Baylands", category: "outdoor", duration: "1-3 hrs", cost: "Free", vibe: "Relaxed", address: "Sunnyvale Baylands Park, CA", description: "Scenic baylands with walking trails." },
  ],
  food: [
    { id: "s4", name: "Brunch at The Table", category: "food", duration: "1-2 hrs", cost: "$$", vibe: "Social", address: "1110 S De Anza Blvd, San Jose, CA", description: "Popular brunch spot." },
    { id: "s5", name: "Ramen Night at Orenchi", category: "food", duration: "1 hr", cost: "$$", vibe: "Cozy", address: "3540 Homestead Rd, Santa Clara, CA", description: "Award-winning ramen." },
    { id: "s6", name: "Farmers Market", category: "food", duration: "1-2 hrs", cost: "$", vibe: "Casual", address: "Murphy Ave, Sunnyvale, CA", description: "Fresh local produce every Saturday." },
  ],
  arts: [
    { id: "s7", name: "Tech Museum of Innovation", category: "arts", duration: "2-3 hrs", cost: "$$", vibe: "Educational", address: "201 S Market St, San Jose, CA", description: "Hands-on tech exhibits." },
    { id: "s8", name: "San Jose Museum of Art", category: "arts", duration: "1-2 hrs", cost: "$", vibe: "Cultural", address: "110 S Market St, San Jose, CA", description: "Contemporary art collections." },
    { id: "s9", name: "Triton Museum of Art", category: "arts", duration: "1-2 hrs", cost: "Free", vibe: "Relaxed", address: "1505 Warburton Ave, Santa Clara, CA", description: "Free admission sculpture garden." },
  ],
  wellness: [
    { id: "s10", name: "Yoga in the Park", category: "wellness", duration: "1 hr", cost: "Free", vibe: "Zen", address: "Las Palmas Park, Sunnyvale, CA", description: "Community outdoor yoga." },
    { id: "s11", name: "Float Therapy Session", category: "wellness", duration: "1-2 hrs", cost: "$$$", vibe: "Restorative", address: "Float Matrix, San Jose, CA", description: "Sensory deprivation float pods." },
    { id: "s12", name: "Meditation at Deer Creek", category: "wellness", duration: "1-2 hrs", cost: "Free", vibe: "Peaceful", address: "Deer Creek Hills, CA", description: "Quiet trails for mindful walks." },
  ],
  shopping: [
    { id: "s13", name: "Santana Row Stroll", category: "shopping", duration: "1-3 hrs", cost: "$$", vibe: "Upscale", address: "Santana Row, San Jose, CA", description: "Upscale outdoor shopping." },
    { id: "s14", name: "Valley Fair Mall", category: "shopping", duration: "2-4 hrs", cost: "$$", vibe: "Classic", address: "2855 Stevens Creek Blvd, Santa Clara, CA", description: "Major mall with all brands." },
    { id: "s15", name: "Vintage Finds at SVDP", category: "shopping", duration: "1-2 hrs", cost: "$", vibe: "Thrifty", address: "St. Vincent de Paul, Sunnyvale, CA", description: "Great thrift finds." },
  ],
  events: [
    { id: "s16", name: "Sunnyvale Art & Wine Festival", category: "events", duration: "3-4 hrs", cost: "Free", vibe: "Festive", address: "Murphy Ave, Sunnyvale, CA", description: "Annual street festival." },
    { id: "s17", name: "Drive-In Movie Night", category: "events", duration: "2-3 hrs", cost: "$$", vibe: "Nostalgic", address: "Great Mall, Milpitas, CA", description: "Outdoor movie screenings." },
    { id: "s18", name: "Live Music at SJSU", category: "events", duration: "2 hrs", cost: "$", vibe: "Lively", address: "San Jose State University, CA", description: "Student and guest performances." },
  ],
};
