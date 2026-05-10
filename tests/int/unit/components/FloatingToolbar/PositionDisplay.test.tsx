import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { PositionDisplay } from '@/components/FloatingToolbar/PositionDisplay'

const mockOn = vi.fn()
const mockOff = vi.fn()
const mockFabricCanvas = {
  getObjects: vi.fn(() => []),
  on: mockOn,
  off: mockOff,
}

vi.mock('@/stores/canvas', () => ({
  useCanvasStore: vi.fn(
    (selector: (state: { fabricCanvas: typeof mockFabricCanvas }) => unknown) =>
      selector({ fabricCanvas: mockFabricCanvas }),
  ),
}))

describe('PositionDisplay Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC2: Position indicator shows X/Y coordinates', () => {
    it('renders position display component', () => {
      render(<PositionDisplay selectedObjectId="obj_123" />)
      expect(screen.getByText(/X:/i)).toBeInTheDocument()
      expect(screen.getByText(/Y:/i)).toBeInTheDocument()
    })

    it('shows position 0,0 when no object selected', () => {
      render(<PositionDisplay selectedObjectId={null} />)
      expect(screen.getByText('X: 0')).toBeInTheDocument()
      expect(screen.getByText('Y: 0')).toBeInTheDocument()
    })

    it('shows correct position when object found', async () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<PositionDisplay selectedObjectId="obj_123" />)

      const afterRenderCallback = mockOn.mock.calls.find(
        (call) => call[0] === 'after:render',
      )?.[1]

      if (afterRenderCallback) {
        act(() => {
          afterRenderCallback()
        })
      }

      await waitFor(() => {
        expect(screen.getByText('X: 100')).toBeInTheDocument()
        expect(screen.getByText('Y: 150')).toBeInTheDocument()
      })
    })

    it('rounds position values', async () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100.7, top: 150.3 },
      ])

      render(<PositionDisplay selectedObjectId="obj_123" />)

      const afterRenderCallback = mockOn.mock.calls.find(
        (call) => call[0] === 'after:render',
      )?.[1]

      if (afterRenderCallback) {
        act(() => {
          afterRenderCallback()
        })
      }

      await waitFor(() => {
        expect(screen.getByText('X: 101')).toBeInTheDocument()
        expect(screen.getByText('Y: 150')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has aria-label describing position', async () => {
      mockFabricCanvas.getObjects.mockReturnValue([
        { id: 'obj_123', left: 100, top: 150 },
      ])

      render(<PositionDisplay selectedObjectId="obj_123" />)

      const afterRenderCallback = mockOn.mock.calls.find(
        (call) => call[0] === 'after:render',
      )?.[1]

      if (afterRenderCallback) {
        act(() => {
          afterRenderCallback()
        })
      }

      await waitFor(() => {
        const container = screen.getByText('X: 100').closest('div')
        expect(container).toHaveAttribute(
          'aria-label',
          'Object position: X 100, Y 150',
        )
      })
    })
  })
})
