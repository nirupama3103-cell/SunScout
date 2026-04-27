export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lon, type, radius = 8000 } = req.body;
  // Vercel uses process.env for backend functions
  const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'No API key configured' });
  }

  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.types,places.businessStatus,places.editorialSummary',
        },
        body: JSON.stringify({
          includedTypes: [type],
          maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: { latitude: lat, longitude: lon },
              radius: radius,
            },
          },
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ places: data.places || [] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch places' });
  }
}
