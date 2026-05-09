import { useCallback, useState } from 'react'

const SAFE_ZONE_STORAGE_KEY = 'bca-safe-zone-visible'

export function useSafeZoneVisibility() {
  const [isVisible, setIsVisible] = useState(() => {
    const stored = localStorage.getItem(SAFE_ZONE_STORAGE_KEY)

    return stored === null ? true : stored === 'true'
  })

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => {
      const newValue = !prev
      localStorage.setItem(SAFE_ZONE_STORAGE_KEY, String(newValue))

      return newValue
    })
  }, [])

  return { isVisible, toggleVisibility }
}
