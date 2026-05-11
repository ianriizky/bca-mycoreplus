/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { TemplateSelector } from '@/components/TemplateSelector'
import { useCanvasStore } from '@/stores/canvas'

vi.mock('@/stores/canvas')

describe('TemplateSelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC1: Template Selection Button in Toolbar', () => {
    it('should render template selection button with correct id and aria-label', () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      expect(button).toHaveAttribute('id', 'btn-select-template')
      expect(button).toHaveAttribute(
        'aria-label',
        'Pilih Template Ucapan Selamat',
      )
    })

    it('button should be visible and clickable', () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      expect(button).toBeVisible()
      expect(button).not.toBeDisabled()
    })
  })

  describe('AC2: Template Selection Modal Dialog', () => {
    it('should open modal when button is clicked', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const modal = screen.getByRole('dialog', {
          name: /Pilih Template Ucapan Selamat/i,
        })
        expect(modal).toBeVisible()
      })
    })

    it('modal should display template cards with thumbnails and apply buttons', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const applyButtons = screen.getAllByRole('button', {
          name: /Apply/i,
        })
        expect(applyButtons.length).toBeGreaterThan(0)
        expect(applyButtons[0]).toBeVisible()
        expect(applyButtons[0]).toHaveAttribute(
          'id',
          expect.stringMatching(/btn-apply-template-/),
        )
      })
    })

    it('should have cancel button with correct id', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const cancelButton = screen.getByRole('button', {
          name: /Cancel/i,
        })
        expect(cancelButton).toHaveAttribute('id', 'btn-cancel-template-modal')
      })
    })

    it('should close modal when ESC key is pressed', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const modal = screen.getByRole('dialog', {
          name: /Pilih Template Ucapan Selamat/i,
        })
        expect(modal).toBeVisible()
      })

      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

      await waitFor(() => {
        expect(
          screen.queryByRole('dialog', {
            name: /Pilih Template Ucapan Selamat/i,
          }),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('AC3: Template Preview & Confirmation Alert', () => {
    it('should show confirmation alert when apply button is clicked', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const applyButton = screen.getAllByRole('button', {
          name: /Apply/i,
        })[0]
        fireEvent.click(applyButton)
      })

      await waitFor(() => {
        const confirmAlert = screen.getByRole('alertdialog')
        expect(confirmAlert).toBeVisible()
        expect(confirmAlert).toHaveTextContent(
          /Menerapkan template ini akan menghapus semua editing/i,
        )
      })
    })

    it('should have confirm and cancel buttons in alert', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const applyButton = screen.getAllByRole('button', {
          name: /Apply/i,
        })[0]
        fireEvent.click(applyButton)
      })

      await waitFor(() => {
        const confirmButton = screen.getByRole('button', {
          name: /Ya, Terapkan/i,
        })
        const cancelButton = screen.getByRole('button', {
          name: /Batal/i,
        })
        expect(confirmButton).toHaveAttribute(
          'id',
          'btn-confirm-apply-template',
        )
        expect(cancelButton).toHaveAttribute('id', 'btn-cancel-apply-template')
      })
    })
  })

  describe('AC9: Keyboard Navigation', () => {
    it('should support ESC key to close confirmation dialog', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const applyButton = screen.getAllByRole('button', {
          name: /Apply/i,
        })[0]
        fireEvent.click(applyButton)
      })

      await waitFor(() => {
        const alertDialog = screen.getByRole('alertdialog')
        expect(alertDialog).toBeVisible()
      })

      fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' })

      await waitFor(() => {
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('AC10: Accessibility - ARIA Labels', () => {
    it('should have proper ARIA attributes on modal', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const modal = screen.getByRole('dialog')
        expect(modal).toHaveAttribute('aria-modal', 'true')
        expect(modal).toHaveAttribute('aria-labelledby', 'template-modal-title')
      })
    })

    it('should have proper ARIA attributes on confirmation alert', async () => {
      const mockApplyTemplate = vi.fn()
      ;(useCanvasStore as any).mockReturnValue({
        applyTemplate: mockApplyTemplate,
      })

      render(<TemplateSelector />)

      const button = screen.getByRole('button', {
        name: /Pilih Template Ucapan Selamat/i,
      })
      fireEvent.click(button)

      await waitFor(() => {
        const applyButton = screen.getAllByRole('button', {
          name: /Apply/i,
        })[0]
        fireEvent.click(applyButton)
      })

      await waitFor(() => {
        const alertDialog = screen.getByRole('alertdialog')
        expect(alertDialog).toHaveAttribute('aria-modal', 'true')
        expect(alertDialog).toHaveAttribute(
          'aria-labelledby',
          'confirm-modal-title',
        )
      })
    })
  })
})
