#!/bin/bash
set -e

# ── constants.js ──────────────────────────────────────────────────────────────
cat > constants.js << 'EOF'
export const COLORS = {
  Alex: "#FF6B6B",
  Jordan: "#4ECDC4",
  Morgan: "#45B7D1",
  Casey: "#96CEB4",
  Riley: "#FFEAA7",
  Aubrey: "#DDA0DD",
};

export const PEOPLE = Object.keys(COLORS);

export const TAB_LABELS = {
  outdoor: "Outdoor",
  food: "Food & Drink",
  arts: "Arts & Culture",
  wellness: "Wellness",
  shopping: "Shopping",
  events: "Events",
};

export const STATIC_ACTIVITIES = {
  outdoor: [
    { id: "s1", name: "Morning Hike at Rancho San Antonio", category: "outdoor", duration: "2-3 hrs", cost: "Free", vibe: "Active", address: "Rancho San Antonio, Cupertino, CA", description: "Popular trails with bay views." },
    { id: "s2", name: "Kayaking at Stevens Creek", category: "outdoor", duration: "1-2 hrs", cost: "$", vibe: "Adventurous", address: "Stevens Creek Reservoir, Cupertino, CA", description: "Calm water kayaking." },
    { id: "s3", name: "Picnic at Sunnyvale Baylands", category: "outdoor", duration: "1-3 hrs", cost: "Free", vibe: "Relaxed", address: "Sunnyvale Baylands Park, CA", description: "Scenic baylands with walking trails." },
  ],
  food: [
    { id: "s4", name: "Brunch at The Table", category: "food", duration: "1-2 hrs", cost: "$$", vibe: "Social", address: "1110 S De Anza Blvd, San Jose, CA", description: "Popular brunch spot." },
    { id: "s5", name: "Ramen Night at Orenchi", category: "food", duration: "1 hr", cost: "$$", vibe: "Cozy", address: "3540 Homestead Rd, Santa Clara, CA", description: "Award-winning ramen." },
    { id: "s6", name: "Farmers Market", category: "food", duration: "1-2 hrs", cost: "$", vibe: "Casual", address: "Murphy Ave, Sunnyvale, CA", description: "Fresh local produce every Saturday." },
  ],
  arts: [
    { id: "s7", name: "Tech Museum of Innovation", category: "arts", duration: "2-3 hrs", cost: "$$", vibe: "Educational", address: "201 S Market St, San Jose, CA", description: "Hands-on tech exhibits." },
    { id: "s8", name: "San Jose Museum of Art", category: "arts", duration: "1-2 hrs", cost: "$", vibe: "Cultural", address: "110 S Market St, San Jose, CA", description: "Contemporary art collections." },
    { id: "s9", name: "Triton Museum of Art", category: "arts", duration: "1-2 hrs", cost: "Free", vibe: "Relaxed", address: "1505 Warburton Ave, Santa Clara, CA", description: "Free admission sculpture garden." },
  ],
  wellness: [
    { id: "s10", name: "Yoga in the Park", category: "wellness", duration: "1 hr", cost: "Free", vibe: "Zen", address: "Las Palmas Park, Sunnyvale, CA", description: "Community outdoor yoga." },
    { id: "s11", name: "Float Therapy Session", category: "wellness", duration: "1-2 hrs", cost: "$$$", vibe: "Restorative", address: "Float Matrix, San Jose, CA", description: "Sensory deprivation float pods." },
    { id: "s12", name: "Meditation at Deer Creek", category: "wellness", duration: "1-2 hrs", cost: "Free", vibe: "Peaceful", address: "Deer Creek Hills, CA", description: "Quiet trails for mindful walks." },
  ],
  shopping: [
    { id: "s13", name: "Santana Row Stroll", category: "shopping", duration: "1-3 hrs", cost: "$$", vibe: "Upscale", address: "Santana Row, San Jose, CA", description: "Upscale outdoor shopping." },
    { id: "s14", name: "Valley Fair Mall", category: "shopping", duration: "2-4 hrs", cost: "$$", vibe: "Classic", address: "2855 Stevens Creek Blvd, Santa Clara, CA", description: "Major mall with all brands." },
    { id: "s15", name: "Vintage Finds at SVDP", category: "shopping", duration: "1-2 hrs", cost: "$", vibe: "Thrifty", address: "St. Vincent de Paul, Sunnyvale, CA", description: "Great thrift finds." },
  ],
  events: [
    { id: "s16", name: "Sunnyvale Art & Wine Festival", category: "events", duration: "3-4 hrs", cost: "Free", vibe: "Festive", address: "Murphy Ave, Sunnyvale, CA", description: "Annual street festival." },
    { id: "s17", name: "Drive-In Movie Night", category: "events", duration: "2-3 hrs", cost: "$$", vibe: "Nostalgic", address: "Great Mall, Milpitas, CA", description: "Outdoor movie screenings." },
    { id: "s18", name: "Live Music at SJSU", category: "events", duration: "2 hrs", cost: "$", vibe: "Lively", address: "San Jose State University, CA", description: "Student and guest performances." },
  ],
};
EOF

