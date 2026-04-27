export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { lat, lon, type } = req.body;
  const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.googleMapsUri',
      },
      body: JSON.stringify({
        includedTypes: [type || 'park'],
        maxResultCount: 20,
        locationRestriction: {
          circle: { 
            center: { latitude: lat, longitude: lon }, 
            radius: 80467 // 50 miles in meters
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
