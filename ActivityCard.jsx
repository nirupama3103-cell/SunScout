import React from 'react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format';

const ActivityCard = ({ activity, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '0',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* ── Image (was missing — root cause of no images on mobile) */}
      <img
        src={activity.image || FALLBACK_IMG}
        alt={activity.name}
        loading="lazy"
        onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* ── Card body */}
      <div style={{ padding: '16px 20px 20px' }}>
        <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>
          {activity.name}
        </h3>
        <p style={{ color: '#475569', lineHeight: '1.5', marginBottom: '16px', fontSize: '0.9rem', minHeight: '2.7em' }}>
          {activity.description}
        </p>
        <a
          href={activity.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            backgroundColor: '#ef4444', color: 'white', padding: '10px 16px',
            borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }}
        >
          View on Map 🏎️
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
