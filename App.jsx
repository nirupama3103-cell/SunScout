import React, { useState } from 'react';
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import { ACTIVITIES } from './activities';
import styles from './App.module.css';

function App() {
  const [activeRegion, setActiveRegion] = useState('Santa Clara');
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab, setActiveTab] = useState('summer');

  // Filter the data based on Row 2 (City) and Row 3 (Category)
  const filteredActivities = ACTIVITIES.filter(activity => 
    activity.city === activeCity && activity.category === activeTab
  );

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Controls 
          activeRegion={activeRegion} setActiveRegion={setActiveRegion}
          activeCity={activeCity} setActiveCity={setActiveCity}
          activeTab={activeTab} setActiveTab={setActiveTab}
        />
        <MapArea activities={filteredActivities} />
      </main>
    </div>
  );
}

export default App;
