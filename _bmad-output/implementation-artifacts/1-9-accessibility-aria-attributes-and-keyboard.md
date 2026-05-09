---
storyId: 1.9
storyKey: 1-9-accessibility-aria-attributes-and-keyboard
epicId: 1
epicTitle: Initial MVP Architecture
status: ready-for-dev
createdAt: 2026-05-10T03:56:00.000Z
---

# Story 1-9: Accessibility - ARIA Attributes and Keyboard Navigation

## Story Overview

Implement comprehensive accessibility features including ARIA labels, keyboard navigation, focus indicators, and screen reader support. Ensure application meets WCAG 2.1 Level A standards for BCA staff with diverse accessibility needs.

## User Story

**As a** BCA staff member with accessibility needs (keyboard-only user, screen reader user, low vision)

**I want to** navigate and use the application using only keyboard and/or screen reader

**So that** I can create professional images without barriers, regardless of my input method or visual ability

## Acceptance Criteria

### AC1: Keyboard Navigation

- **Given** user navigates with keyboard only
- **When** pressing Tab key
- **Then** focus moves through interactive elements in logical order
- **And** focus is visible (outline or highlight)
- **And** all buttons, inputs, and controls are reachable via Tab

### AC2: ARIA Labels

- **Given** interactive elements exist
- **When** screen reader reads page
- **Then** all buttons have descriptive `aria-label` attributes
- **And** all form inputs have associated `<label>` elements
- **And** regions have `aria-label` for context
- **And** minimum 10+ ARIA labels present

### AC3: Focus Indicators

- **Given** user navigates with keyboard
- **When** element receives focus
- **Then** focus indicator is visible (2px outline or highlight)
- **And** focus indicator has high contrast (4.5:1 ratio)
- **And** focus indicator is not removed or hidden

### AC4: Semantic HTML

- **Given** page structure exists
- **When** screen reader reads page
- **Then** semantic HTML elements used (`<button>`, `<input>`, `<label>`, `<nav>`)
- **And** no `<div>` elements with click handlers (use `<button>`)
- **And** proper heading hierarchy (`<h1>`, `<h2>`, etc.)

### AC5: Live Regions

- **Given** user performs action (copy to clipboard, upload error)
- **When** action completes
- **Then** screen reader announces result via `aria-live` region
- **And** announcement is polite (not interrupting)
- **And** announcement includes action result and next steps

### AC6: Color Contrast

- **Given** text appears on background
- **When** measuring contrast ratio
- **Then** ratio is minimum 4.5:1 for normal text (WCAG AA)
- **And** ratio is minimum 3:1 for large text (18px+)
- **And** ratio is minimum 3:1 for UI components

### AC7: Keyboard Shortcuts

- **Given** user uses keyboard
- **When** pressing Ctrl+Z (or Cmd+Z on Mac)
- **Then** undo action is triggered
- **And** Ctrl+Y (or Cmd+Y) triggers redo
- **And** shortcuts are documented in help

### AC8: Error Messages

- **Given** user makes error (upload fails, invalid input)
- **When** error occurs
- **Then** error message is announced to screen reader
- **And** error message is associated with form field
- **And** error message includes recovery instructions

## Technical Requirements

### ARIA Attributes Implementation

**Comprehensive ARIA Labels:**

```typescript
// src/components/ExportToolbar/index.tsx
export function ExportToolbar() {
  return (
    <div role="toolbar" aria-label="Export and sharing options">
      <button
        aria-label="Copy image to clipboard (Ctrl+C)"
        onClick={handleCopy}
      >
        📋 Copy
      </button>

      <button
        aria-label="Share to WhatsApp (opens in new tab)"
        onClick={handleWhatsApp}
      >
        💬 WhatsApp
      </button>

      <button
        aria-label="Download image as PNG file"
        onClick={handleDownload}
      >
        ⬇️ Download
      </button>
    </div>
  )
}
```

**Form Field Labels:**

```typescript
// src/components/FileUpload/index.tsx
export function FileUpload() {
  const inputId = useId()

  return (
    <div>
      <label htmlFor={inputId}>
        Upload image (PNG, JPG, SVG, WebP - max 5MB)
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        aria-label="Select image file to upload"
        aria-describedby="file-help"
      />
      <div id="file-help" className="text-sm text-gray-600">
        Supported formats: PNG, JPG, SVG, WebP. Maximum file size: 5MB.
      </div>
    </div>
  )
}
```

**Region Labels:**

```typescript
// src/components/CanvasEditor/index.tsx
export function CanvasEditor() {
  return (
    <div role="region" aria-label="Canvas editor with drawing tools">
      <canvas ref={canvasRef} aria-label="Drawing canvas" />

      <div role="region" aria-label="Canvas objects list">
        {/* List of objects on canvas */}
      </div>
    </div>
  )
}
```

