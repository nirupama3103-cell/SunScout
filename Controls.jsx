import React from 'react';

const Controls = ({ activeRegion, setActiveRegion, activeCity, setActiveCity, activeTab, setActiveTab }) => {
  const regions = ['Alameda', 'San Francisco', 'San Mateo', 'Santa Clara'];
  const cities = ['Sunnyvale', 'San Jose', 'Cupertino', 'Saratoga', 'Mountain View', 'Palo Alto'];
  const categories = [
    { id: 'indoor', label: '🏛️ Indoor Activities', color: 'bg-blue-500' },
    { id: 'weekend', label: '🐾 Weekend Activities', color: 'bg-green-500' },
    { id: 'summer', label: '☀️ Summer Free Fun', color: 'bg-orange-500' },
    { id: 'paid', label: '🎟️ Paid Activities', color: 'bg-rose-500' }
  ];

  return (
    <div className="flex flex-col gap-6 items-center mt-6">
      {/* Row 1: Regions (Underlined Style) */}
      <div className="flex flex-wrap gap-8 justify-center border-b border-gray-200 pb-2 w-full max-w-2xl">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`text-lg font-bold transition-all ${
              activeRegion === region ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Row 2: Cities (Ovals) */}
      <div className="flex flex-wrap gap-3 justify-center">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 rounded-full font-medium transition-all shadow-sm border ${
              activeCity === city ? 'bg-white border-blue-500 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Row 3: Categories (Rainbow Ovals) */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2 rounded-full text-white font-bold transition-all shadow-md transform hover:scale-105 ${
              activeTab === cat.id ? cat.color : 'bg-gray-400'
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
