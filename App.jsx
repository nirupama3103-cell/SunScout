import React, { useState } from 'react';
import { Header } from './Header';
import { Controls } from './Controls';
import { Stats } from './Stats';
import { MapArea } from './MapArea';
import { ActivityCard } from './ActivityCard';
import { CardModal } from './CardModal';
import { useWeather } from './useWeather';
import { usePlaces } from './usePlaces';
import { useActiveColor } from './useActiveColor';
import { TAB_LABELS } from './constants';
import styles from './App.module.css';

const App = () => {
  // 1. STATE MANAGEMENT
  const [city, setCity] = useState('CA'); 
  const [day, setDay] = useState('today');
  const [age, setAge] = useState('all');
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // 2. DATA FETCHING
  const weather = useWeather(city);
  const { places, loading } = usePlaces(city);
  const activeColor = useActiveColor(day);

  return (
    <div className={styles.app} style={{ '--active-color': activeColor }}>
      <Header city={TAB_LABELS[city]} weather={weather} />
      <main className={styles.main}>
        <Controls 
          day={day} setDay={setDay}
          age={age} setAge={setAge}
          indoorOnly={indoorOnly}
          onIndoorToggle={() => setIndoorOnly(!indoorOnly)}
          currentCity={city}
          onCityChange={setCity}
        />
        <Stats count={places.length} city={TAB_LABELS[city]} />
        <MapArea activities={places} centerCity={city} isHot={indoorOnly} />
        <section className={styles.activityGrid}>
          {loading ? (
            <p>Finding the best spots in {TAB_LABELS[city]}...</p>
          ) : (
            places.map(place => (
              <ActivityCard 
                key={place.id} 
                activity={place} 
                onClick={() => setSelectedActivity(place)} 
              />
            ))
          )}
        </section>
      </main>
      {selectedActivity && (
        <CardModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
      )}
    </div>
  );
};

export default App;
