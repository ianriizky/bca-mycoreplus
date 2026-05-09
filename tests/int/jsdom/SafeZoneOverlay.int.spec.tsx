import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { SafeZoneOverlay } from '@/components/SafeZoneOverlay'

describe('SafeZoneOverlay Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should render safe zone overlay with correct attributes', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })
    expect(safeZone).toBeDefined()
    expect(safeZone.getAttribute('aria-label')).toBe('Brand Safe Zone')
  })

  it('should be visible by default', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })
    expect(safeZone.className).toContain('opacity-100')
  })

  it('should have toggle button with correct aria-label', () => {
    render(<SafeZoneOverlay />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle safe zone/i,
    })
    expect(toggleButton).toBeDefined()
    expect(toggleButton.getAttribute('aria-label')).toBe('Toggle Safe Zone')
  })

  it('should toggle visibility when button is clicked', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })
    const toggleButton = screen.getByRole('button', {
      name: /toggle safe zone/i,
    })

    expect(safeZone.className).toContain('opacity-100')

    fireEvent.click(toggleButton)

    expect(safeZone.className).toContain('opacity-0')

    fireEvent.click(toggleButton)

    expect(safeZone.className).toContain('opacity-100')
  })

  it('should persist visibility state to localStorage', () => {
    const { unmount } = render(<SafeZoneOverlay />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle safe zone/i,
    })

    fireEvent.click(toggleButton)

    expect(localStorage.getItem('bca-safe-zone-visible')).toBe('false')

    unmount()

    const { container } = render(<SafeZoneOverlay />)

    const safeZone = container.querySelector('[role="region"]')
    expect(safeZone?.className).toContain('opacity-0')
  })

  it('should have correct styling classes', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })

    expect(safeZone.className).toContain('pointer-events-none')
    expect(safeZone.className).toContain('absolute')
    expect(safeZone.className).toContain('border-2')
    expect(safeZone.className).toContain('border-dashed')
  })

  it('should have toggle button with correct styling', () => {
    render(<SafeZoneOverlay />)

    const toggleButton = screen.getByRole('button', {
      name: /toggle safe zone/i,
    })

    expect(toggleButton.className).toContain('absolute')
    expect(toggleButton.className).toContain('right-4')
    expect(toggleButton.className).toContain('bottom-4')
  })

  it('should use pointer-events-none to allow canvas interaction', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })

    expect(safeZone.className).toContain('pointer-events-none')
  })

  it('should have aria-hidden set based on visibility state', () => {
    render(<SafeZoneOverlay />)

    const safeZone = screen.getByRole('region', { name: /brand safe zone/i })

    expect(safeZone.getAttribute('aria-hidden')).toBe('false')

    const toggleButton = screen.getByRole('button', {
      name: /toggle safe zone/i,
    })
    fireEvent.click(toggleButton)

    expect(safeZone.getAttribute('aria-hidden')).toBe('true')
  })
})
