export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function focusElement(element: HTMLElement | null): void {
  if (!element) return

  element.focus()

  if (!isElementInViewport(element)) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

export function trapFocus(
  event: KeyboardEvent,
  firstElement: HTMLElement | null,
  lastElement: HTMLElement | null,
): void {
  if (event.key !== 'Tab') return

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault()
      lastElement?.focus()
    }
  } else if (document.activeElement === lastElement) {
    event.preventDefault()
    firstElement?.focus()
  }
}

export function getAriaLabel(element: HTMLElement): string {
  return element.getAttribute('aria-label') || ''
}

export function setAriaLabel(element: HTMLElement, label: string): void {
  element.setAttribute('aria-label', label)
}

export function getAriaLabelledBy(element: HTMLElement): string {
  return element.getAttribute('aria-labelledby') || ''
}

export function setAriaLabelledBy(element: HTMLElement, id: string): void {
  element.setAttribute('aria-labelledby', id)
}

export function getAriaDescribedBy(element: HTMLElement): string {
  return element.getAttribute('aria-describedby') || ''
}

export function setAriaDescribedBy(element: HTMLElement, id: string): void {
  element.setAttribute('aria-describedby', id)
}

export function setAriaLive(
  element: HTMLElement,
  value: 'polite' | 'assertive' | 'off' = 'polite',
): void {
  element.setAttribute('aria-live', value)
}

export function setAriaAtomic(
  element: HTMLElement,
  value: boolean = true,
): void {
  element.setAttribute('aria-atomic', value ? 'true' : 'false')
}

export function setAriaHidden(
  element: HTMLElement,
  value: boolean = true,
): void {
  element.setAttribute('aria-hidden', value ? 'true' : 'false')
}

export function setRole(element: HTMLElement, role: string): void {
  element.setAttribute('role', role)
}

export function getRole(element: HTMLElement): string {
  return element.getAttribute('role') || ''
}
