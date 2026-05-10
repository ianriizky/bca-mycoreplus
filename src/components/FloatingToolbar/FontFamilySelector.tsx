import { useCallback } from 'react'

import { useCanvasStore } from '@/stores/canvas'

interface FontFamilySelectorProps {
  selectedObjectId: string | null
}

const FONT_PRESETS = [
  { value: 'system-ui', label: 'System' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Courier New, monospace', label: 'Courier' },
  { value: 'Times New Roman, serif', label: 'Times' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
] as const

export function FontFamilySelector({
  selectedObjectId,
}: FontFamilySelectorProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentFont = useCallback((): string => {
    if (!selectedObjectId || !fabricCanvas) return 'system-ui'

    const obj = fabricCanvas
      .getObjects()
      .find((o) => (o as { id?: string }).id === selectedObjectId)

    return (obj as { fontFamily?: string })?.fontFamily || 'system-ui'
  }, [selectedObjectId, fabricCanvas])

  const handleFontChange = useCallback(
    (fontFamily: string) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { fontFamily })
    },
    [selectedObjectId, updateObject],
  )

  const currentFont = getCurrentFont()

  return (
    <select
      value={currentFont}
      onChange={(e) => handleFontChange(e.target.value)}
      disabled={!selectedObjectId}
      className="h-10 rounded-lg border border-[#0B1F3A]/30 bg-white px-2 text-sm text-[#0B1F3A] disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Font Family"
      title="Font Family"
    >
      {FONT_PRESETS.map(({ value, label }) => (
        <option key={value} value={value} style={{ fontFamily: value }}>
          {label}
        </option>
      ))}
    </select>
  )
}
