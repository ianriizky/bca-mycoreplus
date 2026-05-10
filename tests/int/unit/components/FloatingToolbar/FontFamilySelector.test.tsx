import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { FontFamilySelector } from '@/components/FloatingToolbar/FontFamilySelector'

const mockUpdateObject = vi.fn()
const mockFabricCanvas = {
  getObjects: vi.fn(() => [] as unknown[]),
}

vi.mock('@/stores/canvas', () => ({
  useCanvasStore: vi.fn(
    (
      selector: (state: {
        fabricCanvas: typeof mockFabricCanvas
        updateObject: typeof mockUpdateObject
      }) => unknown,
    ) =>
      selector({
        fabricCanvas: mockFabricCanvas,
        updateObject: mockUpdateObject,
      }),
  ),
}))

describe('FontFamilySelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC4: Font family selection dropdown', () => {
    it('renders font family dropdown', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Font Family')).toBeInTheDocument()
    })

    it('contains 6 preset fonts', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      const select = screen.getByLabelText('Font Family')
      const options = select.querySelectorAll('option')

      expect(options.length).toBe(6)
    })

    it('includes System, Arial, Georgia, Courier, Times, Verdana fonts', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      expect(screen.getByRole('option', { name: 'System' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Arial' })).toBeInTheDocument()
      expect(
        screen.getByRole('option', { name: 'Georgia' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('option', { name: 'Courier' }),
      ).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Times' })).toBeInTheDocument()
      expect(
        screen.getByRole('option', { name: 'Verdana' }),
      ).toBeInTheDocument()
    })

    it('sets fontFamily when selection changed', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', fontFamily: 'system-ui' },
      ])

      render(<FontFamilySelector selectedObjectId="obj_123" />)

      const select = screen.getByLabelText('Font Family')
      fireEvent.change(select, { target: { value: 'Georgia, serif' } })

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        fontFamily: 'Georgia, serif',
      })
    })
  })

  describe('Default value', () => {
    it('defaults to system-ui when no object selected', () => {
      render(<FontFamilySelector selectedObjectId={null} />)

      const select = screen.getByLabelText('Font Family')
      expect(select).toHaveValue('system-ui')
    })

    it('shows current font when object selected', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', fontFamily: 'Arial, sans-serif' },
      ])

      render(<FontFamilySelector selectedObjectId="obj_123" />)

      const select = screen.getByLabelText('Font Family')
      expect(select).toHaveValue('Arial, sans-serif')
    })
  })

  describe('Disabled state', () => {
    it('disables dropdown when no object selected', () => {
      render(<FontFamilySelector selectedObjectId={null} />)

      expect(screen.getByLabelText('Font Family')).toBeDisabled()
    })

    it('enables dropdown when object selected', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Font Family')).not.toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has aria-label', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Font Family')).toBeInTheDocument()
    })

    it('has title attribute', () => {
      render(<FontFamilySelector selectedObjectId="obj_123" />)

      const select = screen.getByLabelText('Font Family')
      expect(select).toHaveAttribute('title', 'Font Family')
    })
  })
})
