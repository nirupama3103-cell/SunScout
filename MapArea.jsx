import React, { useRef, useEffect, useState } from 'react';
import styles from './MapArea.module.css';

// Moving this inside so we don't rely on external files that might be missing
const LOCAL_COORDS = {
  'CA': { lat: 37.3688, lon: -122.0363 }, // Sunnyvale
  'TX': { lat: 32.7767, lon: -96.7970 }, // Dallas
};

export function MapArea({ activities = [], centerCity = 'CA' }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 360, h: 400 });
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Fun', icon: '🌈', color: '#6366f1' }, 
    { id: 'free', label: 'Free Fun', icon: '🎡', color: '#44D62C' },
    { id: 'summer', label: 'Summer', icon: '☀️', color: '#0EA5E9' },
    { id: 'camp', label: 'Paid Camps', icon: '🏕️', color: '#FFD700' },
  ];

  const cityData = LOCAL_COORDS[centerCity] || LOCAL_COORDS['CA'];

  const getPos = (lat, lon) => {
    const padding = 0.05;
    const x = ((lon - (cityData.lon - padding)) / (padding * 2)) * size.w;
    const y = (1 - (lat - (cityData.lat - padding)) / (padding * 2)) * size.h;
    return { x, y };
  };

  const filtered = (activities || []).filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'free') return item.isFree;
    if (activeTab === 'camp') return item.isPaid;
    return item.category === activeTab;
  });

  return (
    <div className={styles.mapArea} ref={containerRef} style={{ minHeight: '450px', background: '#f0fdf4', position: 'relative' }}>
      <div className={styles.tabScroller}>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`${styles.categoryTab} ${activeTab === cat.id ? styles.activeTab : ''}`}
            style={{ '--active-color': cat.color }}
          >
            <span className={styles.tabIcon}>{cat.icon}</span>
            <span className={styles.tabLabel}>{cat.label}</span>
          </button>
        ))}
      </div>

      {filtered.map((item, i) => {
        const { x, y } = getPos(item.lat || cityData.lat, item.lon || cityData.lon);
        return (
          <div key={i} className={styles.pin} style={{ left: x, top: y, position: 'absolute' }}>
            <span>{item.icon || '📍'}</span>
            {item.isFree && <span className={styles.freeBadge}>FREE</span>}
          </div>
        );
      })}
    </div>
  );
}