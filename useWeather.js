import { useState, useEffect } from 'react'
import { LAT, LON, CITY, wmoDesc } from './constants.js'
export function useWeather() {
  const [weather, setWeather] = useState({
    temp: null,
    feel: null,
    wind: null,
    desc: 'Loading...',
    city: CITY,
    isHot: false,
    loaded: false,
  })

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${LAT}&longitude=${LON}` +
            `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m` +
            `&temperature_unit=fahrenheit&wind_speed_unit=mph`
        )
        const data = await res.json()
        const c = data.current
        const temp = Math.round(c.temperature_2m)
        const feel = Math.round(c.apparent_temperature)
        const wind = Math.round(c.wind_speed_10m)
        const desc = wmoDesc(c.weather_code)
        setWeather({ temp, feel, wind, desc, city: CITY, isHot: temp >= 90, loaded: true })
      } catch {
        setWeather(w => ({ ...w, desc: 'Weather unavailable', loaded: true }))
      }
    }
    load()
    const interval = setInterval(load, 30 * 60 * 1000) // refresh every 30 min
    return () => clearInterval(interval)
  }, [])

  return weather
}
