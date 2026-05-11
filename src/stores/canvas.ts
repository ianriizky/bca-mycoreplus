import type { Canvas, FabricImage, FabricObject } from 'fabric'

import { create } from 'zustand'

import type {
  SelectionCreatedEvent,
  SelectionUpdatedEvent,
} from '@/types/fabric'

import {
  deserializeCanvasState,
  serializeCanvasState,
} from '@/lib/canvas/serialize'
import { loadFabric } from '@/lib/fabric-loader'
import { useHistoryStore } from '@/stores/history'

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
  applyTemplate: (templateId: string) => Promise<void>
}

function getObjectById(canvas: Canvas, id: string): FabricObject | undefined {
  return canvas.getObjects().find((o) => (o as { id?: string }).id === id)
}

function hasObjectId(obj: SerializedObject, id: string): boolean {
  return obj.id === id
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

  initCanvas: async (el: HTMLCanvasElement) => {
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

    canvas.on('selection:created', (e: SelectionCreatedEvent) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0] as { id?: string }
        get().selectObject(obj.id || '')
      }
    })

    canvas.on('selection:updated', (e: SelectionUpdatedEvent) => {
      if (e.selected?.[0]) {
        const obj = e.selected[0] as { id?: string }
        get().selectObject(obj.id || '')
      }
    })

    canvas.on('selection:cleared', () => {
      get().selectObject(null)
    })
  },

  disposeCanvas: () => {
    const { fabricCanvas } = get()
    if (fabricCanvas) {
      fabricCanvas.dispose()
      set({ fabricCanvas: null, objects: [], selectedObjectId: null })
    }
  },

  addObject: async (
    type: 'text' | 'image',
    props?: Record<string, unknown>,
  ): Promise<string> => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) {
      console.warn('Canvas not initialized')

      return ''
    }

    const id = `obj_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

    if (type === 'text') {
      const { Textbox } = await import('fabric')
      const obj = new Textbox('New Text', {
        left: fabricCanvas.width! / 2,
        top: fabricCanvas.height! / 2,
        fontSize: 48,
        fill: '#0B1F3A',
        fontFamily: 'system-ui',
        textAlign: 'left',
        lineHeight: 1.2,
        charSpacing: 0,
        width: 300,
      })
      ;(obj as unknown as { id: string }).id = id

      fabricCanvas.add(obj)
      fabricCanvas.setActiveObject(obj)
      fabricCanvas.requestRenderAll()

      const serialized = fabricCanvas.toJSON()
      set((state) => ({
        objects: [...state.objects, serialized as unknown as SerializedObject],
      }))

      const historyStore = useHistoryStore.getState()
      historyStore.pushHistory(serializeCanvasState(fabricCanvas))

      return id
    }

    const imageUrl = props?.imageUrl as string
    if (!imageUrl) {
      console.warn('Image URL required for image object')

      return ''
    }

    const { FabricImage: ImportedFabricImage } = await import('fabric')
    ImportedFabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' })
      .then((img: FabricImage) => {
        img.set({
          left: fabricCanvas.width! / 2,
          top: fabricCanvas.height! / 2,
        })
        ;(img as unknown as { id: string }).id = id
        fabricCanvas.add(img)
        fabricCanvas.setActiveObject(img)
        fabricCanvas.requestRenderAll()

        const serialized = fabricCanvas.toJSON()
        set((state) => ({
          objects: [
            ...state.objects,
            serialized as unknown as SerializedObject,
          ],
        }))

        const historyStore = useHistoryStore.getState()
        historyStore.pushHistory(serializeCanvasState(fabricCanvas))
      })
      .catch((err: unknown) => {
        console.error('Failed to load image:', err)
      })

    return id
  },

  updateObject: (id: string, props: Record<string, unknown>) => {
    const { fabricCanvas, objects } = get()
    if (!fabricCanvas) return

    const obj = getObjectById(fabricCanvas, id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    Object.assign(obj, props)
    fabricCanvas.requestRenderAll()

    const newObjects = objects.map((o) =>
      hasObjectId(o, id)
        ? (fabricCanvas.toJSON() as unknown as SerializedObject)
        : o,
    )
    set({ objects: newObjects })

    const historyStore = useHistoryStore.getState()
    historyStore.pushHistory(serializeCanvasState(fabricCanvas))
  },

  deleteObject: (id: string) => {
    const { fabricCanvas, objects } = get()
    if (!fabricCanvas) return

    const obj = getObjectById(fabricCanvas, id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    fabricCanvas.remove(obj)
    fabricCanvas.discardActiveObject()
    fabricCanvas.requestRenderAll()

    const newObjects = objects.filter((o) => !hasObjectId(o, id))
    set({ objects: newObjects, selectedObjectId: null })

    const historyStore = useHistoryStore.getState()
    historyStore.pushHistory(serializeCanvasState(fabricCanvas))
  },

  selectObject: (id: string | null) => {
    set({ selectedObjectId: id })

    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    if (id) {
      const obj = getObjectById(fabricCanvas, id)
      if (obj) {
        fabricCanvas.setActiveObject(obj)
        fabricCanvas.requestRenderAll()
      }
    } else {
      fabricCanvas.discardActiveObject()
      fabricCanvas.requestRenderAll()
    }
  },

  applyColor: (id: string, color: string) => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const obj = getObjectById(fabricCanvas, id)
    if (!obj) {
      console.warn(`Object with id ${id} not found`)

      return
    }

    obj.set({ fill: color })
    fabricCanvas.requestRenderAll()
  },

  initClipboardSupport: async () => {
    const supported =
      typeof navigator !== 'undefined' &&
      typeof navigator.clipboard !== 'undefined' &&
      typeof navigator.clipboard.write === 'function'

    set({ clipboardSupported: supported })
  },

  undo: () => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const historyStore = useHistoryStore.getState()
    const previousState = historyStore.undo()

    if (previousState) {
      deserializeCanvasState(fabricCanvas, previousState)
    }
  },

  redo: () => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return

    const historyStore = useHistoryStore.getState()
    const nextState = historyStore.redo()

    if (nextState) {
      deserializeCanvasState(fabricCanvas, nextState)
    }
  },

  applyTemplate: async (templateId: string) => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) {
      throw new Error('Canvas not initialized')
    }

    try {
      const { getTemplate } = await import('@/assets/templates')
      const template = getTemplate(templateId)

      if (!template) {
        throw new Error(`Template ${templateId} not found`)
      }

      const { usePreferencesStore } = await import('@/stores/preferences')
      const setWhatsappMessage =
        usePreferencesStore.getState().setWhatsappMessage
      setWhatsappMessage(template.whatsappMessage)

      fabricCanvas.clear()
      fabricCanvas.backgroundColor = '#FFFFFF'

      const { FabricImage: ImportedFabricImage, Textbox } =
        await import('fabric')

      if (template.backgroundImage) {
        try {
          const bgImg = await ImportedFabricImage.fromURL(
            template.backgroundImage,
            { crossOrigin: 'anonymous' },
          )
          bgImg.set({
            left: 0,
            top: 0,
            selectable: false,
            evented: false,
          })
          fabricCanvas.add(bgImg)
          fabricCanvas.sendObjectToBack(bgImg)
        } catch (err) {
          console.warn('Failed to load template background image:', err)
        }
      }

      for (const obj of template.objects) {
        const id = `obj_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

        if (obj.type === 'text') {
          const textObj = new Textbox(obj.content || '', {
            left: obj.left,
            top: obj.top,
            fontSize: obj.fontSize || 48,
            fontFamily: obj.fontFamily || 'Arial',
            fill: obj.fill || '#0B1F3A',
            textAlign: (obj.textAlign as 'left' | 'center' | 'right') || 'left',
            width: obj.width,
            lineHeight: 1.2,
          })
          ;(textObj as unknown as { id: string }).id = id
          fabricCanvas.add(textObj)
        } else if (obj.type === 'image' && obj.src) {
          try {
            const imgObj = await ImportedFabricImage.fromURL(obj.src, {
              crossOrigin: 'anonymous',
            })
            imgObj.set({
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
            })
            ;(imgObj as unknown as { id: string }).id = id
            fabricCanvas.add(imgObj)
          } catch (err) {
            console.warn('Failed to load template image object:', err)
          }
        }
      }

      fabricCanvas.requestRenderAll()

      const serialized = fabricCanvas.toJSON()
      set({
        objects: [serialized as unknown as SerializedObject],
        selectedObjectId: null,
      })

      const historyStore = useHistoryStore.getState()
      historyStore.pushHistory(serializeCanvasState(fabricCanvas))
    } catch (err) {
      console.error('Failed to apply template:', err)
      throw err
    }
  },
}))
