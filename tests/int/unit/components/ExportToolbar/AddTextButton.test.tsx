import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { AddTextButton } from '@/components/ExportToolbar/AddTextButton'

const mockAddObject = vi
  .fn<() => Promise<string>>()
  .mockResolvedValue('text-123')

vi.mock('@/stores/canvas', () => ({
  useCanvasStore: vi.fn(
    (selector: (state: { addObject: typeof mockAddObject }) => unknown) =>
      selector({ addObject: mockAddObject }),
  ),
}))

describe('AddTextButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('AC1: Button visible in toolbar', () => {
    it('renders Add Text button', () => {
      render(<AddTextButton />)
      expect(
        screen.getByRole('button', { name: /add text to canvas/i }),
      ).toBeInTheDocument()
    })

    it('displays Add Text label', () => {
      render(<AddTextButton />)
      expect(screen.getByText('Add Text')).toBeInTheDocument()
    })
  })

  describe('AC2: Accessibility support', () => {
    it('has aria-label="Add Text to Canvas"', () => {
      render(<AddTextButton />)
      expect(
        screen.getByRole('button', { name: /add text to canvas/i }),
      ).toHaveAttribute('aria-label', 'Add Text to Canvas')
    })

    it('has Type icon with aria-hidden', () => {
      render(<AddTextButton />)
      const button = screen.getByRole('button', { name: /add text to canvas/i })
      const svg = button.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('AC3: Click adds text at canvas center', () => {
    it('calls addObject with "text" on click', async () => {
      render(<AddTextButton />)
      const button = screen.getByRole('button', { name: /add text to canvas/i })

      button.click()

      expect(mockAddObject).toHaveBeenCalledWith('text')
    })
  })

  describe('Button styling', () => {
    it('has glassmorphism styling class', () => {
      render(<AddTextButton />)
      const button = screen.getByRole('button', { name: /add text to canvas/i })
      expect(button).toHaveClass('backdrop-blur-sm')
    })
  })
})
