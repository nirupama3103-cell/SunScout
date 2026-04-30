import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.google) return;
    setLoading(true);

    const queryMap = { RUN: 'parks', COOL: 'splash pads', SMART: 'libraries', BREAK: 'family cafes' };
    const city = filters.city || 'Sunnyvale';
    const searchTerm = `${queryMap[filters.mood]} in ${city}, CA`;

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = { query: searchTerm, fields: ['name', 'formatted_address', 'photos'] };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const data = results.slice(0, 6).map(place => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address.split(',')[0],
          // Fallback image if Google doesn't provide one
          img: place.photos ? place.photos[0].getUrl({maxWidth: 400}) : 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=400&q=80',
          link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + city)}`
        }));
        setActivities(data);
      } else {
        setActivities([]);
      }
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        📍 Exploring {filters.city}...
      </div>
      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Scouting {filters.city}... ☀️</div>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <img src={act.img} alt={act.name} className={styles.cardImg} />
              <div className={styles.cardContent}>
                <h3>{act.name}</h3>
                <p>{act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>Go 🚗</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>Ready for an adventure?</h3>
            <p>Select a city and category above to find local spots instantly.</p>
          </div>
        )}
      </div>
    </div>
  );
};
