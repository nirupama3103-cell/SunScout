import React from "react";
import { COLORS } from "./constants";

export default function ActivityCard({ place, onSelect, votes, onVote, currentUser }) {
  const isStatic = place.id && place.id.startsWith("s");

  const name = place.name || place.displayName?.text || "Unnamed";
  const address = place.address || place.formattedAddress || "";
  const description = place.description || place.editorialSummary?.text || "";
  const duration = place.duration || "";
  const cost = place.cost || (place.priceLevel ? "$".repeat(place.priceLevel) : "");
  const vibe = place.vibe || (place.types?.[0] || "").replace(/_/g, " ");
  const rating = place.rating;
  const mapsUrl = place.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(name + " " + address)}`;

  const placeVotes = votes?.[place.id] || [];
  const hasVoted = placeVotes.includes(currentUser);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "transform 0.15s",
      }}
      onClick={() => onSelect(place)}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>{name}</h3>
          {address && <p style={{ margin: "0 0 6px", fontSize: 13, color: "#666" }}>{address}</p>}
          {description && <p style={{ margin: "0 0 8px", fontSize: 13, color: "#444" }}>{description}</p>}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {duration && <span style={tagStyle("#EEF2FF", "#4338CA")}>{duration}</span>}
            {cost && <span style={tagStyle("#F0FDF4", "#166534")}>{cost}</span>}
            {vibe && <span style={tagStyle("#FFF7ED", "#9A3412")}>{vibe}</span>}
            {rating && <span style={tagStyle("#FFFBEB", "#92400E")}>⭐ {rating}</span>}
          </div>
        </div>
        
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ marginLeft: 12, fontSize: 20, textDecoration: "none" }}
          title="Open in Google Maps"
        >
          📍
        </a>
      </div>

      <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={e => { e.stopPropagation(); onVote(place.id); }}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            border: hasVoted ? "2px solid #6366F1" : "2px solid #E5E7EB",
            background: hasVoted ? "#EEF2FF" : "white",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 13,
            color: hasVoted ? "#4338CA" : "#374151",
          }}
        >
          {hasVoted ? "✓ Voted" : "Vote"}
        </button>
        <div style={{ display: "flex", gap: -6 }}>
          {placeVotes.map(person => (
            <div
              key={person}
              title={person}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: COLORS[person] || "#ccc",
                border: "2px solid white",
                marginLeft: -6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
              }}
            >
              {person[0]}
            </div>
          ))}
        </div>
        {placeVotes.length > 0 && (
          <span style={{ fontSize: 12, color: "#6B7280" }}>{placeVotes.length} vote{placeVotes.length !== 1 ? "s" : ""}</span>
        )}
      </div>
    </div>
  );
}

function tagStyle(bg, color) {
  return {
    background: bg,
    color,
    borderRadius: 20,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
  };
}
