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

      useHistoryStore.getState().pushHistory(state)

      const { undoStack } = useHistoryStore.getState()
      expect(undoStack).toHaveLength(1)
      expect(undoStack[0]).toEqual(state)
    })

    it('should clear redo stack when pushing new state', () => {
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      useHistoryStore.getState().pushHistory(state1)
      useHistoryStore.getState().undo()
      expect(useHistoryStore.getState().redoStack).toHaveLength(1)

      useHistoryStore.getState().pushHistory(state2)
      expect(useHistoryStore.getState().redoStack).toHaveLength(0)
    })

    it('should enforce max stack size of 10', () => {
      for (let i = 0; i < 15; i++) {
        useHistoryStore.getState().pushHistory(createMockState(i))
      }

      expect(useHistoryStore.getState().undoStack).toHaveLength(10)
    })
  })

  describe('undo', () => {
    it('should move state from undo to redo stack', () => {
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      useHistoryStore.getState().pushHistory(state1)
      useHistoryStore.getState().pushHistory(state2)

      useHistoryStore.getState().undo()

      expect(useHistoryStore.getState().undoStack).toHaveLength(1)
      expect(useHistoryStore.getState().redoStack).toHaveLength(1)
    })

    it('should return previous state', () => {
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      useHistoryStore.getState().pushHistory(state1)
      useHistoryStore.getState().pushHistory(state2)

      const result = useHistoryStore.getState().undo()

      expect(result).toEqual(state1)
    })

    it('should return null when undo stack is empty', () => {
      const result = useHistoryStore.getState().undo()

      expect(result).toBeNull()
    })
  })

  describe('redo', () => {
    it('should move state from redo to undo stack', () => {
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      useHistoryStore.getState().pushHistory(state1)
      useHistoryStore.getState().pushHistory(state2)
      useHistoryStore.getState().undo()

      useHistoryStore.getState().redo()

      expect(useHistoryStore.getState().undoStack).toHaveLength(2)
      expect(useHistoryStore.getState().redoStack).toHaveLength(0)
    })

    it('should return next state', () => {
      const state1 = createMockState(1)
      const state2 = createMockState(2)

      useHistoryStore.getState().pushHistory(state1)
      useHistoryStore.getState().pushHistory(state2)
      useHistoryStore.getState().undo()

      const result = useHistoryStore.getState().redo()

      expect(result).toEqual(state2)
    })

    it('should return null when redo stack is empty', () => {
      const result = useHistoryStore.getState().redo()

      expect(result).toBeNull()
    })
  })

  describe('canUndo', () => {
    it('should return true when undo stack is not empty', () => {
      useHistoryStore.getState().pushHistory(createMockState(1))

      expect(useHistoryStore.getState().canUndo()).toBe(true)
    })

    it('should return false when undo stack is empty', () => {
      expect(useHistoryStore.getState().canUndo()).toBe(false)
    })
  })

  describe('canRedo', () => {
    it('should return true when redo stack is not empty', () => {
      useHistoryStore.getState().pushHistory(createMockState(1))
      useHistoryStore.getState().undo()

      expect(useHistoryStore.getState().canRedo()).toBe(true)
    })

    it('should return false when redo stack is empty', () => {
      expect(useHistoryStore.getState().canRedo()).toBe(false)
    })
  })

  describe('clearHistory', () => {
    it('should clear both undo and redo stacks', () => {
      useHistoryStore.getState().pushHistory(createMockState(1))
      useHistoryStore.getState().pushHistory(createMockState(2))
      useHistoryStore.getState().undo()

      useHistoryStore.getState().clearHistory()

      expect(useHistoryStore.getState().undoStack).toHaveLength(0)
      expect(useHistoryStore.getState().redoStack).toHaveLength(0)
    })
  })
})
