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
      const queryMap = { RUN: 'park', COOL: 'splash pad', SMART: 'library', BREAK: 'cafe' };
      const location = filters.region === 'HUB' ? 'Sunnyvale' : 'Cupertino';
      const searchTerm = `${queryMap[filters.mood]} in ${location}`;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchTerm)}&key=${key}`
        );
        const data = await response.json();
        
        if (data.results) {
          const liveData = data.results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            city: place.formatted_address.split(',')[1]?.trim() || 'South Bay',
            wallet: filters.wallet
          }));
          setActivities(liveData);
        }
      } catch (error) {
        console.error("Live Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [filters]);

  const handleGo = (name) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        {loading ? "✨ Scouting Live Spots..." : `📍 ${REGIONS[filters.region]} | ${MOODS[filters.mood]}`}
      </div>
      <div className={styles.grid}>
        {activities.map(act => (
          <div key={act.id} className={styles.adventureCard}>
            <div className={styles.cardHeader}>
              <span className={styles.tag}>{act.wallet}</span>
              <h3>{act.name}</h3>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.locationText}>📍 {act.city}</p>
              <button className={styles.actionBtn} onClick={() => handleGo(act.name)}>
                View Map 🚗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapArea;
