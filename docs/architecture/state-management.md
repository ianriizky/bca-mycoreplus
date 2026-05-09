# State Management Patterns

## Overview

BCA MyCore+ uses Zustand for state management. Zustand provides a lightweight, flexible approach to managing application state without boilerplate.

## Store Architecture

### Three Core Stores

```
┌─────────────────────────────────────────┐
│         Application State                │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────────┐ │
│  │      Canvas Store                  │ │
│  │  - fabricCanvas instance           │ │
│  │  - objects array                   │ │
│  │  - selectedObjectId                │ │
│  │  - object manipulation actions     │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │      History Store                 │ │
│  │  - undoStack                       │ │
│  │  - redoStack                       │ │
│  │  - undo/redo actions               │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │      Toast Store                   │ │
│  │  - toasts array                    │ │
│  │  - notification actions            │ │
│  └────────────────────────────────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

## Canvas Store

**Location**: `src/stores/canvasStore.ts`

Manages canvas state and object manipulation.

### State

```typescript
interface CanvasStore {
  // State
  fabricCanvas: Canvas | null
  objects: SerializedObject[]
  selectedObjectId: string | null

  // Actions
  setFabricCanvas: (canvas: Canvas) => void
  addObject: (type: string, props?: any) => string
  updateObject: (id: string, props: any) => void
  deleteObject: (id: string) => void
  selectObject: (id: string | null) => void
  clearCanvas: () => void
}
```

### Usage Examples

#### Initialize Canvas

```typescript
import { Canvas } from 'fabric'
import { useCanvasStore } from '@/stores/canvasStore'

export function CanvasEditor() {
  const { setFabricCanvas } = useCanvasStore()

  useEffect(() => {
    const canvas = new Canvas('canvas-element', {
      width: 1080,
      height: 1920,
    })
    setFabricCanvas(canvas)
  }, [setFabricCanvas])

  return <canvas id="canvas-element" />
}
```

#### Add Object

```typescript
const { addObject } = useCanvasStore()

// Add text
const textId = addObject('text', {
  text: 'Hello World',
  fontSize: 24,
  fill: '#000000',
})

// Add image
const imageId = addObject('image', {
  src: 'image-url',
  left: 100,
  top: 100,
})
```

#### Update Object

```typescript
const { updateObject } = useCanvasStore()

updateObject(textId, {
  text: 'Updated text',
  fontSize: 32,
  fill: '#FF0000',
})
```

#### Select Object

```typescript
const { selectObject } = useCanvasStore()

// Select
selectObject(textId)

// Deselect
selectObject(null)
```

### Best Practices

1. **Always initialize canvas first**:

   ```typescript
   const { fabricCanvas } = useCanvasStore()
   if (!fabricCanvas) {
     console.error('Canvas not initialized')
     return
   }
   ```

2. **Save history before changes**:

   ```typescript
   const { pushHistory } = useHistoryStore()
   const { fabricCanvas } = useCanvasStore()

   pushHistory(fabricCanvas.toJSON())
   updateObject(id, props)
   ```

3. **Validate object properties**:
   ```typescript
   const validProps = {
     text: props.text || '',
     fontSize: Math.max(8, props.fontSize || 16),
     fill: props.fill || '#000000',
   }
   updateObject(id, validProps)
   ```

## History Store

**Location**: `src/stores/historyStore.ts`

Manages undo/redo functionality.

### State

```typescript
interface HistoryStore {
  // State
  undoStack: CanvasState[]
  redoStack: CanvasState[]

  // Actions
  pushHistory: (state: CanvasState) => void
  undo: () => CanvasState | null
  redo: () => CanvasState | null
  canUndo: () => boolean
  canRedo: () => boolean
  clearHistory: () => void
}
```

### Usage Examples

#### Save State

```typescript
import { useHistoryStore } from '@/stores/historyStore'
import { useCanvasStore } from '@/stores/canvasStore'

const { pushHistory } = useHistoryStore()
const { fabricCanvas } = useCanvasStore()

// Save current state before making changes
const currentState = fabricCanvas?.toJSON()
if (currentState) {
  pushHistory(currentState)
}

// Make changes
updateObject(id, props)
```

#### Undo/Redo

```typescript
const { undo, redo, canUndo, canRedo } = useHistoryStore()

// Undo
if (canUndo()) {
  const previousState = undo()
  // Apply previous state to canvas
}

// Redo
if (canRedo()) {
  const nextState = redo()
  // Apply next state to canvas
}
```

#### Check Availability

```typescript
const { canUndo, canRedo } = useHistoryStore()

return (
  <>
    <button disabled={!canUndo()}>Undo</button>
    <button disabled={!canRedo()}>Redo</button>
  </>
)
```

### Constraints

- **Maximum 10 states**: Undo stack limited to 10 items
- **Redo cleared on new action**: Making changes clears redo stack
- **State size**: Each state is full canvas JSON

### Best Practices

1. **Save history before destructive actions**:

   ```typescript
   pushHistory(fabricCanvas.toJSON())
   deleteObject(id)
   ```

2. **Debounce frequent updates**:

   ```typescript
   const debouncedSaveHistory = debounce(() => {
     pushHistory(fabricCanvas.toJSON())
   }, 500)
   ```

3. **Clear history when appropriate**:

   ```typescript
   const { clearHistory } = useHistoryStore()

   // Clear when starting new project
   clearHistory()
   clearCanvas()
   ```

## Toast Store

**Location**: `src/stores/toastStore.ts`

Manages notification toasts.

### State

```typescript
interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastStore {
  // State
  toasts: Toast[]

  // Actions
  showToast: (message: string, type: string, duration?: number) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}
```

### Usage Examples

#### Show Toast

```typescript
import { useToastStore } from '@/stores/toastStore'

