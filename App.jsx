import React, { useState } from 'react';
import { REGIONS, WALLETS, MOODS } from './constants'; // Essential Import
import Header from './Header';
import Controls from './Controls';
import MapArea from './MapArea';
import Activities from './Activities';
import './App.css';

function App() {
  // Use Santa Clara as default region (SC) and Sunnyvale as default city
  const [selectedRegion, setSelectedRegion] = useState('SC');
  const [selectedCity, setSelectedCity] = useState('Sunnyvale');
  const [activeWallet, setActiveWallet] = useState(WALLETS.SUMMER);

  return (
    <div className="sunscout-app">
      <Header 
        regionName={REGIONS[selectedRegion].name} 
        cityName={selectedCity} 
      />
      
      <div className="app-body">
        <Controls 
          regions={REGIONS}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          wallets={WALLETS}
          activeWallet={activeWallet}
          setActiveWallet={setActiveWallet}
        />

        <main className="main-layout">
          <Activities 
            city={selectedCity} 
            category={activeWallet} 
          />
          
          <aside className="sidebar-text">
            <p>From the tallest slides to the quietest library corners...</p>
            <h2>Let’s go exploring!</h2>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;