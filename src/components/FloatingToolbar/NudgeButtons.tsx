import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Crosshair,
} from 'lucide-react'
import { useCallback } from 'react'

import { useCanvasStore } from '@/stores/canvas'

interface NudgeButtonsProps {
  selectedObjectId: string | null
}

const NUDGE_STEP = 1 // 1 pixel per click

export function NudgeButtons({ selectedObjectId }: NudgeButtonsProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const handleNudge = useCallback(
    (dx: number, dy: number) => {
      if (!selectedObjectId || !fabricCanvas) return

      const objects = fabricCanvas.getObjects()
      const obj = objects.find(
        (o: unknown) => (o as { id?: string }).id === selectedObjectId,
      )

      if (obj) {
        updateObject(selectedObjectId, {
          left: (obj.left || 0) + dx,
          top: (obj.top || 0) + dy,
        })
      }
    },
    [selectedObjectId, fabricCanvas, updateObject],
  )

  const handleSnapToCenter = useCallback(() => {
    if (!selectedObjectId) return
    updateObject(selectedObjectId, {
      left: 187.5, // Canvas center X
      top: 250, // Canvas center Y
    })
  }, [selectedObjectId, updateObject])

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleNudge(0, -NUDGE_STEP)}
        disabled={!selectedObjectId}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move up"
        title="Move up"
      >
        <ArrowUp size={16} />
      </button>

      <button
        onClick={() => handleNudge(0, NUDGE_STEP)}
        disabled={!selectedObjectId}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move down"
        title="Move down"
      >
        <ArrowDown size={16} />
      </button>

      <button
        onClick={() => handleNudge(-NUDGE_STEP, 0)}
        disabled={!selectedObjectId}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move left"
        title="Move left"
      >
        <ArrowLeft size={16} />
      </button>

      <button
        onClick={() => handleNudge(NUDGE_STEP, 0)}
        disabled={!selectedObjectId}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move right"
        title="Move right"
      >
        <ArrowRight size={16} />
      </button>

      <div className="h-4 w-px bg-white/20" />

      <button
        onClick={handleSnapToCenter}
        disabled={!selectedObjectId}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Snap to center"
        title="Snap to center"
      >
        <Crosshair size={16} />
      </button>
    </div>
  )
}
