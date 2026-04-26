# ☀️ Free Summer Fun

A mobile-first dashboard for finding **free, nearby summer activities for kids** — splash pads, libraries, parks, museums, and more.

Built with **React + Vite**, live weather from **Open-Meteo**, and real nearby places from the **Google Places API (New)**.

---

## Features

- 🌈 Rainbow tab shimmer with color-bleed theming
- 🌡️ Live weather (Open-Meteo, no key needed)
- 📍 Real nearby activity search via Google Places API
- 🗺️ Animated map with geo-projected pins
- ⏳ Summer countdown bar
- 🏠 Indoor-only toggle (auto-activates on hot days ≥ 90°F)
- 🍼 Age filters: Toddler, Kids 5–10, Teens
- 📱 Mobile-first, dark mode aware

---

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/free-summer-fun
cd free-summer-fun
npm install

cp .env.example .env.local
# Add your Google Places API key to .env.local

npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Google Places API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Places API (New)**
3. Create an API key → restrict it to your domain
4. Add to `.env.local`:

```
VITE_GOOGLE_PLACES_API_KEY=your_key_here
```

> **Note:** The app works without a Places key — it shows 8 curated Sunnyvale activities as fallback data.

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Your Google Places API key |

The serverless function at `api/places.js` proxies all Places requests server-side so your key is never exposed to the browser.

---

## Project Structure

```
free-summer-fun/
├── api/
│   └── places.js              # Vercel serverless — Places API proxy
├── public/
│   └── sun.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Weather bar + title
│   │   ├── Controls.jsx        # Day tabs + age + indoor toggle
│   │   ├── Stats.jsx           # Free / Open / Nearby counts
│   │   ├── MapArea.jsx         # Animated emoji pin map
│   │   ├── Countdown.jsx       # Summer days remaining
│   │   ├── ActivityCard.jsx    # Activity list item
│   │   └── CardModal.jsx       # Detail popup
│   ├── hooks/
│   │   ├── useWeather.js       # Open-Meteo fetch + 30min refresh
│   │   ├── usePlaces.js        # Merges static + live Places data
│   │   └── useActiveColor.js   # Syncs CSS vars to active tab
│   ├── lib/
│   │   ├── constants.js        # Colors, static data, helpers
│   │   └── places.js           # Places API client
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
├── .env.example
└── package.json
```

---

## Customizing Location

Edit `src/lib/constants.js`:

```js
export const LAT  = 37.3688       // Your latitude
export const LON  = -122.0363     // Your longitude
export const CITY = 'Sunnyvale, CA'
```

Also update the `BOUNDS` object in `src/components/MapArea.jsx` to match your city's bounding box.

---

## License

MIT
