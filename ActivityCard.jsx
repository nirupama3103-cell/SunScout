import React from 'react';

const IMGS = {
  library:   'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format',
  community: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&auto=format',
  park:      'https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=500&auto=format',
  splash:    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&auto=format',
  indoor:    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format',
  camp:      'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500&auto=format',
  coding:    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format',
};

function getImage(activity) {
  const name = (activity.name || '').toLowerCase();
  if (name.includes('library') || name.includes('storytime')) return IMGS.library;
  if (name.includes('splash') || name.includes('pool'))       return IMGS.splash;
  if (name.includes('coding') || name.includes('robotics'))   return IMGS.coding;
  if (name.includes('camp'))                                   return IMGS.camp;
  if (name.includes('community') || name.includes('center'))  return IMGS.community;
  if ((activity.category || '') === 'indoor')                 return IMGS.indoor;
  return IMGS.park;
}

function ActivityCard({ activity, onClick }) {
  return (
    React.createElement('div', {
      onClick: onClick,
      style: {
        backgroundColor: 'white', borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden',
        cursor: 'pointer',
      }
    },
      React.createElement('img', {
        src: getImage(activity),
        alt: activity.name,
        loading: 'lazy',
        onError: function(e) { e.target.onerror = null; e.target.src = IMGS.park; },
        style: { width: '100%', height: '180px', objectFit: 'cover', display: 'block' }
      }),
      React.createElement('div', { style: { padding: '16px 20px 20px' } },
        React.createElement('h3', {
          style: { margin: '0 0 6px 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }
        }, activity.name),
        React.createElement('p', {
          style: { color: '#475569', lineHeight: '1.5', marginBottom: '16px', fontSize: '0.9rem' }
        }, activity.description),
        React.createElement('a', {
          href: activity.mapUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          onClick: function(e) { e.stopPropagation(); },
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#ef4444', color: 'white', padding: '10px 16px',
            borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }
        }, 'View on Map')
      )
    )
  );
}

export default ActivityCard;
