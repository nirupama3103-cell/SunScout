import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const FEATURED_CAMPS = [
    { id: 'c1', name: 'YMCA Summer Power', address: 'Multiple Locations', link: 'https://www.ymcasv.org/day-camp', type: 'Camp' },
    { id: 'c2', name: 'Sunnyvale Camp Adventure', address: 'Community Center', link: 'https://www.sunnyvale.ca.gov/recreation', type: 'Camp' },
    { id: 'c3', name: 'Galileo Innovation Camp', address: 'Local Schools', link: 'https://galileo-camps.com/', type: 'Camp' },
    { id: 'c4', name: 'Steve & Kate’s Camp', address: 'Cupertino/SJ', link: 'https://steveandkatescamp.com/', type: 'Camp' }
  ];

  useEffect(() => {
    const fetchPlaces = () => {
      setActivities([]); // Clear old results immediately
      
      // LOGIC 1: Hard-coded Paid Camps (No API call needed)
      if (filters.wallet === 'Paid Camps') {
        setActivities(FEATURED_CAMPS);
        return;
      }

      if (!window.google) return;
      setLoading(true);

      // LOGIC 2: Strict Mapping to avoid "Coffee Shop" leaks
      const queryMap = { 
        RUN: 'public park with playground', 
        COOL: 'public splash pad or pool', 
        SMART: 'public library', 
        BREAK: 'family friendly cafe' 
      };
      
      const cityMap = { HUB: 'Sunnyvale', ORCHARD: 'Cupertino', VINEYARD: 'Saratoga', GATEWAY: 'San Jose' };
      const city = cityMap[filters.region] || 'Sunnyvale';
      const searchTerm = `${queryMap[filters.mood]} in ${city}, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, location: new window.google.maps.LatLng(37.3541, -121.9552), radius: '10000' };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const liveData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`,
            type: filters.mood === 'BREAK' ? 'Cafe' : 'Activity'
          }));
          setActivities(liveData);
        }
        setLoading(false);
      });
    };

    fetchPlaces();
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      {/* THE NEW HEADER ROW: Clear City | Activity Branding */}
      <div className={styles.statusBanner}>
        <span className={styles.locationTag}>📍 {REGIONS[filters.region]}</span>
        <span className={styles.divider}>|</span>
        <span className={styles.activityTag}>{filters.wallet} - {MOODS[filters.mood]}</span>
      </div>

      <div className={styles.grid}>
        {loading ? (
          <div className={styles.loader}>Scouting the best spots... ☀️</div>
        ) : activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryBadge}>{act.type || filters.wallet}</span>
                <h3>{act.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p>📍 {act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                  {filters.wallet === 'Paid Camps' ? 'Enroll 🎒' : 'Get Directions 🚗'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No {MOODS[filters.mood]} found here. Try another tab!</div>
        )}
      </div>
    </div>
  );
};

export default MapArea;