const { showToast } = useToastStore()

// Success (auto-dismiss after 3s)
showToast('Copied to clipboard!', 'success')

// Error (auto-dismiss after 5s)
showToast('Failed to copy', 'error')

// Custom duration
showToast('Processing...', 'info', 10000)
```

#### Remove Toast

```typescript
const { removeToast } = useToastStore()

removeToast(toastId)
```

#### Clear All Toasts

```typescript
const { clearToasts } = useToastStore()

clearToasts()
```

### Toast Types

| Type      | Duration | Use Case                      |
| --------- | -------- | ----------------------------- |
| `success` | 3s       | Action completed successfully |
| `error`   | 5s       | Action failed                 |
| `info`    | 3s       | Informational message         |
| `warning` | 4s       | Warning message               |

### Best Practices

1. **Use appropriate toast type**:

   ```typescript
   // ✅ Good
   showToast('Copied to clipboard!', 'success')
   showToast('Failed to copy', 'error')

   // ❌ Bad
   showToast('Copied to clipboard!', 'info')
   showToast('Failed to copy', 'warning')
   ```

2. **Provide clear messages**:

   ```typescript
   // ✅ Good
   showToast('Image added to canvas', 'success')

   // ❌ Bad
   showToast('Done', 'success')
   ```

3. **Use custom duration for long messages**:
   ```typescript
   showToast('This is a longer message that needs more time to read', 'info', 5000)
   ```

## Store Subscriptions

### Selective Subscriptions

Zustand allows components to subscribe to specific parts of state:

```typescript
// Subscribe to entire store
const store = useCanvasStore()

// Subscribe to specific properties
const fabricCanvas = useCanvasStore((state) => state.fabricCanvas)
const selectedObjectId = useCanvasStore((state) => state.selectedObjectId)

// Subscribe to multiple properties
const { fabricCanvas, selectedObjectId } = useCanvasStore((state) => ({
  fabricCanvas: state.fabricCanvas,
  selectedObjectId: state.selectedObjectId,
}))
```

### Performance Optimization

```typescript
// ✅ Good: Only re-renders when selectedObjectId changes
const SelectedObjectInfo = () => {
  const selectedObjectId = useCanvasStore((state) => state.selectedObjectId)
  return <div>{selectedObjectId}</div>
}

// ❌ Bad: Re-renders when any store property changes
const SelectedObjectInfo = () => {
  const { selectedObjectId } = useCanvasStore()
  return <div>{selectedObjectId}</div>
}
```

## Middleware & Devtools

### Zustand Devtools

Enable in development:

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useCanvasStore = create<CanvasStore>()(
  devtools(
    (set) => ({
      // Store implementation
    }),
    { name: 'CanvasStore' },
  ),
)
```

### Custom Middleware

```typescript
import { create } from 'zustand'

const useStore = create<Store>()((set) => ({
  // Store implementation
}))

// Add custom logging
useStore.subscribe(
  (state) => state.selectedObjectId,
  (selectedObjectId) => {
    console.log('Selected object changed:', selectedObjectId)
  },
)
```

## Patterns & Best Practices

### 1. Separation of Concerns

Keep stores focused on single responsibility:

```typescript
// ✅ Good: Separate stores
const useCanvasStore = create(...) // Canvas state
const useHistoryStore = create(...) // History state
const useToastStore = create(...) // Notifications

// ❌ Bad: Mixed concerns
const useAppStore = create(...) // Everything in one store
```

### 2. Immutable Updates

Always create new objects/arrays:

```typescript
// ✅ Good: Create new array
set((state) => ({
  objects: [...state.objects, newObject],
}))

// ❌ Bad: Mutate existing array
set((state) => {
  state.objects.push(newObject)
  return { objects: state.objects }
})
```

### 3. Action Composition

Combine actions for complex operations:

```typescript
// ✅ Good: Composed action
const addAndSelect = (type: string, props?: any) => {
  const id = addObject(type, props)
  selectObject(id)
  return id
}

// Usage
const id = addAndSelect('text', { text: 'Hello' })
```

### 4. Error Handling

Handle errors gracefully:

```typescript
// ✅ Good: Error handling
try {
  await copyCanvasToClipboard(fabricCanvas)
  showToast('Copied to clipboard!', 'success')
} catch (error) {
  console.error('Copy failed:', error)
  showToast('Failed to copy', 'error')
}
```

### 5. State Validation

Validate state before updates:

```typescript
// ✅ Good: Validation
const updateObject = (id: string, props: any) => {
  if (!id) {
    console.error('Object ID is required')
    return
  }

  const validProps = {
    ...props,
    fontSize: Math.max(8, props.fontSize || 16),
  }

  set((state) => ({
    objects: state.objects.map((obj) => (obj.id === id ? { ...obj, ...validProps } : obj)),
  }))
}
```

## Testing Stores

### Unit Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useCanvasStore } from '@/stores/canvasStore'

describe('canvasStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCanvasStore.setState({
      fabricCanvas: null,
      objects: [],
      selectedObjectId: null,
    })
  })

  it('should add object', () => {
    const { addObject, objects } = useCanvasStore.getState()

    const id = addObject('text', { text: 'Hello' })

    expect(id).toBeDefined()
    expect(useCanvasStore.getState().objects).toHaveLength(1)
  })

  it('should update object', () => {
    const { addObject, updateObject } = useCanvasStore.getState()

    const id = addObject('text', { text: 'Hello' })
    updateObject(id, { text: 'World' })

    const object = useCanvasStore.getState().objects[0]
    expect(object.text).toBe('World')
  })
})
```

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Middleware](https://github.com/pmndrs/zustand/tree/main/docs)
- [State Management Patterns](https://redux.js.org/understanding/thinking-in-redux)

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
