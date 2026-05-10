import { useCallback } from 'react'

import { useCanvasStore } from '@/stores/canvas'

interface TextSpacingControlsProps {
  selectedObjectId: string | null
}

const LINE_HEIGHT_MIN = 1.0
const LINE_HEIGHT_MAX = 2.5
const LINE_HEIGHT_STEP = 0.1

const CHAR_SPACING_MIN = 0
const CHAR_SPACING_MAX = 200
const CHAR_SPACING_STEP = 10

const DEFAULT_LINE_HEIGHT = 1.16

export function TextSpacingControls({
  selectedObjectId,
}: TextSpacingControlsProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentLineHeight = useCallback((): number => {
    if (!selectedObjectId || !fabricCanvas) return DEFAULT_LINE_HEIGHT

    const obj = fabricCanvas
      .getObjects()
      .find((o) => (o as { id?: string }).id === selectedObjectId)

    return (obj as { lineHeight?: number })?.lineHeight ?? DEFAULT_LINE_HEIGHT
  }, [selectedObjectId, fabricCanvas])

  const getCurrentCharSpacing = useCallback((): number => {
    if (!selectedObjectId || !fabricCanvas) return 0

    const obj = fabricCanvas
      .getObjects()
      .find((o) => (o as { id?: string }).id === selectedObjectId)

    return (obj as { charSpacing?: number })?.charSpacing ?? 0
  }, [selectedObjectId, fabricCanvas])

  const handleLineHeightChange = useCallback(
    (lineHeight: number) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { lineHeight })
    },
    [selectedObjectId, updateObject],
  )

  const handleCharSpacingChange = useCallback(
    (charSpacing: number) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { charSpacing })
    },
    [selectedObjectId, updateObject],
  )

  const currentLineHeight = getCurrentLineHeight()
  const currentCharSpacing = getCurrentCharSpacing()

  return (
    <div className="flex items-center gap-3 text-xs text-[#0B1F3A]">
      <label className="flex items-center gap-1">
        <span title="Line Height" className="font-medium">
          LH:
        </span>
        <input
          type="range"
          min={LINE_HEIGHT_MIN}
          max={LINE_HEIGHT_MAX}
          step={LINE_HEIGHT_STEP}
          value={currentLineHeight}
          onChange={(e) => handleLineHeightChange(parseFloat(e.target.value))}
          disabled={!selectedObjectId}
          className="h-1 w-16 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Line height"
        />
        <span className="w-8 text-center font-mono">
          {currentLineHeight.toFixed(1)}
        </span>
      </label>

      <label className="flex items-center gap-1">
        <span title="Character Spacing" className="font-medium">
          CS:
        </span>
        <input
          type="range"
          min={CHAR_SPACING_MIN}
          max={CHAR_SPACING_MAX}
          step={CHAR_SPACING_STEP}
          value={currentCharSpacing}
          onChange={(e) =>
            handleCharSpacingChange(parseInt(e.target.value, 10))
          }
          disabled={!selectedObjectId}
          className="h-1 w-16 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Character spacing"
        />
        <span className="w-8 text-center font-mono">{currentCharSpacing}</span>
      </label>
    </div>
  )
}
