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
