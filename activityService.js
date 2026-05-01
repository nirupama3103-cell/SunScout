import React from 'react';

// IMPORTANT: If activitiesData is in a separate file, import it here:
// import { activitiesData } from './activitiesDataFile'; 

const Activities = ({ city, category }) => {
  // If the data is not imported, we define a fallback or mock it here 
  // to prevent the ReferenceError while you link your real data source.
  const activitiesData = [
    { id: 1, name: 'Ortega Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Ortega Park Sunnyvale' },
    { id: 2, name: 'Seven Seas Park', city: 'Sunnyvale', category: 'summer', mapQuery: 'Seven Seas Park Sunnyvale' },
    // ... add more or import them
  ];

  const filtered = activitiesData.filter(a => a.city === city && a.category === category);

  return (
    <div className="activities-grid">
      {filtered.length > 0 ? filtered.map(act => (
        <div key={act.id} className="card">
          <h3>{act.name}</h3>
          <button className="view-map-btn">View on Map 🏎️</button>
        </div>
      )) : (
        <p>No activities found for this selection.</p>
      )}
    </div>
  );
};

export default Activities;