import React, { useState, useEffect } from 'react'
import { Header }       from '.import Header from './Header'
import { Controls }     from import Controls from './Controls'
import { Stats }        from './components/Stats.jsx'
import { MapArea }      from import MapArea from './MapArea'
import { Countdown }   import Countdown from './Countdown'
import { ActivityCard } from import ActivityCard from './ActivityCard'
import { CardModal }    from './components/CardModal.jsx'
import { useWeather }   from './hooks/useWeather.js'
import { usePlaces }    from './hooks/usePlaces.js'
import { useActiveColor } from './hooks/useActiveColor.js'
import { TAB_LABELS }   from './lib/constants.js'
import styles from './App.module.css'

export default function App() {
  const [day,        setDay]        = useState('today')
  const [age,        setAge]        = useState('all')
  const [indoorOnly, setIndoorOnly] = useState(false)
  const [selected,   setSelected]   = useState(null)   // for modal

  const weather  = useWeather()
  const { activities, loading, source } = usePlaces()

  // Sync CSS variables to active tab color
  useActiveColor(day)

  // Auto-enable indoor when it's hot
  useEffect(() => {
    if (weather.isHot && !indoorOnly) setIndoorOnly(true)
  }, [weather.isHot])

  // Filter activities
  const filtered = activities.filter(item => {
    if (indoorOnly && item.type !== 'indoor') return false
    if (age !== 'all' && !item.ages.includes(age))  return false
    return true
  })

  const openCount = filtered.filter(i => i.open).length
  const nearCount = filtered.filter(i => i.dist <= 5).length

  const sectionTitle = indoorOnly
    ? `🏠 Indoor spots · ${TAB_LABELS[day]}`
    : `🗺️ Activities · ${TAB_LABELS[day]}`

  return (
    <>
      <Header weather={weather} />

      <Controls
        day={day}
        age={age}
        indoorOnly={indoorOnly}
        onDayChange={setDay}
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

      {/* Section header */}
      <div className={styles.sectionTitle}>
        {sectionTitle}
        {loading && <span className={styles.loadingBadge}>🔄 Refreshing…</span>}
        {!loading && source === 'live' && (
          <span className={styles.liveBadge}>📍 Live</span>
        )}
      </div>

      {/* Activity list */}
      <div>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No activities match your filters</div>
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
