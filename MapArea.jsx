import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.google) return;
    setLoading(true);
    const queryMap = { RUN: 'parks', COOL: 'swimming pools', SMART: 'libraries', BREAK: 'play cafes' };
    const city = filters.city || 'Sunnyvale';
    const searchTerm = `${queryMap[filters.mood]} in ${city}, CA`;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch({ query: searchTerm }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setActivities(results.slice(0, 6).map(place => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address.split(',')[0],
          img: place.photos ? place.photos[0].getUrl({maxWidth: 400}) : 'https://images.unsplash.com/photo-1544910368-515481d8fd4d',
          link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}&query_place_id=${place.place_id}`
        })));
      }
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.grid}>
        {loading ? <p>Scouting...</p> : activities.map(act => (
          <div key={act.id} className={styles.adventureCard}>
            <img src={act.img} className={styles.cardImg} alt="activity" />
            <div style={{padding: '15px'}}>
              <h3>{act.name}</h3>
              <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>View on Map 🚗</button>
      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
        </button>
      <ViewMoreButton />
      </div>
      <ViewMoreButton />
            </div>
      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
        </button>
      <ViewMoreButton />
      </div>
      <ViewMoreButton />
          </div>
        ))}
      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
        </button>
      <ViewMoreButton />
      </div>
      <ViewMoreButton />
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">
        </button>
      <ViewMoreButton />
      </div>
      <ViewMoreButton />
    </div>
  );
};
export default MapArea;

const ViewMoreButton = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
    <button style={{
      backgroundColor: '#f59e0b',
      color: 'white',
      padding: '12px 30px',
      borderRadius: '9999px',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      Explore More Adventures 🗺️
    </button>
      <ViewMoreButton />
  </div>
);
