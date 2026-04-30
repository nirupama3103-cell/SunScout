import React, { useState, useEffect } from 'react';
import { REGIONS, MOODS, WALLETS } from './constants';
import styles from './MapArea.module.css';

const MapArea = ({ filters }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Live April 2026 Schedule Data
  const LIVE_EVENTS = {
    SF: [
      { name: 'Gills Club (STEM)', type: 'SMART', address: 'Aquarium of the Bay', wallet: 'Free Fun', link: 'https://www.aquariumofthebay.org/' },
      { name: 'Bridge to Bridge Cruise', type: 'COOL', address: 'Pier 43 1/2', wallet: 'Summer' }
    ],
    ALAMEDA: [
      { name: 'Starlight Movie: The Little Mermaid', type: 'RUN', address: 'Alameda Point Field', wallet: 'Free Fun' },
      { name: 'National Kids to Parks Day', type: 'RUN', address: 'Jean Sweeney Park', wallet: 'Free Fun' }
    ],
    SM: [
      { name: 'Downtown Boba Day', type: 'BREAK', address: 'San Mateo Downtown', wallet: 'Free Fun' },
      { name: 'Library Day with the Giants', type: 'SMART', address: 'SM County Library', wallet: 'Free Fun' }
    ],
    SC: [
      { name: 'STEM Zone Showcase', type: 'SMART', address: 'SC Convention Center', wallet: 'Free Fun' },
      { name: 'Heart and Soles Kids Run', type: 'RUN', address: 'Santa Clara University', wallet: 'Summer' }
    ]
  };

  useEffect(() => {
    const fetchPlaces = () => {
      setLoading(true);
      const countyEvents = LIVE_EVENTS[filters.region] || [];
      const filteredEvents = countyEvents.filter(e => filters.wallet === 'All Fun' || e.wallet === filters.wallet);

      if (!window.google) {
        setActivities(filteredEvents);
        setLoading(false);
        return;
      }

      const queryMap = { 
        RUN: 'parks and playgrounds', 
        COOL: 'splash pads and pools', 
        SMART: 'public libraries', 
        BREAK: 'family friendly cafes' 
      };
      
      const county = REGIONS[filters.region];
      const searchTerm = `${queryMap[filters.mood]} in ${county} County, CA`;

      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = { query: searchTerm, radius: '20000' };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const apiData = results.slice(0, 6).map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.formatted_address.split(',')[0],
            link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.formatted_address)}`,
            wallet: filters.wallet
          }));
          setActivities([...filteredEvents, ...apiData]);
        } else {
          setActivities(filteredEvents);
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
              <button className={styles.actionBtn} onClick={() => window.open(act.link, '_blank')}>
                {act.wallet === 'Paid Camps' ? 'Register 🎒' : 'Go 🚗'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapArea;
