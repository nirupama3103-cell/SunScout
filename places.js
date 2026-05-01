export async function fetchNearbyPlaces(lat, lon, query, radius = 50000) {
  const response = await fetch('/api/places', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lon, type: query, radius }),
  });
  const data = await response.json();
  return data.places || [];
}

