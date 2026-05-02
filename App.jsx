import React, { useState } from 'react';
import { CITIES_BY_COUNTY } from './activities';
import Activities from './activities';
import Header from './Header';
import Controls from './Controls';

function App() {
  const counties = Object.keys(CITIES_BY_COUNTY);
  const [activeRegion, setActiveRegion] = useState(counties[0]);
  const [activeCity,   setActiveCity]   = useState(CITIES_BY_COUNTY[counties[0]][0]);
  const [activeTab,    setActiveTab]    = useState('summer');

  return (
    <div className="sunscout-app">
      <Header cityName={activeCity} />
      <Controls
        activeRegion={activeRegion}
        setActiveRegion={(r) => {
          setActiveRegion(r);
          setActiveCity(CITIES_BY_COUNTY[r]?.[0] || '');
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

export default App;
