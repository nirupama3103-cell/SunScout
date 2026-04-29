import React from 'react';
import { REGIONS, MOODS, WALLET } from './constants';
import styles from './Controls.module.css';

const Controls = ({ filters, onFilterChange }) => {
  // Rainbow Palette for Row 1
  const regionColors = {
    HUB: '#FF5F5F',      // Sunset Red
    ORCHARD: '#FFBD44',   // Sunny Orange
    VINEYARD: '#FFEB3B',  // Bright Yellow
    GATEWAY: '#24D330'    // Meadow Green
  };

  // Rainbow Palette for Row 2
  const moodColors = {
    RUN: '#448AFF',       // Sky Blue
    COOL: '#00BCD4',      // Water Teal
    SMART: '#9C27B0',     // Discovery Purple
    BREAK: '#FF4081'      // Energy Pink
  };

  return (
    <div className={styles.controlsContainer}>
      {/* Row 1: Area */}
      <div className={styles.row}>
        {Object.entries(REGIONS).map(([key, label]) => (
          <button 
            key={key}
            style={{ 
              backgroundColor: filters.region === key ? regionColors[key] : '#f1f5f9',
              color: filters.region === key ? 'white' : '#64748b',
              borderColor: filters.region === key ? regionColors[key] : '#e2e8f0'
            }}
            className={styles.btn}
            onClick={() => onFilterChange('region', key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Row 2: Mood */}
      <div className={styles.row}>
        {Object.entries(MOODS).map(([key, label]) => (
          <button 
            key={key}
            style={{ 
              backgroundColor: filters.mood === key ? moodColors[key] : '#f1f5f9',
              color: filters.mood === key ? 'white' : '#64748b',
              borderColor: filters.mood === key ? moodColors[key] : '#e2e8f0'
            }}
            className={styles.btn}
            onClick={() => onFilterChange('mood', key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Row 3: Wallet (Neutral High-Contrast) */}
      <div className={styles.row}>
        {Object.entries(WALLET).map(([key, label]) => (
          <button 
            key={key}
            className={filters.wallet === key ? styles.activeWallet : styles.btn}
            onClick={() => onFilterChange('wallet', key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
