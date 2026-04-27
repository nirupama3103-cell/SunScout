import { useEffect } from 'react'
import { TAB_COLORS } from './constants.js'

export function useActiveColor(day) {
  useEffect(() => {
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
