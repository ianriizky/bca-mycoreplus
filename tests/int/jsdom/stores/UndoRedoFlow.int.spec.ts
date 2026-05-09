import { describe, it, expect, beforeEach } from 'vitest'

import { useHistoryStore, type CanvasState } from '@/stores/history'

describe('Undo/Redo Flow', () => {
  beforeEach(() => {
    useHistoryStore.setState({
      undoStack: [],
      redoStack: [],
    })
  })

  const createMockState = (id: number): CanvasState => ({
    objects: [{ id: String(id) }],
    canvasJSON: JSON.stringify({
      version: '6.0',
      objects: [{ id: String(id) }],
    }),
    timestamp: Date.now() + id * 1000,
  })

  describe('complete undo/redo workflow', () => {
    it('should handle undo/redo with single state', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)

      store.pushHistory(state1)

      expect(store.canUndo()).toBe(true)
      expect(store.canRedo()).toBe(false)

      const undone = store.undo()
      expect(undone).toBeNull()
    })
  })

  describe('undo/redo state preservation', () => {
    it('should preserve state objects correctly', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)

      const restored = store.undo()

      expect(restored).toEqual(state1)
      expect(restored?.objects).toEqual(state1.objects)
      expect(restored?.canvasJSON).toEqual(state1.canvasJSON)
    })

    it('should maintain timestamp information', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)

      const restored = store.undo()

      expect(restored?.timestamp).toBe(state1.timestamp)
    })
  })

  describe('undo/redo boundary conditions', () => {
    it('should handle undo at beginning of history', () => {
      const store = useHistoryStore.getState()

      const result = store.undo()

      expect(result).toBeNull()
    })

    it('should handle redo at end of history', () => {
      const store = useHistoryStore.getState()

      const result = store.redo()

      expect(result).toBeNull()
    })

    it('should handle rapid undo/redo operations', () => {
      const store = useHistoryStore.getState()
      const states = [
        createMockState(1),
        createMockState(2),
        createMockState(3),
      ]

      states.forEach((state) => store.pushHistory(state))

      store.undo()
      store.undo()
      store.redo()
      store.undo()

      expect(store.canUndo()).toBe(true)
      expect(store.canRedo()).toBe(true)
    })
  })

  describe('history stack limits', () => {
    it('should enforce maximum history size', () => {
      const store = useHistoryStore.getState()

      for (let i = 0; i < 15; i++) {
        store.pushHistory(createMockState(i))
      }

      expect(store.undoStack.length).toBeLessThanOrEqual(10)
    })
  })
})
