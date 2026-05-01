import React, { useState } from 'react';
import { REGIONS } from './constants';
import { activitiesData } from './activities';
import Header from './Header';
import Controls from './Controls';
import Activities from './activities'; // import component

function App() {
  const [activeRegion, setActiveRegion] = useState('Santa Clara');
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab, setActiveTab] = useState('summer');

  return (
    <div className="sunscout-app">
      <Header cityName={activeCity} />
      
      <Controls 
        activeRegion={activeRegion} 
        setActiveRegion={(r) => {
          setActiveRegion(r);
          // Auto-select the first city of the new region to avoid "No activities found"
          const firstCity = Object.values(REGIONS).find(reg => reg.name === r)?.cities[0];
          setActiveCity(firstCity || '');
        }}
        activeCity={activeCity}
        setActiveCity={setActiveCity}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Activities city={activeCity} category={activeTab} />
    </div>
  );
}