import React, { useRef, useEffect, useState } from 'react';
import { CITY_COORDS } from './constants.js';
import styles from './MapArea.module.css';

export function MapArea({ activities = [], centerCity = 'CA', isHot }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 360, h: 300 }); // Default height so it's not 0
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Fun', icon: '🌈', color: '#6366f1' }, 
    { id: 'free', label: 'Free Fun', icon: '🎡', color: '#44D62C' },
    { id: 'summer', label: 'Summer', icon: '☀️', color: '#0EA5E9' },
    { id: 'camp', label: 'Paid Camps', icon: '🏕️', color: '#FFD700' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.offsetWidth || 360,
          h: containerRef.current.offsetHeight || 300
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Safety check for city coordinates
  const cityData = CITY_COORDS?.[centerCity] || { lat: 34.0522, lon: -118.2437 };

  const getPos = (lat, lon) => {
    const padding = 0.05;
    const minLat = cityData.lat - padding;
    const maxLat = cityData.lat + padding;
    const minLon = cityData.lon - padding;
    const maxLon = cityData.lon + padding;

    const x = ((lon - minLon) / (maxLon - minLon)) * size.w;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * size.h;
    return { x, y };
  };

  const filtered = (activities || []).filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'free') return item.isFree;
    if (activeTab === 'camp') return item.isPaid;
    return item.category === activeTab;
  });

  return (
    <div className={styles.mapArea || ''} ref={containerRef} style={{ minHeight: '400px', position: 'relative', background: '#f0fdf4' }}>
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