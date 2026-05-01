import React, { useState } from 'react';
import './App.css';

const activitiesData = [
  { id: 1, name: "Ortega Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400" },
  { id: 2, name: "Seven Seas Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400" },
  { id: 3, name: "Sunnyvale Baylands Park", category: "summer free fun", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
  { id: 4, name: "Magical Bridge Playground", category: "summer free fun", image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400" }
];

function App() {
  const [activeCategory, setActiveCategory] = useState('summer free fun');
  return (
    <div className="app-container">
      <header className="hero-header">
        <h1>Your Adventure, Simplified.</h1>
        <p>SunScout finds the best free spots in seconds.</p>
      </header>
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
      <div className="main-content-wrapper">
        <div className="results-grid">
          {activitiesData.map(activity => (
            <div key={activity.id} className="activity-card">
              <img src={activity.image} alt={activity.name} />
              <div className="card-info">
                <h3>{activity.name}</h3>
                <button className="view-map-button">View on Map 🏎️</button>
              </div>
            </div>
          ))}
        </div>
        <aside className="promo-column">
          <p>From the tallest slides to the quietest library corners, SunScout is here to help.</p>
          <strong>Let's go exploring!</strong>
        </aside>
      </div>
    </div>
  );
}
export default App;
