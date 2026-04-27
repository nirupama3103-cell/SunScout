import React from 'react';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ activity }) => {
  const handleMapClick = (e) => {
    e.stopPropagation();
    // This uses the googleMapsUri fetched from the API to redirect correctly
    if (activity.googleMapsUri) {
      window.open(activity.googleMapsUri, '_blank');
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
