import React, { useState } from 'react';
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import { STATIC_ACTIVITIES } from './constants';
import styles from './App.module.css';

function App() {
  const [filters, setFilters] = useState({
    region: 'HUB',
    mood: 'RUN',
    wallet: 'ALL'
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredActivities = STATIC_ACTIVITIES.filter(act => {
    const regionMatch = act.region === filters.region;
    const moodMatch = act.mood === filters.mood;
    const walletMatch = filters.wallet === 'ALL' || act.wallet === (filters.wallet === 'FREE' ? 'FREE' : 'PAID');
    return regionMatch && moodMatch && walletMatch;
  });

  return (
    <div className={styles.container}>
      <Header />
      <Controls filters={filters} onFilterChange={handleFilterChange} />
      <main className={styles.main}>
        <MapArea filters={filters} activities={filteredActivities} />
      </main>
    </div>
  );
}

export default App;
