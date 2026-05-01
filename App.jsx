
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import ActivityCard from './ActivityCard';
import { CURATED, TABS } from './constants';

const TAGLINES = {
  indoor:  { text: 'From bounce houses to library corners, SunScout has the perfect indoor spot for every kid — rain, shine, or scorching heat.', emoji: '🏛️' },
  weekend: { text: 'From the tallest slides to the quietest library corners, SunScout is here to help you find the magic in every afternoon.', emoji: '🌈' },
  summer:  { text: 'Free summer adventures for your crew — splash pads, hiking trails, movies under the stars, and so much more!', emoji: '☀️' },
  paid:    { text: 'Sometimes the best adventures are worth every penny. Curated paid classes and activities for kids 0 to teen.', emoji: '🎟️' },
};

const PAGE_SIZE = 6;
const CITY_LABEL = {
  'Sunnyvale':'Sunnyvale','San Jose':'San Jose','Cupertino':'Cupertino',
  'Mountain View':'Mountain View','Palo Alto':'Palo Alto','Saratoga':'Saratoga',
};

export default function App() {
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab,  setActiveTab]  = useState('weekend');
  const [liveItems,  setLiveItems]  = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [page,       setPage]       = useState(1);

  useEffect(() => { setPage(1); setLiveItems([]); }, [activeCity, activeTab]);

  useEffect(() => {
    setLoading(true);
    const queries = {
      indoor:  `library OR "community center" OR "indoor play" kids ${activeCity}`,
      weekend: `park OR playground kids ${activeCity}`,
      summer:  `splash pad OR "free summer" OR hiking kids ${activeCity}`,
      paid:    `kids classes OR "youth sports" OR gym ${activeCity}`,
    };
    fetch(`/api/places?query=${encodeURIComponent(queries[activeTab])}`)
      .then(r => r.json())
      .then(data => {
        const places = (data.places || []).slice(0, 6);
        setLiveItems(places.map((p, i) => ({
          id: `live-${i}`,
          name: p.displayName?.text || 'Local Spot',
          free: activeTab === 'summer' || activeTab === 'weekend',
          image: `https://picsum.photos/seed/${activeTab}${activeCity}${i}/600/400`,
          mapUrl: `https://www.google.com/maps/search/${encodeURIComponent((p.displayName?.text || '') + ' ' + activeCity)}`,
          description: p.editorialSummary?.text || p.formattedAddress || 'A great local spot for kids and families.',
        })));
        setLoading(false);
      })
      .catch(() => { setLiveItems([]); setLoading(false); });
  }, [activeCity, activeTab]);

  const cityLabel = CITY_LABEL[activeCity] || activeCity;
  const curated = (CURATED[activeTab] || []).map(item => ({
    ...item,
    name: item.name.replace(/Sunnyvale/g, cityLabel),
    mapUrl: item.mapUrl.replace(/Sunnyvale/g, encodeURIComponent(cityLabel)),
  }));

  const all     = [...curated, ...liveItems];
  const shown   = all.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < all.length;
  const tagline     = TAGLINES[activeTab];
  const activeColor = TABS.find(t => t.id === activeTab)?.color || '#f59e0b';

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6ec', fontFamily: 'Nunito, sans-serif' }}>
      <Header cityName={activeCity} />
      <Controls activeCity={activeCity} setActiveCity={setActiveCity} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '28px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start' }}>

          {/* 3-col card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {shown.map(item => <ActivityCard key={item.id} activity={item} />)}
          </div>

          {/* Right tagline panel */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '48px', marginBottom: '14px' }}>{tagline.emoji}</div>
              <p style={{ fontSize: '17px', fontWeight: '800', color: '#374151', lineHeight: 1.6, marginBottom: '20px' }}>
                {tagline.text}
              </p>
              <p style={{ fontSize: '20px', fontWeight: '900', color: activeColor }}>
                Let's go exploring!
              </p>
              {loading && <p style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8' }}>⏳ Loading near {activeCity}…</p>}
            </div>
          </div>
        </div>

        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <button onClick={() => setPage(p => p + 1)}
              style={{
                background: 'linear-gradient(135deg, #a8edea, #fed6e3, #ffd89b)',
                color: '#7c3aed', border: 'none', borderRadius: '50px',
                padding: '16px 68px', fontSize: '20px', fontWeight: '900',
                cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                boxShadow: '0 6px 24px rgba(0,0,0,0.13)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            >View More</button>
          </div>
        )}
      </div>
    </div>
  );
}
