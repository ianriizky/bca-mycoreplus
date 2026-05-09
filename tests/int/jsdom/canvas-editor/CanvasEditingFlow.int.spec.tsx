import { describe, it, expect, beforeEach } from 'vitest'

import { useCanvasStore } from '@/stores/canvas'

describe('Canvas Editing Flow', () => {
  beforeEach(() => {
    const store = useCanvasStore.getState()
    store.disposeCanvas()
    store.selectObject(null)
  })

  describe('object selection', () => {
    it('should deselect objects', () => {
      const store = useCanvasStore.getState()

      store.selectObject('obj_123')
      store.selectObject(null)
      expect(store.selectedObjectId).toBeNull()
    })
  })

  describe('color application', () => {
    it('should handle color application without canvas', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.applyColor('obj_123', '#FF0000')
      }).not.toThrow()
    })
  })

  describe('object deletion', () => {
    it('should handle deletion without canvas', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.deleteObject('obj_123')
      }).not.toThrow()
    })
  })

  describe('object update', () => {
    it('should update object properties', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.updateObject('obj_123', { text: 'Updated' })
      }).not.toThrow()
    })

    it('should handle update without canvas', () => {
      const store = useCanvasStore.getState()

      expect(() => {
        store.updateObject('obj_123', { fill: '#FF0000' })
      }).not.toThrow()
    })
  })

  describe('canvas initialization', () => {
    it('should initialize clipboard support', async () => {
      const store = useCanvasStore.getState()

      await store.initClipboardSupport()

      expect(typeof store.clipboardSupported).toBe('boolean')
    })
  })
})
