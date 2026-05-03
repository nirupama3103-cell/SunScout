import React from 'react';
export default function WeatherBanner({ temp, city, setActiveTab, activeTab }) {
  if (!temp) return null;
  const isHot  = temp >= 85;
  const isWarm = temp >= 70;
  const tab    = isHot ? 'summer' : isWarm ? 'weekend' : 'indoor';
  const label  = isHot ? 'Summer Free Fun' : isWarm ? 'Weekend Activities' : 'Indoor Activities';
  const msg    = isHot ? 'perfect splash pad weather' : isWarm ? 'great day for the park' : 'great day for indoor fun';
  const icon   = isHot ? '☀️' : isWarm ? '⛅' : '🌥️';
  const emoji  = isHot ? '🌊' : isWarm ? '🌳' : '🏛️';
  const bg     = isHot ? "linear-gradient(135deg,#fef3c7,#fde68a)" : isWarm ? "linear-gradient(135deg,#d1fae5,#a7f3d0)" : "linear-gradient(135deg,#e0f2fe,#bae6fd)";
  const border = isHot ? "#fcd34d" : isWarm ? "#6ee7b7" : "#7dd3fc";
  const btnBg  = isHot ? '#f59e0b' : isWarm ? '#10b981' : '#3b82f6';
  const alreadyOnTab = activeTab === tab;
  function handleShowMe() {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.querySelector('.card-grid') || document.querySelector('#root');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }
  return (
    <div style={{background:bg,borderRadius:'16px',padding:'14px 20px',marginBottom:'24px',display:'flex',alignItems:'center',gap:'14px',border:`0.5px solid ${border}`,flexWrap:'wrap'}}>
      <span style={{fontSize:'30px',lineHeight:1}}>{icon}</span>
      <div style={{flex:1,minWidth:'180px'}}>
        <p style={{margin:0,fontSize:'15px',fontWeight:'800',color:'#1e293b'}}>It is {temp}F in {city} — {msg}!</p>
        <p style={{margin:'3px 0 0',fontSize:'13px',color:'#475569'}}>We recommend: <strong>{label}</strong> today {emoji}</p>
      </div>
      <button onClick={handleShowMe} style={{background:alreadyOnTab?'#94a3b8':btnBg,color:'#fff',border:'none',borderRadius:'20px',padding:'9px 20px',fontSize:'13px',fontWeight:'800',cursor:'pointer',fontFamily:'Nunito, sans-serif',whiteSpace:'nowrap'}}>
        {alreadyOnTab ? 'Showing now' : 'Show me →'}
      </button>
    </div>
  );
}