import React, { useState } from 'react';
import ActivityCard from './ActivityCard';

const MapArea = ({ activities }) => {
  const [limit, setLimit] = useState(6);

  return (
    <section>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {activities.slice(0, limit).map((act, i) => (
          <ActivityCard key={i} activity={act} />
        ))}
      </div>

      {activities.length > limit && (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button 
            onClick={() => setLimit(limit + 6)}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '15px 35px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Explore More Adventures 🗺️
          </button>
        </div>
      )}
    </section>
  );
};

export default MapArea;
