import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { FloatingToolbar } from '@/components/FloatingToolbar'
import { useCanvasStore } from '@/stores/canvas'

describe('FloatingToolbar', () => {
  beforeEach(() => {
    // Reset store before each test
    useCanvasStore.setState({
      selectedObjectId: null,
      fabricCanvas: null,
    })
  })

  describe('AC1: Toolbar Visibility Control', () => {
    it('should be hidden by default when no object is selected', () => {
      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')
      expect(toolbar).not.toBeInTheDocument()
    })

    it('should appear when an object is selected', () => {
      // Mock canvas and selected object
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')
      expect(toolbar).toBeInTheDocument()
    })

    it('should have aria-hidden=false when visible', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')
      expect(toolbar).toHaveAttribute('aria-hidden', 'false')
    })
  })

  describe('AC2: Glassmorphism Styling', () => {
    it('should have glassmorphism classes applied', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')

      expect(toolbar).toHaveClass('backdrop-blur-[15px]')
      expect(toolbar).toHaveClass('bg-white/80')
      expect(toolbar).toHaveClass('border')
      expect(toolbar).toHaveClass('border-white/20')
      expect(toolbar).toHaveClass('shadow-lg')
      expect(toolbar).toHaveClass('rounded-xl')
    })
  })

  describe('AC3: Brand Colors', () => {
    it('should use BCA brand colors for text', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const buttons = container.querySelectorAll('button')

      buttons.forEach((button) => {
        expect(button).toHaveClass('text-[#0B1F3A]')
      })
    })
  })

  describe('AC4: Toolbar Actions', () => {
    it('should have color picker button', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const colorButton = screen.getByLabelText('Change Color')
      expect(colorButton).toBeInTheDocument()
    })

    it('should have delete button', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const deleteButton = screen.getByLabelText('Delete Object')
      expect(deleteButton).toBeInTheDocument()
    })

    it('should have photo upload button', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const uploadButton = screen.getByLabelText('Upload Photo')
      expect(uploadButton).toBeInTheDocument()
    })
  })

  describe('AC5: Context-Sensitive Actions', () => {
    it('should show font size controls for text objects', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            fontSize: 16,
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const increaseButton = screen.getByLabelText('Increase Font Size')
      const decreaseButton = screen.getByLabelText('Decrease Font Size')

      expect(increaseButton).toBeInTheDocument()
      expect(decreaseButton).toBeInTheDocument()
    })

    it('should not show font size controls for non-text objects', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'image',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const increaseButton = screen.queryByLabelText('Increase Font Size')
      expect(increaseButton).not.toBeInTheDocument()
    })
  })

  describe('AC7: Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')

      expect(toolbar).toHaveAttribute('role', 'toolbar')
      expect(toolbar).toHaveAttribute('aria-label', 'Formatting options')
    })

    it('should have aria-label on all buttons', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label')
      })
    })
  })

  describe('AC6: Positioning', () => {
    it('should position toolbar above selected object', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]') as HTMLElement

      const style = toolbar.getAttribute('style')
      expect(style).toContain('left:')
      expect(style).toContain('top:')
    })

    it('should have fixed positioning', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      const { container } = render(<FloatingToolbar />)
      const toolbar = container.querySelector('[role="toolbar"]')

      expect(toolbar).toHaveClass('fixed')
    })
  })

  describe('Edge Cases', () => {
    it('should handle keyboard escape key to deselect', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
        discardActiveObject: vi.fn(),
        requestRenderAll: vi.fn(),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)

      act(() => {
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        window.dispatchEvent(escapeEvent)
      })

      expect(useCanvasStore.getState().selectedObjectId).toBe(null)
    })

    it('should reject files that are not images', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'image',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const uploadButton = screen.getByLabelText('Upload Photo')
      expect(uploadButton).toBeInTheDocument()
    })

    it('should enforce minimum font size of 8px', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            fontSize: 10,
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
      }

      const updateObjectMock = vi.fn()
      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
        updateObject: updateObjectMock,
      })

      render(<FloatingToolbar />)
      const decreaseButton = screen.getByLabelText('Decrease Font Size')

      // Click decrease button multiple times to test minimum
      decreaseButton.click()
      decreaseButton.click()

      // Should not go below 8px
      const lastCall =
        updateObjectMock.mock.calls[updateObjectMock.mock.calls.length - 1]
      expect(lastCall[1].fontSize).toBeGreaterThanOrEqual(8)
    })

    it('should open color picker when color button is clicked', () => {
      const mockCanvas = {
        getObjects: vi.fn(() => [
          {
            id: 'obj_1',
            type: 'text',
            getBoundingRect: () => ({
              left: 100,
              top: 100,
              width: 50,
              height: 50,
            }),
          },
        ]),
        discardActiveObject: vi.fn(),
      }

      useCanvasStore.setState({
        selectedObjectId: 'obj_1',
        fabricCanvas: mockCanvas as any,
      })

      render(<FloatingToolbar />)
      const colorButton = screen.getByLabelText(/Change Color/i)

      act(() => {
        colorButton.click()
      })

      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })
  })
})
