import React, { useState } from 'react';
import './App.css';

// ... (keep countiesData and activitiesData from previous step)

function App() {
  const [selectedCounty, setSelectedCounty] = useState("Santa Clara");
  const [selectedCity, setSelectedCity] = useState("Sunnyvale");
  const [activeCategory, setActiveCategory] = useState("Summer Free Fun");

  const categories = [
    { name: "Indoor Activities", icon: "🏢" },
    { name: "Weekend Activities", icon: "📅" },
    { name: "Summer Free Fun", icon: "☀️" },
    { name: "Paid Activities", icon: "🎟️" }
  ];

  const handleMapRedirect = (query) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const filtered = activitiesData.filter(a => a.city === selectedCity && a.category === activeCategory);

  return (
    <div className="sunscout-app">
      <header className="hero-banner">
        <div className="weather-alert-container">
           <div className="weather-alert">
             <strong>Sunnyvale Weather Alert:</strong> Sunny and Fair, 72°F
           </div>
        </div>
        
        <h1>Your Adventure, Simplified.</h1>
        <p className="subtitle">SunScout finds the best free splash pads, parks, and libraries near you.</p>
        
        <nav className="county-tabs">
          {Object.keys(countiesData).map(c => (
            <button key={c} className={selectedCounty === c ? "active" : ""} 
                    onClick={() => {setSelectedCounty(c); setSelectedCity(countiesData[c][0]);}}>{c}</button>
          ))}
        </nav>
      </header>

      <div className="app-body">
        <div className="city-navigation">
          {countiesData[selectedCounty].map(city => (
            <button key={city} className={selectedCity === city ? "active-pill" : "pill"} onClick={() => setSelectedCity(city)}>{city}</button>
          ))}
        </div>

        <div className="category-navigation">
          {categories.map(cat => (
            <button key={cat.name} className={activeCategory === cat.name ? "active-cat" : "cat-pill"} 
                    onClick={() => setActiveCategory(cat.name)}>
              <span className="icon">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <main className="main-layout">
          <section className="activities-grid">
            {filtered.length > 0 ? filtered.map(act => (
              <div key={act.id} className="card">
                <div className="image-placeholder" style={{backgroundImage: `url(${act.image})`}}></div>
                <div className="card-content">
                  <h3>{act.name}</h3>
                  <button className="view-map-btn" onClick={() => handleMapRedirect(act.mapQuery)}>View on Map 🏎️</button>
                </div>
              </div>
            )) : (
              <div className="fallback-card">
                <h3>No worries!</h3>
                <p>Check out our local LEGO spots or indoor pools nearby.</p>
              </div>
            )}
          </section>
          
          <aside className="sidebar-text">
            <p>From the tallest slides to the quietest library corners, SunScout is here to help you find the magic in every afternoon.</p>
            <p>Whether it’s a sunny day at the park or a summer camp adventure, we’ve scouted out the best spots so you don’t have to.</p>
            <h2 className="tagline">Let’s go exploring!</h2>
          </aside>
        </main>

        <div className="footer-action">
          <button className="view-more-main">View More</button>
        </div>
      </div>
    </div>
  );
}

export default App;