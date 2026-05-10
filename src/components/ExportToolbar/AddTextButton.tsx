import { Type } from 'lucide-react'
import { useCallback } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function AddTextButton() {
  const addObject = useCanvasStore((s) => s.addObject)

  const handleAddText = useCallback(async () => {
    await addObject('text')
  }, [addObject])

  return (
    <button
      onClick={handleAddText}
      className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0B1F3A] shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-xl"
      aria-label="Add Text to Canvas"
    >
      <Type size={18} aria-hidden="true" />
      <span className="hidden sm:inline">Add Text</span>
    </button>
  )
}
