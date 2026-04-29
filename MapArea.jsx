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
      // Simplified query map for better results
      const queryMap = { RUN: 'park', COOL: 'splash pad', SMART: 'library', BREAK: 'cafe' };
      
      // Use broader city names for better API hits
      const cityMap = { HUB: 'Sunnyvale', ORCHARD: 'Cupertino', VINEYARD: 'Saratoga', GATEWAY: 'San Jose' };
      const location = cityMap[filters.region] || 'Sunnyvale';
      const searchTerm = `${queryMap[filters.mood]} near ${location}`;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchTerm)}&key=${key}`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const liveData = data.results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            wallet: filters.wallet
          }));
          setActivities(liveData);
        } else {
          setActivities([]); // Clear if no results
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        {loading ? "✨ Scouting..." : `📍 ${REGIONS[filters.region]} | ${MOODS[filters.mood]}`}
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
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.name)}`, '_blank')}
                >
                  Go 🚗
                </button>
              </div>
            </div>
          ))
        ) : !loading && (
          <div className={styles.noResults}>No spots found here yet. Try another tab! ☀️</div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
