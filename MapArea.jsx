import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!key) return;
      
      setLoading(true);
      const queryMap = { RUN: 'parks', COOL: 'splash pads', SMART: 'libraries', BREAK: 'coffee shops' };
      const cityMap = { HUB: 'Sunnyvale', ORCHARD: 'Cupertino', VINEYARD: 'Saratoga', GATEWAY: 'San Jose' };
      
      const city = cityMap[filters.region] || 'Sunnyvale';
      const type = queryMap[filters.mood] || 'parks';
      const searchTerm = `${type} in ${city}, CA`;

      try {
        // We use a CORS proxy or a direct fetch if the key is unrestricted
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchTerm)}&key=${key}`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const liveData = data.results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address ? place.formatted_address.split(',')[0] : 'South Bay',
            wallet: filters.wallet
          }));
          setActivities(liveData);
        } else {
          setActivities([]);
        }
      } catch (error) {
        console.error("Critical Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        {loading ? "🔍 Scouting..." : `📍 ${REGIONS[filters.region]} | ${MOODS[filters.mood]}`}
      </div>
      
      <div className={styles.grid}>
        {!loading && activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}>
                <span className={styles.tag}>{act.wallet}</span>
                <h3>{act.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p>📍 {act.address}</p>
                <button 
                  className={styles.actionBtn} 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.name + " " + act.address)}`, '_blank')}
                >
                  View Map 🚗
                </button>
              </div>
            </div>
          ))
        ) : !loading && (
          <div className={styles.noResults}>
            <h3>No spots found here yet.</h3>
            <p>Check if "Places API" is enabled in your Google Cloud Console! ☀️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
