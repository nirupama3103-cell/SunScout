import React, { useState } from 'react';
import { Header } from './Header';
import { Controls } from './Controls';
import MapArea from './MapArea';
import { ActivityCard } from './ActivityCard';
import { usePlaces } from './usePlaces';
import { TAB_LABELS } from './constants';
import styles from './App.module.css';

const CATEGORY_TABS = [
  { id: 'allFun', label: '🌈 All Fun' },
  { id: 'freeFun', label: '🎡 Free Fun' },
  { id: 'summer', label: '☀️ Summer' },
  { id: 'paidCamps', label: '🏕️ Paid Camps' },
];

const App = () => {
  const [city, setCity] = useState('CA');
  const [tab, setTab] = useState('allFun');
  const { places, loading } = usePlaces(city, tab);

  return (
    <div className={styles.app}>
      <Header city={TAB_LABELS[city]} />
      <main className={styles.main}>
        <Controls currentCity={city} onCityChange={setCity} />
        
        <div className={styles.categoryTabs}>
          {CATEGORY_TABS.map(ct => (
            <button
              key={ct.id}
              className={tab === ct.id ? styles.categoryActive : styles.categoryTab}
              onClick={() => setTab(ct.id)}
            >
              <span className={styles.tabIcon}>{ct.label.split(' ')[0]}</span>
              <span className={styles.tabLabel}>{ct.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>

        <MapArea activities={places} centerCity={city} />

        <section className={styles.activityGrid}>
          {loading ? (
            <p className={styles.statusMsg}>Searching for fun nearby...</p>
          ) : places.length === 0 ? (
            <p className={styles.statusMsg}>No activities found. Try another tab!</p>
          ) : (
            places.map(place => (
              <ActivityCard key={place.id} activity={place} />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
