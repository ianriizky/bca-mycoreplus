import { useCallback, useEffect, useRef, useState } from 'react'

interface DraggableState {
  isDragging: boolean
  offset: { x: number; y: number }
  position: { x: number; y: number }
  pointerId: number | null
}

export function useDraggable(initialPosition: { x: number; y: number }) {
  const [state, setState] = useState<DraggableState>(() => ({
    isDragging: false,
    offset: { x: 0, y: 0 },
    position: initialPosition,
    pointerId: null,
  }))
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const prevInitialRef = useRef(initialPosition)

  useEffect(() => {
    if (
      prevInitialRef.current.x !== initialPosition.x ||
      prevInitialRef.current.y !== initialPosition.y
    ) {
      prevInitialRef.current = initialPosition
      setState((prev) => ({
        ...prev,
        position: initialPosition,
      }))
    }
  }, [initialPosition, initialPosition.x, initialPosition.y])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only handle primary pointer (first touch/mouse)
    if (!e.isPrimary) return
    // Only handle left mouse button
    if (e.pointerType === 'mouse' && e.button !== 0) return

    const rect = (e.currentTarget as HTMLElement)
      .closest('[data-draggable]')
      ?.getBoundingClientRect()
    if (!rect) return

    // Capture pointer to receive all events even if pointer moves outside element
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      return
    }

    setState((prev) => ({
      ...prev,
      isDragging: true,
      pointerId: e.pointerId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))

    e.preventDefault()
  }, [])

  useEffect(() => {
    if (!state.isDragging || state.pointerId === null) return

    const handlePointerMove = (e: PointerEvent) => {
      // Only handle the pointer that started the drag
      if (e.pointerId !== state.pointerId) return

      setState((prev) => ({
        ...prev,
        position: {
          x: e.clientX - prev.offset.x,
          y: e.clientY - prev.offset.y,
        },
      }))

      e.preventDefault()
    }

    const handlePointerUp = (e: PointerEvent) => {
      // Only handle the pointer that started the drag
      if (e.pointerId !== state.pointerId) return

      setState((prev) => ({
        ...prev,
        isDragging: false,
        pointerId: null,
      }))
    }

    const handlePointerCancel = (e: PointerEvent) => {
      // Handle system interruptions (e.g., modal, alert)
      if (e.pointerId !== state.pointerId) return

      setState((prev) => ({
        ...prev,
        isDragging: false,
        pointerId: null,
      }))
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerCancel)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerCancel)
    }
  }, [state.isDragging, state.pointerId])

  return {
    position: state.position,
    isDragging: state.isDragging,
    dragHandleRef,
    handlePointerDown,
  }
}