### Keyboard Navigation Implementation

**Tab Order Management:**

```typescript
// Ensure logical tab order
// 1. Entry point buttons
// 2. Canvas editor
// 3. Floating toolbar
// 4. Undo/redo buttons
// 5. Export buttons

// Use tabIndex for custom order if needed
<button tabIndex={0}>First button</button>
<button tabIndex={1}>Second button</button>

// Use tabIndex={-1} to remove from tab order if needed
<div tabIndex={-1}>Not in tab order</div>
```

**Keyboard Event Handlers:**

```typescript
// src/lib/keyboard.ts
export function useKeyboardShortcuts() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Ctrl+Z or Cmd+Z: Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault()
        undo()
      }

      // Ctrl+Y or Cmd+Y: Redo
      if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
        event.preventDefault()
        redo()
      }

      // Ctrl+C or Cmd+C: Copy to clipboard
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault()
        copyToClipboard()
      }

      // Delete: Delete selected object
      if (event.key === 'Delete') {
        event.preventDefault()
        deleteSelectedObject()
      }

      // Arrow keys: Move selected object
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault()
        moveSelectedObject(event.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
```

### Focus Management

**Focus Indicators:**

```css
/* Global focus styles */
:focus-visible {
  outline: 2px solid #0b1f3a; /* Deep Navy */
  outline-offset: 2px;
}

/* Button focus */
button:focus-visible {
  outline: 2px solid #0b1f3a;
  box-shadow: 0 0 0 4px rgba(11, 31, 58, 0.1);
}

/* Input focus */
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #0b1f3a;
  box-shadow: 0 0 0 4px rgba(11, 31, 58, 0.1);
}

/* Canvas focus */
canvas:focus-visible {
  outline: 2px solid #0b1f3a;
  outline-offset: 2px;
}
```

**Focus Trap (Modal):**

```typescript
// src/components/Modal/index.tsx
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  const lastButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    // Focus first button when modal opens
    firstButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      // Trap focus within modal
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift+Tab: Move to previous element
          if (document.activeElement === firstButtonRef.current) {
            event.preventDefault()
            lastButtonRef.current?.focus()
          }
        } else {
          // Tab: Move to next element
          if (document.activeElement === lastButtonRef.current) {
            event.preventDefault()
            firstButtonRef.current?.focus()
          }
        }
      }

      // Escape: Close modal
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button ref={firstButtonRef}>First Button</button>
      <button ref={lastButtonRef}>Last Button</button>
    </div>
  )
}
```

### Live Regions for Announcements

**Toast Notifications:**

```typescript
// src/components/Toast/index.tsx
export function Toast({ message, type }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="toast"
    >
      {type === 'success' && '✅ '}
      {type === 'error' && '❌ '}
      {type === 'info' && 'ℹ️ '}
      {message}
    </div>
  )
}
```

**Loading Announcements:**

```typescript
// src/components/LoadingSpinner/index.tsx
export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      <span className="sr-only">{message}</span>
    </div>
  )
}
```

### Color Contrast Validation

**Contrast Checker:**

```typescript
// src/lib/contrast.ts
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  const lum1 = getRelativeLuminance(rgb1)
  const lum2 = getRelativeLuminance(rgb2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

export function meetsWCAGAA(ratio: number): boolean {
  return ratio >= 4.5 // WCAG AA for normal text
}

export function meetsWCAGAALarge(ratio: number): boolean {
  return ratio >= 3 // WCAG AA for large text (18px+)
}
```

**Validation in Color Picker:**

```typescript
// src/components/ColorPicker/index.tsx
export function ColorPicker({ onColorSelect }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState('#C8A96A')

  const contrastRatio = getContrastRatio(selectedColor, '#FFFFFF')
  const meetsStandard = meetsWCAGAA(contrastRatio)

  return (
    <div>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        aria-label="Select color"
      />

      <div aria-live="polite">
        Contrast ratio: {contrastRatio.toFixed(2)}:1
        {meetsStandard ? (
          <span className="text-green-600">✓ Meets WCAG AA</span>
        ) : (
          <span className="text-red-600">✗ Does not meet WCAG AA</span>
        )}
      </div>
    </div>
  )
}
```

## Architecture & Code Structure

### File Organization

```
src/
├── components/
│   ├── Button/
│   │   └── index.tsx        # Accessible button component
│   ├── Input/
│   │   └── index.tsx        # Accessible input component
│   ├── Modal/
│   │   └── index.tsx        # Accessible modal with focus trap
│   ├── Toast/
│   │   └── index.tsx        # Toast with aria-live
│   └── CanvasEditor/
│       └── index.tsx        # Canvas with keyboard support
├── lib/
│   ├── keyboard.ts          # NEW - Keyboard event handling
│   ├── contrast.ts          # NEW - Color contrast checking
│   ├── accessibility.ts     # NEW - Accessibility utilities
│   └── a11y-utils.ts        # NEW - ARIA utilities
└── styles/
    └── accessibility.css    # NEW - Focus indicators, etc.
```

