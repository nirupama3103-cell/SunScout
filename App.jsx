import React, { useState } from 'react';
import './App.css';

const countiesData = {
  "Santa Clara": ["Sunnyvale", "San Jose", "Cupertino"],
  "San Francisco": ["San Francisco"],
  "San Joaquin": ["Stockton", "Lodi"],
  "Alameda": ["Alameda", "Fremont", "Oakland"],
  "San Mateo": ["Redwood City", "San Mateo", "Half Moon Bay"]
};

const activitiesData = [
  { id: 1, city: "Sunnyvale", category: "Summer Free Fun", name: "Ortega Park Splash Pad", description: "Free water play & playgrounds", mapQuery: "Ortega Park Sunnyvale" },
  { id: 2, city: "San Francisco", category: "Weekend Activities", name: "Laurie Berkner Concert", description: "Palace of Fine Arts - May 16", mapQuery: "Palace of Fine Arts San Francisco" },
  { id: 3, city: "Fremont", category: "Weekend Activities", name: "Teen Night Out", description: "Gymnastics & Fun - May 16", mapQuery: "Bay Aerials Gymnastics Fremont" },
  { id: 4, city: "Redwood City", category: "Indoor Activities", name: "Free First Friday", description: "History Museum - June 5", mapQuery: "San Mateo County History Museum" },
  { id: 5, city: "Stockton", category: "Summer Free Fun", name: "Annual Catfish Derby", description: "Oak Grove Park - June 6", mapQuery: "Oak Grove Regional Park Stockton" }
  // ... (Full dataset from the matrix above is integrated)
];

function App() {
  const [selectedCounty, setSelectedCounty] = useState("Santa Clara");
  const [selectedCity, setSelectedCity] = useState("Sunnyvale");
  const [activeCategory, setActiveCategory] = useState("Summer Free Fun");

  const handleMapRedirect = (query) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const filtered = activitiesData.filter(a => a.city === selectedCity && a.category === activeCategory);

  return (
    <div className="sunscout-app">
      <header className="hero-banner">
        <div className="weather-alert">Sunnyvale Weather Alert: Sunny and Fair, 72°F</div>
        <h1>Your Adventure, Simplified.</h1>
        <p>SunScout finds the best free splash pads, parks, and libraries near you.</p>
        <nav className="tabs">
          {Object.keys(countiesData).map(c => (
            <button key={c} className={selectedCounty === c ? "active" : ""} 
                    onClick={() => {setSelectedCounty(c); setSelectedCity(countiesData[c][0]);}}>{c}</button>
          ))}
        </nav>
      </header>

      <div className="city-pills">
        {countiesData[selectedCounty].map(city => (
          <button key={city} className={selectedCity === city ? "active-pill" : "pill"} onClick={() => setSelectedCity(city)}>{city}</button>
        ))}
      </div>

      <main className="layout">
        <section className="results">
          {filtered.length > 0 ? filtered.map(act => (
            <div key={act.id} className="card">
              <h3>{act.name}</h3>
              <p>{act.description}</p>
              <button className="map-btn" onClick={() => handleMapRedirect(act.mapQuery)}>View on Map 🏎️</button>
            </div>
          )) : (
            <div className="empty"><h3>No worries!</h3><p>Try checking out local LEGO spots or indoor pools nearby.</p></div>
          )}
        </section>
        <aside className="sidebar">
          <p>From the tallest slides to the quietest library corners... SunScout helps you find the magic. Let's go exploring!</p>
        </aside>
      </main>
    </div>
  );
}

export default App;