import { useEffect, useState } from 'react'

import { useCanvasStore } from '@/stores/canvas'

interface PositionDisplayProps {
  selectedObjectId: string | null
}

export function PositionDisplay({ selectedObjectId }: PositionDisplayProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!fabricCanvas) return

    const handleRender = () => {
      if (!selectedObjectId) {
        setPosition({ x: 0, y: 0 })

        return
      }

      const objects = fabricCanvas.getObjects()
      const obj = objects.find(
        (o: unknown) => (o as { id?: string }).id === selectedObjectId,
      )

      if (obj) {
        setPosition({
          x: Math.round(obj.left || 0),
          y: Math.round(obj.top || 0),
        })
      }
    }

    fabricCanvas.on('after:render', handleRender)

    return () => {
      fabricCanvas.off('after:render', handleRender)
    }
  }, [selectedObjectId, fabricCanvas])

  return (
    <div
      className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700"
      aria-label={`Object position: X ${position.x}, Y ${position.y}`}
    >
      <span>X: {position.x}</span>
      <span className="text-gray-400">|</span>
      <span>Y: {position.y}</span>
    </div>
  )
}
