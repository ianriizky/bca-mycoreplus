import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { ColorPalette, ColorPaletteItem } from './types'

import { ColorSwatch } from './ColorSwatch'
import { useColorExtraction } from './hooks/useColorExtraction'
import { BCA_BRAND_COLORS } from './types'

interface ColorPickerProps {
  isOpen: boolean
  onClose: () => void
  onColorSelect: (color: ColorPaletteItem) => void
  imageUrl?: string
  selectedColor?: string
}

export function ColorPicker({
  isOpen,
  onClose,
  onColorSelect,
  imageUrl,
  selectedColor,
}: ColorPickerProps) {
  const [palette, setPalette] = useState<ColorPalette>({
    colors: BCA_BRAND_COLORS,
    isDefault: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const extractedRef = useRef(false)
  const { extractColors } = useColorExtraction()

  const handleReset = useCallback(() => {
    const deepNavy = BCA_BRAND_COLORS.find((c) => c.hex === '#0B1F3A')
    if (deepNavy) {
      onColorSelect(deepNavy)
      onClose()
    }
  }, [onColorSelect, onClose])

  const handleColorSelect = useCallback(
    (color: ColorPaletteItem) => {
      onColorSelect(color)
      onClose()
    },
    [onColorSelect, onClose],
  )

  // Load palette when component opens or imageUrl changes
  useEffect(() => {
    if (!isOpen || !imageUrl || !palette.isDefault || extractedRef.current) {
      return
    }

    extractedRef.current = true
    setIsLoading(true)

    extractColors(imageUrl).then((result) => {
      setPalette(result)
      setIsLoading(false)
    })
  }, [isOpen, imageUrl, palette.isDefault, extractColors])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-label="Color Picker"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-[15px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {palette.isDefault ? 'BCA Brand Colors' : 'Extracted Colors'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Close Color Picker"
          >
            <X size={20} />
          </button>
        </div>

        {isLoading && (
          <div className="mb-4 text-center text-sm text-gray-600">
            Extracting colors...
          </div>
        )}

        <div className="mb-6 grid grid-cols-3 gap-3">
          {palette.colors.map((color) => (
            <ColorSwatch
              key={color.hex}
              color={color}
              isSelected={selectedColor === color.hex}
              onSelect={handleColorSelect}
            />
          ))}
        </div>

        <button
          onClick={handleReset}
          className="w-full rounded-lg bg-[#0B1F3A] px-4 py-2 text-white transition-colors hover:bg-[#0B1F3A]/90"
          aria-label="Reset to BCA Brand"
        >
          Reset to BCA Brand
        </button>
      </div>
    </div>
  )
}
