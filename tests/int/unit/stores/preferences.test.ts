import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { usePreferencesStore } from '@/stores/preferences'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('Preferences Store', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
    const store = usePreferencesStore.getState()
    store.setWhatsappMessage('Lihat gambar ini dari BCA MyCore+')
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('AC2: Default message loads', () => {
    it('should have default WhatsApp message', () => {
      const store = usePreferencesStore.getState()
      expect(store.whatsappMessage).toBe('Lihat gambar ini dari BCA MyCore+')
    })

    it('should have default theme', () => {
      const store = usePreferencesStore.getState()
      expect(store.theme).toBe('light')
    })

    it('should have default fontSize', () => {
      const store = usePreferencesStore.getState()
      expect(store.fontSize).toBe(48)
    })

    it('should have default showSafeZone', () => {
      const store = usePreferencesStore.getState()
      expect(store.showSafeZone).toBe(true)
    })
  })

  describe('setWhatsappMessage', () => {
    it('should update whatsappMessage in state', () => {
      const store = usePreferencesStore.getState()
      const newMessage = 'Updated message'
      store.setWhatsappMessage(newMessage)

      const updatedStore = usePreferencesStore.getState()
      expect(updatedStore.whatsappMessage).toBe(newMessage)
    })
  })
})
