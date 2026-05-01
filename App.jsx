import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import ActivityCard from './ActivityCard';
import HeatMap from './HeatMap';
import { CURATED, TABS } from './constants';

const TAGLINES = {
  indoor:  { text: 'From bounce houses to library corners, SunScout has the perfect indoor spot for every kid — rain, shine, or scorching heat.', emoji: '🏛️' },
  weekend: { text: 'From the tallest slides to the quietest library corners, SunScout is here to help you find the magic in every afternoon.', emoji: '🌈' },
  summer:  { text: 'Free summer adventures waiting for your crew — splash pads, hiking trails, movies under the stars, and so much more!', emoji: '☀️' },
  paid:    { text: 'Sometimes the best adventures are worth every penny. Curated paid classes and activities for kids 0 to teen.', emoji: '🎟️' },
};

const PAGE_SIZE = 5;

export default function App() {
  const [activeCity, setActiveCity]   = useState('Sunnyvale');
  const [activeTab, setActiveTab]     = useState('weekend');
  const [liveItems, setLiveItems]     = useState([]);
  const [loadingLive, setLoadingLive] = useState(false);
  const [page, setPage]               = useState(1);

  // Reset page when tab/city changes
  useEffect(() => { setPage(1); }, [activeCity, activeTab]);

  // Fetch live Google Places
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

  const curated = CURATED[activeTab] || [];
  const all     = [...curated, ...liveItems];
  const shown   = all.slice(0, page * PAGE_SIZE);
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

      {/* Main layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* LEFT — Cards */}
          <div>
            {loadingLive && curated.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '18px' }}>
                Finding adventures near you ✨
              </div>
            ) : (
              <>
                {/* 5-column grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '14px',
                }}>
                  {shown.map(a => <ActivityCard key={a.id} activity={a} />)}
                </div>

                {/* View More button */}
                {hasMore && (
                  <div style={{ textAlign: 'center', marginTop: '28px' }}>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      style={{
                        padding: '13px 52px', borderRadius: '40px', border: 'none',
                        background: 'linear-gradient(135deg, #a8edea, #fed6e3, #ffd89b)',
                        color: '#7c3aed', fontWeight: '900', fontSize: '17px',
                        cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      View More ↓
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT — Tagline + HeatMap */}
          <div style={{ position: 'sticky', top: '20px' }}>
            {/* Tagline card */}
            <div style={{
              background: '#fff8f0', borderRadius: '20px', padding: '24px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '44px', marginBottom: '10px' }}>{tagline.emoji}</div>
              <p style={{
                fontSize: '17px', fontWeight: '700', lineHeight: 1.55,
                background: `linear-gradient(135deg, ${activeColor}, #ef4444)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: '14px',
              }}>{tagline.text}</p>
              <p style={{ fontSize: '17px', fontWeight: '800', color: activeColor }}>
                Let's go exploring!
              </p>
              {loadingLive && (
                <p style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8' }}>
                  ⏳ Loading live spots…
                </p>
              )}
            </div>

            {/* Heat Map */}
            <HeatMap activeCity={activeCity} />
          </div>
        </div>
      </div>
    </div>
  );
}
