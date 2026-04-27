import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Controls } from './Controls'
import { Stats } from './Stats'
import { MapArea } from './MapArea'
import { Countdown } from './Countdown'
import { ActivityCard } from './ActivityCard'
import { CardModal } from './CardModal'
import { useWeather } from './useWeather'
import { usePlaces } from './usePlaces'
import { useActiveColor } from './useActiveColor'
import { TAB_LABELS } from './constants'
import styles from './App.module.css'

export default function App() {
  // 1. CHANGE: Track 'city' instead of just 'day' if your tabs are city-based
  const [city, setCity] = useState('CA') 
  const [age, setAge] = useState('all')
  const [indoorOnly, setIndoorOnly] = useState(false)
  const [selected, setSelected] = useState(null)

  const weather = useWeather(city) // Pass city to weather if it supports it
  
  // 2. CRITICAL: Pass 'city' to your custom hook so it knows where to fetch
  const { activities, loading, source } = usePlaces(city)

  // Sync CSS colors
  useActiveColor(city)

  useEffect(() => {
    if (weather.isHot && !indoorOnly) setIndoorOnly(true)
  }, [weather.isHot])

  // Filter activities
  const filtered = activities.filter(item => {
    if (indoorOnly && item.type !== 'indoor') return false
    // Ensure item.ages exists before calling .includes to prevent crashes
    if (age !== 'all' && item.ages && !item.ages.includes(age)) return false
    return true
  })

  const openCount = filtered.filter(i => i.open).length
  const nearCount = filtered.filter(i => i.dist <= 5).length

  // Update title based on city/tab
  const sectionTitle = indoorOnly
    ? `🏠 Indoor spots · ${TAB_LABELS[city] || city}`
    : `🗺️ Activities · ${TAB_LABELS[city] || city}`

  return (
    <>
      <Header weather={weather} />

      <Controls
        day={city}           // Using city as the primary tab driver
        age={age}
        indoorOnly={indoorOnly}
        onDayChange={setCity} // Renamed internally to onCityChange essentially
        onAgeChange={setAge}
        onIndoorToggle={() => setIndoorOnly(v => !v)}
      />

      <Stats
        total={filtered.length}
        openCount={openCount}
        nearCount={nearCount}
      />

      <MapArea activities={filtered} isHot={weather.isHot} />

      <Countdown />

      <div className={styles.sectionTitle}>
        {sectionTitle}
        {loading && <span className={styles.loadingBadge}>🔄 Refreshing…</span>}
        {!loading && source === 'live' && (
          <span className={styles.liveBadge}>📍 Live Data</span>
        )}
      </div>

      <div className={styles.activityGrid}> 
        {filtered.length === 0 ? (
          <div className={styles.empty}>No activities match your filters in {city}</div>
        ) : (
          filtered.map((item, i) => (
            <ActivityCard
              key={item.id}
              activity={item}
              onClick={setSelected}
              style={{ animationDelay: `${i * 0.04}s` }}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        📍 Weather: Open-Meteo · Activities: Google Places · Refreshes every 30 min
      </div>

      {selected && (
        <CardModal activity={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
