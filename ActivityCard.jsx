import React, { useState } from 'react';
const FALLBACK = 'https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=600&auto=format';

export default function ActivityCard({ activity }) {
  const [imgErr, setImgErr] = useState(false);
  const isFree = activity.free === true;
  return (
    <div style={{
      background: '#fff', borderRadius: '18px', overflow: 'hidden',
      boxShadow: '0 3px 14px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 3px 14px rgba(0,0,0,0.08)'; }}
    >
      <div style={{ position: 'relative' }}>
        <img src={imgErr ? FALLBACK : activity.image} alt={activity.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          background: isFree ? '#16a34a' : '#f59e0b',
          color: '#fff', fontSize: '10px', fontWeight: '900',
          padding: '4px 10px', borderRadius: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)', letterSpacing: '0.5px',
        }}>{isFree ? 'FREE' : 'PAID'}</span>
      </div>
      <div style={{ padding: '13px 15px 15px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: 0, lineHeight: 1.3 }}>
          {activity.name}
        </h3>
        {activity.description && (
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.5, flex: 1 }}>
            {activity.description}
          </p>
        )}
        {activity.hours && (
          <p style={{ fontSize: '11px', color: '#b45309', margin: 0, fontWeight: '700' }}>
            🕐 {activity.hours}
          </p>
        )}
        <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'block', textAlign: 'center', padding: '9px 0', marginTop: '4px',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff', borderRadius: '10px', textDecoration: 'none',
            fontWeight: '800', fontSize: '13px', fontFamily: 'Nunito, sans-serif',
          }}>View on Map 🚗</a>
      </div>
    </div>
  );
}
