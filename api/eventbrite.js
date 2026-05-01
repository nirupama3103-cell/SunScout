export default async function handler(req, res) {
  const { lat = '37.3688', lng = '-122.0363' } = req.query;
  const token = process.env.EVENTBRITE_API_KEY;

  const now = new Date();
  const summerEnd = new Date(now.getFullYear(), 7, 31, 23, 59, 59);

  const params = new URLSearchParams({
    'location.latitude': lat,
    'location.longitude': lng,
    'location.within': '10mi',
    'categories': '1',
    'start_date.range_start': now.toISOString().slice(0, 19),
    'start_date.range_end': summerEnd.toISOString().slice(0, 19),
    'expand': 'venue,ticket_classes',
    'page_size': '50',
  });

  try {
    const ebRes = await fetch(
      'https://www.eventbriteapi.com/v3/events/search/?' + params.toString(),
      { headers: { Authorization: 'Bearer ' + token } }
    );
    if (ebRes.ok === false) return res.status(ebRes.status).json({ error: await ebRes.text() });

    const data = await ebRes.json();
    const outdoorWords = ['outdoor','park','field','trail','garden','beach','lake'];

    const events = (data.events || []).map((e) => {
      const dow = new Date(e.start?.local).getDay();
      const minCost = e.ticket_classes?.[0]?.cost?.major_value ?? 0;
      const text = ((e.name?.text || '') + ' ' + (e.description?.text || '')).toLowerCase();
      const tags = [];
      if (/stem|science|robot|coding|tech/.test(text)) tags.push('stem');
      if (/art|craft|draw|paint/.test(text)) tags.push('art');
      if (/music|sing|danc/.test(text)) tags.push('music');
      if (/toddler|baby/.test(text)) tags.push('toddler');
      if (/teen/.test(text)) tags.push('teen');
      if (/camp/.test(text)) tags.push('camp');
      return {
        id: 'eb-' + e.id,
        source: 'eventbrite',
        title: e.name?.text || 'Untitled',
        description: (e.description?.text || '').slice(0, 300),
        url: e.url,
        start: e.start?.local,
        venue: e.venue?.name || null,
        address: e.venue?.address?.localized_address_display || null,
        lat: parseFloat(e.venue?.latitude) || null,
        lng: parseFloat(e.venue?.longitude) || null,
        isFree: e.is_free || Number(minCost) === 0,
        minPrice: Number(minCost),
        isIndoor: outdoorWords.every((w) => text.includes(w) === false),
        isWeekend: dow === 0 || dow === 6,
        isCamp: /camp/.test(text),
        tags,
      };
    });

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate');
    return res.status(200).json({ events });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}