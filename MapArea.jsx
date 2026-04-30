import React from 'react';
import ActivityCard from './ActivityCard';

const MapArea = ({ activities }) => {
  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Finding adventures nearby...</p>
        )}
      </div>
      
      <div className="flex justify-center mt-12 mb-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
          Explore More Adventures 🗺️
        </button>
      </div>
    </div>
  );
};

export default MapArea;
