import { useEffect } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  handler: () => void
}

export function matchesShortcut(
  event: KeyboardEvent,
  shortcut: KeyboardShortcut,
): boolean {
  const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase()
  const ctrlMatches =
    shortcut.ctrlKey === undefined || event.ctrlKey === shortcut.ctrlKey
  const metaMatches =
    shortcut.metaKey === undefined || event.metaKey === shortcut.metaKey
  const shiftMatches =
    shortcut.shiftKey === undefined || event.shiftKey === shortcut.shiftKey
  const altMatches =
    shortcut.altKey === undefined || event.altKey === shortcut.altKey

  return keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut)) {
          event.preventDefault()
          shortcut.handler()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

export function isMacOS(): boolean {
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform)
}

export function getModifierKey(): string {
  return isMacOS() ? 'Cmd' : 'Ctrl'
}

export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
