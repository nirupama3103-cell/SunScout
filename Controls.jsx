import React from 'react';
import { TABS } from './constants';

const CITIES = ['Sunnyvale', 'San Jose', 'Cupertino', 'Mountain View', 'Palo Alto', 'Saratoga'];

export default function Controls({ activeCity, setActiveCity, activeTab, setActiveTab }) {
  return (
    <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%' }}>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', paddingBottom: '4px', scrollbarWidth: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>
        {CITIES.map(c => (
          <button key={c} onClick={() => setActiveCity(c)} style={{
            padding: '6px 16px', borderRadius: '20px', border: 'none',
            fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '13px',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            background: activeCity === c ? '#7c3aed' : '#e2e8f0',
            color: activeCity === c ? '#fff' : '#475569',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', paddingBottom: '4px', scrollbarWidth: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '8px 20px', borderRadius: '20px', border: 'none',
            fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            background: activeTab === tab.id ? tab.color : '#94a3b8',
            color: '#fff',
          }}>{tab.label}</button>
        ))}
      </div>

    </div>
  );
}
