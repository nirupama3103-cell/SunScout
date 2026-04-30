import React from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './Controls.module.css';

const Controls = ({ filters, setFilters }) => {
  return (
    <div className={styles.controls}>
      <div className={styles.section}>
        {Object.entries(REGIONS).map(([key, name]) => (
          <button 
            key={key}
            className={`${styles.btn} ${filters.region === key ? styles.active : ''}`}
            onClick={() => setFilters({...filters, region: key})}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.section}>
        {Object.entries(WALLETS).map(([key, name]) => (
          <button 
            key={key}
            className={`${styles.btn} ${filters.wallet === key ? styles.active : ''}`}
            onClick={() => setFilters({...filters, wallet: key})}
          >
            {name}
          </button>
        ))}
      </div>
      <div className={styles.section}>
        {Object.entries(MOODS).map(([key, name]) => (
          <button 
            key={key}
            className={`${styles.btn} ${filters.mood === key ? styles.active : ''}`}
            onClick={() => setFilters({...filters, mood: key})}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
