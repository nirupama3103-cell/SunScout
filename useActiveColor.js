import { useEffect } from 'react'
import { TAB_COLORS } from './constants.js'

/**
 * Syncs the CSS custom properties --active-color, --active-r/g/b
 * on :root whenever the active day tab changes.
 */
export function useActiveColor(day) {
  useEffect(() => {
    // If the day doesn't exist in our colors, default to 'today'
    const c = TAB_COLORS[day] || TAB_COLORS['today']
    
    if (c) {
      const root = document.documentElement
      root.style.setProperty('--active-color', c.hex)
      root.style.setProperty('--active-r', c.r)
      root.style.setProperty('--active-g', c.g)
      root.style.setProperty('--active-b', c.b)
    }
  }, [day])
}
