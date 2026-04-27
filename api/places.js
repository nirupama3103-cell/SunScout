export default async function handler(req, res) {
  // Line 3 fix: Standardized method check
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { lat, lon, type } = req.body;
  const API_KEY = process.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

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
            radius: 80467 // 50 miles
          } 
        }
      })
    });

    const data = await response.json();
    
    // Line 19, 24, 26 fix: Only one return statement allowed
    return res.status(200).json({ places: data.places || [] });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch places' });
  }
}
