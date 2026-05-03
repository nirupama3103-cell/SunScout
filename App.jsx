import React, { useState, useEffect } from 'react';
import Header from './Header';
import FloatingDeco from './FloatingDeco';
import Controls from './Controls';
import ActivityCard from './ActivityCard';
import WeatherBanner from './WeatherBanner';
import { CURATED, TABS } from './constants';

const TAGLINES = {
  indoor:  { text: 'From bounce houses to library corners, SunScout has the perfect indoor spot for every kid.', emoji: '🏛️' },
  weekend: { text: 'From the tallest slides to the quietest library corners, find the magic in every afternoon.', emoji: '🌈' },
  summer:  { text: 'Free summer adventures — splash pads, hiking trails, movies under the stars!', emoji: '☀️' },
  paid:    { text: 'Sometimes the best adventures are worth every penny. Curated for kids 0 to teen.', emoji: '🎟️' },
};

const PAGE_SIZE = 6;
const CITY_COORDS = {
  'Sunnyvale':     { lat: 37.3688, lon: -122.0363 },
  'San Jose':      { lat: 37.3382, lon: -121.8863 },
  'Cupertino':     { lat: 37.3229, lon: -122.0322 },
  'Mountain View': { lat: 37.3861, lon: -122.0839 },
  'Palo Alto':     { lat: 37.4419, lon: -122.1430 },
  'Saratoga':      { lat: 37.2638, lon: -122.0230 },
};

const AGE_GROUPS = [
  { id: 'all',   label: 'All Ages',  emoji: '👨‍👩‍👧‍👦' },
  { id: '0-2',   label: '0–2',       emoji: '👶' },
  { id: '3-5',   label: '3–5',       emoji: '🧒' },
  { id: '6-12',  label: '6–12',      emoji: '🧑' },
  { id: 'teen',  label: 'Teen',      emoji: '🧑‍🎤' },
];

const AGE_KEYWORDS = {
  '0-2':  ['infant','toddler','baby','0-2','0 to 2','youngest'],
  '3-5':  ['preschool','3-5','ages 3','ages 4','ages 5','young kids'],
  '6-12': ['6-12','ages 6','ages 7','ages 8','ages 9','ages 10','school age','elementary'],
  'teen': ['teen','teenager','12-16','youth','tween'],
};

