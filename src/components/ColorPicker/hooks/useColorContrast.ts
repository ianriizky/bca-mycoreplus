import { useCallback } from 'react'

import type { RGB } from '../types'

export function useColorContrast() {
  const calculateLuminance = useCallback((rgb: RGB): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
      const normalized = v / 255

      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }, [])

  const calculateContrastRatio = useCallback(
    (fg: RGB, bg: RGB): number => {
      const l1 = calculateLuminance(fg)
      const l2 = calculateLuminance(bg)

      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    },
    [calculateLuminance],
  )

  const isAccessible = useCallback(
    (fg: RGB, bg: RGB, minRatio: number = 4.5): boolean => {
      return calculateContrastRatio(fg, bg) >= minRatio
    },
    [calculateContrastRatio],
  )

  return {
    calculateContrastRatio,
    isAccessible,
  }
}
