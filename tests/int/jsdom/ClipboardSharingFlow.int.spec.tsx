import { describe, it, expect, beforeEach, vi } from 'vitest'

import { checkClipboardSupport, openWhatsApp } from '@/lib/clipboard'

describe('Clipboard Sharing Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('clipboard support detection', () => {
    it('should detect clipboard support', () => {
      const supported = checkClipboardSupport()

      expect(typeof supported).toBe('boolean')
    })

    it('should return consistent result', () => {
      const result1 = checkClipboardSupport()
      const result2 = checkClipboardSupport()

      expect(result1).toBe(result2)
    })
  })

  describe('WhatsApp sharing', () => {
    it('should open WhatsApp with default message', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      openWhatsApp()

      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should open WhatsApp with custom message', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      openWhatsApp('Custom message')

      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('Custom%20message'),
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should encode special characters in message', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      openWhatsApp('Hello & goodbye!')

      expect(openSpy).toHaveBeenCalledWith(
        expect.stringContaining('%26'),
        '_blank',
      )

      openSpy.mockRestore()
    })

    it('should open in new tab', () => {
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      openWhatsApp()

      const calls = openSpy.mock.calls
      expect(calls[0][1]).toBe('_blank')

      openSpy.mockRestore()
    })
  })
})
