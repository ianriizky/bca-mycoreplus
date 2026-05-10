import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'
import { useCallback } from 'react'

import { useCanvasStore } from '@/stores/canvas'

interface TextAlignmentButtonsProps {
  selectedObjectId: string | null
}

const ALIGNMENTS = [
  { value: 'left', icon: AlignLeft, label: 'Align Left' },
  { value: 'center', icon: AlignCenter, label: 'Align Center' },
  { value: 'right', icon: AlignRight, label: 'Align Right' },
  { value: 'justify', icon: AlignJustify, label: 'Justify' },
] as const

type TextAlign = (typeof ALIGNMENTS)[number]['value']

export function TextAlignmentButtons({
  selectedObjectId,
}: TextAlignmentButtonsProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentAlignment = useCallback((): TextAlign => {
    if (!selectedObjectId || !fabricCanvas) return 'left'

    const obj = fabricCanvas
      .getObjects()
      .find((o) => (o as { id?: string }).id === selectedObjectId)

    return ((obj as { textAlign?: string })?.textAlign || 'left') as TextAlign
  }, [selectedObjectId, fabricCanvas])

  const handleAlignmentChange = useCallback(
    (alignment: TextAlign) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { textAlign: alignment })
    },
    [selectedObjectId, updateObject],
  )

  const currentAlignment = getCurrentAlignment()

  return (
    <div className="flex items-center gap-1">
      {ALIGNMENTS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleAlignmentChange(value)}
          disabled={!selectedObjectId}
          className={`flex size-8 items-center justify-center rounded-lg text-[#0B1F3A] transition-colors ${
            currentAlignment === value ? 'bg-white/40' : 'hover:bg-white/20'
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label={label}
          aria-pressed={currentAlignment === value}
          title={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}
