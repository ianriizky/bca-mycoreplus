import { useCallback, useMemo } from 'react'

import type { ColorPalette, ColorPaletteItem, RGB } from '../types'

import { BCA_BRAND_COLORS } from '../types'

const COLOR_NAMES = [
  'Vibrant',
  'Muted',
  'DarkVibrant',
  'LightVibrant',
  'Muted Dark',
]

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = n.toString(16)

    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase()
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function useColorExtraction() {
  const extractColors = useCallback(
    (imageUrl: string): Promise<ColorPalette> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'

        img.onload = async () => {
          try {
            const { getPaletteSync } = await import('colorthief')
            const palette = getPaletteSync(img, { colorCount: 5 })

            if (!palette || palette.length === 0) {
              resolve({
                colors: BCA_BRAND_COLORS,
                isDefault: true,
              })

              return
            }

            const colors: ColorPaletteItem[] = palette.map(
              (color: unknown, index: number) => {
                let rgbObj: RGB = { r: 0, g: 0, b: 0 }

                if (typeof color === 'object' && color !== null) {
                  const colorObj = color as Record<string, unknown>
                  if ('r' in colorObj && 'g' in colorObj && 'b' in colorObj) {
                    rgbObj = {
                      r: colorObj.r as number,
                      g: colorObj.g as number,
                      b: colorObj.b as number,
                    }
                  } else if (Array.isArray(color)) {
                    rgbObj = {
                      r: (color as number[])[0],
                      g: (color as number[])[1],
                      b: (color as number[])[2],
                    }
                  }
                }

                return {
                  name: COLOR_NAMES[index] || `Color ${index + 1}`,
                  hex: rgbToHex(rgbObj),
                  rgb: rgbObj,
                }
              },
            )

            resolve({
              colors,
              isDefault: false,
            })
          } catch (error) {
            console.error('Color extraction failed:', error)
            resolve({
              colors: BCA_BRAND_COLORS,
              isDefault: true,
            })
          }
        }

        img.onerror = () => {
          console.error('Failed to load image for color extraction')
          resolve({
            colors: BCA_BRAND_COLORS,
            isDefault: true,
          })
        }

        img.src = imageUrl
      })
    },
    [],
  )

  const getDefaultPalette = useCallback((): ColorPalette => {
    return {
      colors: BCA_BRAND_COLORS,
      isDefault: true,
    }
  }, [])

  return useMemo(
    () => ({
      extractColors,
      getDefaultPalette,
      hexToRgb,
      rgbToHex,
    }),
    [extractColors, getDefaultPalette],
  )
}
