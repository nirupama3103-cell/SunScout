
import React, { useState } from 'react';
const FALLBACK = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600';

export default function ActivityCard({ activity }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{
      background: '#fff', borderRadius: '18px', overflow: 'hidden',
      boxShadow: '0 3px 14px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer',
      display: 'flex', flexDirection: 'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 3px 14px rgba(0,0,0,0.08)'; }}
    >
      {/* Image + FREE/PAID badge */}
      <div style={{ position: 'relative' }}>
        <img src={imgErr ? FALLBACK : activity.image} alt={activity.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '185px', objectFit: 'cover', display: 'block' }} />
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          background: activity.free ? '#16a34a' : '#f59e0b',
          color: '#fff', fontSize: '10px', fontWeight: '900',
          padding: '4px 10px', borderRadius: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          letterSpacing: '0.5px',
        }}>
          {activity.free ? 'FREE' : 'PAID'}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '10px', lineHeight: 1.3, flex: 1 }}>
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
