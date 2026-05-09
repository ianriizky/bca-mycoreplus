import type { Canvas } from 'fabric'

import type { CanvasState } from '@/stores/history'

export function serializeCanvasState(canvas: Canvas): CanvasState {
  return {
    objects: canvas.getObjects(),
    canvasJSON: JSON.stringify(canvas.toJSON()),
    timestamp: Date.now(),
  }
}

export function deserializeCanvasState(
  canvas: Canvas,
  state: CanvasState,
): void {
  canvas.clear()
  canvas.loadFromJSON(state.canvasJSON, () => {
    canvas.renderAll()
  })
}
