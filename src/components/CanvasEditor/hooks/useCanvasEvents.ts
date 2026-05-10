import { useEffect } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function useCanvasEvents() {
  const { fabricCanvas, selectObject } = useCanvasStore()

  useEffect(() => {
    if (!fabricCanvas) return

    const handleSelectionCreated = (e: any) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0]
        selectObject((obj as any).id || '')
      }
    }

    const handleSelectionUpdated = (e: any) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0]
        selectObject((obj as any).id || '')
      }
    }

    const handleSelectionCleared = () => {
      selectObject(null)
    }

    const handleTextEditingEntered = (e: any) => {
      const obj = e.target
      if (obj) {
        selectObject((obj as any).id || '')
      }
    }

    const handleTextChanged = (e: any) => {
      const obj = e.target
      if (obj) {
        fabricCanvas.requestRenderAll()
      }
    }

    const handleObjectAdded = () => {
      fabricCanvas.requestRenderAll()
    }

    const handleObjectModified = (e: any) => {
      const obj = e.target
      if (obj) {
        fabricCanvas.requestRenderAll()
      }
    }

    fabricCanvas.on('selection:created', handleSelectionCreated)
    fabricCanvas.on('selection:updated', handleSelectionUpdated)
    fabricCanvas.on('selection:cleared', handleSelectionCleared)
    fabricCanvas.on('text:editing:entered', handleTextEditingEntered)
    fabricCanvas.on('text:changed', handleTextChanged)
    fabricCanvas.on('object:added', handleObjectAdded)
    fabricCanvas.on('object:modified', handleObjectModified)

    return () => {
      fabricCanvas.off('selection:created', handleSelectionCreated)
      fabricCanvas.off('selection:updated', handleSelectionUpdated)
      fabricCanvas.off('selection:cleared', handleSelectionCleared)
      fabricCanvas.off('text:editing:entered', handleTextEditingEntered)
      fabricCanvas.off('text:changed', handleTextChanged)
      fabricCanvas.off('object:added', handleObjectAdded)
      fabricCanvas.off('object:modified', handleObjectModified)
    }
  }, [fabricCanvas, selectObject])
}
