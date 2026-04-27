import { useState, useEffect } from 'react'
import { CITY_COORDS } from './constants.js'

// Helper function to turn codes into words
function wmoDesc(code) {
  if (code === 0) return 'Clear sky ☀️'
  if (code <= 3) return 'Partly cloudy ⛅'
  if (code <= 69) return 'Rainy 🌧️'
  if (code <= 99) return 'Thunderstorm ⛈️'
  return 'Variable ⛅'
}

export function useWeather(city = 'CA') {
  const [weather, setWeather] = useState({
    temp: null,
    feel: null,
    wind: null,
    desc: 'Loading...',
    isHot: false,
    loaded: false,
  })

  useEffect(() => {
    async function load() {
      // 1. Get coords for the specific city passed in
      const coords = CITY_COORDS[city]
      if (!coords) return

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${coords.lat}&longitude=${coords.lon}` + // Use coords.lat/lon
            `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m` +
            `&temperature_unit=fahrenheit&wind_speed_unit=mph`
        )
        const data = await res.json()
        const c = data.current
        
        const temp = Math.round(c.temperature_2m)
        const feel = Math.round(c.apparent_temperature)
        const wind = Math.round(c.wind_speed_10m)
        const desc = wmoDesc(c.weather_code)

        setWeather({ 
          temp, 
          feel, 
          wind, 
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
  }, [city]) // 2. CRITICAL: Restart this when the city changes

  return weather
}
