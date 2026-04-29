import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const FEATURED_CAMPS = [
    { id: 'c1', name: 'YMCA Summer Power', address: 'Multiple Locations', link: 'https://www.ymcasv.org/day-camp' },
    { id: 'c2', name: 'Sunnyvale Camp Adventure', address: 'Community Center', link: 'https://www.sunnyvale.ca.gov/recreation' },
    { id: 'c3', name: 'Galileo Innovation Camp', address: 'Local Schools', link: 'https://galileo-camps.com/' },
    { id: 'c4', name: 'Steve & Kate’s Camp', address: 'Cupertino/SJ', link: 'https://steveandkatescamp.com/' }
  ];

  useEffect(() => {
    const fetchPlaces = () => {
      if (filters.wallet === 'Paid Camps') {
        setActivities(FEATURED_CAMPS);
        return;
      }

      if (!window.google) return;
      
      setLoading(true);
      const queryMap = { RUN: 'park', COOL: 'splash pad', SMART: 'library', BREAK: 'cafe' };
      const cityMap = { HUB: 'Sunnyvale', ORCHARD: 'Cupertino', VINEYARD: 'Saratoga', GATEWAY: 'San Jose' };
      const searchTerm = `${queryMap[filters.mood]} in ${cityMap[filters.region] || 'Sunnyvale'}, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, location: new window.google.maps.LatLng(37.3541, -121.9552), radius: '10000' };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const liveData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`
          }));
          setActivities(liveData);
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
        {loading ? "🔍 Scouting..." : `📍 ${REGIONS[filters.region]} | ${MOODS[filters.mood]}`}
      </div>
      <div className={styles.grid}>
        {activities.length > 0 ? (
          activities.map(act => (
            <div key={act.id} className={styles.adventureCard}>
              <div className={styles.cardHeader}>
                <span className={styles.tag}>{filters.wallet}</span>
                <h3>{act.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <p>📍 {act.address}</p>
                <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                  {filters.wallet === 'Paid Camps' ? 'View Camp 🎒' : 'Go 🚗'}
                </button>
              </div>
            </div>
          ))
        ) : !loading && <div className={styles.noResults}>No spots found. Try another tab! ☀️</div>}
      </div>
    </div>
  );
};

export default MapArea;
