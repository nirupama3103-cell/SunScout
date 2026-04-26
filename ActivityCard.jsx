import React from 'react'
import styles from './ActivityCard.module.css'

export function ActivityCard({ activity, onClick }) {
  const { icon, name, desc, type, tags, ages, dist, open, rating, googleMapsUri } = activity

  function handleClick() {
    if (googleMapsUri) {
      window.open(googleMapsUri, '_blank', 'noopener,noreferrer')
    } else {
      onClick?.(activity)
    }
  }

  return (
    <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`${name} — ${desc}`}
    >
      <div className={styles.icon}>{icon}</div>

      <div className={styles.body}>
        <div className={styles.name}>{name}</div>
        <div className={styles.meta}>{desc}</div>
        <div className={styles.tags}>
          <span className={styles.tagFree}>FREE</span>
          {type === 'indoor'
            ? <span className={`${styles.tag} ${styles.tagIndoor}`}>Indoor</span>
            : <span className={`${styles.tag} ${styles.tagOutdoor}`}>Outdoor</span>
          }
          {tags.includes('hot-day') && (
            <span className={`${styles.tag} ${styles.tagHot}`}>🌡️ Hot day pick</span>
          )}
          <span className={`${styles.tag} ${styles.tagAge}`}>
            {Array.isArray(ages) ? ages.join(', ') : ages}
          </span>
          {rating && (
            <span className={`${styles.tag} ${styles.tagRating}`}>⭐ {rating.toFixed(1)}</span>
          )}
        </div>
      </div>

      <div className={styles.distance}>
        <span>{dist} mi</span>
        <span className={open ? styles.open : styles.closed}>
          {open ? '● Open' : '○ Closed'}
        </span>
      </div>
    </div>
  )
}
