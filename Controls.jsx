import React from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './Controls.module.css';

const Controls = ({ filters, setFilters }) => {
  const currentCities = REGIONS[filters.region]?.cities || [];

  return (
    <div className={styles.controls}>
      {/* County Row */}
      <div className={styles.section}>
        {Object.entries(REGIONS).map(([key, data]) => (
          <button 
            key={key}
            className={`${styles.btn} ${filters.region === key ? styles.active : ''}`}
            onClick={() => setFilters({...filters, region: key, city: data.cities[0]})}
          >
            {data.name}
          </button>
        ))}
      </div>

      {/* NEW: City Dropdown/Selector */}
      <div className={styles.citySection}>
        <select 
          className={styles.select}
          value={filters.city} 
          onChange={(e) => setFilters({...filters, city: e.target.value})}
        >
          {currentCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
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
    </div>
  );
};

export default Controls;
