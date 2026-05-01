import React from 'react';
// If you have a separate file, import it here:
// import { activitiesData } from './activitiesDataFile';

const Activities = ({ city, category }) => {
  // Define the data here if not imported to fix the ReferenceError
  const activitiesData = [
    { id: 1, name: 'Ortega Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Ortega Park Sunnyvale' },
    { id: 2, name: 'Seven Seas Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Seven Seas Park Sunnyvale' },
    { id: 3, name: 'Magical Bridge', city: 'Sunnyvale', category: 'summer', mapQuery: 'Magical Bridge Playground Sunnyvale' }
    // Add more items or import sunscout_all_cities.json
  ];

  // The code that was crashing:
  const filtered = activitiesData.filter(a => 
    a.city === city && (a.category === category || category === 'summer')
  );

  return (
    <div className="activities-grid">
      {filtered.map(act => (
        <div key={act.id} className="card">
          <div className="card-content">
            <h3>{act.name}</h3>
            <button className="view-map-btn" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.mapQuery)}`, '_blank')}>
              View on Map 🏎️
            </button>
          </div>
        </div>
      ))}
      {filtered.length === 0 && <p>No activities found for {city}.</p>}
    </div>
  );
};

export default Activities;