import React, { useRef, useEffect, useState } from 'react'
import { CITY_COORDS } from './constants.js' // Changed from LAT, LON
import styles from './MapArea.module.css'

/**
 * Helper to calculate bounds around a center point 
 * so pins are always centered in the map view.
 */
function getBounds(lat, lon) {
  const padding = 0.05; // Adjust this to zoom in/out
  return {
    minLat: lat - padding,
    maxLat: lat + padding,
    minLon: lon - padding,
    maxLon: lon + padding,
  }
}

function toMapCoords(lat, lon, bounds, containerW, containerH) {
  const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * containerW
  const y = (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * containerH
  return { x, y }
}

export function MapArea({ activities, centerCity = 'CA', isHot }) {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: 360, h: 200 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({ w: entry.contentRect.width, h: entry.contentRect.height })
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 1. Get dynamic bounds based on the selected city
  const cityData = CITY_COORDS[centerCity] || CITY_COORDS['CA']
  const bounds = getBounds(cityData.lat, cityData.lon)

  // 2. Project user position using the new bounds
  const userPos = toMapCoords(cityData.lat, cityData.lon, bounds, size.w, size.h)
  const visiblePins = activities.slice(0, 8)

  return (
    <div className={styles.mapArea} ref={containerRef} role="img" aria-label={`Map of ${centerCity}`}>
      <div className={styles.mapGrid} />
      
      {/* Visual road decorations */}
      <div className={styles.roadH} style={{ top: '38%' }} />
      <div className={styles.roadV} style={{ left: '28%' }} />

      {isHot && (
        <div className={styles.weatherAlert}>🌡️ Hot day — showing indoor picks!</div>
      )}

      {/* User location dot */}
      <div
        className={styles.myLocation}
        style={{ left: userPos.x, top: userPos.y }}
      />

      {/* Activity pins projected into city bounds */}
      {visiblePins.map((item, i) => {
        const pos = toMapCoords(item.lat, item.lon, bounds, size.w, size.h)
        return (
          <div
            key={item.id}
            className={styles.pin}
            style={{
              left: pos.x,
              top: pos.y,
              animationDelay: `${i * 0.08}s`,
            }}
            title={item.name}
          >
            {item.icon}
          </div>
        )
      })}
    </div>
  )
}
