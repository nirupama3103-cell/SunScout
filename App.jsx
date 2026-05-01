import React, { useState } from 'react';
import { REGIONS, WALLETS } from './constants'; 
import Header from './Header';
import Controls from './Controls';
import Activities from './Activities';
import './App.css';

function App() {
  // 1. Match the state to the logic expected by your Controls component
  // Note: Controls uses full names like 'Santa Clara', not 'SC'
  const [activeRegion, setActiveRegion] = useState('Santa Clara');
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab, setActiveTab] = useState('summer'); // matches cat.id 'summer'

  return (
    <div className="sunscout-app">
      {/* 2. Passing the correct names to Header */}
      <Header 
        regionName={activeRegion} 
        cityName={activeCity} 
      />
      
      <div className="app-body">
        {/* 3. CRITICAL: Prop names must match exactly what is in your Controls.jsx */}
        <Controls 
          activeRegion={activeRegion} 
          setActiveRegion={setActiveRegion}
          activeCity={activeCity} 
          setActiveCity={setActiveCity}
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />

        <main className="main-layout">
          <section className="activities-grid">
            <Activities 
              city={activeCity} 
              category={activeTab} 
            />
          </section>
          
          <aside className="sidebar-text">
            <p>From the tallest slides to the quietest library corners, SunScout is here to help you find the magic in every afternoon.</p>
            <h2 style={{color: '#eb4d4b'}}>Let’s go exploring!</h2>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;