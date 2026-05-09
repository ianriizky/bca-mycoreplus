import { describe, it, expect, vi } from 'vitest'

import { matchesShortcut, isMacOS, getModifierKey } from '@/lib/keyboard'

describe('Keyboard Shortcuts', () => {
  it('should match Ctrl+Z shortcut', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    })

    const shortcut = {
      key: 'z',
      ctrlKey: true,
      handler: vi.fn(),
    }

    expect(matchesShortcut(event, shortcut)).toBe(true)
  })

  it('should match Ctrl+Y shortcut', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'y',
      ctrlKey: true,
    })

    const shortcut = {
      key: 'y',
      ctrlKey: true,
      handler: vi.fn(),
    }

    expect(matchesShortcut(event, shortcut)).toBe(true)
  })

  it('should match Ctrl+C shortcut', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'c',
      ctrlKey: true,
    })

    const shortcut = {
      key: 'c',
      ctrlKey: true,
      handler: vi.fn(),
    }

    expect(matchesShortcut(event, shortcut)).toBe(true)
  })

  it('should match Delete key', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Delete',
    })

    const shortcut = {
      key: 'Delete',
      handler: vi.fn(),
    }

    expect(matchesShortcut(event, shortcut)).toBe(true)
  })

  it('should match Arrow keys', () => {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    arrowKeys.forEach((key) => {
      const event = new KeyboardEvent('keydown', { key })

      const shortcut = {
        key,
        handler: vi.fn(),
      }

      expect(matchesShortcut(event, shortcut)).toBe(true)
    })
  })

  it('should detect macOS platform', () => {
    const isMac = isMacOS()
    expect(typeof isMac).toBe('boolean')
  })

  it('should return correct modifier key', () => {
    const modifier = getModifierKey()
    expect(['Cmd', 'Ctrl']).toContain(modifier)
  })

  it('should not match when modifier key differs', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
    })

    const shortcut = {
      key: 'z',
      metaKey: true,
      handler: vi.fn(),
    }

    expect(matchesShortcut(event, shortcut)).toBe(false)
  })
})
