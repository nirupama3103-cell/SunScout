import React, { useState } from 'react';
import { HEAT_PINS } from './constants';

const TYPE_COLORS = {
  park:    { bg: '#22c55e', emoji: '🌳' },
  splash:  { bg: '#3b82f6', emoji: '💦' },
  library: { bg: '#8b5cf6', emoji: '📚' },
  indoor:  { bg: '#f59e0b', emoji: '🏛️' },
};

// Sunnyvale-area bounding box
const BOUNDS = {
  minLat: 37.25, maxLat: 37.43,
  minLon: -122.15, maxLon: -121.82,
};

function project(lat, lon, width, height) {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * width;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * height;
  return { x, y };
}

export default function HeatMap({ activeCity }) {
  const [tooltip, setTooltip] = useState(null);
  const pins = HEAT_PINS[activeCity] || HEAT_PINS['Sunnyvale'];
  const W = 420, H = 220;

  return (
    <div style={{
      background: '#fff', borderRadius: '20px',
      padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      marginTop: '20px',
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>
        📍 Activity Map — {activeCity}
      </h3>

      {/* Map SVG */}
      <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block', background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)', borderRadius: '12px' }}>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map(f => (
            <g key={f}>
              <line x1={W * f} y1={0} x2={W * f} y2={H} stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1={0} y1={H * f} x2={W} y2={H * f} stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4,4" />
            </g>
          ))}

          {/* Heat glow circles */}
          {pins.map((pin, i) => {
            const { x, y } = project(pin.lat, pin.lon, W, H);
            const col = TYPE_COLORS[pin.type] || TYPE_COLORS.park;
            return (
              <circle key={`glow-${i}`} cx={x} cy={y} r={22}
                fill={col.bg} opacity={0.12} />
            );
          })}

          {/* Pins */}
          {pins.map((pin, i) => {
            const { x, y } = project(pin.lat, pin.lon, W, H);
            const col = TYPE_COLORS[pin.type] || TYPE_COLORS.park;
            return (
              <g key={i} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setTooltip({ ...pin, x, y })}
                onMouseLeave={() => setTooltip(null)}
              >
                <circle cx={x} cy={y} r={13} fill={col.bg} opacity={0.25} />
                <circle cx={x} cy={y} r={8} fill={col.bg} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
                  {col.emoji}
                </text>
              </g>
            );
          })}

          {/* Tooltip */}
          {tooltip && (() => {
            const tx = Math.min(tooltip.x, W - 80);
            const ty = tooltip.y > H / 2 ? tooltip.y - 44 : tooltip.y + 16;
            return (
              <g>
                <rect x={tx - 4} y={ty - 14} width={96} height={20} rx={6}
                  fill="#1e293b" opacity={0.92} />
                <text x={tx + 44} y={ty} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">
                  {tooltip.name.length > 18 ? tooltip.name.slice(0, 17) + '…' : tooltip.name}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
        {Object.entries(TYPE_COLORS).map(([type, { bg, emoji }]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '700', color: '#475569' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: bg }} />
            {emoji} {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}
