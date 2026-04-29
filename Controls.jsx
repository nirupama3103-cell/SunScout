import React from 'react';
import { REGIONS, MOODS, WALLET } from './constants';
import styles from './Controls.module.css';

const Controls = ({ filters, onFilterChange }) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.row}>
        {Object.entries(REGIONS).map(([key, label]) => (
          <button key={key} className={filters.region === key ? styles.active : styles.btn} onClick={() => onFilterChange('region', key)}>{label}</button>
        ))}
      </div>
      <div className={styles.row}>
        {Object.entries(MOODS).map(([key, label]) => (
          <button key={key} className={filters.mood === key ? styles.active : styles.btn} onClick={() => onFilterChange('mood', key)}>{label}</button>
        ))}
      </div>
      <div className={styles.row}>
        {Object.entries(WALLET).map(([key, label]) => (
          <button key={key} className={filters.wallet === key ? styles.active : styles.btn} onClick={() => onFilterChange('wallet', key)}>{label}</button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
