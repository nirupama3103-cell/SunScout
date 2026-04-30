import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = () => {
      if (!window.google) return;
      setLoading(true);

      const queryMap = { 
        RUN: 'parks', 
        COOL: 'splash pads', 
        SMART: 'libraries', 
        BREAK: 'cafes' 
      };
      
      const county = REGIONS[filters.region];
      const category = queryMap[filters.mood];
      // Search logic: If 'FREE', add 'free' to query. If 'PAID', look for 'camps'
      const walletMod = filters.wallet === 'FREE' ? 'free' : filters.wallet === 'PAID' ? 'summer camp' : '';
      const searchTerm = `${walletMod} ${category} in ${county} County, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, radius: '20000' };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const apiData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`
          }));
          setActivities(apiData);
        } else {
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
        📍 {REGIONS[filters.region]} County | {WALLETS[filters.wallet]}
      </div>
      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Searching {REGIONS[filters.region]}...</div>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}>
                <h3>{act.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p>📍 {act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                   Go 🚗
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No spots found. Try another tab! ☀️</div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
