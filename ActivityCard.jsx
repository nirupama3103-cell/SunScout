
import React, { useState } from 'react';
const FALLBACK = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600';

export default function ActivityCard({ activity }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{
      background: '#fff', borderRadius: '18px', overflow: 'hidden',
      boxShadow: '0 3px 14px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 3px 14px rgba(0,0,0,0.08)'; }}
    >
      <img src={imgErr ? FALLBACK : activity.image} alt={activity.name}
        onError={() => setImgErr(true)}
        style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }} />
      <div style={{ padding: '14px 16px 16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', marginBottom: '10px', lineHeight: 1.25 }}>
          {activity.name}
        </h3>
        <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'block', textAlign: 'center', padding: '9px 0',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff', borderRadius: '10px', textDecoration: 'none',
            fontWeight: '800', fontSize: '13px', fontFamily: 'Nunito, sans-serif',
          }}>View on Map 🚗</a>
      </div>
    </div>
  );
}
