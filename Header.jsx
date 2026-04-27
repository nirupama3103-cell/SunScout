import React from 'react'
import styles from './Header.module.css'

export function Header({ city }) {
  return (
    <header className={styles.header}>
      <div className={styles.sunBg} aria-hidden="true">☀️</div>
      <h1 className={styles.title}>☀️ Free Summer Fun</h1>
      <p className={styles.location}>{city}</p>
    </header>
  )
}
