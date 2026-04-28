import React, { useEffect } from 'react'
import styles from './CardModal.module.css'

export function CardModal({ activity, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!activity) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
        <div className={styles.iconBig}>{activity.icon}</div>
        <h2 className={styles.title}>{activity.name}</h2>
        <p className={styles.desc}>{activity.desc}</p>
        <div className={styles.row}>
          <span>📍 {activity.dist} miles away</span>
          <span style
