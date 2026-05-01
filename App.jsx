import React, { useState } from 'react';
import './App.css';

const geoData = {
  "Santa Clara": ["Sunnyvale", "Santa Clara", "San Jose", "Cupertino"],
  "Alameda": ["Fremont", "Hayward", "Oakland", "Berkeley"],
  "San Mateo": ["San Mateo", "Redwood City", "Menlo Park"],
  "San Francisco": ["San Francisco"],
  "San Joaquin": ["Stockton", "Lodi", "Tracy", "Manteca"]
};

const activityCategories = [
  { label: "Indoor", icon: "🏢", color: "#3B82F6" },
  { label: "Weekend", icon: "📅", color: "#10B981" },
  { label: "Free Summer", icon: "☀️", color: "#D97706" },
  { label: "Paid Camps", icon: "🛍️", color: "#DB2777" }
];

function App() {
  const [selectedCounty, setSelectedCounty] = useState("San Joaquin");
  const [selectedCity, setSelectedCity] = useState("Manteca");
  const [selectedCategory, setSelectedCategory] = useState("Free Summer");

  return (
    <div className="sunscout-app">
      <header className="main-header">
        <h1>SunScout STEM Camps</h1>
      </header>

      {/* Row 1: Counties */}
      <nav className="nav-row counties">
        {Object.keys(geoData).map(county => (
          <button 
            key={county}
            className={selectedCounty === county ? "active-county" : ""}
            onClick={() => {
              setSelectedCounty(county);
              setSelectedCity(geoData[county][0]);
            }}
          >
            {county}
          </button>
        ))}
      </nav>

      {/* Row 2: Cities */}
      <nav className="nav-row cities">
        {geoData[selectedCounty].map(city => (
          <button 
            key={city}
            className={selectedCity === city ? "active-pill city-pill" : "city-pill"}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </nav>

      {/* Row 3: Categories (Rainbow Mode) */}
      <nav className="nav-row categories">
        {activityCategories.map(cat => (
          <button 
            key={cat.label}
            className={selectedCategory === cat.label ? "active-pill cat-pill" : "cat-pill"}
            style={{ backgroundColor: selectedCategory === cat.label ? cat.color : "" }}
            onClick={() => setSelectedCategory(cat.label)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="results-container">
        <div className="status-message">
          <img src="https://cdn-icons-png.flaticon.com/512/3306/3306613.png" alt="books" width="60" />
          <h2>No {selectedCategory.toLowerCase()} programs listed yet for {selectedCity}</h2>
          <p>Check your local library — most cities offer free summer reading, STEM events, and storytimes.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
