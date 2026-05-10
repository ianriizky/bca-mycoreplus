import { useEffect } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function useAddTextShortcuts() {
  const addObject = useCanvasStore((s) => s.addObject)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        const target = e.target as HTMLElement
        const isEditable =
          target instanceof HTMLElement &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable)

        if (isEditable) {
          return
        }

        e.preventDefault()
        addObject('text')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [addObject])
}
