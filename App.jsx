import React, { useState, useEffect } from 'react';
import { ACTIVITIES, CITIES_BY_COUNTY } from './activities';
import styles from './App.module.css';

export default function App() {
  const [county, setCounty] = useState('Santa Clara');
  const [city, setCity] = useState('Sunnyvale');
  const [cat, setCat] = useState('indoor');

  useEffect(() => { setCity(CITIES_BY_COUNTY[county][0]); }, [county]);

  const filtered = ACTIVITIES.filter(a => a.county === county && a.city === city && a.category === cat);

  return (
    <div className={styles.app}>
      <h1 style={{textAlign:'center', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>SunScout STEM Camps</h1>
      <div style={{display:'flex', justifyContent:'center', gap:'20px', margin:'20px 0'}}>
        {Object.keys(CITIES_BY_COUNTY).map(c => (
          <button key={c} onClick={() => setCounty(c)} style={{color: county === c ? '#ff4757' : '#94a3b8', background:'none', border:'none', fontSize:'1.2rem', cursor:'pointer', borderBottom: county === c ? '3px solid #ff4757' : 'none'}}>{c}</button>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'20px', flexWrap:'wrap'}}>
        {CITIES_BY_COUNTY[county].map(cit => (
          <button key={cit} onClick={() => setCity(cit)} style={{padding:'10px 20px', borderRadius:'25px', background: city === cit ? '#3b82f6' : 'white', color: city === cit ? 'white' : 'black', border:'none', fontWeight:'bold'}}>{cit}</button>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', gap:'15px', marginBottom:'40px'}}>
         <button onClick={() => setCat('indoor')} style={{background: '#3b82f6', color:'white', padding:'12px 24px', borderRadius:'10px', border:'none', fontWeight:'bold'}}>🏛️ Indoor Activities</button>
         <button onClick={() => setCat('weekend')} style={{background: '#6366f1', color:'white', padding:'12px 24px', borderRadius:'10px', border:'none', fontWeight:'bold'}}>📅 Weekend Activities</button>
      </div>
      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <img src={item.image} style={{width:'100%', height:'200px', objectFit:'cover'}} />
            <div style={{padding:'20px'}}>
              <h3 style={{color:'#1e40af', marginBottom:'10px'}}>{item.name}</h3>
              <p>👤 Ages {item.ages} <span style={{float:'right', fontWeight:'bold'}}>{item.price}</span></p>
              <button className={styles.registerBtn}>Register Now <span>▼</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