export default function App() {
  const [activeCity,  setActiveCity]  = useState('Sunnyvale');
  const [activeTab,   setActiveTab]   = useState('weekend');
  const [liveItems,   setLiveItems]   = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [page,        setPage]        = useState(1);
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [filter,      setFilter]      = useState('all');
  const [search,      setSearch]      = useState('');
  const [ageGroup,    setAgeGroup]    = useState('all');

  useEffect(() => {
    const c = CITY_COORDS[activeCity] || CITY_COORDS['Sunnyvale'];
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true&temperature_unit=fahrenheit`)
      .then(r => r.json())
      .then(d => setWeatherTemp(Math.round(d.current_weather?.temperature || 72)))
      .catch(() => setWeatherTemp(72));
  }, [activeCity]);

  useEffect(() => { setPage(1); setLiveItems([]); setFilter('all'); setSearch(''); setAgeGroup('all'); }, [activeCity, activeTab]);

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

  const cityLabel = activeCity;
  const curated = (CURATED[activeTab] || []).map(item => ({
    ...item,
    name: item.name.replace(/Sunnyvale/g, cityLabel),
    mapUrl: item.mapUrl.replace(/Sunnyvale/g, encodeURIComponent(cityLabel)),
  }));

  const all = [...curated, ...liveItems];

  // Search filter
  const searched = search.trim()
    ? all.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.description || '').toLowerCase().includes(search.toLowerCase()))
    : all;

  // Age filter
  const aged = ageGroup === 'all' ? searched : searched.filter(i =>
    !i.ageGroups || i.ageGroups.length === 0 || i.ageGroups.includes(ageGroup)
  );

  // Cost filter
  const filtered = filter === 'free' ? aged.filter(i => i.free === true)
                 : filter === 'paid' ? aged.filter(i => i.free === false)
                 : aged;

  const shown   = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = shown.length < filtered.length;
  const tagline     = TAGLINES[activeTab];
  const activeColor = TABS.find(t => t.id === activeTab)?.color || '#f59e0b';

  const FILTERS = [
    { id: 'all',  label: 'All',       color: '#7c3aed' },
    { id: 'free', label: 'FREE only', color: '#16a34a' },
    { id: 'paid', label: 'PAID only', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Nunito, sans-serif' }}>
      <FloatingDeco />
      <Header cityName={activeCity} />
      <Controls activeCity={activeCity} setActiveCity={setActiveCity} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Search parks, swim, library, splash pad..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{
              width: '100%', padding: '13px 44px 13px 44px',
              borderRadius: '16px', border: '2px solid rgba(255,255,255,0.6)',
              fontSize: '15px', fontFamily: 'Nunito, sans-serif',
              fontWeight: '600', color: '#1e293b',
              background: 'rgba(255,255,255,0.85)',
              outline: 'none', boxSizing: 'border-box',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            }}
            onFocus={e => e.target.style.borderColor = '#7c3aed'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.6)'}
          />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1); }} style={{
              position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
              background: '#94a3b8', border: 'none', borderRadius: '50%',
              width: '22px', height: '22px', color: '#fff', fontSize: '12px',
              cursor: 'pointer', fontWeight: '900', lineHeight: '22px', textAlign: 'center',
            }}>✕</button>
          )}
        </div>

        {/* Age group filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
          {AGE_GROUPS.map(ag => (
            <button key={ag.id} onClick={() => { setAgeGroup(ag.id); setPage(1); }} style={{
              padding: '7px 16px', borderRadius: '20px', border: 'none',
              background: ageGroup === ag.id ? '#f97316' : 'rgba(255,255,255,0.75)',
              color: ageGroup === ag.id ? '#fff' : '#475569',
              fontSize: '13px', fontWeight: '800', cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: ageGroup === ag.id ? '0 3px 10px rgba(249,115,22,0.4)' : '0 1px 4px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
            }}>{ag.emoji} {ag.label}</button>
          ))}
        </div>

        <WeatherBanner temp={weatherTemp} city={activeCity} setActiveTab={setActiveTab} activeTab={activeTab} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '28px', alignItems: 'start' }}>
          <div>
            {shown.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.7)', borderRadius: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                <p style={{ fontSize: '18px', fontWeight: '800', color: '#475569' }}>No activities found!</p>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>Try a different search or filter.</p>
              </div>
            ) : (
              <div className="card-grid">
                {shown.map(item => <ActivityCard key={item.id} activity={item} />)}
              </div>
            )}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <button onClick={() => setPage(p => p + 1)} style={{
                  background: 'linear-gradient(135deg, #a8edea, #fed6e3, #ffd89b)',
                  color: '#7c3aed', border: 'none', borderRadius: '50px',
                  padding: '15px 60px', fontSize: '18px', fontWeight: '900',
                  cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                >View More</button>
              </div>
            )}
          </div>

          <div style={{ position: 'sticky', top: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '22px', padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '16px' }}>
              <div style={{ fontSize: '48px', marginBottom: '14px', lineHeight: 1 }}>{tagline.emoji}</div>
              <p style={{ fontSize: '17px', fontWeight: '800', color: '#374151', lineHeight: 1.6, margin: '0 0 18px' }}>
                {tagline.text}
              </p>
              <p style={{ fontSize: '19px', fontWeight: '900', color: activeColor, margin: 0 }}>
                Let's go exploring!
              </p>
              {loading && <p style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8', margin: '12px 0 0' }}>
                Loading near {activeCity}…
              </p>}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '16px', padding: '16px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Filter by cost</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {FILTERS.map(f => (
                  <button key={f.id} onClick={() => { setFilter(f.id); setPage(1); }} style={{
                    padding: '7px 14px', borderRadius: '20px',
                    border: filter === f.id ? 'none' : '1.5px solid #e2e8f0',
                    background: filter === f.id ? f.color : 'rgba(255,255,255,0.8)',
                    color: filter === f.id ? '#fff' : '#64748b',
                    fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                    fontFamily: 'Nunito, sans-serif', transition: 'all 0.15s',
                  }}>{f.label}</button>
                ))}
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Showing {shown.length} of {filtered.length} activities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
