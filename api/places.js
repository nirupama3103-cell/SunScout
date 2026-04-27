export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { type } = req.body;
  const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.googleMapsUri',
      },
      body: JSON.stringify({
        textQuery: `${type || 'park'} near Sunnyvale, CA 95337`,
        maxResultCount: 20,
        locationBias: {
          circle: {
            center: { latitude: 37.3688, longitude: -122.0363 },
            radius: 80467
          }
        }
      })
    });

    const data = await response.json();
    return res.status(200).json({ places: data.places || [] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch places' });
  }
}
