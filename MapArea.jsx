import React, { useState } from 'react';
import ActivityCard from './ActivityCard';

const MapArea = ({ activities }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const showMore = () => setVisibleCount(prev => prev + 6);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        justifyContent: 'center'
      }}>
        {activities.slice(0, visibleCount).map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>

      {activities.length > visibleCount && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button 
            onClick={showMore}
            aria-label="Load more activities"
            style={{
              padding: '15px 40px',
              borderRadius: '50px',
              backgroundColor: '#f59e0b',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Explore More Adventures 🗺️
          </button>
        </div>
      )}
    </div>
  );
};

export default MapArea;
