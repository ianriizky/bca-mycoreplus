import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { WhatsAppButton } from '@/components/ExportToolbar/WhatsAppButton'

const mockOpen = vi.fn()
Object.defineProperty(window, 'open', {
  value: mockOpen,
  writable: true,
})

const mockSetWhatsappMessage = vi.fn()
const mockSetWhatsappPhoneNumber = vi.fn()
const mockWhatsappMessage = 'Lihat gambar ini dari BCA MyCore+'
const mockWhatsappPhoneNumber = ''

vi.mock('@/stores/preferences', () => ({
  usePreferencesStore: vi.fn((selector) => {
    const state = {
      whatsappMessage: mockWhatsappMessage,
      whatsappPhoneNumber: mockWhatsappPhoneNumber,
      setWhatsappMessage: mockSetWhatsappMessage,
      setWhatsappPhoneNumber: mockSetWhatsappPhoneNumber,
    }

    return selector(state)
  }),
}))

vi.mock('@/stores/canvas', () => ({
  useCanvasStore: vi.fn(
    (selector: (state: { fabricCanvas: object }) => unknown) =>
      selector({ fabricCanvas: { mock: 'canvas' } }),
  ),
}))

describe('WhatsAppButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOpen.mockReset()
  })

  describe('AC1: Input field for message text', () => {
    it('renders WhatsApp button by default', () => {
      render(<WhatsAppButton />)
      expect(
        screen.getByRole('button', { name: /share to whatsapp/i }),
      ).toBeInTheDocument()
    })

    it('renders Edit Pesan button', () => {
      render(<WhatsAppButton />)
      expect(
        screen.getByRole('button', { name: /edit whatsapp message/i }),
      ).toBeInTheDocument()
    })

    it('shows input field after clicking Edit Pesan', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      expect(
        screen.getByLabelText(/whatsapp message text/i),
      ).toBeInTheDocument()
    })

    it('shows character counter when editing', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      expect(screen.getByText(/33\/500/)).toBeInTheDocument()
    })
  })

  describe('AC2: Default message', () => {
    it('pre-fills textarea with default message', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const textarea = screen.getByLabelText(/whatsapp message text/i)
      expect(textarea).toHaveValue('Lihat gambar ini dari BCA MyCore+')
    })
  })

  describe('AC4: Character limit indicator', () => {
    it('enforces max 500 characters in textarea', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const textarea = screen.getByLabelText(
        /whatsapp message text/i,
      ) as HTMLTextAreaElement
      expect(textarea).toHaveAttribute('maxLength', '500')
    })

    it('shows updated character count as user types', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const textarea = screen.getByLabelText(/whatsapp message text/i)
      fireEvent.change(textarea, { target: { value: 'Hello' } })

      expect(screen.getByText(/5\/500/)).toBeInTheDocument()
    })
  })

  describe('Edit/Cancel flow', () => {
    it('calls setWhatsappMessage when saving', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const textarea = screen.getByLabelText(/whatsapp message text/i)
      fireEvent.change(textarea, { target: { value: 'Custom message' } })

      const saveButton = screen.getByRole('button', {
        name: /save message and phone number/i,
      })
      fireEvent.click(saveButton)

      expect(mockSetWhatsappMessage).toHaveBeenCalledWith('Custom message')
      expect(mockSetWhatsappPhoneNumber).toHaveBeenCalledWith('')
    })

    it('hides input field after saving', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const saveButton = screen.getByRole('button', { name: /save message/i })
      fireEvent.click(saveButton)

      expect(
        screen.queryByLabelText(/whatsapp message text/i),
      ).not.toBeInTheDocument()
    })

    it('hides input field when canceling', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const textarea = screen.getByLabelText(/whatsapp message text/i)
      fireEvent.change(textarea, { target: { value: 'Changed message' } })

      const cancelButton = screen.getByRole('button', {
        name: /cancel editing/i,
      })
      fireEvent.click(cancelButton)

      expect(
        screen.queryByLabelText(/whatsapp message text/i),
      ).not.toBeInTheDocument()
    })

    it('calls setWhatsappPhoneNumber when saving', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      const phoneInput = screen.getByLabelText(/whatsapp phone number/i)
      fireEvent.change(phoneInput, { target: { value: '628123456789' } })

      const saveButton = screen.getByRole('button', {
        name: /save message and phone number/i,
      })
      fireEvent.click(saveButton)

      expect(mockSetWhatsappPhoneNumber).toHaveBeenCalledWith('628123456789')
    })
  })

  describe('WhatsApp sharing', () => {
    it('opens WhatsApp with current message on click', async () => {
      render(<WhatsAppButton />)
      const whatsappButton = screen.getByRole('button', {
        name: /share to whatsapp/i,
      })

      fireEvent.click(whatsappButton)

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank',
      )
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label on WhatsApp button', () => {
      render(<WhatsAppButton />)
      expect(
        screen.getByRole('button', { name: /share to whatsapp/i }),
      ).toHaveAttribute('aria-label', 'Share to WhatsApp')
    })

    it('has proper aria-label on Edit button', () => {
      render(<WhatsAppButton />)
      expect(
        screen.getByRole('button', { name: /edit whatsapp message/i }),
      ).toHaveAttribute('aria-label', 'Edit WhatsApp message and phone number')
    })

    it('has phone number input with aria-label', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      expect(
        screen.getByLabelText(/whatsapp phone number/i),
      ).toBeInTheDocument()
    })

    it('has textarea with aria-label', async () => {
      render(<WhatsAppButton />)
      const editButton = screen.getByRole('button', {
        name: /edit whatsapp message/i,
      })
      fireEvent.click(editButton)

      expect(
        screen.getByLabelText(/whatsapp message text/i),
      ).toBeInTheDocument()
    })
  })
})
