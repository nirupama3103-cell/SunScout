import React from 'react';

const Activities = ({ city = "Sunnyvale", category = "summer" }) => {
  // Hardcoded data as a fallback to prevent ReferenceErrors
  const activitiesData = [
    { id: 1, name: 'Ortega Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Ortega Park Sunnyvale' },
    { id: 2, name: 'Seven Seas Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Seven Seas Park Sunnyvale' },
    { id: 3, name: 'Magical Bridge', city: 'Sunnyvale', category: 'summer', mapQuery: 'Magical Bridge Playground Sunnyvale' }
  ];

  // Defensive filtering: handle undefined city and category
  const filtered = activitiesData.filter(a => {
    const targetCity = city || "Sunnyvale";
    const targetCategory = category || "summer";
    
    return a.city === targetCity && (a.category === targetCategory || targetCategory === 'summer');
  });

  return (
    <div className="activities-grid">
      {filtered.length > 0 ? (
        filtered.map(act => (
          <div key={act.id} className="card">
            <div className="card-content">
              <h3>{act.name}</h3>
              <button 
                className="view-map-btn" 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.mapQuery)}`, '_blank')}
              >
                View on Map 🏎️
              </button>
            </div>
          </div>
        ))
      ) : (
        /* The fallback city handles the display if the prop is missing */
        <p>No activities found for {city || "Sunnyvale"}.</p>
      )}
    </div>
  );
};

export default Activities;