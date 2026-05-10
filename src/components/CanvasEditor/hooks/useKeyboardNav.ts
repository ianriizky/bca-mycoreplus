import { useEffect } from 'react'

import type { FabricObjectWithId } from '@/types/fabric'

import { useCanvasStore } from '@/stores/canvas'

function isEditableElement(element: EventTarget | null): boolean {
  if (!element || !(element instanceof HTMLElement)) return false

  const tagName = element.tagName.toLowerCase()
  const isEditableTag = ['input', 'textarea', 'select'].includes(tagName)

  const isEditableAttribute = element.isContentEditable

  return isEditableTag || isEditableAttribute
}

export function useKeyboardNav() {
  const { fabricCanvas, selectedObjectId, deleteObject, selectObject } =
    useCanvasStore()

  useEffect(() => {
    if (!fabricCanvas) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedObjectId) return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (isEditableElement(e.target)) return

        e.preventDefault()
        deleteObject(selectedObjectId)
        selectObject(null)

        return
      }

      if (e.key.startsWith('Arrow')) {
        if (isEditableElement(e.target)) return

        e.preventDefault()
        const obj = fabricCanvas
          .getObjects()
          .find((o) => (o as FabricObjectWithId).id === selectedObjectId)

        if (!obj) return

        const step = e.shiftKey ? 10 : 1
        const fabricObj = obj as FabricObjectWithId

        switch (e.key) {
          case 'ArrowUp':
            fabricObj.set({ top: (fabricObj.top ?? 0) - step })
            break

          case 'ArrowDown':
            fabricObj.set({ top: (fabricObj.top ?? 0) + step })
            break

          case 'ArrowLeft':
            fabricObj.set({ left: (fabricObj.left ?? 0) - step })
            break

          case 'ArrowRight':
            fabricObj.set({ left: (fabricObj.left ?? 0) + step })
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
          (o) => (o as FabricObjectWithId).id === selectedObjectId,
        )
        const nextIndex = e.shiftKey
          ? (currentIndex - 1 + objects.length) % objects.length
          : (currentIndex + 1) % objects.length

        const nextObj = objects[nextIndex]
        selectObject((nextObj as FabricObjectWithId).id || '')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [fabricCanvas, selectedObjectId, deleteObject, selectObject])
}
