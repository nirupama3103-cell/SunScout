import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import ActivityCard from './ActivityCard';
import WeatherBanner from './WeatherBanner';
import { CURATED, TABS } from './constants';

const TAGLINES = {
  indoor:  { text: 'From bounce houses to library corners, SunScout has the perfect indoor spot for every kid — rain, shine, or scorching heat.', emoji: '🏛️' },
  weekend: { text: 'From the tallest slides to the quietest library corners, find the magic in every afternoon with the whole family.', emoji: '🌈' },
  summer:  { text: 'Free summer adventures waiting for your crew — splash pads, hiking trails, movies under the stars, and so much more!', emoji: '☀️' },
  paid:    { text: 'Sometimes the best adventures are worth every penny. Curated paid classes and activities for kids 0 to teen.', emoji: '🎟️' },
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

export default function App() {
  const [activeCity, setActiveCity] = useState('Sunnyvale');
  const [activeTab,  setActiveTab]  = useState('weekend');
  const [liveItems,  setLiveItems]  = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [page,       setPage]       = useState(1);
  const [weatherTemp, setWeatherTemp] = useState(null);

  // Weather for banner
  useEffect(() => {
    const c = CITY_COORDS[activeCity] || CITY_COORDS['Sunnyvale'];
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true&temperature_unit=fahrenheit`)
      .then(r => r.json())
      .then(d => setWeatherTemp(Math.round(d.current_weather?.temperature || 72)))
      .catch(() => setWeatherTemp(72));
  }, [activeCity]);

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

  const cityLabel = activeCity;
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

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '24px 16px 80px' }}>

        <WeatherBanner temp={weatherTemp} city={activeCity} setActiveTab={setActiveTab} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '28px', alignItems: 'start' }}>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
              {shown.map(item => <ActivityCard key={item.id} activity={item} />)}
            </div>

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
            <div style={{ background: '#fff', borderRadius: '22px', padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '48px', marginBottom: '14px', lineHeight: 1 }}>{tagline.emoji}</div>
              <p style={{ fontSize: '17px', fontWeight: '800', color: '#374151', lineHeight: 1.6, marginBottom: '18px', margin: '0 0 18px' }}>
                {tagline.text}
              </p>
              <p style={{ fontSize: '19px', fontWeight: '900', color: activeColor, margin: 0 }}>
                Let's go exploring!
              </p>
              {loading && <p style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8', margin: '12px 0 0' }}>
                Loading live spots near {activeCity}…
              </p>}
            </div>

            <div style={{ marginTop: '16px', background: '#fff', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Filter</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['All','FREE only','PAID only'].map(f => (
                  <button key={f} style={{
                    padding: '5px 12px', borderRadius: '20px', border: '1.5px solid #e2e8f0',
                    background: f === 'All' ? '#7c3aed' : '#fff',
                    color: f === 'All' ? '#fff' : '#64748b',
                    fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                    fontFamily: 'Nunito, sans-serif',
                  }}>{f}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
