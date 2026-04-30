import React from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './Controls.module.css';

const Controls = ({ filters, setFilters }) => {
  const currentCities = REGIONS[filters.region]?.cities || [];

  return (
    <div className={styles.controls}>
      {/* Primary County Tabs */}
      <div className={styles.tabGroup}>
        {Object.entries(REGIONS).map(([key, data]) => (
          <button 
            key={key}
            className={`${styles.tab} ${filters.region === key ? styles.activeTab : ''}`}
            onClick={() => setFilters({...filters, region: key, city: data.cities[0]})}
          >
            {data.name}
          </button>
        ))}
      </div>

      {/* Quick-Switch City Chips */}
      <div className={styles.chipGroup}>
        {currentCities.map(city => (
          <button 
            key={city}
            className={`${styles.chip} ${filters.city === city ? styles.activeChip : ''}`}
            onClick={() => setFilters({...filters, city: city})}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Category Selection */}
      <div className={styles.section}>
        {Object.entries(WALLETS).map(([key, name]) => (
          <button 
            key={key}
            className={`${styles.filterBtn} ${filters.wallet === key ? styles.activeFilter : ''}`}
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
