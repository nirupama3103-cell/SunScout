import React from 'react';

const Controls = ({ activeCity, setActiveCity, activeTab, setActiveTab }) => {
  const cities = ['Alameda', 'San Francisco', 'San Mateo', 'Santa Clara'];
  const categories = [
    { id: 'indoor', label: '🏛️ Indoor Activities', color: 'bg-blue-500' },
    { id: 'weekend', label: '🐾 Weekend Activities', color: 'bg-green-500' },
    { id: 'summer', label: '☀️ Summer Free Fun', color: 'bg-orange-500' },
    { id: 'paid', label: '🎟️ Paid Activities', color: 'bg-rose-500' }
  ];

  return (
    <div className="flex flex-col gap-4 items-center mt-6">
      {/* Row 2: Cities */}
      <div className="flex flex-wrap gap-2 justify-center">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 rounded-full font-bold transition-all shadow-sm ${
              activeCity === city ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Row 3: Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-white font-bold transition-all shadow-md ${
              activeTab === cat.id ? cat.color : 'bg-gray-400 opacity-80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
