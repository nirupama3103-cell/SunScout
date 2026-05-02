import React from "react";
import "./FloatingDeco.css";

const SunSVG = () => (
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="deco-sun-svg">
    <circle cx="60" cy="60" r="26" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
    <line x1="60" y1="8"  x2="60" y2="28" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="60" y1="92" x2="60" y2="112" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="8"  y1="60" x2="28" y2="60" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="92" y1="60" x2="112" y2="60" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="22" y1="22" x2="36" y2="36" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="84" y1="84" x2="98" y2="98" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="98" y1="22" x2="84" y2="36" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <line x1="36" y1="84" x2="22" y2="98" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>
    <rect x="42" y="54" width="13" height="9" rx="3" fill="#333" opacity="0.9"/>
    <rect x="65" y="54" width="13" height="9" rx="3" fill="#333" opacity="0.9"/>
    <line x1="55" y1="58" x2="65" y2="58" stroke="#333" strokeWidth="2"/>
    <path d="M50 70 Q60 78 70 70" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="48" cy="68" r="4" fill="#FF9999" opacity="0.5"/>
    <circle cx="72" cy="68" r="4" fill="#FF9999" opacity="0.5"/>
  </svg>
);

const LogoSVG = () => (
  <svg viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg" className="deco-logo-svg">
    <rect x="8" y="10" width="74" height="80" rx="8" fill="#8B6914" stroke="#5C4008" strokeWidth="2"/>
    <line x1="8" y1="30" x2="82" y2="30" stroke="#5C4008" strokeWidth="1" opacity="0.4"/>
    <line x1="8" y1="50" x2="82" y2="50" stroke="#5C4008" strokeWidth="1" opacity="0.4"/>
    <line x1="8" y1="70" x2="82" y2="70" stroke="#5C4008" strokeWidth="1" opacity="0.4"/>
    <circle cx="45" cy="40" r="11" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
    <line x1="45" y1="22" x2="45" y2="29" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
    <line x1="45" y1="51" x2="45" y2="58" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
    <line x1="27" y1="40" x2="34" y2="40" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
    <line x1="56" y1="40" x2="63" y2="40" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
    <text x="45" y="75" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8.5" fontWeight="bold" fill="#FFD700" letterSpacing="1">SUNSCOUT</text>
    <rect x="6" y="44" width="6" height="16" rx="2" fill="#4a2f08"/>
    <circle cx="9" cy="52" r="2" fill="#FFD700"/>
  </svg>
);

function ShareBtn() {
  const share = () => {
    const url = 'https://sun-scout-tau.vercel.app';
    if (navigator.share) {
      navigator.share({title: 'SunScout', text: 'Find free parks and splash pads near you!', url});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        document.getElementById('sharebtn').textContent = 'Copied!';
        setTimeout(() => { document.getElementById('sharebtn').innerHTML = '📤 Share'; }, 2000);
      });
    }
  };
  return <button id="sharebtn" onClick={share} style={{position:'fixed',bottom:'20px',right:'20px',zIndex:999999,background:'linear-gradient(135deg,#FF6B00,#FFB300)',color:'#fff',border:'none',borderRadius:'999px',padding:'13px 26px',fontSize:'15px',fontWeight:900,cursor:'pointer',boxShadow:'0 6px 24px rgba(255,107,0,0.5)',fontFamily:'Nunito,sans-serif'}}>📤 Share</button>;
}

export default function FloatingDeco() {
  return (
    <>
      <div className="deco-logo-wrap">
        <LogoSVG />
        <span className="deco-wave" role="img" aria-label="wave">&#x1F44B;</span>
        <span className="deco-trees">&#x1F333;&#x1F332;</span>
      </div>
      <div className="deco-sun-wrap">
        <SunSVG />
      </div>
      <ShareBtn />
    </>
  );
}
