import { describe, it, expect } from 'vitest'

import {
  getContrastRatio,
  getRelativeLuminance,
  hexToRgb,
  meetsWCAGAA,
  meetsWCAGAAA,
  meetsWCAGAALarge,
  meetsWCAGAAALarge,
} from '@/lib/contrast'

describe('Contrast Checker', () => {
  describe('hexToRgb', () => {
    it('should convert hex color to RGB', () => {
      const result = hexToRgb('#FF0000')

      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should handle lowercase hex', () => {
      const result = hexToRgb('#ff0000')

      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should handle hex without hash', () => {
      const result = hexToRgb('FF0000')

      expect(result).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('should return black for invalid hex', () => {
      const result = hexToRgb('invalid')

      expect(result).toEqual({ r: 0, g: 0, b: 0 })
    })

    it('should convert white correctly', () => {
      const result = hexToRgb('#FFFFFF')

      expect(result).toEqual({ r: 255, g: 255, b: 255 })
    })
  })

  describe('getRelativeLuminance', () => {
    it('should calculate luminance for white', () => {
      const luminance = getRelativeLuminance({ r: 255, g: 255, b: 255 })

      expect(luminance).toBeCloseTo(1, 2)
    })

    it('should calculate luminance for black', () => {
      const luminance = getRelativeLuminance({ r: 0, g: 0, b: 0 })

      expect(luminance).toBeCloseTo(0, 2)
    })

    it('should calculate luminance for BCA blue', () => {
      const luminance = getRelativeLuminance({ r: 11, g: 31, b: 58 })

      expect(luminance).toBeGreaterThan(0)
      expect(luminance).toBeLessThan(1)
    })
  })

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio for white on black', () => {
      const ratio = getContrastRatio('#FFFFFF', '#000000')

      expect(ratio).toBeCloseTo(21, 0)
    })

    it('should calculate contrast ratio for BCA blue on white', () => {
      const ratio = getContrastRatio('#0B1F3A', '#FFFFFF')

      expect(ratio).toBeGreaterThan(4.5)
    })

    it('should calculate contrast ratio for gold on white', () => {
      const ratio = getContrastRatio('#C8A96A', '#FFFFFF')

      // #C8A96A on white has ratio ~2.2 (low contrast, fails WCAG)
      expect(ratio).toBeGreaterThan(2.0)
      expect(ratio).toBeLessThan(3.0)
    })

    it('should return same ratio regardless of color order', () => {
      const ratio1 = getContrastRatio('#FFFFFF', '#000000')
      const ratio2 = getContrastRatio('#000000', '#FFFFFF')

      expect(ratio1).toBeCloseTo(ratio2, 5)
    })
  })

  describe('meetsWCAGAA', () => {
    it('should return true for ratio >= 4.5', () => {
      expect(meetsWCAGAA(4.5)).toBe(true)
      expect(meetsWCAGAA(5)).toBe(true)
      expect(meetsWCAGAA(21)).toBe(true)
    })

    it('should return false for ratio < 4.5', () => {
      expect(meetsWCAGAA(4.4)).toBe(false)
      expect(meetsWCAGAA(3)).toBe(false)
      expect(meetsWCAGAA(1)).toBe(false)
    })
  })

  describe('meetsWCAGAALarge', () => {
    it('should return true for ratio >= 3', () => {
      expect(meetsWCAGAALarge(3)).toBe(true)
      expect(meetsWCAGAALarge(4.5)).toBe(true)
      expect(meetsWCAGAALarge(21)).toBe(true)
    })

    it('should return false for ratio < 3', () => {
      expect(meetsWCAGAALarge(2.9)).toBe(false)
      expect(meetsWCAGAALarge(1)).toBe(false)
    })
  })

  describe('meetsWCAGAAA', () => {
    it('should return true for ratio >= 7', () => {
      expect(meetsWCAGAAA(7)).toBe(true)
      expect(meetsWCAGAAA(10)).toBe(true)
      expect(meetsWCAGAAA(21)).toBe(true)
    })

    it('should return false for ratio < 7', () => {
      expect(meetsWCAGAAA(6.9)).toBe(false)
      expect(meetsWCAGAAA(4.5)).toBe(false)
    })
  })

  describe('meetsWCAGAAALarge', () => {
    it('should return true for ratio >= 4.5', () => {
      expect(meetsWCAGAAALarge(4.5)).toBe(true)
      expect(meetsWCAGAAALarge(7)).toBe(true)
      expect(meetsWCAGAAALarge(21)).toBe(true)
    })

    it('should return false for ratio < 4.5', () => {
      expect(meetsWCAGAAALarge(4.4)).toBe(false)
      expect(meetsWCAGAAALarge(3)).toBe(false)
    })
  })
})
