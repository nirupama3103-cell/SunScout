import React from 'react';

const IMGS = {
  library:   'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format',
  community: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&auto=format',
  park:      'https://images.unsplash.com/photo-1587502537745-84b86da1204f?w=500&auto=format',
  splash:    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=500&auto=format',
  indoor:    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&auto=format',
  museum:    'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=500&auto=format',
  camp:      'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=500&auto=format',
  ymca:      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format',
  coding:    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format',
};

function getImage(activity) {
  const name = (activity.name || '').toLowerCase();
  const cat  = (activity.category || '').toLowerCase();
  if (name.includes('library') || name.includes('storytime')) return IMGS.library;
  if (name.includes('splash') || name.includes('pool'))       return IMGS.splash;
  if (name.includes('museum'))                                 return IMGS.museum;
  if (name.includes('coding') || name.includes('robotics'))   return IMGS.coding;
  if (name.includes('camp'))                                   return IMGS.camp;
  if (name.includes('ymca') || name.includes('fitness'))      return IMGS.ymca;
  if (name.includes('community') || name.includes('center'))  return IMGS.community;
  if (name.includes('park') || name.includes('trail'))        return IMGS.park;
  if (cat === 'indoor')                                        return IMGS.indoor;
  return IMGS.park;
}

const ActivityCard = ({ activity, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: 'white', borderRadius: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden',
      cursor: 'pointer', transition: 'transform 0.15s ease',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <img
      src={getImage(activity)}
      alt={activity.name}
      loading="lazy"
      onError={e => { e.target.onerror = null; e.target.src = IMGS.park; }}
      style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
    />
    <div style={{ padding: '16px 20px 20px' }}>
      <h3 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1.1rem', fontWeight: 700 }}>
        {activity.name}
      </h3>
      <p style={{ color: '#475569', lineHeight: '1.5', marginBottom: '16px', fontSize: '0.9rem', minHeight: '2.7em' }}>
        {activity.description}
      </p>
      
        href={activity.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          backgroundColor: '#ef4444', color: 'white', padding: '10px 16px',
          borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
        }}
      >
        View on Map 🏎️
      </a>
    </div>
  </div>
);

export default ActivityCard;
