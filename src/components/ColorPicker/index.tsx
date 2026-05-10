import { X } from 'lucide-react'
import { useCallback, useEffect, useReducer, useRef } from 'react'

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

type ColorPickerState = {
  palette: ColorPalette
  isLoading: boolean
}

type ColorPickerAction =
  | { type: 'SET_PALETTE'; payload: ColorPalette }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'START_EXTRACTION' }

function colorPickerReducer(
  state: ColorPickerState,
  action: ColorPickerAction,
): ColorPickerState {
  switch (action.type) {
    case 'SET_PALETTE':
      return { ...state, palette: action.payload, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'START_EXTRACTION':
      return { ...state, isLoading: true }
    default:
      return state
  }
}

const initialState: ColorPickerState = {
  palette: {
    colors: BCA_BRAND_COLORS,
    isDefault: true,
  },
  isLoading: false,
}

export function ColorPicker({
  isOpen,
  onClose,
  onColorSelect,
  imageUrl,
  selectedColor,
}: ColorPickerProps) {
  const [state, dispatch] = useReducer(colorPickerReducer, initialState)
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
    if (
      !isOpen ||
      !imageUrl ||
      !state.palette.isDefault ||
      extractedRef.current
    ) {
      return
    }

    extractedRef.current = true
    dispatch({ type: 'START_EXTRACTION' })

    extractColors(imageUrl).then((result) => {
      dispatch({ type: 'SET_PALETTE', payload: result })
    })
  }, [isOpen, imageUrl, state.palette.isDefault, extractColors])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-label="Color Picker"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div
        role="presentation"
        className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-[15px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-800">
            {state.palette.isDefault ? 'BCA Brand Colors' : 'Extracted Colors'}
          </h2>
          <button
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
            }}
            className="flex size-8 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100"
            aria-label="Close Color Picker"
          >
            <X size={20} />
          </button>
        </div>

        {state.isLoading && (
          <div className="mb-4 text-center text-sm text-zinc-600">
            Extracting colors…
          </div>
        )}

        <div className="mb-6 grid grid-cols-3 gap-3">
          {state.palette.colors.map((color) => (
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
