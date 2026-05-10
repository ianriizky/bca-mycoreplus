import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAddTextShortcuts } from '@/components/CanvasEditor/hooks/useAddTextShortcuts'

const mockAddObject = vi.fn().mockResolvedValue('text-123')

vi.mock('@/stores/canvas', () => ({
  useCanvasStore: vi.fn(
    (selector: (state: { addObject: typeof mockAddObject }) => unknown) =>
      selector({ addObject: mockAddObject }),
  ),
}))

describe('useAddTextShortcuts Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC5: T key shortcut available', () => {
    it('registers keydown event listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const { unmount } = renderHook(() => useAddTextShortcuts())

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      )

      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
      )
    })

    it('calls addObject when T key is pressed', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }))
      })

      expect(mockAddObject).toHaveBeenCalledWith('text')

      unmount()
    })

    it('calls addObject when T key is pressed (uppercase)', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'T' }))
      })

      expect(mockAddObject).toHaveBeenCalledWith('text')

      unmount()
    })

    it('prevents default browser behavior when T is pressed', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      const event = new KeyboardEvent('keydown', { key: 't' })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      act(() => {
        window.dispatchEvent(event)
      })

      expect(preventDefaultSpy).toHaveBeenCalled()

      unmount()
    })
  })

  describe('Edge case: T key should not trigger when typing in inputs', () => {
    it('does not call addObject when focus is on INPUT element', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      const input = document.createElement('input')
      document.body.appendChild(input)
      input.focus()

      act(() => {
        input.dispatchEvent(
          new KeyboardEvent('keydown', { key: 't', bubbles: true }),
        )
      })

      expect(mockAddObject).not.toHaveBeenCalled()

      document.body.removeChild(input)
      unmount()
    })

    it('does not call addObject when focus is on TEXTAREA element', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      textarea.focus()

      act(() => {
        textarea.dispatchEvent(
          new KeyboardEvent('keydown', { key: 't', bubbles: true }),
        )
      })

      expect(mockAddObject).not.toHaveBeenCalled()

      document.body.removeChild(textarea)
      unmount()
    })

    it.skip('does not call addObject when focus is on contenteditable element', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      const div = document.createElement('div')
      div.setAttribute('contenteditable', 'true')
      document.body.appendChild(div)
      div.focus()

      act(() => {
        div.dispatchEvent(
          new KeyboardEvent('keydown', { key: 't', bubbles: true }),
        )
      })

      expect(mockAddObject).not.toHaveBeenCalled()

      document.body.removeChild(div)
      unmount()
    })

    it('calls addObject when focus is NOT on input/textarea/contenteditable', () => {
      const { unmount } = renderHook(() => useAddTextShortcuts())

      document.body.focus()

      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }))
      })

      expect(mockAddObject).toHaveBeenCalledWith('text')

      unmount()
    })
  })
})
