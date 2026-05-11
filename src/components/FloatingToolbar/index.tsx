import type { Object as FabricObject } from 'fabric'

import {
  Bold,
  GripVertical,
  Italic,
  Palette,
  RotateCcw,
  RotateCw,
  Trash2,
  Upload,
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

import type { ColorPaletteItem } from '@/components/ColorPicker/types'

import { ColorPicker } from '@/components/ColorPicker'
import { useCanvasStore } from '@/stores/canvas'

import { FontFamilySelector } from './FontFamilySelector'
import { useDraggable } from './hooks/useDraggable'
import { useToolbarPosition } from './hooks/useToolbarPosition'
import { useToolbarVisibility } from './hooks/useToolbarVisibility'
import { NudgeButtons } from './NudgeButtons'
import { PositionDisplay } from './PositionDisplay'
import { ScaleControl } from './ScaleControl'
import { TextAlignmentButtons } from './TextAlignmentButtons'
import { TextSpacingControls } from './TextSpacingControls'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function isTextObject(obj: unknown): obj is FabricObject & { type: string } {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    ['text', 'textbox', 'i-text'].includes(
      (obj as Record<string, unknown>).type as string,
    )
  )
}

function isImageObject(obj: unknown): boolean {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    (obj as Record<string, unknown>).type === 'image'
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
  const { position: dragPosition, handlePointerDown } = useDraggable(position)

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
  const isImage = isImageObject(selectedObject)

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

  const handleFontSizeValueChange = (value: number) => {
    if (!isText || !selectedObjectId) return
    updateObject(selectedObjectId, { fontSize: value })
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

  const handleImageScaleValueChange = (value: number) => {
    if (!selectedObjectId) return
    updateObject(selectedObjectId, { scaleX: value, scaleY: value })
  }

  const handleRotateLeft = () => {
    if (!selectedObjectId || !selectedObject) return

    const currentAngle =
      ((selectedObject as unknown as Record<string, unknown>).angle as
        | number
        | undefined) || 0
    const newAngle = currentAngle - 15
    updateObject(selectedObjectId, { angle: newAngle })
  }

  const handleRotateRight = () => {
    if (!selectedObjectId || !selectedObject) return

    const currentAngle =
      ((selectedObject as unknown as Record<string, unknown>).angle as
        | number
        | undefined) || 0
    const newAngle = currentAngle + 15
    updateObject(selectedObjectId, { angle: newAngle })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handlePhotoUpload(file)
    }
  }

  const currentColor =
    ((selectedObject as unknown as Record<string, unknown>).fill as string) ||
    '#0B1F3A'

  const currentScale =
    ((selectedObject as unknown as Record<string, unknown>).scaleX as
      | number
      | undefined) || 1

  const currentFontSize =
    ((selectedObject as unknown as Record<string, unknown>).fontSize as
      | number
      | undefined) || 16

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedObjectId) return
    applyColor(selectedObjectId, e.target.value)
    setSelectedColor(e.target.value)
  }

  return (
    <div
      role="toolbar"
      aria-label="Formatting options"
      aria-hidden={!isVisible}
      data-draggable
      className="fixed z-50 flex flex-col gap-2 rounded-xl border border-white/20 bg-white/80 p-3 shadow-lg backdrop-blur-[15px]"
      style={{
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
      }}
    >
      <div
        onPointerDown={handlePointerDown}
        className="flex cursor-move items-center justify-center rounded-lg hover:bg-white/20"
        style={{ touchAction: 'none', userSelect: 'none' }}
        aria-label="Drag to move toolbar"
        title="Drag to move"
      >
        <GripVertical size={20} className="text-[#0B1F3A]" />
      </div>

      <div className="flex items-center gap-2">
        <PositionDisplay selectedObjectId={selectedObjectId} />
        <NudgeButtons selectedObjectId={selectedObjectId} />
      </div>

      <div className="flex items-center gap-2">
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

        {isImage && (
          <>
            <div className="h-8 w-px bg-white/20" />

            <ScaleControl
              value={currentScale}
              min={0.1}
              max={5}
              step={0.1}
              onChange={handleImageScaleValueChange}
              label="Scale"
              unit="x"
            />

            <div className="h-8 w-px bg-white/20" />

            <button
              onClick={handleRotateLeft}
              disabled={!selectedObjectId}
              className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Rotate Left"
              title="Rotate -15°"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={handleRotateRight}
              disabled={!selectedObjectId}
              className="flex size-12 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Rotate Right"
              title="Rotate +15°"
            >
              <RotateCw size={20} />
            </button>
          </>
        )}

        {isText && (
          <>
            <div className="h-8 w-px bg-white/20" />

            <ScaleControl
              value={currentFontSize}
              min={8}
              max={200}
              step={2}
              onChange={handleFontSizeValueChange}
              label="Font Size"
              unit="px"
            />

            <FontFamilySelector selectedObjectId={selectedObjectId} />

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

            <label className="relative flex size-12 cursor-pointer items-center justify-center rounded-lg text-[#0B1F3A] transition-colors hover:bg-white/20">
              <input
                type="color"
                value={currentColor}
                onChange={handleCustomColorChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Custom Text Color"
                title="Custom Text Color"
              />
              <div
                className="size-6 rounded-full border-2 border-[#0B1F3A]"
                style={{ backgroundColor: currentColor }}
              />
            </label>
          </>
        )}
      </div>

      {isText && (
        <div className="flex items-center gap-2">
          <TextAlignmentButtons selectedObjectId={selectedObjectId} />
          <div className="h-8 w-px bg-white/20" />
          <TextSpacingControls selectedObjectId={selectedObjectId} />
        </div>
      )}
    </div>
  )
}
