import { useCanvasStore } from '@/stores/canvas'

// @ts-expect-error - Fabric.js v6 object types incompatibility
export function FloatingToolbar() {
  const { selectedObjectId, deleteObject, fabricCanvas } = useCanvasStore()

  if (!selectedObjectId || !fabricCanvas) {
    return null
  }

  const selectedObj = fabricCanvas
    .getObjects()
    .find((o: any) => (o as any).id === selectedObjectId)

  if (!selectedObj) {
    return null
  }

  const handleDelete = () => {
    deleteObject(selectedObjectId)
  }

  const handleDuplicate = () => {
    if (!selectedObj) return

    const cloned = (selectedObj as any).clone()
    cloned.set({
      left: ((cloned as any).left || 0) + 10,
      top: ((cloned as any).top || 0) + 10,
      id: `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    })

    fabricCanvas.add(cloned)
    fabricCanvas.setActiveObject(cloned)
    fabricCanvas.requestRenderAll()
  }

  const handleBringToFront = () => {
    if (!selectedObj) return

    fabricCanvas.bringObjectToFront(selectedObj)
    fabricCanvas.requestRenderAll()
  }

  const handleSendToBack = () => {
    if (!selectedObj) return

    fabricCanvas.sendObjectToBack(selectedObj)
    fabricCanvas.requestRenderAll()
  }

  return (
    <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 gap-2 rounded-lg bg-white p-3 shadow-lg">
      <button
        onClick={handleDuplicate}
        className="rounded bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
        title="Duplicate object"
      >
        Duplicate
      </button>

      <button
        onClick={handleBringToFront}
        className="rounded bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
        title="Bring to front"
      >
        Front
      </button>

      <button
        onClick={handleSendToBack}
        className="rounded bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
        title="Send to back"
      >
        Back
      </button>

      <button
        onClick={handleDelete}
        className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
        title="Delete object"
      >
        Delete
      </button>
    </div>
  )
}
