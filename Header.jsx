import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>SunScout</h1>
      <p>Find your summer adventure</p>
    </header>
  );
};

export default Header;
