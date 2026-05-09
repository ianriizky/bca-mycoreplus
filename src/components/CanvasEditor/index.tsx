import { Canvas } from 'fabric/es'
import { useCallback, useEffect, useRef } from 'react'

import { FileUpload } from '@/components/FileUpload'
import { FloatingToolbar } from '@/components/FloatingToolbar'
import { SafeZoneOverlay } from '@/components/SafeZoneOverlay'
import { useCanvasStore } from '@/stores/canvas'

import { useCanvasEvents } from './hooks/useCanvasEvents'
import { useKeyboardNav } from './hooks/useKeyboardNav'

interface CanvasEditorProps {
  className?: string
}

export function CanvasEditor({ className }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { initCanvas, disposeCanvas, addObject } = useCanvasStore()

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

  const handleFileSelected = useCallback(
    (_file: File, preview: string) => {
      addObject('image', { imageUrl: preview })
    },
    [addObject],
  )

  const handleFileError = useCallback((error: string) => {
    console.error('File upload error:', error)
  }, [])

  return (
    <div className={className}>
      <div className="mb-4 flex gap-2">
        <FileUpload
          onFileSelected={handleFileSelected}
          onError={handleFileError}
        />
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          role="application"
          aria-label="Image editor canvas"
          className="w-full lg:w-full"
        />

        <SafeZoneOverlay />
      </div>

      <FloatingToolbar />
    </div>
  )
}
