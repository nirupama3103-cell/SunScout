import React from 'react';

const ActivityCard = ({ activity }) => {
  return (
    <article style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9'
    }}>
      <img src={activity.image} alt={activity.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.4rem' }}>{activity.name}</h3>
        <p style={{ color: '#475569', lineHeight: '1.5', marginBottom: '24px', minHeight: '3em' }}>{activity.description}</p>
        <a 
          href={activity.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`View ${activity.name} on Google Maps`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '12px',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'opacity 0.2s'
          }}
        >
          View on Map 🏎️
        </a>
      </div>
    </article>
  );
};

export default ActivityCard;
