import { describe, it, expect, beforeEach } from 'vitest'

import { useHistoryStore, type CanvasState } from '@/stores/history'

describe('History Store', () => {
  beforeEach(() => {
    const store = useHistoryStore.getState()
    store.clearHistory()
  })

  const createMockState = (id: number): CanvasState => ({
    objects: [],
    canvasJSON: JSON.stringify({ version: '6.0', objects: [] }),
    timestamp: Date.now() + id * 1000,
  })

  describe('pushHistory', () => {
    it('should add state to undo stack', () => {
      const state = createMockState(1)
      const store = useHistoryStore.getState()

      store.pushHistory(state)

      expect(useHistoryStore.getState().undoStack).toHaveLength(1)
      expect(useHistoryStore.getState().undoStack[0]).toEqual(state)
    })

    it('should clear redo stack when pushing new state', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.undo()
      expect(useHistoryStore.getState().redoStack).toHaveLength(1)

      store.pushHistory(state2)
      expect(useHistoryStore.getState().redoStack).toHaveLength(0)
    })

    it('should enforce max stack size of 10', () => {
      const store = useHistoryStore.getState()

      for (let i = 0; i < 15; i++) {
        store.pushHistory(createMockState(i))
      }

      expect(useHistoryStore.getState().undoStack).toHaveLength(10)
    })
  })

  describe('undo', () => {
    it('should move state from undo to redo stack', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)

      store.undo()

      expect(useHistoryStore.getState().undoStack).toHaveLength(1)
      expect(useHistoryStore.getState().redoStack).toHaveLength(1)
    })

    it('should return previous state', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)

      const result = store.undo()

      expect(result).toEqual(state1)
    })

    it('should return null when undo stack is empty', () => {
      const store = useHistoryStore.getState()
      const result = store.undo()

      expect(result).toBeNull()
    })
  })

  describe('redo', () => {
    it('should move state from redo to undo stack', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)
      store.undo()

      store.redo()

      expect(useHistoryStore.getState().undoStack).toHaveLength(2)
      expect(useHistoryStore.getState().redoStack).toHaveLength(0)
    })

    it('should return next state', () => {
      const store = useHistoryStore.getState()
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      store.pushHistory(state1)
      store.pushHistory(state2)
      store.undo()

      const result = store.redo()

      expect(result).toEqual(state2)
    })

    it('should return null when redo stack is empty', () => {
      const store = useHistoryStore.getState()
      const result = store.redo()

      expect(result).toBeNull()
    })
  })

  describe('canUndo', () => {
    it('should return true when undo stack is not empty', () => {
      const store = useHistoryStore.getState()
      store.pushHistory(createMockState(1))

      expect(store.canUndo()).toBe(true)
    })

    it('should return false when undo stack is empty', () => {
      const store = useHistoryStore.getState()

      expect(store.canUndo()).toBe(false)
    })
  })

  describe('canRedo', () => {
    it('should return true when redo stack is not empty', () => {
      const store = useHistoryStore.getState()
      store.pushHistory(createMockState(1))
      store.undo()

      expect(store.canRedo()).toBe(true)
    })

    it('should return false when redo stack is empty', () => {
      const store = useHistoryStore.getState()

      expect(store.canRedo()).toBe(false)
    })
  })

  describe('clearHistory', () => {
    it('should clear both undo and redo stacks', () => {
      const store = useHistoryStore.getState()
      store.pushHistory(createMockState(1))
      store.pushHistory(createMockState(2))
      store.undo()

      store.clearHistory()

      expect(store.undoStack).toHaveLength(0)
      expect(store.redoStack).toHaveLength(0)
    })
  })
})
