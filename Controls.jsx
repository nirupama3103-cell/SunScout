import React from 'react';
import { WALLETS } from './constants';

const Controls = ({ activeTab, setActiveTab }) => {
  const colors = [
    'from-blue-500 to-indigo-600', 
    'from-green-500 to-emerald-600', 
    'from-orange-400 to-yellow-500', 
    'from-pink-500 to-rose-600'
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {Object.entries(WALLETS).map(([key, label], index) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          className={`px-4 py-2 rounded-full text-white font-bold transition-all shadow-md transform hover:scale-105 ${
            activeTab === key ? colors[index] : 'bg-gray-400'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Controls;
