# Component Documentation

## CanvasEditor

### Purpose

Main canvas component managing Fabric.js integration and object manipulation. Handles canvas initialization, object events, and synchronization with Zustand store.

### Location

`src/components/CanvasEditor/index.tsx`

### Props

None (uses Zustand store for state)

### State

- `fabricCanvas`: Fabric.js Canvas instance
- `selectedObject`: Currently selected object
- `isLoading`: Loading state during initialization

### Usage

```tsx
import { CanvasEditor } from '@/components/CanvasEditor'

export function EditorPage() {
  return (
    <div className="flex-1">
      <CanvasEditor />
    </div>
  )
}
```

### Features

- Canvas size: 1080×1920px (Instagram story format)
- Object selection with visual feedback
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Delete)
- Touch support for mobile devices
- Responsive canvas scaling
- Event delegation for object manipulation

### Accessibility

- `role="region"` with `aria-label="Canvas editor"`
- Keyboard navigation support
- Focus indicators on selected objects
- Screen reader announcements for actions
- High contrast mode support

### Known Limitations

- Canvas size fixed at 1080×1920px
- No multi-object selection
- No grouping support
- Maximum 100 objects recommended
- No layer management UI

### Dependencies

- Fabric.js for canvas rendering
- Zustand for state management
- React hooks for lifecycle

---

## FloatingToolbar

### Purpose

Context-sensitive formatting toolbar appearing when object selected. Provides text formatting, color changes, and object deletion.

### Location

`src/components/FloatingToolbar/index.tsx`

### Props

None (uses Zustand store for state)

### State

- `isVisible`: Toolbar visibility based on selection
- `toolbarPosition`: Position relative to selected object
- `selectedObject`: Currently selected object data

### Usage

```tsx
import { FloatingToolbar } from '@/components/FloatingToolbar'

export function EditorPage() {
  return (
    <>
      <CanvasEditor />
      <FloatingToolbar />
    </>
  )
}
```

### Features

- Auto-positioning to avoid viewport overflow
- Text formatting buttons (bold, italic, underline)
- Color picker integration
- Font size adjustment
- Text alignment options
- Delete button for object removal
- Keyboard shortcuts for all actions

### Accessibility

- `role="toolbar"`
- ARIA labels on all buttons
- Keyboard accessible (Tab, Enter, Space)
- Focus management
- Tooltip support for button descriptions

### Known Limitations

- Only appears for text objects
- No multi-object formatting
- Limited to text properties
- Fixed button layout (no customization)

### Dependencies

- Zustand for state management
- Lucide React for icons
- Tailwind CSS for styling

---

## ColorPalette

### Purpose

Extract and display color palette from uploaded images. Handles color selection, contrast validation, and color history.

### Location

`src/components/ColorPalette/index.tsx`

### Props

None (uses Zustand store for state)

### State

- `palette`: Extracted colors array
- `isLoading`: Loading state during extraction
- `selectedColor`: Currently selected color
- `colorHistory`: Previously used colors

### Usage

```tsx
import { ColorPalette } from '@/components/ColorPalette'

export function EditorPage() {
  return <ColorPalette />
}
```

### Features

- Automatic color extraction from images using ColorThief
- Display extracted color palette (5-10 colors)
- Contrast ratio display for WCAG compliance
- Color history tracking (last 10 colors)
- Color preview before selection
- Accessibility validation

### Accessibility

- Color names announced by screen readers
- Contrast ratio information
- Keyboard navigation through colors
- Focus indicators on color swatches
- WCAG AA/AAA compliance indicators

### Known Limitations

- Requires image upload for extraction
- Limited to 10 colors in palette
- No custom color input
- No color mixing/blending
- ColorThief accuracy depends on image quality

### Dependencies

- ColorThief.js for color extraction
- Zustand for state management
- Contrast utility for WCAG validation

---

## TemplateLibrary

### Purpose

Template management and selection. Allows users to choose predefined templates and apply them to canvas.

### Location

`src/components/TemplateLibrary/index.tsx`

### Props

None (uses Zustand store for state)

### State

- `templates`: Available templates array
- `selectedTemplate`: Currently selected template
- `isLoading`: Loading state

### Usage

```tsx
import { TemplateLibrary } from '@/components/TemplateLibrary'

export function EditorPage() {
  return <TemplateLibrary />
}
```

### Features

- Display available templates
- Template preview thumbnails
- One-click template application
- Template customization options
- Template categories/filtering
- Favorite templates

### Accessibility

- Template descriptions for screen readers
- Keyboard navigation through templates
- Focus indicators on template cards
- ARIA labels for buttons
- Keyboard shortcuts for selection

