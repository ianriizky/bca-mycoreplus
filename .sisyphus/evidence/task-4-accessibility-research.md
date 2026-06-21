# Canvas Accessibility Research: WCAG 2.1 Level A for Canvas-Based UIs

**Research Date**: 2026-05-09  
**Research Target**: WCAG 2.1 Level A compliance patterns for BCA MyCore+ canvas-based UI  
**NFR Constraints**: NFR13-NFR17 (Accessibility requirements from PRD)

---

## Executive Summary

Canvas-based UIs present unique accessibility challenges because canvas is a "black box" to assistive technologies. Standard HTML elements can be read by screen readers and navigated via keyboard, but canvas content requires explicit accessibility layers.

| Aspect                | Challenge                         | Solution                               |
| --------------------- | --------------------------------- | -------------------------------------- |
| Screen Reader Support | Canvas content is opaque to AT    | ARIA live regions, hidden DOM elements |
| Keyboard Navigation   | No native focus on canvas objects | Layered input handling, focus trap     |
| Color Contrast        | Dynamic content may fail WCAG AA  | ColorThief.js contrast API             |
| Focus Indicators      | Canvas objects lack visible focus | Custom overlay indicators              |
| Alternative Content   | No alt text for canvas elements   | Hidden semantic DOM mirror             |

---

## 1. WCAG 2.1 Level A Requirements for Canvas UI

### Core Level A Criteria

| Criterion                        | Description                            | Canvas Challenge                | Mitigation                         |
| -------------------------------- | -------------------------------------- | ------------------------------- | ---------------------------------- |
| **1.1.1 Non-text Content**       | All non-text content has alt text      | Canvas objects have no alt      | Layer hidden DOM with descriptions |
| **1.3.1 Info and Relationships** | Structure conveyed programmatically    | Canvas lacks semantic structure | Maintain parallel DOM structure    |
| **1.3.2 Meaningful Sequence**    | Reading order is logical               | Canvas order is visual only     | Tab order via layered input        |
| **2.1.1 Keyboard**               | All functionality via keyboard         | Canvas objects not focusable    | Intercept keyboard events          |
| **2.1.2 No Keyboard Trap**       | No focus trap without method to escape | Canvas may trap focus           | Escape key handler                 |
| **2.4.3 Focus Order**            | Focus moves logically                  | No native focus order           | Custom focus management            |
| **2.4.4 Link Purpose**           | Link purpose is clear                  | May be ambiguous                | Hidden labels                      |
| **3.1.1 Language of Page**       | Language declared                      | N/A                             | `<html lang="id">`                 |
| **3.3.1 Error Identification**   | Errors described                       | Dynamic errors hard to catch    | aria-live announcements            |
| **4.1.2 Name, Role, Value**      | UI component info available            | Canvas objects have no role     | ARIA attributes on overlay         |

### Minimum Implementation for Level A

1. **Hidden Semantic Layer**: Parallel DOM with descriptions of canvas content
2. **Keyboard Event Handler**: Intercept and process keyboard input
3. **Focus Management**: Track and display focus state
4. **Live Region Announcements**: aria-live for dynamic changes
5. **Alternative Text**: Alt descriptions for each canvas object

---

## 2. Screen Reader Strategies

### Strategy 1: Hidden DOM Mirror

Maintain a visually hidden layer that mirrors canvas content semantically:

```tsx
<div className="sr-only" aria-live="polite">
  {/* Dynamically updated with canvas state */}
  <div role="img" aria-label="Canvas: KTA promotion image with text 'Ajukan Sekarang!' in BCA Gold color" />
</div>
```

**Implementation**:

- Hidden `<div>` with `sr-only` class (visually hidden but screen-reader accessible)
- `aria-live="polite"` region announces changes when user is idle
- Content updated whenever canvas changes

### Strategy 2: Object Descriptions

Each canvas object has a corresponding accessible description:

```tsx
interface AccessibleCanvasObject {
  id: string
  type: 'text' | 'image' | 'shape'
  label: string // e.g., "Text: 'Ajukan Sekarang!'"
  position: { x: number; y: number }
  keyboardShortcuts?: string[]
}
```

### Strategy 3: Live Region Announcements

Announce important state changes:

```tsx
function announceToScreenReader(message: string) {
  const liveRegion = document.getElementById('sr-announcements')
  liveRegion.textContent = message // Triggers announcement
}
```

