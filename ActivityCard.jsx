import React from 'react';
import styles from './ActivityCard.module.css';

export const ActivityCard = ({ activity }) => {
  const name = activity?.name || "Activity";
  const address = activity?.address || "";

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
        <p className={styles.address}>{address}</p>
        <div className={styles.footer}>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`}
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
