
import React from 'react';
import useWeather from './useWeather';
import { CITY_COORDS } from './constants';

export default function Header({ cityName }) {
  const coords = CITY_COORDS[cityName] || CITY_COORDS['Sunnyvale'];
  const { weather, loading } = useWeather(coords.lat, coords.lon);
  const icon = loading ? '⏳' : weather.temp >= 90 ? '🌡️' : weather.temp >= 75 ? '☀️' : weather.temp >= 60 ? '⛅' : '🌥️';

  return (
    <header style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 35%, #ffd89b 65%, #a8edea 100%)',
      padding: '44px 24px 38px', textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {[{t:'12%',l:'8%',s:'22px'},{t:'18%',l:'88%',s:'18px'},{t:'65%',l:'5%',s:'14px'},{t:'70%',l:'92%',s:'20px'},{t:'8%',l:'50%',s:'16px'}].map((sp,i) => (
        <div key={i} style={{ position:'absolute', top:sp.t, left:sp.l, fontSize:sp.s, opacity:0.55, pointerEvents:'none' }}>✦</div>
      ))}

      <div style={{
        position:'absolute', top:'12px', right:'12px',
        background:'rgba(255,255,255,0.92)', backdropFilter:'blur(10px)',
        borderRadius:'18px', padding:'12px 18px',
        display:'flex', alignItems:'center', gap:'12px',
        boxShadow:'0 4px 16px rgba(0,0,0,0.1)', minWidth:'140px', textAlign:'left', maxWidth:'180px',
      }}>
        <span style={{ fontSize:'32px', lineHeight:1 }}>{icon}</span>
        <div>
          <div style={{ fontSize:'11px', fontWeight:'800', color:'#7c3aed', textTransform:'uppercase', letterSpacing:'0.5px' }}>{cityName} Weather Alert:</div>
          <div style={{ fontSize:'13px', fontWeight:'700', color:'#334155' }}>{loading ? 'Loading...' : weather.condition + ','}</div>
          <div style={{ fontSize:'16px', fontWeight:'900', color:'#1e293b' }}>{loading ? '' : weather.temp + '°F'}</div>
        </div>
      </div>

      <h1 style={{ fontSize:'clamp(30px,5vw,52px)', fontWeight:'900', color:'#fff', textShadow:'0 2px 12px rgba(0,0,0,0.18)', marginBottom:'10px' }}>
        Your Adventure, Simplified.
      </h1>
      <p style={{ fontSize:'clamp(14px,2vw,18px)', color:'rgba(255,255,255,0.92)', fontWeight:'600', lineHeight:1.5 }}>
        SunScout finds the best free splash pads, parks,<br />and libraries near you in seconds.
      </p>
    </header>
  );
}