### Accessibility Utilities

```typescript
// src/lib/accessibility.ts
export function useId(): string {
  return useId() // React 18+ built-in
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut)) {
          event.preventDefault()
          shortcut.handler()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
```

## Dependencies & Versions

### Required Libraries (Already in project)

- **React**: 19.2.5+ (already installed)
- **Tailwind CSS**: 4.2.4+ (already installed)

### New Dependencies

None required. All functionality uses native browser APIs and React built-ins.

## UI/UX Specifications

### Focus Indicators

- **Style**: 2px solid outline
- **Color**: Deep Navy #0B1F3A
- **Offset**: 2px from element
- **Contrast**: 4.5:1 ratio with background

### Keyboard Shortcuts

| Shortcut       | Action                   | Platform |
| -------------- | ------------------------ | -------- |
| Tab            | Move to next element     | All      |
| Shift+Tab      | Move to previous element | All      |
| Enter          | Activate button/link     | All      |
| Space          | Activate button          | All      |
| Escape         | Close modal/dialog       | All      |
| Ctrl+Z / Cmd+Z | Undo                     | All      |
| Ctrl+Y / Cmd+Y | Redo                     | All      |
| Ctrl+C / Cmd+C | Copy to clipboard        | All      |
| Delete         | Delete selected object   | All      |
| Arrow Keys     | Move selected object     | All      |

### Screen Reader Announcements

**Success:**

```
"✅ Copied to clipboard!"
```

**Error:**

```
"❌ Upload failed. File too large (max 5MB). Please try again."
```

**Info:**

```
"ℹ️ Loading colors from image..."
```

## Testing Requirements

### Unit Tests (Vitest)

1. **ARIA Attributes**
   - Test: All buttons have aria-label
   - Test: All inputs have associated labels
   - Test: All regions have aria-label
   - Test: Minimum 10+ ARIA labels present

2. **Keyboard Navigation**
   - Test: Tab moves through elements in order
   - Test: Shift+Tab moves backwards
   - Test: Enter activates buttons
   - Test: Escape closes modals

3. **Keyboard Shortcuts**
   - Test: Ctrl+Z triggers undo
   - Test: Ctrl+Y triggers redo
   - Test: Ctrl+C triggers copy
   - Test: Delete removes object
   - Test: Arrow keys move object

4. **Focus Management**
   - Test: Focus visible on all interactive elements
   - Test: Focus trap in modal
   - Test: Focus restored after modal close

5. **Color Contrast**
   - Test: Text contrast >= 4.5:1
   - Test: UI component contrast >= 3:1
   - Test: Large text contrast >= 3:1

### Integration Tests (Playwright)

1. **Keyboard-Only Navigation**
   - Navigate entire app using Tab key only
   - Verify all features accessible
   - Verify no keyboard traps

2. **Screen Reader Testing**
   - Test with NVDA (Windows)
   - Test with JAWS (Windows)
   - Test with VoiceOver (Mac)
   - Test with TalkBack (Android)
   - Verify all content announced correctly

3. **Focus Indicators**
   - Verify focus visible on all elements
   - Verify focus order logical
   - Verify focus not lost on interaction

4. **Live Regions**
   - Verify toast announcements
   - Verify error announcements
   - Verify loading announcements

### Accessibility Audit Tools

```bash
# axe DevTools
npm install --save-dev @axe-core/react

# Lighthouse
npm run lighthouse

# WAVE (WebAIM)
# Manual testing: https://wave.webaim.org/

# Color contrast checker
npm install --save-dev wcag-contrast
```

## Previous Story Intelligence

### Story 1-8: Lazy Load Heavy Libraries (JUST CREATED)

**Key Learnings:**

- Loading states and Suspense fallbacks
- Error handling for async operations
- Performance monitoring

### Story 1-7: Undo/Redo Stack (COMPLETED)

**Key Learnings:**

- Keyboard event handling
- State management with Zustand
- Event listeners and cleanup

**Relevant Code Patterns:**

