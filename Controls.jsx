import React, { useEffect, useRef } from 'react'
import { TAB_COLORS } from './constants.js'
import styles from './Controls.module.css'

const TABS = [
  { id: 'today',   label: 'Today' },
  { id: 'weekend', label: 'Weekend' },
  { id: 'week',    label: 'This Week' },
  { id: 'month',   label: 'This Month' },
  { id: 'summer',  label: 'All Summer' },
]

const AGES = [
  { id: 'all',     label: 'All Ages' },
  { id: 'toddler', label: '🍼 Toddler' },
  { id: 'kids',    label: '🎒 5–10' },
  { id: 'teens',   label: '🎮 Teens' },
]

export function Controls({ day, age, indoorOnly, onDayChange, onAgeChange, onIndoorToggle }) {
  const tabRefs = useRef({})

  useEffect(() => {
    TABS.forEach(({ id }, i) => {
      const el = tabRefs.current[id]
      if (!el) return
      setTimeout(() => {
        el.classList.add(styles.shimmer)
        el.addEventListener('animationend', () => el.classList.remove(styles.shimmer), { once: true })
      }, i * 120 + 300)
    })
  }, [])

  function handleDayClick(id) {
    const el = tabRefs.current[id]
    if (el) {
      el.classList.add(styles.shimmer)
      el.addEventListener('animationend', () => el.classList.remove(styles.shimmer), { once: true })
    }
    onDayChange(id)
  }

  const activeColor = TAB_COLORS[day]?.hex || '#007bff'

  return (
    <div className={styles.controls}>
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          ref={el => (tabRefs.current[id] = el)}
          className={`${styles.tab} ${styles[`tab_${id}`]} ${day === id ? styles.tabActive : styles.tabInactive}`}
          onClick={() => handleDayClick(id)}
          aria-pressed={day === id}
        >
          {label}
        </button>
      ))}
      <div className={styles.separator} />
      {AGES.map(({ id, label }) => (
        <button
          key={id}
          className={styles.ageBtn}
          style={age === id ? { background: activeColor, borderColor: activeColor, color: '#fff' } : {}}
          onClick={() => onAgeChange(id)}
          aria-pressed={age === id}
        >
          {label}
        </button>
      ))}
      <div className={styles.separator} />
      <button
        className={`${styles.indoorToggle} ${indoorOnly ? styles.indoorToggleActive : ''}`}
        onClick={onIndoorToggle}
        aria-pressed={indoorOnly}
      >
        🏠 Indoor only
      </button>
    </div>
  )
}
