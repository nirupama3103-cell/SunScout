import React from 'react';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ activity }) => {
  const name = activity?.name || "Unnamed Activity";
  const address = activity?.address || "";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {activity?.image ? (
          <img src={activity.image} alt={name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>📍</div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.details}>
          {activity?.type && <span className={styles.type}>{activity.type}</span>}
          {activity?.rating && <span className={styles.rating}> ⭐ {activity.rating}</span>}
        </div>
        <p className={styles.address}>{address}</p>
        
        <div className={styles.footer}>
          <a 
            href={mapsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
