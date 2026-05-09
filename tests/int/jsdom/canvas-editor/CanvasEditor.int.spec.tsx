import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock components BEFORE importing CanvasEditor
vi.mock('@/components/ExportToolbar', () => ({
  ExportToolbar: () => null,
}))

vi.mock('@/components/Toast', () => ({
  ToastContainer: () => null,
}))

vi.mock('fabric/es', () => {
  class MockCanvas {
    dispose = vi.fn()
  }

  return { Canvas: MockCanvas }
})

import { CanvasEditor } from '@/components/CanvasEditor/index'

describe('CanvasEditor', () => {
  it('should initialize canvas on mount', () => {
    render(<CanvasEditor />)
    // Check if canvas is rendered
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeDefined()
    expect(canvas?.getAttribute('role')).toBe('application')
  })
})
