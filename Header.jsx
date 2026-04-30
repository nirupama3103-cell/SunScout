import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <h1 className={styles.logo}>☀️ SunScout</h1>
        <div className={styles.weatherAlert}>
          <span className={styles.pulse}>●</span> 
          Live Alert: Clear Skies & 72°F in South Bay
        </div>
      </div>
      <div className={styles.hero}>
        <h2>Your Adventure, Simplified.</h2>
        <p>SunScout finds the best free splash pads, parks, and libraries near you in seconds. No more endless scrolling—just pure summer fun.</p>
      </div>
    </header>
  );
};

export default Header;
