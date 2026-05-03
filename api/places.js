export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'query required' });
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return res.status(200).json({ places: [] });
  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.editorialSummary',
        },
        body: JSON.stringify({
          textQuery: query,
          maxResultCount: 8,
          locationBias: {
            circle: {
              center: { latitude: 37.3688, longitude: -122.0363 },
              radius: 30000.0,
            },
          },
        }),
      }
    );
    const data = await response.json();
    return res.status(200).json({ places: data.places || [] });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ places: [] });
  }
}
