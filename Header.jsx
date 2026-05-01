import React from 'react';
import useWeather from './useWeather';
import { CITY_COORDS } from './constants';

export default function Header({ cityName }) {
  const coords = CITY_COORDS[cityName] || CITY_COORDS['Sunnyvale'];
  const { weather, loading } = useWeather(coords.lat, coords.lon);

  return (
    <header style={{
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 35%, #ffd89b 65%, #a8edea 100%)',
      padding: '32px 24px 28px',
      textAlign: 'center',
      position: 'relative',
    }}>
      {/* Sparkles */}
      {['10% 20%','85% 15%','5% 70%','92% 65%','50% 10%'].map((pos,i) => (
        <div key={i} style={{
          position:'absolute', top: pos.split(' ')[1], left: pos.split(' ')[0],
          fontSize: ['18px','22px','14px','20px','16px'][i], opacity: 0.6, pointerEvents:'none'
        }}>✦</div>
      ))}

      {/* Weather Widget */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px',
        background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)',
        borderRadius: '16px', padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: '10px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)', maxWidth: '200px', textAlign: 'left'
      }}>
        <span style={{ fontSize: '36px' }}>
          {loading ? '⏳' : weather.temp >= 90 ? '🌡️' : weather.temp >= 75 ? '☀️' : weather.temp >= 60 ? '⛅' : '🌥️'}
        </span>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#7c3aed' }}>{cityName} Weather Alert:</div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>
            {loading ? 'Loading...' : `${weather.condition},`}
          </div>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>
            {loading ? '' : `${weather.temp}°F`}
          </div>
        </div>
      </div>

      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900',
        color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.15)',
        marginBottom: '8px'
      }}>
        Your Adventure, Simplified.
      </h1>
      <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
        SunScout finds the best free splash pads, parks,<br />and libraries near you in seconds.
      </p>
    </header>
  );
}
