# Accessibility Implementation

## WCAG 2.1 Level A Compliance

BCA MyCore+ is designed to meet WCAG 2.1 Level A accessibility standards.

### Compliance Checklist

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Semantic HTML
- ✅ Text alternatives
- ✅ Resizable text

## Keyboard Navigation

### Keyboard Shortcuts

| Shortcut           | Action                       |
| ------------------ | ---------------------------- |
| `Tab`              | Navigate to next element     |
| `Shift+Tab`        | Navigate to previous element |
| `Enter`            | Activate button/link         |
| `Space`            | Activate button/checkbox     |
| `Escape`           | Close modal/dialog           |
| `Ctrl+Z` / `Cmd+Z` | Undo                         |
| `Ctrl+Y` / `Cmd+Y` | Redo                         |
| `Ctrl+C` / `Cmd+C` | Copy to clipboard            |
| `Delete`           | Delete selected object       |
| `Arrow Keys`       | Navigate canvas objects      |

### Implementation

```typescript
// Handle keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault()
      undo()
    }

    // Redo
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault()
      redo()
    }

    // Delete
    if (e.key === 'Delete') {
      e.preventDefault()
      deleteSelectedObject()
    }

    // Copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault()
      copyCanvasToClipboard(fabricCanvas)
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### Tab Order

```tsx
// Ensure logical tab order
<div>
  <button tabIndex={0}>First button</button>
  <button tabIndex={1}>Second button</button>
  <button tabIndex={2}>Third button</button>
</div>

// Or use natural DOM order (recommended)
<div>
  <button>First button</button>
  <button>Second button</button>
  <button>Third button</button>
</div>
```

### Focus Management

```typescript
// Move focus to important element
const focusElement = (element: HTMLElement) => {
  element.focus()
  // Announce to screen readers
  announceToScreenReader(`Focused on ${element.textContent}`)
}

// Restore focus after closing modal
const previouslyFocused = document.activeElement as HTMLElement
// ... show modal ...
// ... close modal ...
previouslyFocused.focus()
```

## Screen Reader Support

### Semantic HTML

```tsx
// ✅ Good: Semantic HTML
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/editor">Editor</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <p>Content here</p>
  </article>
</main>

<footer>
  <p>Footer content</p>
</footer>

// ❌ Bad: Non-semantic HTML
<div class="header">
  <div class="nav">
    <div class="nav-item"><span>Home</span></div>
    <div class="nav-item"><span>Editor</span></div>
  </div>
</div>
```

### ARIA Labels

```tsx
// Label interactive elements
<button aria-label="Delete selected object">
  <TrashIcon />
</button>

<input
  type="text"
  placeholder="Search"
  aria-label="Search for templates"
/>

<div role="region" aria-label="Canvas editor">
  {/* Canvas content */}
</div>
```

### ARIA Roles

```tsx
// Use appropriate roles
<div role="toolbar" aria-label="Text formatting">
  <button aria-pressed={isBold} onClick={toggleBold}>
    Bold
  </button>
  <button aria-pressed={isItalic} onClick={toggleItalic}>
    Italic
  </button>
</div>

