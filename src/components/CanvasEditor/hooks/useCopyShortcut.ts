import { useEffect } from 'react'

import { copyCanvasToClipboard } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'

export function useCopyShortcut(): void {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const modifier = isMac ? e.metaKey : e.ctrlKey

      if (modifier && e.key === 'c') {
        e.preventDefault()

        if (!fabricCanvas) return

        const canvas = fabricCanvas.getElement() as HTMLCanvasElement
        copyCanvasToClipboard(canvas)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fabricCanvas])
}
