import React from 'react';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ activity }) => {
  const handleMapClick = (e) => {
    e.stopPropagation();
    // Uses the official Google Maps URI from the API
    if (activity.googleMapsUri) {
      window.open(activity.googleMapsUri, '_blank');
    } else {
      const name = activity.displayName?.text || 'Park';
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`, '_blank');
    }
  };

  return (
    <div className={styles.card}>
      <h3>{activity.displayName?.text || 'Local Spot'}</h3>
      <button onClick={handleMapClick} className={styles.mapButton}>
        📍 View on Google Maps
      </button>
    </div>
  );
};