### Known Limitations

- Limited template library (10-20 templates)
- No custom template creation
- No template sharing
- Templates fixed to canvas size

### Dependencies

- Zustand for state management
- Canvas store for applying templates

---

## ExportToolbar

### Purpose

Canvas export and sharing. Handles copying to clipboard, downloading, and sharing options.

### Location

`src/components/ExportToolbar/index.tsx`

### Props

None (uses Zustand store for state)

### State

- `isExporting`: Export in progress
- `clipboardSupported`: Clipboard API available
- `exportFormat`: Selected export format

### Usage

```tsx
import { ExportToolbar } from '@/components/ExportToolbar'

export function EditorPage() {
  return <ExportToolbar />
}
```

### Features

- One-click copy to clipboard
- Fallback download option
- Success/error notifications
- Browser compatibility detection
- Export format selection (PNG, JPG)
- Quality settings
- Filename customization

### Accessibility

- ARIA labels on all buttons
- Keyboard shortcuts (Ctrl+C)
- Toast announcements
- Status messages
- Error descriptions

### Known Limitations

- Clipboard API not supported in all browsers
- Export quality depends on canvas size
- No batch export
- No scheduled exports

### Dependencies

- Clipboard API
- Zustand for state management
- Toast store for notifications

---

## CanvasEditorLazy

### Purpose

Lazy-loaded wrapper for CanvasEditor component. Improves initial page load performance.

### Location

`src/components/CanvasEditorLazy/index.tsx`

### Props

None

### Usage

```tsx
import { CanvasEditorLazy } from '@/components/CanvasEditorLazy'

export function EditorPage() {
  return <CanvasEditorLazy />
}
```

### Features

- Lazy loading with React.lazy()
- Suspense boundary with fallback
- Skeleton loading state
- Error boundary handling

---

## CanvasEditorSkeleton

### Purpose

Loading skeleton for CanvasEditor. Displays placeholder while component loads.

### Location

`src/components/CanvasEditorSkeleton/index.tsx`

### Props

None

### Usage

```tsx
import { CanvasEditorSkeleton } from '@/components/CanvasEditorSkeleton'

export function EditorPage() {
  return (
    <Suspense fallback={<CanvasEditorSkeleton />}>
      <CanvasEditorLazy />
    </Suspense>
  )
}
```

### Features

- Animated skeleton placeholder
- Matches CanvasEditor layout
- Accessible loading indicator
- Smooth transition to loaded state

---

## Toast Container

### Purpose

Display notification toasts for user feedback.

### Location

`src/components/Toast/Container.tsx`

### Props

None (uses Zustand store for state)

### State

- `toasts`: Array of active toasts

### Usage

```tsx
// Automatically rendered in root layout
// Use from anywhere:
import { useToastStore } from '@/stores/toastStore'

const { showToast } = useToastStore()

showToast('Action completed!', 'success')
```

### Features

- Auto-dismiss after duration
- Multiple toasts stacking
- Success, error, info, warning types
- Smooth animations
- Close button on each toast

### Accessibility

- `role="status"` for live regions
- ARIA labels for toast type
- Keyboard dismissible
- Screen reader announcements

---

## Component Best Practices

### Creating New Components

1. **Location**: Create in `src/components/ComponentName/index.tsx`
2. **Types**: Define props interface in same file
3. **Styling**: Use Tailwind CSS classes
4. **State**: Use Zustand stores for shared state
5. **Accessibility**: Include ARIA labels and semantic HTML
6. **Testing**: Create corresponding test file in `tests/`

### Component Template

```tsx
import { FC } from 'react'

interface ComponentNameProps {
  // Props here
}

export const ComponentName: FC<ComponentNameProps> = (
  {
    // Props destructuring
  },
) => {
  // Component logic

  return <div>{/* JSX */}</div>
}
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Avoid inline styles
- Use CSS modules for complex styles
- Follow mobile-first approach
- Test responsive behavior

### Performance Guidelines

- Memoize components with React.memo if needed
- Use useCallback for event handlers
- Lazy load heavy components
- Avoid unnecessary re-renders
- Profile with React DevTools

### Testing Guidelines

- Write unit tests for logic
- Write integration tests for interactions
- Test accessibility features
- Test keyboard navigation
- Test error states

---

## Component Hierarchy

```
App
├── Router
│   ├── Home Page
│   ├── Editor Page
│   │   ├── CanvasEditor
│   │   ├── FloatingToolbar
│   │   ├── ColorPalette
│   │   ├── TemplateLibrary
│   │   └── ExportToolbar
│   ├── Help Page
│   └── About Page
└── Toast Container
```

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
