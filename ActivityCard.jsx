import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.4rem' }}>{activity.name}</h3>
      <p style={{ color: '#475569', lineHeight: '1.5', marginBottom: '24px', minHeight: '3em' }}>{activity.description}</p>
      <a 
        href={activity.mapUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          backgroundColor: '#ef4444', color: 'white', padding: '12px',
          borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold'
        }}
      >
        View on Map 🏎️
      </a>
    </div>
  );
};

export default ActivityCard;
