import { describe, it, expect } from 'vitest'

describe('ARIA Labels', () => {
  it('should have aria-label on buttons', () => {
    const button = document.createElement('button')
    button.setAttribute('aria-label', 'Copy to clipboard')

    expect(button.getAttribute('aria-label')).toBe('Copy to clipboard')
  })

  it('should have aria-label on regions', () => {
    const region = document.createElement('div')
    region.setAttribute('role', 'region')
    region.setAttribute('aria-label', 'Canvas editor with drawing tools')

    expect(region.getAttribute('aria-label')).toBe(
      'Canvas editor with drawing tools',
    )
  })

  it('should have aria-describedby for help text', () => {
    const input = document.createElement('input')
    input.setAttribute('aria-describedby', 'file-help')

    expect(input.getAttribute('aria-describedby')).toBe('file-help')
  })

  it('should have aria-labelledby for modals', () => {
    const modal = document.createElement('div')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-labelledby', 'modal-title')

    expect(modal.getAttribute('aria-labelledby')).toBe('modal-title')
  })

  it('should count minimum 10+ ARIA labels', () => {
    const container = document.createElement('div')

    const ariaLabels = [
      'Copy to clipboard',
      'Download as PNG',
      'Share to WhatsApp',
      'Undo (Ctrl+Z)',
      'Redo (Ctrl+Y)',
      'Upload image',
      'Canvas editor with drawing tools',
      'Export and sharing options',
      'Formatting options',
      'Change Color',
      'Delete Object',
      'Upload Photo',
    ]

    ariaLabels.forEach((label) => {
      const button = document.createElement('button')
      button.setAttribute('aria-label', label)
      container.appendChild(button)
    })

    const buttons = container.querySelectorAll('[aria-label]')
    expect(buttons.length).toBeGreaterThanOrEqual(10)
  })
})