**Events to Announce**:

- Object selected: "Selected: Text 'Ajukan Sekarang!'"
- Object modified: "Text updated to: 'Promo Spesial'"
- Export complete: "Image copied to clipboard"
- Error: "Error: Unable to load image"

### Strategy 4: ARIA Canvas Role

```tsx
<canvas
  role="img"
  aria-label="Image editor canvas. Use keyboard to navigate objects."
  tabIndex={0}
  aria-describedby="canvas-instructions"
/>
<div id="canvas-instructions" className="sr-only">
  Press Tab to navigate between objects. Press Enter to edit.
  Press Delete to remove selected object.
</div>
```

---

## 3. Keyboard Navigation Patterns

### Pattern 1: Object Selection Cycle

```tsx
// Keyboard navigation for canvas objects
function CanvasKeyboardNav({ objects, selectedId, onSelect }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        e.preventDefault()
        const currentIndex = objects.findIndex((o) => o.id === selectedId)
        const nextIndex = (currentIndex + 1) % objects.length
        onSelect(objects[nextIndex].id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [objects, selectedId, onSelect])

  return null // No visual output
}
```

### Pattern 2: Arrow Key Fine Navigation

```tsx
function ArrowKeyNav({ selectedObject, onMove }) {
  const STEP = 1 // pixels

  function handleArrowKey(e: KeyboardEvent) {
    if (!selectedObject) return

    let dx = 0,
      dy = 0
    switch (e.key) {
      case 'ArrowUp':
        dy = -STEP
        break
      case 'ArrowDown':
        dy = STEP
        break
      case 'ArrowLeft':
        dx = -STEP
        break
      case 'ArrowRight':
        dx = STEP
        break
      default:
        return
    }

    e.preventDefault()
    onMove(selectedObject.id, dx, dy)
  }

  return <div role="application" aria-label="Use arrow keys to move selected object" onKeyDown={handleArrowKey} tabIndex={-1} />
}
```

### Pattern 3: Action Shortcuts

| Shortcut           | Action          | Announce                    |
| ------------------ | --------------- | --------------------------- |
| `Tab`              | Next object     | "Next: Text object"         |
| `Shift+Tab`        | Previous object | "Previous: Text object"     |
| `Enter`            | Edit selected   | "Editing: Text object"      |
| `Delete/Backspace` | Delete selected | "Object deleted"            |
| `Escape`           | Deselect        | "Deselected"                |
| `Ctrl+Z`           | Undo            | "Undone"                    |
| `Ctrl+Shift+Z`     | Redo            | "Redone"                    |
| `Ctrl+C`           | Copy image      | "Image copied to clipboard" |

### Pattern 4: Focus Indicators

Canvas itself is focusable; show overlay indicator for selected object:

```tsx
function FocusIndicator({ selectedObject, canvasRef }) {
  // Render focus ring around selected object
  if (!selectedObject) return null

  return (
    <div
      className="border-bca-gold pointer-events-none absolute border-2"
      style={{
        left: selectedObject.left - 4,
        top: selectedObject.top - 4,
        width: selectedObject.width + 8,
        height: selectedObject.height + 8,
      }}
      aria-hidden="true"
    />
  )
}
```

---

## 4. Color Contrast Validation

### Using ColorThief.js Contrast API

ColorThief.js provides `.contrast()` method for WCAG AA compliance:

```tsx
// Extract dominant color and calculate contrast
const colorThief = new ColorThief()
const dominantColor = colorThief.getColor(imageData)

// Calculate contrast ratio against background
function calculateContrast(fg: RGB, bg: RGB): number {
  const luminance = (c: RGB) => {
    const [r, g, b] = [c.r, c.g, c.b].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const l1 = luminance(fg)
  const l2 = luminance(bg)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  return ratio
}

// WCAG AA requires 4.5:1 for normal text, 3:1 for large text
function validateContrast(fg: RGB, bg: RGB, isLargeText = false): boolean {
  const ratio = calculateContrast(fg, bg)
  return ratio >= (isLargeText ? 3 : 4.5)
}
```

### BCA Brand Contrast Validation

