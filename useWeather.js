import { useState, useEffect } from 'react';

export default function useWeather(lat, lon) {
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lat || !lon) return;
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`)
      .then(r => r.json())
      .then(data => {
        const code = data.current_weather?.weathercode;
        const temp = Math.round(data.current_weather?.temperature);
        const conditions = {
          0: 'Sunny and Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
          45: 'Foggy', 48: 'Foggy', 51: 'Light Drizzle', 61: 'Light Rain',
          71: 'Light Snow', 80: 'Rain Showers', 95: 'Thunderstorms',
        };
        const condition = conditions[code] || 'Sunny and Fair';
        setWeather({ temp, condition });
        setLoading(false);
      })
      .catch(() => {
        setWeather({ temp: 72, condition: 'Sunny and Fair' });
        setLoading(false);
      });
  }, [lat, lon]);

  return { weather, loading };
}
