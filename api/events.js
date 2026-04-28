export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { lat, lon } = req.body;
  const API_KEY = process.env.EVENTBRITE_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "No Eventbrite API key" });
  try {
    const url = "https://www.eventbriteapi.com/v3/events/search/?location.latitude=" + lat + "&location.longitude=" + lon + "&location.within=10mi&expand=venue&token=" + API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    const events = (data.events || []).map(e => ({
      id: e.id,
      name: e.name ? e.name.text : "Event",
      start: e.start ? e.start.local : null,
      venue: e.venue ? e.venue.name : null,
      address: e.venue && e.venue.address ? e.venue.address.localized_address_display : null,
      lat: e.venue ? e.venue.latitude : null,
      lon: e.venue ? e.venue.longitude : null,
      googleMapsUri: e.venue && e.venue.latitude ? "https://maps.google.com/?q=" + e.venue.latitude + "," + e.venue.longitude : null,
      isFree: e.is_free,
    }));
    return res.status(200).json({ events });
  } catch (err) {
    console.error("Eventbrite error:", err);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
}
