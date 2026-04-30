import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Specific local schedule data
  const SUNNYVALE_SCHEDULE = [
    { name: 'AttackBots Robotics', type: 'Summer', address: 'Sunnyvale Community Center', wallet: 'Paid Camps' },
    { name: 'Teen Tuesday Reading', type: 'SMART', address: 'Sunnyvale Public Library', wallet: 'Free Fun' },
    { name: 'Summer Series Music', type: 'RUN', address: 'Murphy Ave, Sunnyvale', wallet: 'Free Fun' },
    { name: 'Bee Smart Coders', type: 'Summer', address: 'Sunnyvale Local', wallet: 'Paid Camps' }
  ];

  useEffect(() => {
    const fetchPlaces = () => {
      setLoading(true);
      
      // If searching Santa Clara (Sunnyvale area), inject special schedule items
      let results = [];
      if (filters.region === 'SC') {
        results = SUNNYVALE_SCHEDULE.filter(item => 
          (filters.wallet === 'All Fun' || item.wallet === filters.wallet)
        );
      }

      if (!window.google) {
        setActivities(results);
        setLoading(false);
        return;
      }

      const queryMap = { 
        RUN: 'parks and playgrounds', 
        COOL: 'splash pads and water parks', 
        SMART: 'public library events', 
        BREAK: 'family cafes' 
      };
      
      const countyName = REGIONS[filters.region];
      const searchTerm = `${queryMap[filters.mood]} in ${countyName} County, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, radius: '20000' };

      service.textSearch(request, (googleResults, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const apiData = googleResults.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`,
            wallet: filters.wallet
          }));
          setActivities([...results, ...apiData]);
        } else {
          setActivities(results);
        }
        setLoading(false);
      });
    };

    fetchPlaces();
  }, [filters]);

  return (
    <div className={styles.mapContainer}>
      <div className={styles.statusBanner}>
        📍 {REGIONS[filters.region]} County | {filters.wallet}
      </div>
      <div className={styles.grid}>
        {activities.map((act, i) => (
          <div key={act.id || i} className={styles.adventureCard}>
            <div className={styles.cardHeader}>
              <span className={styles.categoryBadge}>{act.wallet || filters.wallet}</span>
              <h3>{act.name}</h3>
            </div>
            <div className={styles.cardBody}>
              <p>📍 {act.address}</p>
              <button className={styles.actionBtn} onClick={() => window.open(act.link || '#', '_blank')}>
                {act.wallet === 'Paid Camps' ? 'Register 🎒' : 'Go 🚗'}
              </button>
            </div>
          </div>
        ))}
        {activities.length === 0 && !loading && <div className={styles.noResults}>Looking for adventures...</div>}
      </div>
    </div>
  );
};

export default MapArea;
