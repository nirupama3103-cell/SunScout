import React from 'react';
import { TABS } from './constants';

const CITIES = ['Sunnyvale', 'San Jose', 'Cupertino', 'Mountain View', 'Palo Alto', 'Saratoga'];

export default function Controls({ activeCity, setActiveCity, activeTab, setActiveTab }) {
  return (
    <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
      {/* City Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {CITIES.map(c => (
          <button key={c} onClick={() => setActiveCity(c)} style={{
            padding: '6px 16px', borderRadius: '20px', border: 'none', fontFamily: 'Nunito, sans-serif',
            fontWeight: '700', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
            background: activeCity === c ? '#7c3aed' : '#e2e8f0',
            color: activeCity === c ? '#fff' : '#475569',
            boxShadow: activeCity === c ? '0 2px 8px rgba(124,58,237,0.3)' : 'none'
          }}>{c}</button>
        ))}
      </div>

      {/* Tab Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none', fontFamily: 'Nunito, sans-serif',
            fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
            background: activeTab === tab.id ? tab.color : '#94a3b8',
            color: '#fff',
            boxShadow: activeTab === tab.id ? `0 3px 10px ${tab.color}55` : 'none',
            transform: activeTab === tab.id ? 'scale(1.05)' : 'scale(1)',
          }}>{tab.label}</button>
        ))}
      </div>
    </div>
  );
}
