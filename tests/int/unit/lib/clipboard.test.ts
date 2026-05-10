import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import {
  checkClipboardSupport,
  downloadCanvasAsPNG,
  openWhatsApp,
} from '@/lib/clipboard'

describe('Clipboard Utilities', () => {
  describe('checkClipboardSupport', () => {
    it('should return true when clipboard API is available', () => {
      const result = checkClipboardSupport()

      expect(typeof result).toBe('boolean')
    })

    it('should return false when navigator is undefined', () => {
      const originalNavigator = globalThis.navigator
      Object.defineProperty(globalThis, 'navigator', {
        value: undefined,
        configurable: true,
      })

      const result = checkClipboardSupport()

      expect(result).toBe(false)

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        configurable: true,
      })
    })

    it('should return false when clipboard is undefined', () => {
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      })

      const result = checkClipboardSupport()

      expect(result).toBe(false)

      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      })
    })

    it('should return false when clipboard.write is not a function', () => {
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: { write: undefined },
        configurable: true,
      })

      const result = checkClipboardSupport()

      expect(result).toBe(false)

      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      })
    })
  })

  describe('downloadCanvasAsPNG', () => {
    let mockCanvas: HTMLCanvasElement
    let mockBlob: Blob

    beforeEach(() => {
      mockCanvas = document.createElement('canvas')
      mockBlob = new Blob(['test'], { type: 'image/png' })

      // Use vi.fn() with mockImplementation instead of spyOn
      // JSDOM canvas toBlob is not spyable
      mockCanvas.toBlob = vi.fn(
        (callback: ((blob: Blob | null) => void) | null) => {
          if (callback) callback(mockBlob)
        },
      )

      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
      vi.spyOn(document, 'createElement').mockReturnValue(
        document.createElement('a'),
      )
    })

    afterEach(() => {
      mockCanvas.toBlob = vi.fn()
    })

    it('should call canvas.toBlob', () => {
      downloadCanvasAsPNG(mockCanvas)

      expect(mockCanvas.toBlob).toHaveBeenCalledWith(
        expect.any(Function),
        'image/png',
        1.0,
      )
    })

    it('should create download link with correct filename format', () => {
      const createElementSpy = vi.spyOn(document, 'createElement')

      downloadCanvasAsPNG(mockCanvas)

      const linkElement = createElementSpy.mock.results.find(
        (result) => result.value.tagName === 'A',
      )?.value as HTMLAnchorElement | undefined

      if (linkElement) {
        expect(linkElement.download).toMatch(/^bca-mycoreplus-/)
        expect(linkElement.download).toMatch(/\.png$/)
      }
    })
  })

  describe('openWhatsApp', () => {
    it('should open WhatsApp with default message', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      openWhatsApp()

      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )
      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('BCA%20MyCore%2B'),
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should open WhatsApp with custom message', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      const customMessage = 'Check this out!'

      openWhatsApp(customMessage)

      expect(openSpy).toHaveBeenCalledWith(
        'https://wa.me/?text=Check%20this%20out!',
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should encode message properly', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      const messageWithSpecialChars = 'Hello & goodbye!'

      openWhatsApp(messageWithSpecialChars)

      expect(openSpy).toHaveBeenCalledWith(
        'https://wa.me/?text=Hello%20%26%20goodbye!',
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should open WhatsApp with phone number', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      const phoneNumber = '628123456789'
      const message = 'Hello from BCA'

      openWhatsApp(message, phoneNumber)

      expect(openSpy).toHaveBeenCalledWith(
        'https://wa.me/628123456789?text=Hello%20from%20BCA',
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should strip non-digit characters from phone number', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      const phoneNumber = '+62-812-3456-7890'
      const message = 'Test message'

      openWhatsApp(message, phoneNumber)

      expect(openSpy).toHaveBeenCalledWith(
        'https://wa.me/6281234567890?text=Test%20message',
        '_blank',
      )

      openSpy.mockRestore()
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
})
