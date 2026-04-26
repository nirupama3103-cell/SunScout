import React from 'react'
import styles from './Header.module.css'

export function Header({ weather }) {
  const { temp, feel, wind, desc, city } = weather

  return (
    <header className={styles.header}>
      <div className={styles.sunBg} aria-hidden="true">☀️</div>
      <h1 className={styles.title}>☀️ Free Summer Fun</h1>
      <p className={styles.location}>{city} · {desc}</p>
      <div className={styles.weatherBar}>
        <span className={styles.temp}>{temp != null ? `${temp}°F` : '--°F'}</span>
        <span className={styles.desc}>{desc}</span>
        {feel != null && <span className={styles.pill}>Feels {feel}°F</span>}
        {wind != null && <span className={styles.pill}>💨 {wind} mph</span>}
      </div>
    </header>
  )
}
