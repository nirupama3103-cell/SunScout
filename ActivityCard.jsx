import React, { useState } from 'react';

const FALLBACK = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600';

export default function ActivityCard({ activity }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      style={{
        background: '#fff', borderRadius: '18px', overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)'; }}
    >
      <div style={{ position: 'relative', height: '155px', overflow: 'hidden' }}>
        <img
          src={imgErr ? FALLBACK : activity.image}
          alt={activity.name}
          onError={() => setImgErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          background: activity.free ? '#16a34a' : '#f59e0b',
          color: '#fff', fontSize: '10px', fontWeight: '800',
          padding: '3px 9px', borderRadius: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        }}>
          {activity.free ? 'FREE' : 'PAID'}
        </span>
      </div>
      <div style={{ padding: '12px 13px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '6px', lineHeight: 1.25 }}>
          {activity.name}
        </h3>
        <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.45, flex: 1, marginBottom: '10px' }}>
          {activity.description}
        </p>
        <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'block', textAlign: 'center', padding: '8px 0',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff', borderRadius: '10px',
            textDecoration: 'none', fontWeight: '800',
            fontSize: '12px', fontFamily: 'Nunito, sans-serif',
          }}>
          View on Map 🚗
        </a>
      </div>
    </div>
  );
}
