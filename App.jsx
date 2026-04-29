import React, { useState } from 'react';
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import { STATIC_ACTIVITIES } from './constants';
import styles from './App.module.css';

<<<<<<< HEAD
function App() {
  const [filters, setFilters] = useState({
    region: 'HUB',
    mood: 'RUN',
    wallet: 'ALL'
  });
=======
const CATEGORY_TABS = [
  { id: 'allFun', label: '🌈 All Fun' },
  { id: 'freeFun', label: '🎡 Free Fun' },
  { id: 'summer', label: '☀️ Summer' },
  { id: 'paidCamps', label: '🏕️ Paid Camps' },
];
>>>>>>> a3a1c655cec80c90058cad31783a18d93e8704cf

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  // The Filter Logic:
  const filteredActivities = STATIC_ACTIVITIES.filter(act => {
    const regionMatch = act.region === filters.region;
    const moodMatch = act.mood === filters.mood;
    const walletMatch = filters.wallet === 'ALL' || act.wallet === filters.wallet;
    return regionMatch && moodMatch && walletMatch;
  });

  return (
    <div className={styles.container}>
      <Header />
      <Controls filters={filters} onFilterChange={handleFilterChange} />
      <main className={styles.main}>
<<<<<<< HEAD
        <MapArea 
          filters={filters} 
          activities={filteredActivities} 
        />
      </main>
    </div>
  );
}
=======
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
>>>>>>> a3a1c655cec80c90058cad31783a18d93e8704cf

export default App;