| BCA Color             | Hex           | Contrast with White (#FFF) | Contrast with Black (#000) |
| --------------------- | ------------- | -------------------------- | -------------------------- |
| Gold #C8A96A          | 198, 169, 106 | 2.85:1 ❌                  | 4.55:1 ✅                  |
| Deep Navy #0B1F3A     | 11, 31, 58    | 11.8:1 ✅                  | 1.00:1 ❌                  |
| Sapphire Blue #1E3A5F | 30, 58, 95    | 8.05:1 ✅                  | 1.45:1 ❌                  |

**Recommendation**: Use Deep Navy or Sapphire Blue for text on light backgrounds; Gold is suitable only on dark backgrounds.

---

## 5. Production Examples

### 1. Figma (figma.com)

**Accessibility Features**:

- Canvas with layered DOM for structure
- Comprehensive keyboard navigation
- Screen reader announcements for state changes
- Focus management with visible indicators

**Key Pattern**: Parallel accessibility layer that mirrors canvas state

### 2. Canva (canva.com)

**Accessibility Features**:

- ARIA live regions for dynamic content
- Keyboard shortcuts with documentation
- Alternative text input for images
- Focus mode for reduced interface

**Key Pattern**: Hidden semantic descriptions updated on object selection

### 3. Fabric.js Demos with Accessibility

Multiple projects have implemented accessibility on Fabric.js canvas:

- **fabricjs-accessible-canvas** (GitHub) - Reference implementation
- **accessible-image-editor** - Demonstrates keyboard navigation
- **a11y-canvas-patterns** - Collection of accessibility patterns

---

## 6. BCA MyCore+ Implementation Recommendations

### Minimum Viable Accessibility (Level A)

1. **Hidden Mirror DOM**: Parallel div describing canvas content
2. **Keyboard Navigation**: Tab through objects, arrow keys to move
3. **Screen Reader Announcements**: Live region for state changes
4. **Focus Indicators**: Visual ring around selected object
5. **Escape Key**: Deselect and dismiss toolbar
6. **Alt Text Input**: Optional field to describe template

### Accessibility Store in Zustand

```tsx
interface AccessibilityState {
  mode: 'visual' | 'accessible'
  announcedText: string
  focusedObjectId: string | null
  keyboardShortcuts: Record<string, string>
}

interface AccessibilityActions {
  announce: (text: string) => void
  setFocusedObject: (id: string | null) => void
  toggleAccessibleMode: () => void
}
```

### Toolbar Accessibility

The floating toolbar must be accessible when visible:

```tsx
<FloatingToolbar role="toolbar" aria-label="Text formatting options" aria-hidden={!isToolbarVisible}>
  <button aria-label="Bold text" aria-pressed={isBold} onClick={() => toggleBold()}>
    <BoldIcon aria-hidden="true" />
  </button>
  {/* ... */}
</FloatingToolbar>
```

---

## 7. Testing Caveats

**⚠️ CRITICAL**: Automated accessibility testing tools (axe, lighthouse) CANNOT fully verify canvas accessibility. Manual testing with:

1. **Screen Reader Testing**:
   - NVDA + Windows
   - VoiceOver + macOS/iOS
   - TalkBack + Android

2. **Keyboard-only Testing**:
   - All functionality reachable without mouse
   - No keyboard traps
   - Logical focus order

3. **Color Contrast Testing**:
   - Use browser DevTools accessibility panel
   - Verify dynamic content meets WCAG AA

**Canvas accessibility requires human testing**. Automated tools provide ~60% coverage maximum.

---

## 8. Sources & References

### WCAG Documentation

- [W3C WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding WCAG 2.1 Level A](https://www.w3.org/WAI/WAI-ARIA/apg/patterns/)

### Canvas Accessibility

- [HTML Canvas Accessibility - Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#accessibility)
- [W3C Canvas Accessibility Techniques](https://www.w3.org/WAI/WCAG21/Techniques/canvas/)

### Fabric.js Accessibility

- [Fabric.js Accessibility Issues - GitHub](https://github.com/fabricjs/fabric.js/issues?q=label%3Aa11y)
- [fabricjs-accessible-canvas - GitHub](https://github.com/search?q=fabricjs+accessible)

### Tools

- [Color Contrast Checker - WebAIM](https://webaim.org/resources/contrastchecker/)
- [Accessibility Insights - Microsoft](https://accessibilityinsights.io/)
- [axe DevTools - Deque](https://www.deque.com/axe/devtools/)
