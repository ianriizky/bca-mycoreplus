import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  checkClipboardSupport,
  downloadCanvasAsPNG,
  openWhatsApp,
} from '@/lib/clipboard'
import { useToastStore } from '@/stores/toast'

describe('Clipboard API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useToastStore.setState({ toasts: [] })
  })

  describe('checkClipboardSupport', () => {
    it('should return true when Clipboard API is available', () => {
      const result = checkClipboardSupport()
      expect(typeof result).toBe('boolean')
    })

    it('should detect clipboard support correctly', () => {
      const hasClipboard =
        typeof navigator !== 'undefined' &&
        typeof navigator.clipboard !== 'undefined' &&
        typeof navigator.clipboard.write === 'function'

      expect(checkClipboardSupport()).toBe(hasClipboard)
    })
  })

  describe('downloadCanvasAsPNG', () => {
    it('should create a download link with correct filename format', () => {
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100

      const appendChildSpy = vi.spyOn(document.body, 'appendChild')
      const removeChildSpy = vi.spyOn(document.body, 'removeChild')

      downloadCanvasAsPNG(canvas)

      expect(appendChildSpy).toHaveBeenCalled()
      expect(removeChildSpy).toHaveBeenCalled()

      appendChildSpy.mockRestore()
      removeChildSpy.mockRestore()
    })

    it('should show success toast after download', async () => {
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100

      vi.spyOn(document.body, 'appendChild').mockImplementation(() => {
        return document.body
      })
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => {
        return document.body
      })

      downloadCanvasAsPNG(canvas)

      await new Promise((resolve) => setTimeout(resolve, 100))
      const toasts = useToastStore.getState().toasts
      const successToast = toasts.find((t) => t.type === 'success')
      expect(successToast).toBeDefined()
    })
  })

  describe('openWhatsApp', () => {
    it('should open WhatsApp with default message', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation()

      openWhatsApp()

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )

      windowOpenSpy.mockRestore()
    })

    it('should open WhatsApp with custom message', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation()
      const customMessage = 'Custom message'

      openWhatsApp(customMessage)

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent(customMessage)),
        '_blank',
      )

      windowOpenSpy.mockRestore()
    })

    it('should encode message properly', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation()
      const message = 'Lihat gambar ini dari BCA MyCore+'

      openWhatsApp(message)

      const expectedUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      expect(windowOpenSpy).toHaveBeenCalledWith(expectedUrl, '_blank')

      windowOpenSpy.mockRestore()
    })
  })
})
