import React, { useState, useEffect } from 'react';
import { fetchActivitiesForCity, CITIES_BY_COUNTY } from './activities';
import './index.css';

function App() {
  const [activeCounty, setActiveCounty] = useState("Santa Clara");
  const [activeCity, setActiveCity] = useState("Sunnyvale");
  const [activeCategory, setActiveCategory] = useState("free summer");
  const [activities, setActivities] = useState([]);

  // Load data whenever city or category changes
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchActivitiesForCity(activeCity, activeCounty);
      // Filter by the selected category (e.g., "free summer" or "paid camps")
      const filtered = data.filter(act => act.category === activeCategory);
      setActivities(filtered);
    };
    loadData();
  }, [activeCity, activeCounty, activeCategory]);

  return (
    <div className="app-container">
      <header>
        <h1>SunScout STEM Camps</h1>
      </header>

      {/* 1. County Selector */}
      <nav className="county-nav">
        {Object.keys(CITIES_BY_COUNTY).map(county => (
          <button 
            key={county}
            className={activeCounty === county ? "active" : ""}
            onClick={() => {
              setActiveCounty(county);
              setActiveCity(CITIES_BY_COUNTY[county][0]); // Auto-select first city
            }}
          >
            {county}
          </button>
        ))}
      </nav>

      {/* 2. City Selector (The White Pills) */}
      <div className="city-nav">
        {CITIES_BY_COUNTY[activeCounty].map(city => (
          <button 
            key={city}
            className={activeCity === city ? "active-city" : ""}
            onClick={() => setActiveCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {/* 3. Category Tabs (The Rainbow Bar) */}
      <div className="category-nav">
        {["indoor", "weekend", "free summer", "paid camps"].map(cat => (
          <button 
            key={cat}
            className={`tab-${cat.replace(' ', '-')} ${activeCategory === cat ? "active-tab" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 4. Activity Display */}
      <main className="results-grid">
        {activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className="activity-card">
              <img src={act.image} alt={act.name} />
              <h3>{act.name}</h3>
              <p>{act.description}</p>
              <a href={act.mapUrl} target="_blank" rel="noreferrer">View on Map</a>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No {activeCategory} listed yet for {activeCity}.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;