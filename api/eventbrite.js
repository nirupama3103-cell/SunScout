export default async function handler(req, res) {
  const lat = req.query.lat || "37.3688";
  const lng = req.query.lng || "-122.0363";
  const token = process.env.TICKETMASTER_API_KEY;
  if (!token) return res.status(500).json({ error: "Missing TICKETMASTER_API_KEY" });
  const base = "https://app.ticketmaster.com/discovery/v2/events.json";
  const loc = "&latlong=" + lat + "," + lng + "&radius=25&unit=miles&sort=date,asc&apikey=" + token;
  try {
    const fetches = await Promise.allSettled([
      fetch(base + "?classificationName=family&size=50" + loc).then(r => r.json()),
      fetch(base + "?keyword=kids&size=20" + loc).then(r => r.json()),
      fetch(base + "?keyword=summer+camp&size=20" + loc).then(r => r.json()),
      fetch(base + "?keyword=children&size=20" + loc).then(r => r.json()),
      fetch(base + "?keyword=toddler&size=20" + loc).then(r => r.json()),
    ]);
    const seen = {};
    const events = [];
    fetches.forEach(result => {
      if (result.status !== "fulfilled") return;
      ((result.value._embedded && result.value._embedded.events) || []).forEach(e => {
        if (seen[e.id]) return;
        seen[e.id] = true;
        const dateStr = e.dates && e.dates.start && e.dates.start.localDate;
        const dow = dateStr ? new Date(dateStr).getDay() : -1;
        const venue = e._embedded && e._embedded.venues && e._embedded.venues[0];
        const price = e.priceRanges && e.priceRanges[0];
        const minCost = (price && price.min) || 0;
        const tl = (e.name || "").toLowerCase();
        const tags = [];
        if (/stem|science|tech/.test(tl)) tags.push("stem");
        if (/art|craft/.test(tl)) tags.push("art");
        if (/music|danc/.test(tl)) tags.push("music");
        if (/teen/.test(tl)) tags.push("teen");
        if (/camp/.test(tl)) tags.push("camp");
        events.push({
          id: "tm-" + e.id, source: "ticketmaster",
          title: e.name || "Untitled", url: e.url, start: dateStr,
          venue: (venue && venue.name) || null,
          address: (venue && venue.address && venue.address.line1) || null,
          lat: (venue && venue.location && parseFloat(venue.location.latitude)) || null,
          lng: (venue && venue.location && parseFloat(venue.location.longitude)) || null,
          isFree: minCost === 0, minPrice: minCost, isIndoor: true,
          isWeekend: dow === 0 || dow === 6,
          isCamp: tl.indexOf("camp") !== -1, tags,
        });
      });
    });
    events.sort((a, b) => (a.start || "") < (b.start || "") ? -1 : 1);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate");
    return res.status(200).json({ events, total: events.length });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}