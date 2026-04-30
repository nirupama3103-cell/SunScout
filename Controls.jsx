import React from 'react';

const Controls = ({ activeRegion, setActiveRegion, activeCity, setActiveCity, activeTab, setActiveTab }) => {
  const regions = ['Alameda', 'San Francisco', 'San Mateo', 'Santa Clara'];
  const cities = ['Sunnyvale', 'San Jose', 'Cupertino', 'Saratoga', 'Mountain View', 'Palo Alto'];
  const categories = [
    { id: 'indoor', label: '🏛️ Indoor Activities', color: '#3b82f6' },
    { id: 'weekend', label: '🐾 Weekend Activities', color: '#10b981' },
    { id: 'summer', label: '☀️ Summer Free Fun', color: '#f59e0b' },
    { id: 'paid', label: '🎟️ Paid Activities', color: '#ef4444' }
  ];

  const btnStyle = {
    padding: '8px 20px',
    borderRadius: '9999px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '30px', padding: '0 20px' }}>
      
      {/* Row 1: Regions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', width: '100%', maxWidth: '600px' }}>
        {regions.map(r => (
          <button key={r} onClick={() => setActiveRegion(r)} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', color: activeRegion === r ? '#ef4444' : '#94a3b8', borderBottom: activeRegion === r ? '3px solid #ef4444' : 'none' }}>
            {r}
          </button>
        ))}
      </div>

      {/* Row 2: Cities */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {cities.map(c => (
          <button key={c} onClick={() => setActiveCity(c)} style={{ ...btnStyle, backgroundColor: activeCity === c ? '#fff' : '#f8fafc', color: activeCity === c ? '#3b82f6' : '#64748b', border: activeCity === c ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Row 3: Categories */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{ ...btnStyle, backgroundColor: activeTab === cat.id ? cat.color : '#94a3b8', color: 'white' }}>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
