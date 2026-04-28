import React, { useRef, useEffect, useState } from 'react';
import { CITY_COORDS } from './constants.js';
import styles from './MapArea.module.css';

function getBounds(lat, lon) {
  const padding = 0.05;
  return {
    minLat: lat - padding,
    maxLat: lat + padding,
    minLon: lon - padding,
    maxLon: lon + padding,
  };
}

function toMapCoords(lat, lon, bounds, containerW, containerH) {
  const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * containerW;
  const y = (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * containerH;
  return { x, y };
}

export function MapArea({ activities = [], centerCity = 'CA', isHot }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 360, h: 200 });
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All Fun', icon: '🌈', color: '#6366f1' }, 
    { id: 'park', label: 'Parks', icon: '🌳', color: '#44D62C' },   // Parrot Green
    { id: 'library', label: 'Reading', icon: '📚', color: '#a855f7' }, 
    { id: 'center', label: 'Centers', icon: '🏫', color: '#556B2F' },  // Olive Green
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cityData = CITY_COORDS[centerCity] || CITY_COORDS['CA'];
  const bounds = getBounds(cityData.lat, cityData.lon);
  const userPos = toMapCoords(cityData.lat, cityData.lon, bounds, size.w, size.h);

  // Filter logic for the new tabs
  const filteredActivities = activities.filter(item => {
    if (!item.isFree) return false; 
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <div className={styles.mapArea} ref={containerRef}>
      <div className={styles.mapGrid} />
      
      {/* Category Tab Scroller */}
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

      {isHot && <div className={styles.weatherAlert}>🌡️ Hot day — showing indoor picks!</div>}
      
      <div className={styles.myLocation} style={{ left: userPos.x, top: userPos.y }} />

      {filteredActivities.slice(0, 12).map((item, i) => {
        const pos = toMapCoords(
          item.lat || cityData.lat,
          item.lon || cityData.lon,
          bounds,
          size.w,
          size.h
        );
        
        return (
          <div
            key={item.id || i}
            className={`${styles.pin} ${styles.freePin}`}
            style={{ 
                left: pos.x, 
                top: pos.y, 
                animationDelay: `${i * 0.08}s`,
                position: 'absolute' 
            }}
            title={item.name}
          >
            <div className={styles.pinIcon}>{item.icon || '📍'}</div>
            <span className={styles.freeBadge}>FREE</span>
          </div>
        );
      })}
    </div>
  );
}
