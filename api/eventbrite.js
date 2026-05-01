export default async function handler(req, res) {
  const lat = req.query.lat || "37.3688";
  const lng = req.query.lng || "-122.0363";
  const token = process.env.TICKETMASTER_API_KEY;
  if (!token) return res.status(500).json({ error: "Missing TICKETMASTER_API_KEY" });
  const url =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + token +
    "&latlong=" + lat + "," + lng +
    "&radius=10&unit=miles&classificationName=family&size=50&sort=date,asc";
  try {
    const r = await fetch(url);
    const data = await r.json();
    const rawEvents = (data._embedded && data._embedded.events) || [];
    const events = rawEvents.map(function(e) {
      const dateStr = e.dates && e.dates.start && e.dates.start.localDate;
      const dow = dateStr ? new Date(dateStr).getDay() : -1;
      const venue = e._embedded && e._embedded.venues && e._embedded.venues[0];
      const price = e.priceRanges && e.priceRanges[0];
      const minCost = (price && price.min) || 0;
      const tl = (e.name || "").toLowerCase();
      const tags = [];
      if (/stem|science|robot|coding|tech/.test(tl)) tags.push("stem");
      if (/art|craft|draw|paint/.test(tl)) tags.push("art");
      if (/music|sing|danc/.test(tl)) tags.push("music");
      if (/toddler|baby/.test(tl)) tags.push("toddler");
      if (/teen/.test(tl)) tags.push("teen");
      if (/camp/.test(tl)) tags.push("camp");
      return {
        id: "tm-" + e.id,
        source: "ticketmaster",
        title: e.name || "Untitled",
        url: e.url,
        start: dateStr,
        venue: (venue && venue.name) || null,
        address: (venue && venue.address && venue.address.line1) || null,
        lat: (venue && venue.location && parseFloat(venue.location.latitude)) || null,
        lng: (venue && venue.location && parseFloat(venue.location.longitude)) || null,
        isFree: minCost === 0,
        minPrice: minCost,
        isIndoor: true,
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
