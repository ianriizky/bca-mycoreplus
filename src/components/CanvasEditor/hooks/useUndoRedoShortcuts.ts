import { useEffect } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function useUndoRedoShortcuts() {
  const { undo, redo } = useCanvasStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const modifier = isMac ? e.metaKey : e.ctrlKey

      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (modifier && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])
}
