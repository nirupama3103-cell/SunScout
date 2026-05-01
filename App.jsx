return (
    <div className="app-container">
      {/* 1. Header with Weather Section */}
      <header className="hero-header">
        <div className="weather-widget">
          <div className="weather-icon">{weather.desc?.includes('Sunny') ? '☀️' : '☁️'}</div>
          <div className="weather-info">
            <strong>{activeCity} Weather Alert:</strong>
            <span>{weather.desc || 'Sunny and Fair'}, {weather.temp || 72}°F</span>
          </div>
        </div>
        <h1>Your Adventure, Simplified.</h1>
        <p className="hero-subtitle">SunScout finds the best free splash pads, parks, and libraries near you in seconds.</p>
      </header>

      {/* 2. Navigation Section (Kept clean like the image) */}
      <div className="category-pill-nav">
        {["indoor", "weekend", "free summer", "paid camps"].map(cat => (
          <button 
            key={cat}
            className={activeCategory === cat ? "active-pill" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            ● {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 3. The Two-Column Layout (FIXES THE MESSY TABS/GRID) */}
      <div className="main-content-wrapper">
        <section className="results-grid">
          {activities.map(act => (
            <div key={act.id} className="activity-card">
              <div className="card-image-container">
                {/* Fix broken images with a fallback */}
                <img src={act.image || 'https://placehold.co/400x200?text=SunScout+Activity'} alt={act.name} />
              </div>
              <div className="card-info">
                <h3>{act.name}</h3>
                <button className="view-map-button" onClick={() => window.open(act.mapUrl)}>
                  View on Map 🏎️
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 4. The Poetic Text Section */}
        <aside className="promo-column">
          <p className="promo-text">
            From the tallest slides to the quietest library corners, SunScout is here to help...
          </p>
          <p className="promo-footer">Let's go exploring!</p>
        </aside>
      </div>

      <div className="view-more-container">
        <button className="view-more-gradient-btn">View More</button>
      </div>
    </div>
  );