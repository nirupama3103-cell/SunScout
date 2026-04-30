import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to get thematic images based on activity
  const getImageUrl = (mood) => {
    const images = {
      RUN: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=400&q=80', // Park
      COOL: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', // Water
      SMART: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80', // Library
      BREAK: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80'  // Cafe
    };
    return images[mood] || images.RUN;
  };

  useEffect(() => {
    if (!window.google) return;
    setLoading(true);

    const queryMap = { RUN: 'public park', COOL: 'splash pad', SMART: 'library', BREAK: 'family cafe' };
    const city = filters.city || 'Sunnyvale';
    const searchTerm = `${queryMap[filters.mood]} in ${city}, CA`;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = { query: searchTerm, radius: '10000' };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const apiData = results.slice(0, 6).map(place => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address.split(',')[0],
          img: getImageUrl(filters.mood),
          link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.formatted_address)}`
        }));
        setActivities(apiData);
      }
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        📍 Scouting {filters.city}...
      </div>
      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Loading fun...</div>
        ) : activities.map(act => (
          <div key={act.id} className={styles.adventureCard}>
            <img src={act.img} alt={act.name} className={styles.cardImg} />
            <div className={styles.cardContent}>
              <h3>{act.name}</h3>
              <p>{act.address}</p>
              <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                Take Me There 🚗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapArea;
