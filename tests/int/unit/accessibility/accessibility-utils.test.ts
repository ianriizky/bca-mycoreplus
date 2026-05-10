import { describe, it, expect, beforeEach } from 'vitest'

import {
  generateId,
  setAriaLabel,
  getAriaLabel,
  setAriaLabelledBy,
  getAriaLabelledBy,
  setAriaDescribedBy,
  getAriaDescribedBy,
  setAriaLive,
  setAriaAtomic,
  setAriaHidden,
  setRole,
  getRole,
} from '@/lib/accessibility'

describe('Accessibility Utilities', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
  })

  it('should generate unique IDs', () => {
    const id1 = generateId('test')
    const id2 = generateId('test')

    expect(id1).toMatch(/^test-/)
    expect(id2).toMatch(/^test-/)
    expect(id1).not.toBe(id2)
  })

  it('should set and get aria-label', () => {
    setAriaLabel(element, 'Test Label')
    expect(getAriaLabel(element)).toBe('Test Label')
  })

  it('should set and get aria-labelledby', () => {
    setAriaLabelledBy(element, 'label-id')
    expect(getAriaLabelledBy(element)).toBe('label-id')
  })

  it('should set and get aria-describedby', () => {
    setAriaDescribedBy(element, 'desc-id')
    expect(getAriaDescribedBy(element)).toBe('desc-id')
  })

  it('should set aria-live attribute', () => {
    setAriaLive(element, 'polite')
    expect(element.getAttribute('aria-live')).toBe('polite')
  })

  it('should set aria-atomic attribute', () => {
    setAriaAtomic(element, true)
    expect(element.getAttribute('aria-atomic')).toBe('true')
  })

  it('should set aria-hidden attribute', () => {
    setAriaHidden(element, true)
    expect(element.getAttribute('aria-hidden')).toBe('true')
  })

  it('should set and get role', () => {
    setRole(element, 'button')
    expect(getRole(element)).toBe('button')
  })

  it('should handle multiple ARIA attributes', () => {
    setAriaLabel(element, 'Test')
    setRole(element, 'region')
    setAriaLive(element, 'assertive')

    expect(getAriaLabel(element)).toBe('Test')
    expect(getRole(element)).toBe('region')
    expect(element.getAttribute('aria-live')).toBe('assertive')
  })
})
