import React, { useState } from 'react';
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './App.module.css';

function App() {
  const [filters, setFilters] = useState({
    region: 'SC',
    wallet: 'ALL',
    mood: 'RUN'
  });

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Controls filters={filters} setFilters={setFilters} />
        <MapArea filters={filters} />
      </main>
    </div>
  );
}

export default App;
