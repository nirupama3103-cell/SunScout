import React from 'react';
import ActivityCard from './ActivityCard';

const ViewMoreButton = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
    <button style={{
      backgroundColor: '#f59e0b',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '9999px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      Explore More Adventures 🗺️
    </button>
  </div>
);

const MapArea = ({ activities }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '16px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities && activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
      <ViewMoreButton />
    </div>
  );
};

export default MapArea;
