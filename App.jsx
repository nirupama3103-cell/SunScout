import React, { useState } from 'react';
import { Header } from './Header';
import { Controls } from './Controls';
import MapArea from './MapArea'; // FIXED: Removed the { } 
import { ActivityCard } from './ActivityCard';
import { usePlaces } from './usePlaces';
import { TAB_LABELS } from './constants';
import styles from './App.module.css';

const App = () => {
  const [city, setCity] = useState('CA');
  const { places, loading } = usePlaces(city);

  return (
    <div className={styles.app}>
      <Header city={TAB_LABELS[city]} />
      <main className={styles.main}>
        <Controls currentCity={city} onCityChange={setCity} />
        <MapArea activities={places} centerCity={city} />
        <section className={styles.activityGrid}>
          {loading ? (
            <p>Searching for fun nearby...</p>
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