import type { Canvas } from 'fabric'

import { create } from 'zustand'

import {
  deserializeCanvasState,
  serializeCanvasState,
} from '@/lib/canvas/serialize'
import { loadFabric } from '@/lib/fabric-loader'
import { useHistoryStore } from '@/stores/history'

/**
 * Serialized object for persistence and state management
 */
interface SerializedObject {
  id: string
  type: 'text' | 'image' | 'rect' | 'circle'
  left: number
  top: number
  width: number
  height: number
  angle?: number
  fill?: string
  [key: string]: unknown
}

interface CanvasStore {
  fabricCanvas: Canvas | null
  objects: SerializedObject[]
  selectedObjectId: string | null
  isLoading: boolean
  clipboardSupported: boolean
  isExporting: boolean
  history: {
    past: SerializedObject[][]
    future: SerializedObject[][]
  }

  // Actions
  initCanvas: (el: HTMLCanvasElement) => Promise<void>
  disposeCanvas: () => void
  addObject: (
    type: 'text' | 'image',
    props?: Record<string, unknown>,
  ) => Promise<string>
  updateObject: (id: string, props: Record<string, unknown>) => void
  deleteObject: (id: string) => void
  selectObject: (id: string | null) => void
  applyColor: (id: string, color: string) => void
  initClipboardSupport: () => Promise<void>
  undo: () => void
  redo: () => void
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  fabricCanvas: null,
  objects: [],
  selectedObjectId: null,
  isLoading: false,
  clipboardSupported: false,
  isExporting: false,
  history: {
    past: [],
    future: [],
  },

  /**
   * Initialize Fabric.js canvas with element
   */
  initCanvas: async (el: HTMLCanvasElement) => {
    // Clean up existing canvas if present
    const { fabricCanvas } = get()
    if (fabricCanvas) {
      fabricCanvas.dispose()
    }

    const { Canvas } = await loadFabric()
    const canvas = new Canvas(el, {
      width: 375,
      height: 500,
      backgroundColor: '#FFFFFF',
      selection: true,
      preserveObjectStacking: true,
    })

    set({ fabricCanvas: canvas })

    // Handle selection changes
    canvas.on('selection:created', (e: any) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0]
        get().selectObject((obj as any).id || '')
      }
    })

    canvas.on('selection:updated', (e: any) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0]
        get().selectObject((obj as any).id || '')
      }
    })

    canvas.on('selection:cleared', () => {
      get().selectObject(null)
    })
  },

  /**
   * Dispose Fabric.js canvas
   */
  disposeCanvas: () => {
    const { fabricCanvas } = get()
    if (fabricCanvas) {
      fabricCanvas.dispose()
      set({ fabricCanvas: null, objects: [], selectedObjectId: null })
    }
  },

  /**
   * Add text or image object to canvas
   */
  addObject: async (
    type: 'text' | 'image',
    props?: Record<string, unknown>,
  ): Promise<string> => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) {
      console.warn('Canvas not initialized')

      return ''
    }

    let obj: any
    const id = `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    if (type === 'text') {
      const { Textbox } = await import('fabric')
      obj = new Textbox('New Text', {
        left: fabricCanvas.width! / 2,
        top: fabricCanvas.height! / 2,
        fontSize: 48,
        fill: '#0B1F3A',
        fontFamily: 'system-ui',
      })
      obj.set({ id })
    } else if (type === 'image') {
      const imageUrl = props?.imageUrl as string
      if (!imageUrl) {
        console.warn('Image URL required for image object')

        return ''
      }

      const { FabricImage } = await import('fabric')
      FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' })
        .then((img: any) => {
          img.set({
            left: fabricCanvas.width! / 2,
            top: fabricCanvas.height! / 2,
          })
          // Add custom id property
          img.set({ id })
          fabricCanvas.add(img)
          fabricCanvas.setActiveObject(img)
          fabricCanvas.requestRenderAll()

          // Serialize and store object
          const serialized = fabricCanvas.toJSON()
          set((state) => ({
            objects: [...state.objects, serialized],
          }))

          // Push to history
          const historyStore = useHistoryStore.getState()
          historyStore.pushHistory(serializeCanvasState(fabricCanvas))
        })
        .catch((err: any) => {
          console.error('Failed to load image:', err)
        })

      return id
    }

    fabricCanvas.add(obj)
    fabricCanvas.setActiveObject(obj)
    fabricCanvas.requestRenderAll()

    // Serialize and store object
    const serialized = fabricCanvas.toJSON()
    set((state) => ({
      objects: [...state.objects, serialized],
    }))

    // Push to history
    const historyStore = useHistoryStore.getState()
    historyStore.pushHistory(serializeCanvasState(fabricCanvas))

    return id
  },

  /**
   * Update object properties
   */
  updateObject: (id: string, props: Record<string, unknown>) => {
    const { fabricCanvas, objects } = get()
    if (!fabricCanvas) return

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    Object.assign(obj, props)
    fabricCanvas.requestRenderAll()

    // Update serialized objects
    const newObjects = objects.map((o: any) =>
      (o as any).id === id ? fabricCanvas.toJSON() : o,
    )
    set({ objects: newObjects })

    // Push to history
    const historyStore = useHistoryStore.getState()
    historyStore.pushHistory(serializeCanvasState(fabricCanvas))
  },

  /**
   * Delete object from canvas
   */
  deleteObject: (id: string) => {
    const { fabricCanvas, objects } = get()
    if (!fabricCanvas) return

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    fabricCanvas.remove(obj)
    fabricCanvas.discardActiveObject()
    fabricCanvas.requestRenderAll()

    // Remove from serialized objects
    const newObjects = objects.filter((o: any) => (o as any).id !== id)
    set({ objects: newObjects, selectedObjectId: null })

    // Push to history
    const historyStore = useHistoryStore.getState()
    historyStore.pushHistory(serializeCanvasState(fabricCanvas))
  },

  /**
   * Select object by ID
   */
  selectObject: (id: string | null) => {
    set({ selectedObjectId: id })

    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    if (id) {
      const obj = fabricCanvas
        .getObjects()
        .find((o: any) => (o as any).id === id)
      if (obj) {
        fabricCanvas.setActiveObject(obj)
        fabricCanvas.requestRenderAll()
      }
    } else {
      fabricCanvas.discardActiveObject()
      fabricCanvas.requestRenderAll()
    }
  },

  /**
   * Apply color to object
   */
  applyColor: (id: string, color: string) => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    obj.set({ fill: color })
    fabricCanvas.requestRenderAll()
  },

  /**
   * Initialize clipboard support detection
   */
  initClipboardSupport: async () => {
    const supported =
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard !== 'undefined' &&
      typeof navigator.clipboard.write === 'function'

    set({ clipboardSupported: supported })
  },

  /**
   * Undo last action
   */
  undo: () => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const historyStore = useHistoryStore.getState()
    const previousState = historyStore.undo()

    if (previousState) {
      deserializeCanvasState(fabricCanvas, previousState)
    }
  },

  /**
   * Redo last undone action
   */
  redo: () => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const historyStore = useHistoryStore.getState()
    const nextState = historyStore.redo()

    if (nextState) {
      deserializeCanvasState(fabricCanvas, nextState)
    }
  },
}))
