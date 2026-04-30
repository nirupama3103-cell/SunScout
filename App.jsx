import React, { useState, useEffect } from 'react';
import { ACTIVITIES, CITIES_BY_COUNTY } from './activities';
import styles from './App.module.css';

export default function App() {
  const [county, setCounty] = useState('Santa Clara');
  const [city, setCity] = useState('Sunnyvale');
  const [cat, setCat] = useState('free summer');

  useEffect(() => { setCity(CITIES_BY_COUNTY[county][0]); }, [county]);

  const filtered = ACTIVITIES.filter(a => a.county === county && a.city === city && a.category === cat);

  return (
    <div className={styles.app}>
      <h1 style={{textAlign:'center', fontSize:'2.5rem', marginBottom:'30px'}}>SunScout STEM Camps</h1>

      {/* Row 1: Counties (Oval + Red Underline) */}
      <div style={{display:'flex', justifyContent:'center', gap:'15px', marginBottom:'20px', flexWrap:'wrap'}}>
        {Object.keys(CITIES_BY_COUNTY).map(c => (
          <button key={c} onClick={() => setCounty(c)} 
            className={styles.tabBase}
            style={{ 
              background: 'none', 
              color: county === c ? '#ff4757' : 'white',
              borderBottom: county === c ? '3px solid #ff4757' : 'none'
            }}>{c}</button>
        ))}
      </div>

      {/* Row 2: Cities (Uniform Blue/White Ovals) */}
      <div style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'20px', flexWrap:'wrap'}}>
        {CITIES_BY_COUNTY[county].map(cit => (
          <button key={cit} onClick={() => setCity(cit)} 
            className={styles.tabBase}
            style={{ 
              background: city === cit ? '#3b82f6' : 'white', 
              color: city === cit ? 'white' : '#333' 
            }}>{cit}</button>
        ))}
      </div>

      {/* Row 3: Categories (Rainbow Oval Tabs) */}
      <div style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'40px', flexWrap:'wrap'}}>
         <button onClick={() => setCat('indoor')} className={styles.tabBase} style={{background:'#3b82f6', color:'white'}}>🏢 Indoor</button>
         <button onClick={() => setCat('weekend')} className={styles.tabBase} style={{background:'#2ecc71', color:'white'}}>📅 Weekend</button>
         <button onClick={() => setCat('free summer')} className={styles.tabBase} style={{background:'#f1c40f', color:'white'}}>☀️ Free Summer</button>
         <button onClick={() => setCat('paid')} className={styles.tabBase} style={{background:'#e84393', color:'white'}}>🎟️ Paid Camps</button>
      </div>

      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <img src={item.image} style={{width:'100%', height:'200px', objectFit:'cover'}} />
            <div style={{padding:'15px'}}>
              <h3 style={{color:'#1e40af', margin:'0 0 10px 0'}}>{item.name}</h3>
              <p style={{fontSize:'0.9rem', color:'#666', marginBottom:'15px'}}>{item.description}</p>
              <button className={styles.mapBtn} onClick={() => window.open(item.mapUrl, '_blank')}>
                View on Map 🏎️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
