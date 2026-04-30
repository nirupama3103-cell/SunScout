import React, { useState } from 'react';
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import { ACTIVITIES } from './activities';
import styles from './App.module.css';

function App() {
  const [activeRegion, setActiveRegion] = useState('Santa Clara');
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab, setActiveTab] = useState('weekend');

  // Improved filter: ignores case and handles empty states
  let filteredActivities = ACTIVITIES.filter(activity => 
    activity.city.toLowerCase() === activeCity.toLowerCase() && 
    activity.category.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className={styles.app} style={{ backgroundColor: '#fffdf5', minHeight: '100vh' }}>
      <Header />
      <main className={styles.main}>
        <Controls 
          activeRegion={activeRegion} setActiveRegion={setActiveRegion}
          activeCity={activeCity} setActiveCity={setActiveCity}
          activeTab={activeTab} setActiveTab={setActiveTab}
        />
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {filteredActivities.length > 0 ? (
            <MapArea activities={filteredActivities} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <h3>No activities found for {activeCity} in this category yet!</h3>
              <p>Try switching to "Sunnyvale" or "San Francisco" to see live data.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default App;
