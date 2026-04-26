import React from 'react'
import styles from './Stats.module.css'

export function Stats({ total, openCount, nearCount }) {
  return (
    <div className={styles.stats}>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{total}</div>
        <div className={styles.statLabel}>Free spots</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{openCount}</div>
        <div className={styles.statLabel}>Open today</div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statNum}>{nearCount}</div>
        <div className={styles.statLabel}>Within 5 mi</div>
      </div>
    </div>
  )
}
