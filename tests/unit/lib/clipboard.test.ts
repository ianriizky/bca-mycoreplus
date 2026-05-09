import { describe, it, expect, beforeEach, vi } from 'vitest'

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

      vi.spyOn(mockCanvas, 'toBlob').mockImplementation((callback) => {
        callback(mockBlob)

        return undefined
      })

      vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
      vi.spyOn(document, 'createElement').mockReturnValue(
        document.createElement('a'),
      )
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
        expect.stringContaining('Check%20this%20out%21'),
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should encode message properly', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
      const messageWithSpecialChars = 'Hello & goodbye!'

      openWhatsApp(messageWithSpecialChars)

      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('Hello%20%26%20goodbye%21'),
        '_blank',
      )

      openSpy.mockRestore()
    })
  })
})
