import React, { useState } from 'react'
import { CardModal } from './CardModal'
import styles from './ActivityCard.module.css'

export function ActivityCard({ activity }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className={styles.card} onClick={() => setShowModal(true)}>
        <div className={styles.icon}>{activity.icon || '📍'}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>
            {activity.displayName?.text || activity.name || 'Unknown Place'}
          </h3>
          {activity.formattedAddress && (
            <p className={styles.address}>{activity.formattedAddress}</p>
          )}
          {activity.editorialSummary?.text && (
            <p className={styles.desc}>{activity.editorialSummary.text}</p>
          )}
          <div className={styles.tags}>
            {activity.dist && (
              <span className={styles.tag}>📍 {activity.dist} mi</span>
            )}
            {activity.open !== undefined && (
              <span className={styles.tag} style={{ color: activity.open ? 'green' : 'red' }}>
                {activity.open ? '● Open' : '○ Closed'}
              </span>
            )}
            {activity.googleMapsUri && (
              
                className={styles.tag}
                href={activity.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                🗺️ Maps
              </a>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <CardModal activity={activity} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}