import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      marginBottom: '20px'
    }}>
      <img 
        src={activity.image} 
        alt={activity.name} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#1e293b' }}>{activity.name}</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>{activity.description}</p>
        <a 
          href={activity.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '10px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          View on Map 🏎️
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
