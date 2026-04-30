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

      const city = filters.city || 'Sunnyvale';
      const county = REGIONS[filters.region]?.name || 'Santa Clara';
      const queryMap = { RUN: 'parks', COOL: 'splash pads', SMART: 'libraries', BREAK: 'family cafes' };
      
      // Strict search query for Google
      const searchTerm = `${queryMap[filters.mood]} in ${city}, ${county}, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        query: searchTerm,
        locationBias: {radius: 5000, center: {lat: 37.3688, lng: -122.0363}} // Biased toward Sunnyvale area
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const apiData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            // Redirect link to Google Maps
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}&query_place_id=${place.place_id}`
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
      <div className={styles.statusBanner}>📍 {filters.city} Adventures</div>
      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Scouting {filters.city}... ☀️</div>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}><h3>{act.name}</h3></div>
              <div className={styles.cardBody}>
                <p>{act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                  Go to Maps 🚗
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No spots found in {filters.city}. Try "All Fun"!</div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
