import React from 'react';
import ActivityCard from './ActivityCard';

const MapArea = ({ activities }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            <h3>No adventures found in this city yet! 🏖️</h3>
            <p>Try switching cities or categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
