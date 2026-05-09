import { useMemo } from 'react'

import { getContrastRatio, meetsWCAGAA } from '@/lib/contrast'

import type { ColorPaletteItem } from './types'

interface ColorSwatchProps {
  color: ColorPaletteItem
  isSelected: boolean
  onSelect: (color: ColorPaletteItem) => void
}

export function ColorSwatch({ color, isSelected, onSelect }: ColorSwatchProps) {
  const contrastRatio = useMemo(
    () => getContrastRatio(color.hex, '#FFFFFF'),
    [color.hex],
  )
  const meetsStandard = meetsWCAGAA(contrastRatio)

  return (
    <button
      onClick={() => onSelect(color)}
      className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-all ${
        isSelected ? 'ring-2 ring-[#0B1F3A] ring-offset-2' : 'hover:scale-105'
      }`}
      aria-label={`Color: ${color.hex}, Contrast: ${contrastRatio.toFixed(2)}:1 ${meetsStandard ? '(WCAG AA)' : '(Low contrast)'}`}
      title={color.name}
    >
      <div
        className="h-16 w-16 rounded-lg border border-gray-200 shadow-sm"
        style={{ backgroundColor: color.hex }}
      />
      <div className="text-center">
        <div className="text-xs font-medium text-gray-700">{color.name}</div>
        <div className="text-xs text-gray-500">{color.hex}</div>
        <div
          className={`text-xs font-semibold ${meetsStandard ? 'text-green-600' : 'text-red-600'}`}
          aria-live="polite"
        >
          {contrastRatio.toFixed(2)}:1
        </div>
      </div>
    </button>
  )
}
