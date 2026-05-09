import { create } from 'zustand'

const MAX_HISTORY_SIZE = 10

export interface CanvasState {
  objects: unknown[]
  canvasJSON: string
  timestamp: number
}

interface HistoryStore {
  undoStack: CanvasState[]
  redoStack: CanvasState[]

  pushHistory: (state: CanvasState) => void
  undo: () => CanvasState | null
  redo: () => CanvasState | null
  canUndo: () => boolean
  canRedo: () => boolean
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],

  pushHistory: (state: CanvasState) => {
    set((s) => {
      const newUndoStack = [...s.undoStack, state]

      if (newUndoStack.length > MAX_HISTORY_SIZE) {
        newUndoStack.shift()
      }

      return {
        undoStack: newUndoStack,
        redoStack: [],
      }
    })
  },

  undo: () => {
    const { undoStack, redoStack } = get()
    if (undoStack.length === 0) return null

    const newUndoStack = [...undoStack]
    const currentState = newUndoStack.pop()

    if (currentState) {
      set({
        undoStack: newUndoStack,
        redoStack: [...redoStack, currentState],
      })

      return newUndoStack[newUndoStack.length - 1] || null
    }

    return null
  },

  redo: () => {
    const { undoStack, redoStack } = get()
    if (redoStack.length === 0) return null

    const newRedoStack = [...redoStack]
    const nextState = newRedoStack.pop()

    if (nextState) {
      set({
        undoStack: [...undoStack, nextState],
        redoStack: newRedoStack,
      })

      return nextState
    }

    return null
  },

  canUndo: () => get().undoStack.length > 0,

  canRedo: () => get().redoStack.length > 0,

  clearHistory: () => {
    set({ undoStack: [], redoStack: [] })
  },
}))
