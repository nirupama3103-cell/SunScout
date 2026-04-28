export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { lat, lon, type, radius = 50000 } = req.body;
  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.googleMapsUri,places.location",
      },
      body: JSON.stringify({
        textQuery: "free " + (type || "parks and recreation"),
        maxResultCount: 10,
        locationBias: {
          circle: {
            center: { latitude: lat, longitude: lon },
            radius: radius,
          },
        },
      }),
    });
    const data = await response.json();
    return res.status(200).json({ places: data.places || [] });
  } catch (err) {
    console.error("Places API error:", err);
    return res.status(500).json({ error: "Failed to fetch places" });
  }
}