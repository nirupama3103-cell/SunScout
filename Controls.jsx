import React from 'react';
import { TAB_LABELS, TAB_COLORS } from './constants';
import styles from './Controls.module.css';

export function Controls({ currentCity, onCityChange }) {
  const cities = Object.keys(TAB_LABELS);

  return (
    <nav className={styles.controls}>
      {cities.map(city => {
        const color = TAB_COLORS[city];
        const isActive = currentCity === city;
        return (
          <button
            key={city}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => onCityChange(city)}
            style={isActive && color ? {
              '--active-color': color.hex,
              '--active-r': color.r,
              '--active-g': color.g,
              '--active-b': color.b,
              borderBottomColor: color.hex,
              color: color.hex,
            } : {}}
          >
            {TAB_LABELS[city]}
          </button>
        );
      })}
    </nav>
  );
}
