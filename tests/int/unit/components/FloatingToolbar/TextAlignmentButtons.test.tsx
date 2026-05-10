import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { TextAlignmentButtons } from '@/components/FloatingToolbar/TextAlignmentButtons'

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

describe('TextAlignmentButtons Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC1: Text alignment controls', () => {
    it('renders all four alignment buttons', () => {
      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /align left/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /align center/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /align right/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /justify/i }),
      ).toBeInTheDocument()
    })

    it('sets textAlign to left when left button clicked', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'center' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const leftButton = screen.getByRole('button', { name: /align left/i })
      leftButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        textAlign: 'left',
      })
    })

    it('sets textAlign to center when center button clicked', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'left' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const centerButton = screen.getByRole('button', { name: /align center/i })
      centerButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        textAlign: 'center',
      })
    })

    it('sets textAlign to right when right button clicked', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'left' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const rightButton = screen.getByRole('button', { name: /align right/i })
      rightButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        textAlign: 'right',
      })
    })

    it('sets textAlign to justify when justify button clicked', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'left' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const justifyButton = screen.getByRole('button', { name: /justify/i })
      justifyButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        textAlign: 'justify',
      })
    })
  })

  describe('Visual state', () => {
    it('shows active state for current alignment', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'center' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const centerButton = screen.getByRole('button', { name: /align center/i })
      expect(centerButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('shows inactive state for other alignments', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'center' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const leftButton = screen.getByRole('button', { name: /align left/i })
      expect(leftButton).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('Disabled state', () => {
    it('disables all buttons when no object selected', () => {
      render(<TextAlignmentButtons selectedObjectId={null} />)

      expect(screen.getByRole('button', { name: /align left/i })).toBeDisabled()
      expect(
        screen.getByRole('button', { name: /align center/i }),
      ).toBeDisabled()
      expect(
        screen.getByRole('button', { name: /align right/i }),
      ).toBeDisabled()
      expect(screen.getByRole('button', { name: /justify/i })).toBeDisabled()
    })

    it('enables all buttons when object selected', () => {
      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /align left/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /align center/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /align right/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /justify/i }),
      ).not.toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has aria-label for each button', () => {
      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /align left/i }),
      ).toHaveAttribute('aria-label', 'Align Left')
      expect(
        screen.getByRole('button', { name: /align center/i }),
      ).toHaveAttribute('aria-label', 'Align Center')
      expect(
        screen.getByRole('button', { name: /align right/i }),
      ).toHaveAttribute('aria-label', 'Align Right')
      expect(screen.getByRole('button', { name: /justify/i })).toHaveAttribute(
        'aria-label',
        'Justify',
      )
    })

    it('has title attribute for tooltips', () => {
      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /align left/i }),
      ).toHaveAttribute('title', 'Align Left')
      expect(
        screen.getByRole('button', { name: /align center/i }),
      ).toHaveAttribute('title', 'Align Center')
    })

    it('has aria-pressed state', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', textAlign: 'left' },
      ])

      render(<TextAlignmentButtons selectedObjectId="obj_123" />)

      const leftButton = screen.getByRole('button', { name: /align left/i })
      expect(leftButton).toHaveAttribute('aria-pressed', 'true')
    })
  })
})