```typescript
// Keyboard event pattern from story 1-7
useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      event.preventDefault()
      undo()
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

## Git Intelligence

**Recent Commits (Last 5):**

1. `feat: implement lazy loading for heavy libraries` (Story 1-8)
2. `feat: implement undo/redo stack` (Story 1-7)
3. `feat: implement clipboard and whatsapp sharing` (Story 1-6)
4. `feat: implement colorthief palette extraction` (Story 1-5)
5. `feat: add safe zone overlay component` (Story 1-4)

**Code Patterns Established:**

- Keyboard event handling
- Zustand store pattern
- React hooks for state management
- Error handling with fallbacks

## Implementation Checklist

### Phase 1: ARIA Labels

- [ ] Add aria-label to all buttons
- [ ] Add aria-label to all regions
- [ ] Associate labels with form inputs
- [ ] Add aria-describedby for help text
- [ ] Verify minimum 10+ ARIA labels

### Phase 2: Keyboard Navigation

- [ ] Implement Tab order management
- [ ] Test Tab key navigation
- [ ] Test Shift+Tab navigation
- [ ] Verify logical tab order
- [ ] Remove keyboard traps

### Phase 3: Focus Management

- [ ] Add focus indicators (CSS)
- [ ] Implement focus trap for modals
- [ ] Test focus visibility
- [ ] Test focus restoration
- [ ] Verify focus not lost

### Phase 4: Keyboard Shortcuts

- [ ] Implement Ctrl+Z / Cmd+Z (undo)
- [ ] Implement Ctrl+Y / Cmd+Y (redo)
- [ ] Implement Ctrl+C / Cmd+C (copy)
- [ ] Implement Delete (delete object)
- [ ] Implement Arrow keys (move object)
- [ ] Document shortcuts in help

### Phase 5: Live Regions

- [ ] Add aria-live to toast notifications
- [ ] Add aria-live to error messages
- [ ] Add aria-live to loading states
- [ ] Test screen reader announcements

### Phase 6: Color Contrast

- [ ] Measure contrast ratios
- [ ] Verify text contrast >= 4.5:1
- [ ] Verify UI component contrast >= 3:1
- [ ] Verify large text contrast >= 3:1
- [ ] Add contrast validation to color picker

### Phase 7: Semantic HTML

- [ ] Use `<button>` for buttons (not `<div>`)
- [ ] Use `<input>` for inputs (not `<div>`)
- [ ] Use `<label>` for labels
- [ ] Use proper heading hierarchy
- [ ] Use `<nav>` for navigation

### Phase 8: Testing

- [ ] Unit tests for ARIA attributes
- [ ] Unit tests for keyboard shortcuts
- [ ] Integration tests for keyboard navigation
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Accessibility audit (axe, Lighthouse)
- [ ] Manual testing with keyboard only

## Known Constraints & Considerations

### Browser Compatibility

| Browser      | ARIA | Keyboard | Focus | Status          |
| ------------ | ---- | -------- | ----- | --------------- |
| Chrome 63+   | ✅   | ✅       | ✅    | Fully supported |
| Safari 11.1+ | ✅   | ✅       | ✅    | Fully supported |
| Firefox 53+  | ✅   | ✅       | ✅    | Fully supported |
| Edge 79+     | ✅   | ✅       | ✅    | Fully supported |

### Screen Reader Support

| Screen Reader | Platform | Status       |
| ------------- | -------- | ------------ |
| NVDA          | Windows  | ✅ Supported |
| JAWS          | Windows  | ✅ Supported |
| VoiceOver     | Mac/iOS  | ✅ Supported |
| TalkBack      | Android  | ✅ Supported |

### Edge Cases

1. **Canvas Accessibility**
   - Canvas element is not inherently accessible
   - Provide text alternative or ARIA description
   - Keyboard navigation for canvas objects

2. **Dynamic Content**
   - Use aria-live for dynamic updates
   - Announce changes to screen readers
   - Manage focus for dynamic content

3. **Color Blindness**
   - Don't rely on color alone
   - Use icons, patterns, or text
   - Provide high contrast options

## Success Metrics

1. **ARIA Compliance**
   - All interactive elements have ARIA labels
   - Minimum 10+ ARIA labels present
   - All regions labeled appropriately

2. **Keyboard Navigation**
   - All features accessible via keyboard
   - Tab order logical and intuitive
   - No keyboard traps
   - Keyboard shortcuts documented

3. **Focus Management**
   - Focus visible on all elements
   - Focus indicators high contrast
   - Focus not lost on interaction
   - Focus trap works in modals

4. **Screen Reader Support**
   - All content announced correctly
   - Live regions announce updates
   - Error messages associated with fields
   - Keyboard shortcuts announced

5. **WCAG Compliance**
   - WCAG 2.1 Level A compliance
   - Color contrast >= 4.5:1
   - Keyboard accessible
   - Screen reader compatible

6. **Code Quality**
   - Unit test coverage > 85%
   - Integration tests cover all workflows
   - No console errors or warnings
   - TypeScript strict mode compliance

## References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (NFR13-NFR17)
- **UX Design**: `_bmad-output/planning-artifacts/ux-design-specification.md` (Accessibility Specifications)
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM**: https://webaim.org/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

**Story Status**: ready-for-dev  
**Created**: 2026-05-10T03:56:00.000Z  
**Last Updated**: 2026-05-10T03:56:00.000Z
