import { create } from 'zustand'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastStore {
  toasts: Toast[]
  showToast: (
    message: string,
    type: Toast['type'],
    duration?: number,
    action?: Toast['action'],
  ) => void
  removeToast: (id: string) => void
}

function generateId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (message, type, duration = 4000, action) => {
    const id = generateId()
    set((s) => ({
      toasts: [...s.toasts, { id, message, type, duration, action }],
    }))

    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, duration)
  },

  removeToast: (id: string) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
  },
}))
