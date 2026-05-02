import React from "react";
import useWeather from "./useWeather";
import { CITY_COORDS } from "./constants";

export default function Header({ cityName }) {
  const coords = CITY_COORDS[cityName] || CITY_COORDS["Sunnyvale"];
  const { weather, loading } = useWeather(coords.lat, coords.lon);
  const icon = loading ? "⏳" : weather.temp >= 90 ? "🌡️" : weather.temp >= 75 ? "☀️" : weather.temp >= 60 ? "⛅" : "🌥️";

  return (
    <header style={{
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 35%, #ffd89b 65%, #a8edea 100%)",
      padding: "36px 24px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {[{t:"12%",l:"8%",s:"22px"},{t:"18%",l:"88%",s:"18px"},{t:"65%",l:"5%",s:"14px"},{t:"70%",l:"92%",s:"20px"},{t:"8%",l:"50%",s:"16px"}].map((sp,i) => (
        <div key={i} style={{ position:"absolute", top:sp.t, left:sp.l, fontSize:sp.s, opacity:0.55, pointerEvents:"none" }}>✦</div>
      ))}

      <h1 style={{ fontSize:"clamp(26px,5vw,52px)", fontWeight:"900", color:"#fff", textShadow:"0 2px 12px rgba(0,0,0,0.18)", marginBottom:"10px" }}>
        Your Adventure, Simplified.
      </h1>
      <p style={{ fontSize:"clamp(13px,2vw,18px)", color:"rgba(255,255,255,0.92)", fontWeight:"600", lineHeight:1.5, marginBottom:"20px" }}>
        SunScout finds the best free splash pads, parks, and libraries near you in seconds.
      </p>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: "10px",
        background: "rgba(255,255,255,0.92)",
        borderRadius: "16px", padding: "10px 16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}>
        <span style={{ fontSize:"28px", lineHeight:1 }}>{icon}</span>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize:"10px", fontWeight:"800", color:"#7c3aed", textTransform:"uppercase", letterSpacing:"0.5px" }}>{cityName} Weather</div>
          <div style={{ fontSize:"13px", fontWeight:"700", color:"#334155" }}>{loading ? "Loading..." : weather.condition + ", " + weather.temp + "°F"}</div>
        </div>
      </div>
    </header>
  );
}
