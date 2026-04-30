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
      <h1 style={{textAlign:'center', fontSize: '3rem', marginBottom:'10px'}}>SunScout</h1>
      <p style={{textAlign:'center', marginBottom:'40px'}}>Find free summer fun in seconds.</p>

      <div style={{display:'flex', justifyContent:'center', gap:'20px', marginBottom:'20px'}}>
        {Object.keys(CITIES_BY_COUNTY).map(c => (
          <button key={c} onClick={() => setCounty(c)} style={{color: county === c ? '#ff4757' : 'white', background:'none', border:'none', fontSize:'1.3rem', cursor:'pointer', borderBottom: county === c ? '3px solid #ff4757' : 'none'}}>{c}</button>
        ))}
      </div>

      <div style={{display:'flex', justifyContent:'center', gap:'10px', marginBottom:'25px', flexWrap:'wrap'}}>
        {CITIES_BY_COUNTY[county].map(cit => (
          <button key={cit} onClick={() => setCity(cit)} style={{padding:'8px 20px', borderRadius:'20px', background: city === cit ? '#3b82f6' : 'white', color: city === cit ? 'white' : 'black', border:'none', fontWeight:'bold'}}>{cit}</button>
        ))}
      </div>

      <div style={{display:'flex', justifyContent:'center', gap:'15px', marginBottom:'50px'}}>
         <button onClick={() => setCat('indoor')} style={{background: '#3b82f6', color:'white', padding:'12px 24px', borderRadius:'10px', border:'none', fontWeight:'bold'}}>🏛️ Indoor</button>
         <button onClick={() => setCat('free summer')} style={{background: '#2ecc71', color:'white', padding:'12px 24px', borderRadius:'10px', border:'none', fontWeight:'bold'}}>☀️ Free Summer</button>
      </div>

      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <img src={item.image} style={{width:'100%', height:'220px', objectFit:'cover'}} />
            <div style={{padding:'20px'}}>
              <h3 style={{color:'#1e40af', fontSize:'1.4rem'}}>{item.name}</h3>
              <p style={{margin:'10px 0', color:'#475569'}}>{item.description}</p>
              <button className={styles.mapBtn} onClick={() => window.open(item.mapUrl, '_blank')}>View on Map 🏎️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
