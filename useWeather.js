{weather.temp >= 90 && (
  <div className="heat-alert-banner">
    🔥 It's a scorcher today! Switch to the <strong>Indoor</strong> tab to find cool activities nearby! :)
  </div>
)}
import { useState, useEffect } from 'react'
import { CITY_COORDS } from './constants.js'

// Updated to match the friendly "Mage" UI wording
function wmoDesc(code) {
  if (code === 0) return 'Sunny and Fair ☀️'
  if (code <= 3) return 'Partly Cloudy ⛅'
  if (code <= 69) return 'Light Rain 🌧️'
  if (code <= 99) return 'Thunderstorm Alert ⛈️'
  return 'Fair Skies ⛅'
}

export function useWeather(city = 'Sunnyvale') {
  const [weather, setWeather] = useState({
    temp: '--',
    feel: null,
    wind: null,
    desc: 'Loading...',
    isHot: false,
    loaded: false,
  })

  useEffect(() => {
    async function load() {
      const coords = CITY_COORDS[city]
      if (!coords) return

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${coords.lat}&longitude=${coords.lon}` +
            `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m` +
            `&temperature_unit=fahrenheit&wind_speed_unit=mph`
        )
        const data = await res.json()
        const c = data.current
        
        const temp = Math.round(c.temperature_2m)
        const desc = wmoDesc(c.weather_code)

        setWeather({ 
          temp, 
          feel: Math.round(c.apparent_temperature), 
          wind: Math.round(c.wind_speed_10m), 
          desc, 
          isHot: temp >= 90, 
          loaded: true 
        })
      } catch (error) {
        console.error("Weather fetch failed:", error)
        setWeather(w => ({ ...w, desc: 'Weather unavailable', loaded: true }))
      }
    }

    load()
    const interval = setInterval(load, 30 * 60 * 1000) 
    return () => clearInterval(interval)
  }, [city]) 

  return weather
}