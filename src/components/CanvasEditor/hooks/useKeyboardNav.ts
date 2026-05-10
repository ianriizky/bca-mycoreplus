import { useEffect } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function useKeyboardNav() {
  const { fabricCanvas, selectedObjectId, deleteObject, selectObject } =
    useCanvasStore()

  useEffect(() => {
    if (!fabricCanvas) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedObjectId) return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteObject(selectedObjectId)
        selectObject(null)

        return
      }

      if (e.key.startsWith('Arrow')) {
        e.preventDefault()
        const obj = fabricCanvas
          .getObjects()
          .find((o: any) => (o as any).id === selectedObjectId)

        if (!obj) return

        const step = e.shiftKey ? 10 : 1

        switch (e.key) {
          case 'ArrowUp':
            obj.set({ top: (obj as any).top - step })
            break

          case 'ArrowDown':
            obj.set({ top: (obj as any).top + step })
            break

          case 'ArrowLeft':
            obj.set({ left: (obj as any).left - step })
            break

          case 'ArrowRight':
            obj.set({ left: (obj as any).left + step })
            break
        }

        fabricCanvas.requestRenderAll()
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        selectObject(null)
        fabricCanvas.discardActiveObject()
        fabricCanvas.requestRenderAll()
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const objects = fabricCanvas.getObjects()
        if (objects.length === 0) return

        const currentIndex = objects.findIndex(
          (o: any) => (o as any).id === selectedObjectId,
        )
        const nextIndex = e.shiftKey
          ? (currentIndex - 1 + objects.length) % objects.length
          : (currentIndex + 1) % objects.length

        const nextObj = objects[nextIndex]
        selectObject((nextObj as any).id || '')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fabricCanvas, selectedObjectId, deleteObject, selectObject])
}
