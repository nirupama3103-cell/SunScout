export default async function handler(req, res) {
  const lat = req.query.lat || "37.3688";
  const lng = req.query.lng || "-122.0363";
  const token = process.env.EVENTBRITE_API_KEY;
  if (!token) return res.status(500).json({ error: "Missing EVENTBRITE_API_KEY" });
  const url =
    "https://www.eventbriteapi.com/v3/events/search/?token=" + token +
    "&location.latitude=" + lat +
    "&location.longitude=" + lng +
    "&location.within=10mi&expand=venue,ticket_classes&page_size=50";
  try {
    const r = await fetch(url);
    const data = await r.json();
    if (data.error) return res.status(400).json({ raw: data });
    const outdoorWords = ["outdoor","trail","garden","beach","lake"];
    const events = (data.events || []).map(function(e) {
      const dow = new Date(e.start && e.start.local).getDay();
      const tc = e.ticket_classes;
      const minCost = (tc && tc[0] && tc[0].cost && tc[0].cost.major_value) || 0;
      const text = ((e.name && e.name.text) || "") + " " + ((e.description && e.description.text) || "");
      const tl = text.toLowerCase();
      const tags = [];
      if (/stem|science|robot|coding|tech/.test(tl)) tags.push("stem");
      if (/art|craft|draw|paint/.test(tl)) tags.push("art");
      if (/music|sing|danc/.test(tl)) tags.push("music");
      if (/toddler|baby/.test(tl)) tags.push("toddler");
      if (/teen/.test(tl)) tags.push("teen");
      if (/camp/.test(tl)) tags.push("camp");
      return {
        id: "eb-" + e.id,
        source: "eventbrite",
        title: (e.name && e.name.text) || "Untitled",
        url: e.url,
        start: e.start && e.start.local,
        venue: (e.venue && e.venue.name) || null,
        address: (e.venue && e.venue.address && e.venue.address.localized_address_display) || null,
        lat: parseFloat((e.venue && e.venue.latitude) || 0) || null,
        lng: parseFloat((e.venue && e.venue.longitude) || 0) || null,
        isFree: e.is_free || Number(minCost) === 0,
        minPrice: Number(minCost),
        isIndoor: outdoorWords.every(function(w) { return tl.indexOf(w) === -1; }),
        isWeekend: dow === 0 || dow === 6,
        isCamp: tl.indexOf("camp") !== -1,
        tags: tags,
      };
    });
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate");
    return res.status(200).json({ events: events });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