# ── usePlaces.js ──────────────────────────────────────────────────────────────
cat > usePlaces.js << 'EOF'
import { useState, useEffect } from "react";
import { STATIC_ACTIVITIES } from "./constants";

const CATEGORY_QUERIES = {
  outdoor: "outdoor activities parks nature Sunnyvale CA",
  food: "restaurants cafes brunch Sunnyvale CA",
  arts: "museums art galleries San Jose CA",
  wellness: "yoga spa wellness fitness Sunnyvale CA",
  shopping: "shopping malls boutiques Sunnyvale CA",
  events: "events entertainment venues San Jose CA",
};

export function usePlaces(category) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setError(null);

    const query = CATEGORY_QUERIES[category] || `${category} Sunnyvale CA`;

    fetch(`/api/places?query=${encodeURIComponent(query)}&category=${category}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const apiPlaces = data.places || [];
        if (apiPlaces.length > 0) {
          setPlaces(apiPlaces);
        } else {
          setPlaces(STATIC_ACTIVITIES[category] || []);
        }
      })
      .catch((err) => {
        console.error("Places fetch error:", err);
        setError(err.message);
        setPlaces(STATIC_ACTIVITIES[category] || []);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { places, loading, error };
}
EOF

# ── ActivityCard.jsx ──────────────────────────────────────────────────────────
cat > ActivityCard.jsx << 'EOF'
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
EOF

# ── CardModal.jsx ──────────────────────────────────────────────────────────────
cat > CardModal.jsx << 'EOF'
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
EOF

# ── api/places.js ─────────────────────────────────────────────────────────────
mkdir -p api
cat > api/places.js << 'EOF'
export default async function handler(req, res) {
  const { query, category } = req.query;

  if (!query) {
    return res.status(400).json({ error: "query param required" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GOOGLE_PLACES_API_KEY not set" });
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.location",
            "places.rating",
            "places.priceLevel",
            "places.types",
            "places.googleMapsUri",
            "places.websiteUri",
            "places.internationalPhoneNumber",
            "places.currentOpeningHours",
            "places.regularOpeningHours",
            "places.editorialSummary",
            "places.photos",
          ].join(","),
        },
        body: JSON.stringify({
          textQuery: query,
          maxResultCount: 10,
          locationBias: {
            circle: {
              center: { latitude: 37.3688, longitude: -122.0363 },
              radius: 30000,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Google Places API error:", errText);
      return res.status(502).json({ error: "Google Places API error", detail: errText });
    }

    const data = await response.json();
    return res.status(200).json({ places: data.places || [] });
  } catch (err) {
    console.error("Places handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
EOF

echo ""
echo "✅ All 5 files written!"
git add constants.js usePlaces.js ActivityCard.jsx CardModal.jsx api/places.js
git commit -m "fix: all 5 files - static fallback, Aubrey color, card fixes, API field mask"
git push
echo "🚀 Pushed! Vercel will deploy in ~1 min."
