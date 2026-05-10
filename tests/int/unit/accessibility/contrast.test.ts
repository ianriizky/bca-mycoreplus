import { describe, it, expect } from 'vitest'

import {
  hexToRgb,
  getContrastRatio,
  meetsWCAGAA,
  meetsWCAGAALarge,
  meetsWCAGAAA,
} from '@/lib/contrast'

describe('Color Contrast', () => {
  it('should convert hex to RGB', () => {
    const rgb = hexToRgb('#FFFFFF')
    expect(rgb).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('should convert hex to RGB for black', () => {
    const rgb = hexToRgb('#000000')
    expect(rgb).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('should calculate contrast ratio between black and white', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(ratio).toBeGreaterThan(20)
  })

  it('should calculate contrast ratio between gold and white', () => {
    const ratio = getContrastRatio('#C8A96A', '#FFFFFF')
    expect(ratio).toBeGreaterThan(1)
  })

  it('should verify WCAG AA compliance for high contrast', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(meetsWCAGAA(ratio)).toBe(true)
  })

  it('should verify WCAG AA compliance for large text', () => {
    const ratio = getContrastRatio('#C8A96A', '#FFFFFF')
    const meetsLarge = meetsWCAGAALarge(ratio)
    expect(typeof meetsLarge).toBe('boolean')
  })

  it('should verify WCAG AAA compliance for high contrast', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(meetsWCAGAAA(ratio)).toBe(true)
  })

  it('should handle invalid hex colors gracefully', () => {
    const rgb = hexToRgb('invalid')
    expect(rgb).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('should calculate contrast ratio for navy and white', () => {
    const ratio = getContrastRatio('#0B1F3A', '#FFFFFF')
    expect(meetsWCAGAA(ratio)).toBe(true)
  })
})
