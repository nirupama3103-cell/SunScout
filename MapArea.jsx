import React from 'react';
import { REGIONS, MOODS, WALLET } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters, activities }) => {
  const handleGo = (name, city) => {
    const query = encodeURIComponent(`${name} ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.status}>
        📍 {REGIONS[filters.region]} | {MOODS[filters.mood]} | {WALLET[filters.wallet]}
      </div>
      <div className={styles.list}>
        {activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.card}>
              <h3>{act.name}</h3>
              <p>{act.city}</p>
              <button className={styles.goBtn} onClick={() => handleGo(act.name, act.city)}>
                🚗 Open in Google Maps
              </button>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No spots found for this filter. Try another!</p>
        )}
      </div>
    </div>
  );
};

export default MapArea;
