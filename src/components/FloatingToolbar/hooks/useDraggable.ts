import { useCallback, useEffect, useRef, useState } from 'react'

interface DraggableState {
  isDragging: boolean
  offset: { x: number; y: number }
  position: { x: number; y: number }
}

export function useDraggable(initialPosition: { x: number; y: number }) {
  const [state, setState] = useState<DraggableState>(() => ({
    isDragging: false,
    offset: { x: 0, y: 0 },
    position: initialPosition,
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return

    const rect = (e.currentTarget as HTMLElement)
      .closest('[data-draggable]')
      ?.getBoundingClientRect()
    if (!rect) return

    setState((prev) => ({
      ...prev,
      isDragging: true,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }))

    e.preventDefault()
  }, [])

  useEffect(() => {
    if (!state.isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        position: {
          x: e.clientX - prev.offset.x,
          y: e.clientY - prev.offset.y,
        },
      }))
    }

    const handleMouseUp = () => {
      setState((prev) => ({
        ...prev,
        isDragging: false,
      }))
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [state.isDragging])

  return {
    position: state.position,
    isDragging: state.isDragging,
    dragHandleRef,
    handleMouseDown,
  }
}
