import React from 'react';
import { WALLETS } from './constants';

const Controls = ({ activeTab, setActiveTab }) => {
  const colors = [
    { bg: '#3b82f6', label: '🏛️ Indoor Activities' },
    { bg: '#10b981', label: '🐾 Weekend Activities' },
    { bg: '#f59e0b', label: '☀️ Summer Free Fun' },
    { bg: '#ef4444', label: '🎟️ Paid Activities' }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
      {Object.entries(WALLETS).map(([key, label], index) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          style={{
            backgroundColor: activeTab === key ? colors[index].bg : '#9ca3af',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {colors[index].label}
        </button>
      ))}
    </div>
  );
};

export default Controls;
