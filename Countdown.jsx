import React, { useEffect, useState } from 'react'
import styles from './Countdown.module.css'

function getSummerStats() {
  const now = new Date()
  const year = now.getFullYear()
  const start = new Date(year, 5, 1)   // June 1
  const end   = new Date(year, 8, 1)   // Sept 1
  const total = (end - start) / 86_400_000
  const left  = Math.max(0, Math.ceil((end - now) / 86_400_000))
  const pct   = Math.round(((total - left) / total) * 100)
  return { left, pct }
}

export function Countdown() {
  const [{ left, pct }, setStats] = useState({ left: 0, pct: 0 })
  const [barWidth, setBarWidth] = useState(0)

  useEffect(() => {
    const s = getSummerStats()
    setStats(s)
    // Animate bar in after short delay
    const t = setTimeout(() => setBarWidth(s.pct), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.countdown}>
      <div>
        <div className={styles.days}>{left}</div>
        <div className={styles.label}>days of summer left</div>
      </div>
      <div className={styles.barWrap}>
        <div className={styles.barFill} style={{ width: `${barWidth}%` }} />
      </div>
      <div className={styles.endLabel}>Sept 1</div>
    </div>
  )
}
