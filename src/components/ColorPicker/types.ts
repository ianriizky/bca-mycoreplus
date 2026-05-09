export interface RGB {
  r: number
  g: number
  b: number
}

export interface ColorPaletteItem {
  name: string
  hex: string
  rgb: RGB
}

export interface ColorPalette {
  colors: ColorPaletteItem[]
  isDefault: boolean
}

export const BCA_BRAND_COLORS: ColorPaletteItem[] = [
  { name: 'BCA Gold', hex: '#C8A96A', rgb: { r: 200, g: 169, b: 106 } },
  { name: 'BCA Deep Navy', hex: '#0B1F3A', rgb: { r: 11, g: 31, b: 58 } },
  { name: 'BCA Sapphire Blue', hex: '#1E3A5F', rgb: { r: 30, g: 58, b: 95 } },
  { name: 'Carbon Black', hex: '#1A1A1A', rgb: { r: 26, g: 26, b: 26 } },
  { name: 'Quartz White', hex: '#F4F1EC', rgb: { r: 244, g: 241, b: 236 } },
]
