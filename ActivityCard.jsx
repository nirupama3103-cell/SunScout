import React from 'react';

const IMGS = {
  library:   'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format',
  community: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&auto=format',
  park:      'https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=500&auto=format',
  splash:    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&auto=format',
  art:       'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format',
  movie:     'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format',
  hiking:    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format',
  stem:      'https://images.unsplash.com/photo-1581092160562-40aa08e9dbd0?w=500&auto=format',
  camp:      'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500&auto=format',
  indoor:    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format',
};

function getImage(a) {
  const n = (a.name || '').toLowerCase();
  if (n.includes('library') || n.includes('reading') || n.includes('storytime')) return IMGS.library;
  if (n.includes('splash') || n.includes('pool'))                                 return IMGS.splash;
  if (n.includes('art') || n.includes('paint') || n.includes('craft'))           return IMGS.art;
  if (n.includes('movie') || n.includes('film'))                                  return IMGS.movie;
  if (n.includes('hik') || n.includes('trail') || n.includes('creek'))           return IMGS.hiking;
  if (n.includes('stem') || n.includes('robot') || n.includes('coding'))         return IMGS.stem;
  if (n.includes('camp'))                                                          return IMGS.camp;
  if (n.includes('community') || n.includes('center'))                            return IMGS.community;
  if ((a.category || '') === 'indoor')                                             return IMGS.indoor;
  return IMGS.park;
}

function buildMapUrl(a) {
  if (a.mapUrl && a.mapUrl.startsWith('http')) return a.mapUrl;
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((a.name || '') + ' ' + (a.city || ''));
}

function ActivityCard({ activity, onClick }) {
  const isPaid = (activity.category || '').toLowerCase().includes('paid');
  const badge = isPaid ? 'PAID' : 'FREE';
  const badgeColor = isPaid ? '#f59e0b' : '#22c55e';

  return React.createElement('div', {
    onClick: onClick,
    style: {
      backgroundColor: 'white', borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden',
      cursor: 'pointer', transition: 'transform 0.15s ease',
    },
    onMouseEnter: function(e) { e.currentTarget.style.transform = 'translateY(-2px)'; },
    onMouseLeave: function(e) { e.currentTarget.style.transform = 'translateY(0)'; },
  },
    React.createElement('div', { style: { position: 'relative' } },
      React.createElement('img', {
        src: getImage(activity),
        alt: activity.name,
        loading: 'lazy',
        onError: function(e) { e.target.onerror = null; e.target.src = IMGS.park; },
        style: { width: '100%', height: '180px', objectFit: 'cover', display: 'block' }
      }),
      React.createElement('span', {
        style: {
          position: 'absolute', top: '10px', right: '10px',
          backgroundColor: badgeColor, color: 'white',
          padding: '3px 10px', borderRadius: '20px',
          fontSize: '0.75rem', fontWeight: 700,
        }
      }, badge)
    ),
    React.createElement('div', { style: { padding: '16px 20px 20px' } },
      React.createElement('h3', {
        style: { margin: '0 0 6px 0', color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }
      }, activity.name),
      React.createElement('p', {
        style: { color: '#475569', lineHeight: '1.5', marginBottom: '16px', fontSize: '0.875rem', minHeight: '2.5em' }
      }, activity.description),
      React.createElement('a', {
        href: buildMapUrl(activity),
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
  );
}

export default ActivityCard;
