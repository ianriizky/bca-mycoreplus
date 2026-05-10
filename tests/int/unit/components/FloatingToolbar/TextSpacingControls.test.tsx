import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { TextSpacingControls } from '@/components/FloatingToolbar/TextSpacingControls'

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

describe('TextSpacingControls Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC2: Line height control', () => {
    it('renders line height slider', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Line height')).toBeInTheDocument()
    })

    it('sets lineHeight when slider changed', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', lineHeight: 1.16 },
      ])

      render(<TextSpacingControls selectedObjectId="obj_123" />)

      const slider = screen.getByLabelText('Line height')
      fireEvent.change(slider, { target: { value: '1.5' } })

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        lineHeight: 1.5,
      })
    })

    it('displays current line height value', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', lineHeight: 1.5 },
      ])

      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByText('1.5')).toBeInTheDocument()
    })

    it('line height range is 1.0 to 2.5', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      const slider = screen.getByLabelText('Line height')
      expect(slider).toHaveAttribute('min', '1')
      expect(slider).toHaveAttribute('max', '2.5')
    })
  })

  describe('AC5: Character spacing control', () => {
    it('renders character spacing slider', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Character spacing')).toBeInTheDocument()
    })

    it('sets charSpacing when slider changed', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', charSpacing: 0 },
      ])

      render(<TextSpacingControls selectedObjectId="obj_123" />)

      const slider = screen.getByLabelText('Character spacing')
      fireEvent.change(slider, { target: { value: '50' } })

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        charSpacing: 50,
      })
    })

    it('displays current char spacing value', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', charSpacing: 100 },
      ])

      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('char spacing range is 0 to 200', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      const slider = screen.getByLabelText('Character spacing')
      expect(slider).toHaveAttribute('min', '0')
      expect(slider).toHaveAttribute('max', '200')
    })
  })

  describe('Default values', () => {
    it('line height defaults to 1.16 when no object selected', () => {
      render(<TextSpacingControls selectedObjectId={null} />)

      expect(screen.getByText('1.2')).toBeInTheDocument()
    })

    it('char spacing defaults to 0 when no object selected', () => {
      render(<TextSpacingControls selectedObjectId={null} />)

      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('Disabled state', () => {
    it('disables sliders when no object selected', () => {
      render(<TextSpacingControls selectedObjectId={null} />)

      expect(screen.getByLabelText('Line height')).toBeDisabled()
      expect(screen.getByLabelText('Character spacing')).toBeDisabled()
    })

    it('enables sliders when object selected', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Line height')).not.toBeDisabled()
      expect(screen.getByLabelText('Character spacing')).not.toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has aria-label for line height', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Line height')).toBeInTheDocument()
    })

    it('has aria-label for character spacing', () => {
      render(<TextSpacingControls selectedObjectId="obj_123" />)

      expect(screen.getByLabelText('Character spacing')).toBeInTheDocument()
    })
  })
})
