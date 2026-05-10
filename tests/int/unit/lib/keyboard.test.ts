import { describe, it, expect, vi } from 'vitest'

import {
  announceToScreenReader,
  getModifierKey,
  isMacOS,
  matchesShortcut,
  type KeyboardShortcut,
} from '@/lib/keyboard'

describe('Keyboard Utilities', () => {
  describe('matchesShortcut', () => {
    it('should match basic key press', () => {
      const shortcut: KeyboardShortcut = {
        key: 'a',
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'a' })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should match case-insensitive key', () => {
      const shortcut: KeyboardShortcut = {
        key: 'A',
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'a' })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should match Ctrl+key combination', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        ctrlKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'z', ctrlKey: true })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should not match when Ctrl is required but not pressed', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        ctrlKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'z', ctrlKey: false })

      expect(matchesShortcut(event, shortcut)).toBe(false)
    })

    it('should match Meta+key combination', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        metaKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'z', metaKey: true })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should match Shift+key combination', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        shiftKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'z', shiftKey: true })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should match Alt+key combination', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        altKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'z', altKey: true })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should match multiple modifier keys', () => {
      const shortcut: KeyboardShortcut = {
        key: 'z',
        ctrlKey: true,
        shiftKey: true,
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', {
        key: 'z',
        ctrlKey: true,
        shiftKey: true,
      })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })

    it('should not match when key is different', () => {
      const shortcut: KeyboardShortcut = {
        key: 'a',
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', { key: 'b' })

      expect(matchesShortcut(event, shortcut)).toBe(false)
    })

    it('should ignore undefined modifier keys', () => {
      const shortcut: KeyboardShortcut = {
        key: 'a',
        handler: () => {},
      }
      const event = new KeyboardEvent('keydown', {
        key: 'a',
        ctrlKey: true,
      })

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })
  })

  describe('isMacOS', () => {
    it('should return a boolean', () => {
      const result = isMacOS()

      expect(typeof result).toBe('boolean')
    })
  })

  describe('getModifierKey', () => {
    it('should return a string', () => {
      const result = getModifierKey()

      expect(typeof result).toBe('string')
    })

    it('should return Cmd or Ctrl', () => {
      const result = getModifierKey()

      expect(['Cmd', 'Ctrl']).toContain(result)
    })
  })

  describe('announceToScreenReader', () => {
    it('should create announcement element with correct role', () => {
      announceToScreenReader('Test announcement')

      const announcement = document.querySelector('[role="status"]')

      expect(announcement).toBeTruthy()
      expect(announcement?.getAttribute('aria-live')).toBe('polite')
    })

    it('should set correct text content', () => {
      const message = 'Test announcement'
      announceToScreenReader(message)

      const announcement = document.querySelector('[role="status"]')

      expect(announcement?.textContent).toBe(message)
    })

    it('should use assertive priority when specified', () => {
      const announcements = document.querySelectorAll('[role="status"]')
      announcements.forEach((el) => el.remove())

      announceToScreenReader('Test', 'assertive')

      const announcement = document.querySelector('[role="status"]')

      expect(announcement?.getAttribute('aria-live')).toBe('assertive')

      announcement?.remove()
    })

    it('should add sr-only class', () => {
      announceToScreenReader('Test')

      const announcement = document.querySelector('[role="status"]')

      expect(announcement?.classList.contains('sr-only')).toBe(true)
    })

    it('should remove announcement after 1 second', () => {
      const announcements = document.querySelectorAll('[role="status"]')
      announcements.forEach((el) => el.remove())

      vi.useFakeTimers()

      try {
        announceToScreenReader('Test announcement')

        let announcement = document.querySelector('[role="status"]')
        expect(announcement).toBeTruthy()
        expect(announcement?.textContent).toBe('Test announcement')

        vi.advanceTimersByTime(1000)

        announcement = document.querySelector('[role="status"]')
        expect(announcement).toBeFalsy()
      } finally {
        vi.useRealTimers()
      }
    })
  })
})
