import React from 'react';

const SUGGESTIONS = {
  hot:    { tab: 'summer',  msg: 'perfect splash pad weather', emoji: '🌊', threshold: 85 },
  warm:   { tab: 'weekend', msg: 'great day for the park',     emoji: '🌳', threshold: 70 },
  mild:   { tab: 'indoor',  msg: 'nice day for indoor fun',    emoji: '🏛️', threshold: 0  },
};

export default function WeatherBanner({ temp, city, setActiveTab }) {
  if (!temp) return null;
  const s = temp >= 85 ? SUGGESTIONS.hot : temp >= 70 ? SUGGESTIONS.warm : SUGGESTIONS.mild;
  const tabLabel = { summer: 'Summer Free Fun', weekend: 'Weekend Activities', indoor: 'Indoor Activities' }[s.tab];

  return (
    <div style={{
      background: temp >= 85 ? 'linear-gradient(135deg, #fef3c7, #fde68a)'
                : temp >= 70 ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
                : 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
      borderRadius: '16px',
      padding: '14px 20px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      border: `0.5px solid ${temp >= 85 ? '#fcd34d' : temp >= 70 ? '#6ee7b7' : '#7dd3fc'}`,
    }}>
      <span style={{ fontSize: '32px', lineHeight: 1 }}>
        {temp >= 85 ? '☀️' : temp >= 70 ? '⛅' : '🌥️'}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1e293b' }}>
          It's {temp}°F in {city} — {s.msg}!
        </p>
        <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#475569' }}>
          We recommend: <strong>{tabLabel}</strong> activities today {s.emoji}
        </p>
      </div>
      <button
        onClick={() => setActiveTab(s.tab)}
        style={{
          background: temp >= 85 ? '#f59e0b' : temp >= 70 ? '#10b981' : '#3b82f6',
          color: '#fff', border: 'none', borderRadius: '20px',
          padding: '8px 18px', fontSize: '13px', fontWeight: '800',
          cursor: 'pointer', fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap',
        }}>
        Show me →
      </button>
    </div>
  );
}
