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

  // Helper: get pin position from item
  // Prefers real lat/lon, falls back to mapX/mapY grid (1–9, 1–5)
  function getPinPos(item) {
    const lat = item.lat ?? item.location?.latitude;
    const lon = item.lon ?? item.location?.longitude;

    if (lat != null && lon != null) {
      return toMapCoords(lat, lon, bounds, size.w, size.h);
    }

    // Fall back to mapX (1-9) / mapY (1-5) grid
    const gridCols = 9;
    const gridRows = 5;
    const x = ((item.mapX ?? 1) / gridCols) * size.w;
    const y = ((item.mapY ?? 1) / gridRows) * size.h;
    return { x, y };
  }

  return (
    <div className={styles.mapArea} ref={containerRef}>
      <div className={styles.mapGrid} />
      {isHot && (
        <div className={styles.weatherAlert}>🌡️ Hot day — showing indoor picks!</div>
      )}
      <div className={styles.myLocation} style={{ left: userPos.x, top: userPos.y }} />
      {activities.slice(0, 8).map((item, i) => {
        const pos = getPinPos(item);
        return (
          <div
            key={item.id}
            className={styles.pin}
            style={{ left: pos.x, top: pos.y, animationDelay: `${i * 0.08}s` }}
            title={item.name}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}
