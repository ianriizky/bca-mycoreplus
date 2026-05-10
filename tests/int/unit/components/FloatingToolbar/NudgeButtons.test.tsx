import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { NudgeButtons } from '@/components/FloatingToolbar/NudgeButtons'

const mockUpdateObject = vi.fn()
const mockFabricCanvas = {
  getObjects: vi.fn(() => []),
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

describe('NudgeButtons Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC1: Nudge buttons for fine positioning', () => {
    it('renders all four arrow buttons', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /move up/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /move down/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /move left/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /move right/i }),
      ).toBeInTheDocument()
    })

    it('nudge up decreases Y by 1px', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<NudgeButtons selectedObjectId="obj_123" />)

      const upButton = screen.getByRole('button', { name: /move up/i })
      upButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        left: 100,
        top: 149,
      })
    })

    it('nudge down increases Y by 1px', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<NudgeButtons selectedObjectId="obj_123" />)

      const downButton = screen.getByRole('button', { name: /move down/i })
      downButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        left: 100,
        top: 151,
      })
    })

    it('nudge left decreases X by 1px', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<NudgeButtons selectedObjectId="obj_123" />)

      const leftButton = screen.getByRole('button', { name: /move left/i })
      leftButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        left: 99,
        top: 150,
      })
    })

    it('nudge right increases X by 1px', () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<NudgeButtons selectedObjectId="obj_123" />)

      const rightButton = screen.getByRole('button', { name: /move right/i })
      rightButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        left: 101,
        top: 150,
      })
    })
  })

  describe('AC3: Snap-to-center option', () => {
    it('renders snap to center button', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /snap to center/i }),
      ).toBeInTheDocument()
    })

    it('centers object at 187.5, 250', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      const centerButton = screen.getByRole('button', {
        name: /snap to center/i,
      })
      centerButton.click()

      expect(mockUpdateObject).toHaveBeenCalledWith('obj_123', {
        left: 187.5,
        top: 250,
      })
    })
  })

  describe('Disabled state', () => {
    it('disables all buttons when no object selected', () => {
      render(<NudgeButtons selectedObjectId={null} />)

      expect(screen.getByRole('button', { name: /move up/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /move down/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /move left/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /move right/i })).toBeDisabled()
      expect(
        screen.getByRole('button', { name: /snap to center/i }),
      ).toBeDisabled()
    })

    it('enables all buttons when object selected', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      expect(
        screen.getByRole('button', { name: /move up/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /move down/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /move left/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /move right/i }),
      ).not.toBeDisabled()
      expect(
        screen.getByRole('button', { name: /snap to center/i }),
      ).not.toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has aria-label for each button', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      expect(screen.getByRole('button', { name: /move up/i })).toHaveAttribute(
        'aria-label',
        'Move up',
      )
      expect(
        screen.getByRole('button', { name: /move down/i }),
      ).toHaveAttribute('aria-label', 'Move down')
      expect(
        screen.getByRole('button', { name: /move left/i }),
      ).toHaveAttribute('aria-label', 'Move left')
      expect(
        screen.getByRole('button', { name: /move right/i }),
      ).toHaveAttribute('aria-label', 'Move right')
      expect(
        screen.getByRole('button', { name: /snap to center/i }),
      ).toHaveAttribute('aria-label', 'Snap to center')
    })

    it('has title attribute for tooltips', () => {
      render(<NudgeButtons selectedObjectId="obj_123" />)

      expect(screen.getByRole('button', { name: /move up/i })).toHaveAttribute(
        'title',
        'Move up',
      )
      expect(
        screen.getByRole('button', { name: /snap to center/i }),
      ).toHaveAttribute('title', 'Snap to center')
    })
  })
})
