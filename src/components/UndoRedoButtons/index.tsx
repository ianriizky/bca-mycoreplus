import { RotateCcw, RotateCw } from 'lucide-react'

import { useCanvasStore } from '@/stores/canvas'
import { useHistoryStore } from '@/stores/history'

export function UndoRedoButtons() {
  const { undo, redo } = useCanvasStore()
  const { canUndo, canRedo } = useHistoryStore()

  const handleUndo = () => {
    undo()
  }

  const handleRedo = () => {
    redo()
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleUndo}
        disabled={!canUndo()}
        className="flex size-12 items-center justify-center rounded-lg bg-[#C8A96A] text-white transition-colors hover:bg-[#B89A5A] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:opacity-50"
        aria-label="Undo (Ctrl+Z)"
        title="Undo (Ctrl+Z)"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={handleRedo}
        disabled={!canRedo()}
        className="flex size-12 items-center justify-center rounded-lg bg-[#C8A96A] text-white transition-colors hover:bg-[#B89A5A] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:opacity-50"
        aria-label="Redo (Ctrl+Y)"
        title="Redo (Ctrl+Y)"
      >
        <RotateCw size={20} />
      </button>
    </div>
  )
}
