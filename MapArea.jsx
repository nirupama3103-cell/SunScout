import React, { useRef, useEffect, useState } from 'react'
import { LAT, LON } from './constants.js'
import styles from './MapArea.module.css'

/**
 * Projects a lat/lon to (x%, y%) within the visible map bounding box.
 * We define a rough bounding box around Sunnyvale so pins fall meaningfully.
 */
const BOUNDS = {
  minLat: 37.32,
  maxLat: 37.42,
  minLon: -122.08,
  maxLon: -121.98,
}

function toMapCoords(lat, lon, containerW, containerH) {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * containerW
  // lat increases upward, but CSS y increases downward
  const y = (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * containerH
  return { x, y }
}

export function MapArea({ activities, isHot }) {
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

  const userPos = toMapCoords(LAT, LON, size.w, size.h)
  const visiblePins = activities.slice(0, 8)

  return (
    <div className={styles.mapArea} ref={containerRef} role="img" aria-label="Map of nearby activities">
      <div className={styles.mapGrid} />
      <div className={styles.roadH} style={{ top: '38%' }} />
      <div className={styles.roadH} style={{ top: '62%' }} />
      <div className={styles.roadV} style={{ left: '28%' }} />
      <div className={styles.roadV} style={{ left: '60%' }} />

      {isHot && (
        <div className={styles.weatherAlert}>🌡️ Hot day — showing indoor picks!</div>
      )}

      {/* User location dot */}
      <div
        className={styles.myLocation}
        style={{ left: userPos.x, top: userPos.y }}
      />
      <div
        className={styles.locationLabel}
        style={{ left: userPos.x + 10, top: userPos.y - 8 }}
      >
        You
      </div>

      {/* Activity pins */}
      {visiblePins.map((item, i) => {
        const pos = toMapCoords(item.lat, item.lon, size.w, size.h)
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