<div role="status" aria-live="polite">
  {statusMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Live Regions

```tsx
// Announce dynamic content
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// For important alerts
<div role="alert" aria-live="assertive" aria-atomic="true">
  {alertMessage}
</div>
```

### Announce to Screen Readers

```typescript
// Programmatically announce messages
const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', 'polite')
  announcement.textContent = message
  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Usage
announceToScreenReader('Text object added to canvas')
```

## Color Contrast

### WCAG Contrast Ratios

| Level | Normal Text | Large Text |
| ----- | ----------- | ---------- |
| AA    | 4.5:1       | 3:1        |
| AAA   | 7:1         | 4.5:1      |

### Contrast Calculation

```typescript
import { getContrastRatio, meetsWCAGAA, meetsWCAGAAA } from '@/lib/contrast'

// Calculate contrast ratio
const ratio = getContrastRatio('#C8A96A', '#FFFFFF')

// Check WCAG compliance
if (meetsWCAGAA(ratio)) {
  console.log('Meets WCAG AA standard')
}

if (meetsWCAGAAA(ratio)) {
  console.log('Meets WCAG AAA standard')
}
```

### Implementation

```typescript
// Validate color contrast before applying
const setTextColor = (color: string) => {
  const ratio = getContrastRatio(color, backgroundColor)

  if (!meetsWCAGAA(ratio)) {
    showToast('Low contrast ratio, text may be hard to read', 'warning')
  }

  updateObject(selectedObjectId, { fill: color })
}
```

### Color Not Sole Indicator

```tsx
// ✅ Good: Use color + icon/text
<button className="bg-red-500 text-white">
  <TrashIcon /> Delete
</button>

// ❌ Bad: Color only
<button className="bg-red-500" title="Delete">
  {/* No visual indicator besides color */}
</button>
```

## Focus Indicators

### Visible Focus

```css
/* Ensure visible focus indicators */
button:focus,
input:focus,
a:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Don't remove outline */
/* ❌ Bad */
button:focus {
  outline: none;
}
```

### Tailwind CSS Focus

```tsx
// Use Tailwind focus utilities
<button className="focus:outline-2 focus:outline-offset-2 focus:outline-blue-500">Click me</button>
```

## Text Alternatives

### Image Alt Text

```tsx
// Provide meaningful alt text
<img
  src="template-preview.jpg"
  alt="Template preview showing text and image layout"
/>

// For decorative images
<img src="divider.svg" alt="" aria-hidden="true" />
```

### Canvas Accessibility

```tsx
// Provide text alternative for canvas
<canvas id="canvas" width="1080" height="1920">
  <p>Your browser does not support the canvas element. Please use a modern browser to use this application.</p>
</canvas>
```

## Resizable Text

```tsx
// Support text resizing
<div className="text-base md:text-lg lg:text-xl">Content that scales with user preferences</div>

// Allow user to zoom
// Don't disable zoom
// ❌ Bad
// <meta name="viewport" content="width=device-width, user-scalable=no">

// ✅ Good
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Motion & Animation

### Respect Prefers Reduced Motion

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Implementation

```typescript
// Check user preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Disable animations if needed
if (prefersReducedMotion) {
  // Use instant transitions instead of animations
}
```

## Error Messages

### Clear Error Messages

```tsx
// ✅ Good: Clear, actionable error
<div role="alert">
  <strong>Error:</strong> Image must be smaller than 10MB. Your file is 15MB.
  Please choose a smaller image.
</div>

// ❌ Bad: Vague error
<div role="alert">
  Error: Invalid file
</div>
```

### Error Recovery

```typescript
// Help users fix errors
try {
  await copyCanvasToClipboard(fabricCanvas)
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('Clipboard')) {
      showToast('Clipboard not available. Use the Download button instead.', 'error')
    } else {
      showToast('An unexpected error occurred. Please try again.', 'error')
    }
  }
}
```

## Form Accessibility

### Labels

```tsx
// Always associate labels with inputs
<label htmlFor="text-input">Text content:</label>
<input id="text-input" type="text" />

// ❌ Bad: No label
<input type="text" placeholder="Text content" />
```

### Error Messages

```tsx
// Link error messages to inputs
<label htmlFor="font-size">Font size:</label>
<input
  id="font-size"
  type="number"
  min="8"
  max="72"
  aria-describedby="font-size-error"
/>
<div id="font-size-error" role="alert">
  Font size must be between 8 and 72
</div>
```

## Testing Accessibility

### Automated Testing

```bash
# Run accessibility tests
npm run test:a11y

# Check with axe DevTools
# Install axe DevTools browser extension
```

### Manual Testing

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify logical tab order
   - Test all keyboard shortcuts

2. **Screen Reader Testing**:
   - Use NVDA (Windows) or JAWS
   - Use VoiceOver (macOS)
   - Verify all content is announced

3. **Color Contrast**:
   - Use WebAIM Contrast Checker
   - Check all text combinations
   - Verify 4.5:1 ratio minimum

4. **Focus Indicators**:
   - Verify focus is visible
   - Check outline is not removed
   - Test with keyboard navigation

5. **Zoom Testing**:
   - Zoom to 200%
   - Verify layout doesn't break
   - Check text is readable

## Accessibility Tools

### Browser Extensions

- **axe DevTools** - Automated accessibility testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Built-in Chrome DevTools
- **Color Contrast Analyzer** - Check contrast ratios

### Testing Tools

- **NVDA** - Free screen reader (Windows)
- **JAWS** - Commercial screen reader
- **VoiceOver** - Built-in macOS screen reader
- **WebAIM Contrast Checker** - Online contrast tool

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Accessibility Checklist

### Development

- [ ] Semantic HTML used
- [ ] ARIA labels added
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast adequate
- [ ] Error messages clear
- [ ] Alt text provided

### Testing

- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Zoom to 200% tested
- [ ] Focus indicators checked
- [ ] Automated tests pass

### Deployment

- [ ] Lighthouse audit passed
- [ ] axe DevTools passed
- [ ] Manual testing completed
- [ ] Accessibility statement added
- [ ] Contact info for issues

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
