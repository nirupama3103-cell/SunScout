import React, { useState } from 'react';
import './App.css';

const countiesData = {
  "Santa Clara": ["Sunnyvale", "Santa Clara", "San Jose", "Cupertino"],
  "San Francisco": ["San Francisco"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"],
  "Alameda": ["Fremont", "Hayward", "Oakland"],
  "San Mateo": ["San Mateo", "Redwood City"]
};

const activityCategories = [
  { label: "Indoor Activities", icon: "🏢" },
  { label: "Weekend Activities", icon: "📅" },
  { label: "Summer Free Fun", icon: "☀️" },
  { label: "Paid Activities", icon: "🎟️" }
];

const activitiesData = [
  { id: 1, county: "Santa Clara", city: "Sunnyvale", category: "Indoor Activities", name: "Sunnyvale Public Library", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400", description: "Lego Builders & Storytime" },
  { id: 2, county: "Santa Clara", city: "Sunnyvale", category: "Indoor Activities", name: "Columbia Neighborhood Center", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400", description: "Open Gym & Creative Arts" },
  { id: 3, county: "Santa Clara", city: "Sunnyvale", category: "Summer Free Fun", name: "Ortega Park Splash Pad", image: "https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?w=400", description: "Free water play" },
  { id: 4, county: "Santa Clara", city: "Sunnyvale", category: "Summer Free Fun", name: "Seven Seas Park", image: "https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=400", description: "Huge playground and splash pad" },
  { id: 5, county: "Santa Clara", city: "Sunnyvale", category: "Weekend Activities", name: "Baylands Park Hiking", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", description: "West Pond Loop hike" },
  { id: 6, county: "San Francisco", city: "San Francisco", category: "Indoor Activities", name: "Exploratorium Tinkering Studio", image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=400", description: "Science & tinkering studio" },
  { id: 7, county: "San Francisco", city: "San Francisco", category: "Weekend Activities", name: "Union Street Festival", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400", description: "Street party Jun 6-7" },
  { id: 8, county: "San Francisco", city: "San Francisco", category: "Summer Free Fun", name: "SFPL Summer Stride", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400", description: "Library reading program" },
  { id: 9, county: "San Francisco", city: "San Francisco", category: "Paid Activities", name: "Tech Revolution Camps", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", description: "AI & Robotics weekly camps" },
  { id: 10, county: "San Joaquin", city: "Stockton", category: "Indoor Activities", name: "Stockton Library STEM", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400", description: "Weekly children activities" },
  { id: 11, county: "San Joaquin", city: "Stockton", category: "Weekend Activities", name: "Catfish Derby", image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?w=400", description: "Annual fishing event Jun 6" },
  { id: 12, county: "San Joaquin", city: "Lodi", category: "Indoor Activities", name: "Lodi Chess Club", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400", description: "Mondays @ Lodi Library" },
  { id: 13, county: "San Joaquin", city: "Lodi", category: "Weekend Activities", name: "Micke Grove Nature Trail", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", description: "Hands-on nature trail" }
];

function App() {
  const [selectedCounty, setSelectedCounty] = useState("Santa Clara");
  const [selectedCity, setSelectedCity] = useState("Sunnyvale");
  const [activeCategory, setActiveCategory] = useState("Summer Free Fun");

  const filteredActivities = activitiesData.filter(
    item => item.city === selectedCity && item.category === activeCategory
  );

  return (
    <div className="sunscout-app">
      <header className="hero-banner">
        <div className="weather-widget">
          <span>☀️ 72°F Sunnyvale</span>
        </div>
        <div className="hero-content">
          <h1>Your Adventure, Simplified.</h1>
          <p>SunScout finds the best free splash pads, parks, and libraries near you.</p>
        </div>
      </header>

      <div className="navigation-section">
        <nav className="nav-row counties">
          {Object.keys(countiesData).map(county => (
            <button 
              key={county}
              className={selectedCounty === county ? "active-tab" : ""}
              onClick={() => {
                setSelectedCounty(county);
                setSelectedCity(countiesData[county][0]);
              }}
            >
              {county}
            </button>
          ))}
        </nav>

        <nav className="nav-row pills">
          {countiesData[selectedCounty].map(city => (
            <button 
              key={city}
              className={selectedCity === city ? "active-pill" : "pill"}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </nav>

        <nav className="nav-row pills">
          {activityCategories.map(cat => (
            <button 
              key={cat.label}
              className={activeCategory === cat.label ? "active-pill" : "pill"}
              onClick={() => setActiveCategory(cat.label)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="main-layout">
        <div className="activities-grid">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => (
              <div key={activity.id} className="activity-card">
                <img src={activity.image} alt={activity.name} />
                <div className="card-info">
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                  <button className="view-map-btn">View on Map 🏎️</button>
                </div>
              </div>
            ))
          ) : (
            <div className="fallback-card">
              <h3>No specific plans listed here yet?</h3>
              <p>No worries, we have some activities for you like LEGO places or indoor swimming classes! Check back soon for updated local camps.</p>
            </div>
          )}
        </div>

        <aside className="description-sidebar">
          <p>From the tallest slides to the quietest library corners, SunScout is here to help you find the magic in every afternoon.</p>
          <p>Whether it's a sunny day at the park or a summer camp adventure, we've scouted out the best spots so you don't have to.</p>
          <p className="sidebar-footer">Let's go exploring!</p>
        </aside>
      </main>

      <div className="view-more-container">
        <button className="view-more-btn">View More</button>
      </div>
    </div>
  );
}

export default App;