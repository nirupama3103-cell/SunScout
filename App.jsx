import React, { useState } from 'react';
import './App.css';

const activitiesData = [
  { id: 1, name: "Ortega Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400", link: "#" },
  { id: 2, name: "Seven Seas Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400", link: "#" },
  { id: 3, name: "Sunnyvale Baylands Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400", link: "#" },
  { id: 4, name: "Magical Bridge Playground", category: "summer free fun", image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400", link: "#" },
  { id: 5, name: "Focus of Library", category: "indoor activities", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400", link: "#" },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('summer free fun');
  const filteredActivities = activitiesData.filter(item => item.category === activeCategory);

  return (
    <div className="app-container">
      {/* 1. Header & Weather Widget */}
      <header className="hero-header">
        <div className="hero-content">
          <h1>Your Adventure, Simplified.</h1>
          <p>SunScout finds the best free splash pads, parks, and libraries near you in seconds.</p>
        </div>
        <div className="weather-widget">
          <span className="weather-icon">☀️</span>
          <div className="weather-info">
            <strong>Sunnyvale Weather Alert:</strong>
            <span>Sunny and Fair, 72°F</span>
          </div>
        </div>
      </header>

      {/* 2. Category Navigation */}
      <nav className="category-pill-nav">
        {["Indoor Activities", "Weekend Activities", "Summer Free Fun", "Paid Activities"].map(cat => (
          <button 
            key={cat} 
            className={activeCategory === cat.toLowerCase() ? 'active-pill' : ''}
            onClick={() => setActiveCategory(cat.toLowerCase())}
          >
            ● {cat}
          </button>
        ))}
      </nav>

      {/* 3. Two-Column Main Layout */}
      <div className="main-content-wrapper">
        <div className="results-grid">
          {filteredActivities.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className="card-image-container">
                <img src={activity.image} alt={activity.name} />
              </div>
              <div className="card-info">
                <h3>{activity.name}</h3>
                <button className="view-map-button">View on Map 🏎️</button>
              </div>
            </div>
          ))}
        </div>

        {/* Poetic Text Column */}
        <aside className="promo-column">
          <p className="promo-text">
            From the tallest slides to the quietest library corners, 
            <strong> SunScout</strong> is here to help you find the magic in every afternoon. 
            Whether it's a sunny day at the park or a summer camp adventure, 
            we've scouted out the best spots so you don't have to.
          </p>
          <p className="promo-footer">Let's go exploring!</p>
        </aside>
      </div>

      {/* 4. Bottom View More Button */}
      <div className="view-more-container">
        <button className="view-more-gradient-btn">View More</button>
      </div>
    </div>
  );
}

export default App;