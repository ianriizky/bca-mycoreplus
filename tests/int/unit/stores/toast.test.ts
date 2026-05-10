import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useToastStore } from '@/stores/toast'

describe('Toast Store', () => {
  beforeEach(() => {
    const store = useToastStore.getState()
    store.toasts = []
    vi.clearAllTimers()
  })

  describe('initialization', () => {
    it('should initialize with empty toasts', () => {
      const store = useToastStore.getState()

      expect(store.toasts).toEqual([])
    })
  })

  describe('showToast', () => {
    it('should add toast to store', () => {
      const store = useToastStore.getState()

      store.showToast('Test message', 'success')

      expect(useToastStore.getState().toasts).toHaveLength(1)
      expect(useToastStore.getState().toasts[0].message).toBe('Test message')
      expect(useToastStore.getState().toasts[0].type).toBe('success')
    })

    it('should generate unique IDs for toasts', () => {
      const store = useToastStore.getState()

      store.showToast('Message 1', 'success')
      store.showToast('Message 2', 'error')

      expect(useToastStore.getState().toasts[0].id).not.toBe(
        useToastStore.getState().toasts[1].id,
      )
    })

    it('should support all toast types', () => {
      const store = useToastStore.getState()
      const types: Array<'success' | 'error' | 'info' | 'warning'> = [
        'success',
        'error',
        'info',
        'warning',
      ]

      types.forEach((type) => {
        store.showToast(`Message ${type}`, type)
      })

      const toasts = useToastStore.getState().toasts
      expect(toasts).toHaveLength(4)
      toasts.forEach((toast, index) => {
        expect(toast.type).toBe(types[index])
      })
    })

    it('should use default duration of 4000ms', () => {
      const store = useToastStore.getState()

      store.showToast('Test', 'success')

      expect(useToastStore.getState().toasts[0].duration).toBe(4000)
    })

    it('should accept custom duration', () => {
      const store = useToastStore.getState()

      store.showToast('Test', 'success', 2000)

      expect(useToastStore.getState().toasts[0].duration).toBe(2000)
    })

    it('should accept action with label and onClick', () => {
      const store = useToastStore.getState()
      const action = { label: 'Undo', onClick: () => {} }

      store.showToast('Test', 'success', 4000, action)

      expect(useToastStore.getState().toasts[0].action).toEqual(action)
    })

    it('should auto-remove toast after duration', () => {
      vi.useFakeTimers()
      const store = useToastStore.getState()

      store.showToast('Test', 'success', 1000)
      expect(useToastStore.getState().toasts).toHaveLength(1)

      vi.advanceTimersByTime(1000)
      expect(useToastStore.getState().toasts).toHaveLength(0)

      vi.useRealTimers()
    })
  })

  describe('removeToast', () => {
    it('should remove toast by ID', () => {
      const store = useToastStore.getState()

      store.showToast('Message 1', 'success')
      store.showToast('Message 2', 'error')

      const firstToastId = useToastStore.getState().toasts[0].id
      store.removeToast(firstToastId)

      expect(useToastStore.getState().toasts).toHaveLength(1)
      expect(useToastStore.getState().toasts[0].message).toBe('Message 2')
    })

    it('should not throw when removing non-existent toast', () => {
      const store = useToastStore.getState()

      expect(() => {
        store.removeToast('non-existent-id')
      }).not.toThrow()
    })

    it('should handle removing all toasts', () => {
      const store = useToastStore.getState()

      store.showToast('Message 1', 'success')
      store.showToast('Message 2', 'error')

      const toastIds = useToastStore.getState().toasts.map((t) => t.id)
      toastIds.forEach((id) => store.removeToast(id))

      expect(useToastStore.getState().toasts).toHaveLength(0)
    })
  })
})
