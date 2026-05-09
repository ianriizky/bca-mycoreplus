import { describe, it, expect, beforeEach } from 'vitest'

import { useCanvasStore } from '@/stores/canvas'

describe('Canvas Store', () => {
  beforeEach(() => {
    const store = useCanvasStore.getState()
    store.disposeCanvas()
  })

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const store = useCanvasStore.getState()

      expect(store.fabricCanvas).toBeNull()
      expect(store.objects).toEqual([])
      expect(store.selectedObjectId).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.isExporting).toBe(false)
    })

    it('should have empty history on init', () => {
      const store = useCanvasStore.getState()

      expect(store.history.past).toEqual([])
      expect(store.history.future).toEqual([])
    })
  })

  describe('selectObject', () => {
    it('should update selected object ID', () => {
      const store = useCanvasStore.getState()

      store.selectObject('obj_123')

      expect(store.selectedObjectId).toBe('obj_123')
    })

    it('should clear selection when passed null', () => {
      const store = useCanvasStore.getState()

      store.selectObject('obj_123')
      store.selectObject(null)

      expect(store.selectedObjectId).toBeNull()
    })
  })

  describe('applyColor', () => {
    it('should not throw when canvas is not initialized', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.applyColor('obj_123', '#FF0000')
      }).not.toThrow()
    })
  })

  describe('deleteObject', () => {
    it('should not throw when canvas is not initialized', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.deleteObject('obj_123')
      }).not.toThrow()
    })
  })

  describe('updateObject', () => {
    it('should not throw when canvas is not initialized', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.updateObject('obj_123', { text: 'Updated' })
      }).not.toThrow()
    })
  })

  describe('initClipboardSupport', () => {
    it('should detect clipboard support', async () => {
      const store = useCanvasStore.getState()

      await store.initClipboardSupport()

      expect(typeof store.clipboardSupported).toBe('boolean')
    })

    it('should set clipboardSupported to false when navigator.clipboard is undefined', async () => {
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      })

      const store = useCanvasStore.getState()
      await store.initClipboardSupport()

      expect(store.clipboardSupported).toBe(false)

      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      })
    })
  })

  describe('disposeCanvas', () => {
    it('should clear canvas and objects when disposed', () => {
      const store = useCanvasStore.getState()

      store.selectObject('obj_123')
      store.disposeCanvas()

      expect(store.fabricCanvas).toBeNull()
      expect(store.objects).toEqual([])
      expect(store.selectedObjectId).toBeNull()
    })
  })
})
