import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { CanvasEditor } from '@/components/CanvasEditor/index'

// Mock Fabric.js Canvas
vi.mock('fabric/es', () => {
  class MockCanvas {
    dispose = vi.fn()
  }

  return { Canvas: MockCanvas }
})

describe('CanvasEditor', () => {
  it('should initialize canvas on mount', () => {
    render(<CanvasEditor />)
    // Check if canvas is rendered
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeDefined()
    expect(canvas?.getAttribute('role')).toBe('application')
  })
})
