import { useEffect } from 'react'

import { useCanvasStore } from '@/stores/canvas'
import {
  type SelectionCreatedEvent,
  type SelectionUpdatedEvent,
  type TextEditingEvent,
} from '@/types/fabric'

export function useCanvasEvents() {
  const { fabricCanvas, selectObject } = useCanvasStore()

  useEffect(() => {
    if (!fabricCanvas) return

    const handleSelectionCreated = (e: SelectionCreatedEvent) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0] as { id?: string }
        selectObject(obj.id || '')
      }
    }

    const handleSelectionUpdated = (e: SelectionUpdatedEvent) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0] as { id?: string }
        selectObject(obj.id || '')
      }
    }

    const handleSelectionCleared = () => {
      selectObject(null)
    }

    const handleTextEditingEntered = (e: TextEditingEvent) => {
      if (e.target) {
        const obj = e.target as { id?: string }
        selectObject(obj.id || '')
      }
    }

    const handleTextChanged = () => {
      fabricCanvas.requestRenderAll()
    }

    const handleObjectAdded = () => {
      fabricCanvas.requestRenderAll()
    }

    const handleObjectModified = () => {
      fabricCanvas.requestRenderAll()
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
