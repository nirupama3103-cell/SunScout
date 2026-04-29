import React from 'react';
import { REGIONS, MOODS, WALLET } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters, activities }) => {
  // This function builds the Google Maps URL
  const handleGo = (name, city) => {
    const query = encodeURIComponent(`${name} ${city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.status}>
        📍 {REGIONS[filters.region]} | {MOODS[filters.mood]} | {WALLET[filters.wallet]}
      </div>
      
      <div className={styles.canvas}>
        {/* For now, we show a 'Quick Action' button to test the redirect */}
        <div className={styles.placeholder}>
          <h3>Ready for adventure?</h3>
          <button 
            className={styles.goBtn}
            onClick={() => handleGo("Central Park", REGIONS[filters.region])}
          >
            🚗 Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapArea;
