import type { Object as FabricObject } from 'fabric'

import {
  Bold,
  Italic,
  Minus,
  Palette,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

import type { ColorPaletteItem } from '@/components/ColorPicker/types'

import { ColorPicker } from '@/components/ColorPicker'
import { useCanvasStore } from '@/stores/canvas'

import { useToolbarPosition } from './hooks/useToolbarPosition'
import { useToolbarVisibility } from './hooks/useToolbarVisibility'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

function isTextObject(obj: unknown): obj is FabricObject & { type: string } {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as Record<string, unknown>).type === 'text'
  )
}

export function FloatingToolbar() {
  const {
    selectedObjectId,
    deleteObject,
    fabricCanvas,
    updateObject,
    applyColor,
  } = useCanvasStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>('#C8A96A')

  // Get selected object from canvas
  let selectedObject: FabricObject | null = null
  if (selectedObjectId && fabricCanvas) {
    const objects = fabricCanvas.getObjects() as unknown[]
    selectedObject = (objects.find(
      (o: unknown) => (o as Record<string, unknown>).id === selectedObjectId,
    ) || null) as FabricObject | null
  }

  const { isVisible } = useToolbarVisibility(selectedObject)
  const position = useToolbarPosition(selectedObject)

  useEffect(() => {
    if (!isVisible) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        const { selectObject } = useCanvasStore.getState()
        selectObject(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  if (!isVisible || !selectedObject) {
    return null
  }

  const isText = isTextObject(selectedObject)

  const handleColorSelect = (color: ColorPaletteItem) => {
    if (selectedObjectId) {
      applyColor(selectedObjectId, color.hex)
      setSelectedColor(color.hex)
    }
  }

  const handleOpenColorPicker = () => {
    setIsColorPickerOpen(true)
  }

  const handleDelete = () => {
    if (selectedObjectId) {
      deleteObject(selectedObjectId)
    }
  }

  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      console.error('File must be an image')

      return
    }

    if (file.size > MAX_FILE_SIZE) {
      console.error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`)

      return
    }

    const reader = new FileReader()
    reader.onerror = () => {
      console.error('Failed to read file')
    }
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      if (selectedObjectId) {
        updateObject(selectedObjectId, { imageUrl })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFontSizeChange = (delta: number) => {
    if (!isText || !selectedObjectId) return

    const currentSize =
      ((selectedObject as unknown as Record<string, unknown>).fontSize as
        | number
        | undefined) || 16
    const newSize = Math.max(8, currentSize + delta)
    updateObject(selectedObjectId, { fontSize: newSize })
  }

  const handleBoldToggle = () => {
    if (!isText || !selectedObjectId) return

    const currentWeight =
      ((selectedObject as unknown as Record<string, unknown>).fontWeight as
        | string
        | undefined) || 'normal'
    const newWeight = currentWeight === 'bold' ? 'normal' : 'bold'
    updateObject(selectedObjectId, { fontWeight: newWeight })
  }

  const handleItalicToggle = () => {
    if (!isText || !selectedObjectId) return

    const currentStyle =
      ((selectedObject as unknown as Record<string, unknown>).fontStyle as
        | string
        | undefined) || 'normal'
    const newStyle = currentStyle === 'italic' ? 'normal' : 'italic'
    updateObject(selectedObjectId, { fontStyle: newStyle })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handlePhotoUpload(file)
    }
  }

  return (
    <div
      role="toolbar"
      aria-label="Formatting options"
      aria-hidden={!isVisible}
      className="fixed z-50 flex items-center gap-2 rounded-xl border border-white/20 bg-white/80 p-3 shadow-lg backdrop-blur-[15px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        onClick={handleOpenColorPicker}
        className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20"
        aria-label="Change Color"
        title="Change Color"
      >
        <Palette size={20} />
      </button>

      <ColorPicker
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        onColorSelect={handleColorSelect}
        selectedColor={selectedColor}
      />

      <button
        onClick={handleDelete}
        className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20"
        aria-label="Delete Object"
        title="Delete Object"
      >
        <Trash2 size={20} />
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20"
        aria-label="Upload Photo"
        title="Upload Photo"
      >
        <Upload size={20} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        aria-hidden="true"
      />

      {isText && (
        <>
          <div className="h-8 w-px bg-white/20" />

          <button
            onClick={() => handleFontSizeChange(2)}
            disabled={!isText}
            className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Increase Font Size"
            title="Increase Font Size"
          >
            <Plus size={20} />
          </button>

          <button
            onClick={() => handleFontSizeChange(-2)}
            disabled={!isText}
            className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Decrease Font Size"
            title="Decrease Font Size"
          >
            <Minus size={20} />
          </button>

          <button
            onClick={handleBoldToggle}
            disabled={!isText}
            className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Bold"
            title="Bold"
          >
            <Bold size={20} />
          </button>

          <button
            onClick={handleItalicToggle}
            disabled={!isText}
            className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Italic"
            title="Italic"
          >
            <Italic size={20} />
          </button>
        </>
      )}
    </div>
  )
}
