import { useState, useEffect } from "react";
import { FREE_SUMMER_CAMPS, PAID_SUMMER_CAMPS } from "./summerCamps.js";

const CATEGORY_ICONS = {
  coding: "💻", library: "📚", storytime: "📖", stem: "🔬",
  park: "🌳", swimming: "🏊", arts: "🎨", sports: "⚽", default: "🏕️",
};

function CampCard({ camp }) {
  const icon = CATEGORY_ICONS[camp.category] || CATEGORY_ICONS.default;
  const isSponsored = camp.badge === "sponsored";
  const isFree = camp.badge === "free";
  return (
    <a href={camp.link} target="_blank" rel="noopener noreferrer"
      style={{
        display:"block", textDecoration:"none", color:"inherit", background:"#fff",
        borderRadius:"14px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)", padding:"18px 20px",
        border: isSponsored ? "2px solid #f59e0b" : isFree ? "2px solid #10b981" : "1.5px solid #e5e7eb",
        transition:"transform 0.15s, box-shadow 0.15s", position:"relative", cursor:"pointer",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.08)"; }}
    >
      {(isSponsored || isFree) && (
        <span style={{
          position:"absolute", top:"12px", right:"14px", fontSize:"11px", fontWeight:700,
          letterSpacing:"0.05em", padding:"2px 9px", borderRadius:"99px", textTransform:"uppercase",
          background: isSponsored ? "#fef3c7" : "#d1fae5",
          color: isSponsored ? "#92400e" : "#065f46",
        }}>{isSponsored ? "Sponsored" : "Free"}</span>
      )}
      <div style={{display:"flex", gap:"10px", alignItems:"flex-start", marginBottom:"8px"}}>
        <span style={{fontSize:"26px", lineHeight:1}}>{icon}</span>
        <div>
          <div style={{fontWeight:700, fontSize:"15px", color:"#111827", lineHeight:1.3, paddingRight: isSponsored||isFree ? "72px" : "0"}}>{camp.name}</div>
          <div style={{fontSize:"12px", color:"#6b7280", marginTop:"2px"}}>{camp.org}</div>
        </div>
      </div>
      <p style={{fontSize:"13px", color:"#374151", margin:"0 0 10px", lineHeight:1.5}}>{camp.description}</p>
      <div style={{display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"10px"}}>
        {camp.tags.map(tag => (
          <span key={tag} style={{fontSize:"11px", background:"#f3f4f6", color:"#374151", borderRadius:"6px", padding:"3px 8px", fontWeight:500}}>{tag}</span>
        ))}
      </div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"12px", color:"#6b7280", borderTop:"1px solid #f3f4f6", paddingTop:"8px", marginTop:"4px"}}>
        <span>📅 {camp.dates}</span>
        <span style={{fontWeight:700, color: isFree ? "#059669" : "#1d4ed8"}}>{camp.price}</span>
      </div>
      <div style={{fontSize:"11px", color:"#9ca3af", marginTop:"4px"}}>📍 {camp.location}</div>
    </a>
  );
}

function EmptyState({ city, tab }) {
  return (
    <div style={{textAlign:"center", padding:"48px 24px", color:"#6b7280"}}>
      <div style={{fontSize:"48px", marginBottom:"12px"}}>{tab === "free" ? "📚" : "🏕️"}</div>
      <div style={{fontWeight:700, fontSize:"17px", color:"#374151", marginBottom:"8px"}}>
        No {tab === "free" ? "free programs" : "paid camps"} listed yet for {city}
      </div>
      <p style={{fontSize:"14px", maxWidth:"340px", margin:"0 auto"}}>
        {tab === "free"
          ? "Check your local library — most cities offer free summer reading, STEM events, and storytimes."
          : "Check ActivityHero or Camp Finder for more options near you."}
      </p>
    </div>
  );
}

export default function SummerCamps({ city, defaultTab = "free" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync tab when parent switches between Free Summer / Paid Camps buttons
  useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);

  const camps = (activeTab === "free" ? FREE_SUMMER_CAMPS : PAID_SUMMER_CAMPS)[city] || [];

  const tabStyle = (tab) => ({
    padding:"10px 28px", borderRadius:"99px", border:"none", cursor:"pointer",
    fontWeight:700, fontSize:"14px", transition:"all 0.15s",
    background: activeTab === tab ? "#2563eb" : "#f3f4f6",
    color: activeTab === tab ? "#fff" : "#374151",
    boxShadow: activeTab === tab ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
  });

  return (
    <section style={{fontFamily:"'DM Sans','Inter',sans-serif", maxWidth:"960px", margin:"0 auto", padding:"0 16px 32px"}}>
      {/* Sub-tabs: Free / Paid toggle */}
      <div style={{display:"flex", gap:"10px", marginBottom:"20px"}}>
        <button style={tabStyle("free")} onClick={() => setActiveTab("free")}>🌞 Free Summer</button>
        <button style={tabStyle("paid")} onClick={() => setActiveTab("paid")}>🎒 Paid Camps</button>
      </div>

      {/* City label */}
      <div style={{fontSize:"13px", color:"#6b7280", marginBottom:"16px", fontWeight:500}}>
        {camps.length > 0
          ? `${camps.length} ${activeTab === "free" ? "free program" : "camp"}${camps.length !== 1 ? "s" : ""} in ${city}`
          : `No results for ${city}`}
      </div>

      {camps.length > 0 ? (
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"18px"}}>
          {camps.map(camp => <CampCard key={camp.id} camp={camp} />)}
        </div>
      ) : (
        <EmptyState city={city} tab={activeTab} />
      )}
    </section>
  );
}
