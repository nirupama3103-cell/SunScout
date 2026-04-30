import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = () => {
      if (!window.google) {
        console.error("Google Maps SDK not loaded yet.");
        return;
      }
      
      setLoading(true);
      setError(null);

      const queryMap = { RUN: 'parks', COOL: 'splash pads', SMART: 'libraries', BREAK: 'cafes' };
      const county = REGIONS[filters.region]?.name || 'Santa Clara';
      const city = filters.city || 'Sunnyvale';
      const searchTerm = `${queryMap[filters.mood]} in ${city}, ${county} County, CA`;

      console.log("Searching for:", searchTerm);

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, radius: '10000' };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log("Results found:", results.length);
          const apiData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`
          }));
          setActivities(apiData);
        } else {
          console.error("Google API Error Status:", status);
          setError(`Google API Error: ${status}`);
          setActivities([]);
        }
        setLoading(false);
      });
    };

    fetchPlaces();
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        📍 {filters.city} ({REGIONS[filters.region]?.name}) | {WALLETS[filters.wallet]}
      </div>
      
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Searching {filters.city}...</div>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}><h3>{act.name}</h3></div>
              <div className={styles.cardBody}>
                <p>📍 {act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>Go 🚗</button>
              </div>
            </div>
          ))
        ) : (
          !loading && <div className={styles.noResults}>No spots found. Try a different city! ☀️</div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
