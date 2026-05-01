import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import ActivityCard from './ActivityCard';
import HeatMap from './HeatMap';
import { CURATED, TABS, CITY_COORDS } from './constants';

const TAGLINES = {
  indoor:  { text: 'From bounce houses to library corners, SunScout has the perfect indoor spot for every kid.', emoji: '🏛️' },
  weekend: { text: 'From the tallest slides to quiet library corners, find the magic in every afternoon.', emoji: '🌈' },
  summer:  { text: 'Free summer adventures waiting — splash pads, trails, movies under the stars!', emoji: '☀️' },
  paid:    { text: 'Sometimes the best adventures are worth every penny. Curated for kids 0 to teen.', emoji: '🎟️' },
};
const PAGE_SIZE = 5;

// City-specific overrides for curated cards (name/description tweaks)
const CITY_LABEL = {
  'Sunnyvale':     'Sunnyvale',
  'San Jose':      'San Jose',
  'Cupertino':     'Cupertino',
  'Mountain View': 'Mountain View',
  'Palo Alto':     'Palo Alto',
  'Saratoga':      'Saratoga',
};

export default function App() {
  const [activeCity, setActiveCity]   = useState('Sunnyvale');
  const [activeTab,  setActiveTab]    = useState('weekend');
  const [liveItems,  setLiveItems]    = useState([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [page, setPage]               = useState(1);

  useEffect(() => { setPage(1); setLiveItems([]); }, [activeCity, activeTab]);

  useEffect(() => {
    setLoadingLive(true);
    const queries = {
      indoor:  `library OR "community center" OR "indoor play" kids ${activeCity}`,
      weekend: `park OR playground kids ${activeCity}`,
      summer:  `splash pad OR "free summer" OR hiking kids ${activeCity}`,
      paid:    `kids classes OR "youth sports" OR gym ${activeCity}`,
    };
    fetch(`/api/places?query=${encodeURIComponent(queries[activeTab])}`)
      .then(r => r.json())
      .then(data => {
        const places = (data.places || []).slice(0, 5);
        const mapped = places.map((p, i) => ({
          id: `live-${i}-${p.id || ''}`,
          name: p.displayName?.text || p.name || 'Local Spot',
          category: activeTab,
          free: activeTab === 'summer' || activeTab === 'weekend',
          image: `https://picsum.photos/seed/${activeTab}${activeCity}${i}/600/400`,
          mapUrl: `https://www.google.com/maps/search/${encodeURIComponent((p.displayName?.text || '') + ' ' + activeCity)}`,
          description: p.editorialSummary?.text || p.formattedAddress || 'A great local spot for kids and families.',
        }));
        setLiveItems(mapped);
        setLoadingLive(false);
      })
      .catch(() => { setLiveItems([]); setLoadingLive(false); });
  }, [activeCity, activeTab]);

  // Re-label curated cards with the active city name
  const cityLabel = CITY_LABEL[activeCity] || activeCity;
  const curated = (CURATED[activeTab] || []).map(item => ({
    ...item,
    name: item.name.replace(/Sunnyvale/g, cityLabel),
    description: item.description,
    mapUrl: item.mapUrl.replace(/Sunnyvale/g, encodeURIComponent(cityLabel)),
  }));

  const all    = [...curated, ...liveItems];
  const shown  = all.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < all.length;
  const tagline     = TAGLINES[activeTab];
  const activeColor = TABS.find(t => t.id === activeTab)?.color || '#f59e0b';

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6ec', fontFamily: 'Nunito, sans-serif' }}>
      <Header cityName={activeCity} />
      <Controls
        activeCity={activeCity} setActiveCity={setActiveCity}
        activeTab={activeTab}   setActiveTab={setActiveTab}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px' }}>
        {/* Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '28px' }}>{tagline.emoji}</span>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '580px', margin: '6px auto 0', lineHeight: 1.5 }}>
            {tagline.text}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          {/* LEFT — Cards */}
          <div>
            {loadingLive && curated.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '18px' }}>
                Finding adventures near {activeCity} ✨
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '16px' }}>
                {shown.map(item => <ActivityCard key={item.id} activity={item} />)}
              </div>
            )}

            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  onClick={() => setPage(p => p + 1)}
                  style={{
                    background: `linear-gradient(135deg, ${activeColor}, #f97316)`,
                    color: '#fff', border: 'none', borderRadius: '30px',
                    padding: '12px 36px', fontSize: '15px', fontWeight: '800',
                    cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  }}>
                  View More ↓
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Map */}
          <div style={{ position: 'sticky', top: '20px' }}>
            <HeatMap city={activeCity} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
