import { Canvas } from 'fabric/es'
import { useEffect, useRef } from 'react'

import { FloatingToolbar } from '@/components/FloatingToolbar'
import { useCanvasStore } from '@/stores/canvas'

import { useCanvasEvents } from './hooks/useCanvasEvents'
import { useKeyboardNav } from './hooks/useKeyboardNav'

interface CanvasEditorProps {
  className?: string
}

export function CanvasEditor({ className }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { initCanvas, disposeCanvas } = useCanvasStore()

  useCanvasEvents()
  useKeyboardNav()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new Canvas(canvasRef.current, {
      width: 375,
      height: 500,
      backgroundColor: '#FFFFFF',
      selection: true,
      preserveObjectStacking: true,
    })

    initCanvas(canvas)

    return () => {
      disposeCanvas()
    }
  }, [initCanvas, disposeCanvas])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        role="application"
        aria-label="Image editor canvas"
        className="w-full lg:w-full"
      />

      <FloatingToolbar />
    </div>
  )
}
