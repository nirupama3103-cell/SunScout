import React from "react";
import { COLORS } from "./constants";

export default function CardModal({ place, onClose, votes, onVote, currentUser }) {
  if (!place) return null;

  const name = place.name || place.displayName?.text || "Unnamed";
  const address = place.address || place.formattedAddress || "";
  const description = place.description || place.editorialSummary?.text || "";
  const duration = place.duration || "";
  const cost = place.cost || (place.priceLevel ? "$".repeat(place.priceLevel) : "");
  const vibe = place.vibe || (place.types?.[0] || "").replace(/_/g, " ");
  const rating = place.rating;
  const phone = place.internationalPhoneNumber || "";
  const website = place.websiteUri || "";
  const hours = place.currentOpeningHours?.weekdayDescriptions || place.regularOpeningHours?.weekdayDescriptions || [];
  const mapsUrl = place.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(name + " " + address)}`;

  const placeVotes = votes?.[place.id] || [];
  const hasVoted = placeVotes.includes(currentUser);

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: "white", borderRadius: 20, padding: 28, maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative" }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>✕</button>

        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, paddingRight: 30 }}>{name}</h2>
        {address && <p style={{ margin: "0 0 4px", color: "#555", fontSize: 14 }}>{address}</p>}
        {description && <p style={{ margin: "8px 0 12px", color: "#333", fontSize: 14, lineHeight: 1.5 }}>{description}</p>}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {duration && <span style={tagStyle("#EEF2FF","#4338CA")}>{duration}</span>}
          {cost && <span style={tagStyle("#F0FDF4","#166534")}>{cost}</span>}
          {vibe && <span style={tagStyle("#FFF7ED","#9A3412")}>{vibe}</span>}
          {rating && <span style={tagStyle("#FFFBEB","#92400E")}>⭐ {rating}</span>}
        </div>

        {hours.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <strong style={{ fontSize: 14 }}>Hours</strong>
            <ul style={{ margin: "6px 0 0", padding: "0 0 0 18px", fontSize: 13, color: "#444", lineHeight: 1.8 }}>
              {hours.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}

        {phone && <p style={{ margin: "0 0 8px", fontSize: 14 }}>📞 {phone}</p>}
        {website && <p style={{ margin: "0 0 8px", fontSize: 14 }}>🌐 <a href={website} target="_blank" rel="noreferrer">{website}</a></p>}
        <p style={{ margin: "0 0 16px", fontSize: 14 }}>🗺 <a href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a></p>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onVote(place.id)}
            style={{
              padding: "8px 20px",
              borderRadius: 20,
              border: hasVoted ? "2px solid #6366F1" : "2px solid #E5E7EB",
              background: hasVoted ? "#EEF2FF" : "white",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              color: hasVoted ? "#4338CA" : "#374151",
            }}
          >
            {hasVoted ? "✓ Voted" : "Vote for this"}
          </button>
          <div style={{ display: "flex" }}>
            {placeVotes.map(person => (
              <div key={person} title={person} style={{ width: 32, height: 32, borderRadius: "50%", background: COLORS[person] || "#ccc", border: "2px solid white", marginLeft: -8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>
                {person[0]}
              </div>
            ))}
          </div>
          {placeVotes.length > 0 && <span style={{ fontSize: 13, color: "#6B7280" }}>{placeVotes.length} vote{placeVotes.length !== 1 ? "s" : ""}</span>}
        </div>
      </div>
    </div>
  );
}

function tagStyle(bg, color) {
  return { background: bg, color, borderRadius: 20, padding: "3px 12px", fontSize: 13, fontWeight: 600 };
}
