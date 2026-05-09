import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useToastStore } from '@/stores/toast'

describe('Toast Store', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] })
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  describe('showToast', () => {
    it('should add a toast to the store', () => {
      const { showToast } = useToastStore.getState()
      showToast('Test message', 'success')

      const toasts = useToastStore.getState().toasts
      expect(toasts).toHaveLength(1)
      expect(toasts[0].message).toBe('Test message')
      expect(toasts[0].type).toBe('success')
    })

    it('should create toast with unique ID', () => {
      const { showToast } = useToastStore.getState()
      showToast('Message 1', 'success')
      showToast('Message 2', 'error')

      const toasts = useToastStore.getState().toasts
      expect(toasts[0].id).not.toBe(toasts[1].id)
    })

    it('should auto-dismiss toast after duration', () => {
      const { showToast } = useToastStore.getState()
      showToast('Test message', 'success', 1000)

      expect(useToastStore.getState().toasts).toHaveLength(1)

      vi.advanceTimersByTime(1000)

      expect(useToastStore.getState().toasts).toHaveLength(0)
    })

    it('should use default duration of 4000ms', () => {
      const { showToast } = useToastStore.getState()
      showToast('Test message', 'success')

      expect(useToastStore.getState().toasts).toHaveLength(1)

      vi.advanceTimersByTime(3999)
      expect(useToastStore.getState().toasts).toHaveLength(1)

      vi.advanceTimersByTime(1)
      expect(useToastStore.getState().toasts).toHaveLength(0)
    })

    it('should support action button', () => {
      const { showToast } = useToastStore.getState()
      const action = { label: 'Undo', onClick: vi.fn() }

      showToast('Message', 'success', 4000, action)

      const toast = useToastStore.getState().toasts[0]
      expect(toast.action).toEqual(action)
    })
  })

  describe('removeToast', () => {
    it('should remove toast by ID', () => {
      const { showToast, removeToast } = useToastStore.getState()
      showToast('Message 1', 'success')
      showToast('Message 2', 'error')

      const toastId = useToastStore.getState().toasts[0].id
      removeToast(toastId)

      const toasts = useToastStore.getState().toasts
      expect(toasts).toHaveLength(1)
      expect(toasts[0].message).toBe('Message 2')
    })

    it('should handle removing non-existent toast', () => {
      const { removeToast } = useToastStore.getState()
      removeToast('non-existent-id')

      expect(useToastStore.getState().toasts).toHaveLength(0)
    })
  })

  describe('Multiple toasts', () => {
    it('should stack multiple toasts', () => {
      const { showToast } = useToastStore.getState()
      showToast('Message 1', 'success')
      showToast('Message 2', 'error')
      showToast('Message 3', 'info')

      expect(useToastStore.getState().toasts).toHaveLength(3)
    })

    it('should maintain toast order', () => {
      const { showToast } = useToastStore.getState()
      showToast('First', 'success')
      showToast('Second', 'error')
      showToast('Third', 'info')

      const toasts = useToastStore.getState().toasts
      expect(toasts[0].message).toBe('First')
      expect(toasts[1].message).toBe('Second')
      expect(toasts[2].message).toBe('Third')
    })
  })
})
