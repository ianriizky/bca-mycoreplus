# API Reference

## Stores

### Canvas Store

**Location**: `src/stores/canvasStore.ts`

Access canvas state and actions.

#### useCanvasStore()

```typescript
const { fabricCanvas, objects, selectedObjectId, setFabricCanvas, addObject, updateObject, deleteObject, selectObject, clearCanvas } = useCanvasStore()
```

#### Methods

##### setFabricCanvas(canvas: Canvas): void

Set the Fabric.js canvas instance.

```typescript
import { Canvas } from 'fabric'
import { useCanvasStore } from '@/stores/canvasStore'

const { setFabricCanvas } = useCanvasStore()

const canvas = new Canvas('canvas-element', {
  width: 1080,
  height: 1920,
})
setFabricCanvas(canvas)
```

##### addObject(type: string, props?: any): string

Add object to canvas and return object ID.

```typescript
const { addObject } = useCanvasStore()

// Add text object
const textId = addObject('text', {
  text: 'Hello World',
  fontSize: 24,
  fill: '#000000',
})

// Add image object
const imageId = addObject('image', {
  src: 'image-url',
  left: 100,
  top: 100,
})

// Add rectangle
const rectId = addObject('rect', {
  width: 200,
  height: 100,
  fill: '#FF0000',
})
```

**Supported Types**:

- `text` - Text object
- `image` - Image object
- `rect` - Rectangle shape
- `circle` - Circle shape
- `line` - Line shape

**Returns**: Object ID (string)

##### updateObject(id: string, props: any): void

Update object properties.

```typescript
const { updateObject } = useCanvasStore()

updateObject(textId, {
  text: 'Updated text',
  fontSize: 32,
  fill: '#FF0000',
})

updateObject(imageId, {
  left: 200,
  top: 200,
  scaleX: 1.5,
  scaleY: 1.5,
})
```

**Common Properties**:

- `text` - Text content (text objects)
- `fontSize` - Font size in pixels
- `fill` - Fill color (hex or rgb)
- `stroke` - Stroke color
- `left` - X position
- `top` - Y position
- `scaleX` - Horizontal scale
- `scaleY` - Vertical scale
- `angle` - Rotation angle in degrees

##### deleteObject(id: string): void

Remove object from canvas.

```typescript
const { deleteObject } = useCanvasStore()

deleteObject(textId)
```

##### selectObject(id: string | null): void

Select or deselect object.

```typescript
const { selectObject } = useCanvasStore()

// Select object
selectObject(textId)

// Deselect
selectObject(null)
```

##### clearCanvas(): void

Clear all objects from canvas.

```typescript
const { clearCanvas } = useCanvasStore()

clearCanvas()
```

---

### History Store

**Location**: `src/stores/historyStore.ts`

Access undo/redo state and actions.

#### useHistoryStore()

```typescript
const { undoStack, redoStack, pushHistory, undo, redo, canUndo, canRedo, clearHistory } = useHistoryStore()
```

#### Methods

##### pushHistory(state: CanvasState): void

Add state to undo stack and clear redo stack.

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

// Make changes...
addObject('text', { text: 'New text' })
```

##### undo(): CanvasState | null

Revert to previous state.

```typescript
const { undo } = useHistoryStore()

const previousState = undo()
if (previousState) {
  // Apply previous state to canvas
}
```

**Returns**: Previous canvas state or null if undo stack empty

##### redo(): CanvasState | null

Move to next state.

```typescript
const { redo } = useHistoryStore()

const nextState = redo()
if (nextState) {
  // Apply next state to canvas
}
```

**Returns**: Next canvas state or null if redo stack empty

##### canUndo(): boolean

Check if undo available.

```typescript
const { canUndo } = useHistoryStore()

if (canUndo()) {
  // Show undo button
}
```

##### canRedo(): boolean

Check if redo available.

```typescript
const { canRedo } = useHistoryStore()

if (canRedo()) {
  // Show redo button
}
```

##### clearHistory(): void

Clear all undo/redo history.

```typescript
const { clearHistory } = useHistoryStore()

clearHistory()
```

---

### Toast Store

**Location**: `src/stores/toastStore.ts`

Access notification state and actions.

#### useToastStore()

```typescript
const { toasts, showToast, removeToast, clearToasts } = useToastStore()
```

#### Methods

##### showToast(message: string, type: string, duration?: number): void

Show notification toast.

```typescript
import { useToastStore } from '@/stores/toastStore'

const { showToast } = useToastStore()

// Success toast (auto-dismiss after 3 seconds)
showToast('Copied to clipboard!', 'success')

// Error toast (auto-dismiss after 5 seconds)
showToast('Failed to copy', 'error')

// Custom duration
showToast('Processing...', 'info', 10000) // 10 seconds
```

**Toast Types**:

- `success` - Success message (3s default)
- `error` - Error message (5s default)
- `info` - Information message (3s default)
- `warning` - Warning message (4s default)

**Parameters**:

- `message` - Toast message text
- `type` - Toast type (success, error, info, warning)
- `duration` - Auto-dismiss duration in milliseconds (optional)

##### removeToast(id: string): void

Remove specific toast.

```typescript
const { removeToast } = useToastStore()

removeToast(toastId)
```

##### clearToasts(): void

Clear all toasts.

```typescript
const { clearToasts } = useToastStore()

clearToasts()
```

---

## Utilities

### Clipboard

**Location**: `src/lib/clipboard.ts`

#### copyCanvasToClipboard(canvas: Canvas): Promise<void>

Copy canvas to system clipboard.

```typescript
import { copyCanvasToClipboard } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvasStore'
import { useToastStore } from '@/stores/toastStore'

const { fabricCanvas } = useCanvasStore()
const { showToast } = useToastStore()

try {
  await copyCanvasToClipboard(fabricCanvas)
  showToast('Copied to clipboard!', 'success')
} catch (error) {
  showToast('Copy failed', 'error')
}
```

**Error Handling**:

- Throws error if clipboard API not supported
- Throws error if canvas is null
- Throws error if copy operation fails

**Browser Support**:

- Chrome 63+
- Firefox 53+
- Safari 13.1+
- Edge 79+

---

### Contrast

**Location**: `src/lib/contrast.ts`

#### getContrastRatio(color1: string, color2: string): number

Calculate contrast ratio between two colors (WCAG standard).

```typescript
import { getContrastRatio, meetsWCAGAA, meetsWCAGAAA } from '@/lib/contrast'

const ratio = getContrastRatio('#C8A96A', '#FFFFFF')
console.log(ratio) // e.g., 4.5

if (meetsWCAGAA(ratio)) {
  console.log('Meets WCAG AA standard (4.5:1)')
}

if (meetsWCAGAAA(ratio)) {
  console.log('Meets WCAG AAA standard (7:1)')
}
```

**Parameters**:

- `color1` - First color (hex, rgb, or named color)
- `color2` - Second color (hex, rgb, or named color)

**Returns**: Contrast ratio as number (1-21)

**WCAG Standards**:

- AA: 4.5:1 (normal text), 3:1 (large text)
- AAA: 7:1 (normal text), 4.5:1 (large text)

#### meetsWCAGAA(ratio: number): boolean

Check if contrast ratio meets WCAG AA standard.

```typescript
const ratio = getContrastRatio('#000000', '#FFFFFF')
if (meetsWCAGAA(ratio)) {
  // Color combination is accessible
}
```

#### meetsWCAGAAA(ratio: number): boolean

Check if contrast ratio meets WCAG AAA standard.

```typescript
const ratio = getContrastRatio('#000000', '#FFFFFF')
if (meetsWCAGAAA(ratio)) {
  // Color combination is highly accessible
}
```

---

### Accessibility

**Location**: `src/lib/accessibility.ts`

#### getAriaLabel(type: string, props: any): string

Generate ARIA label for object.

```typescript
import { getAriaLabel } from '@/lib/accessibility'

const label = getAriaLabel('text', { text: 'Hello World' })
// Returns: "Text object: Hello World"
```

#### announceToScreenReader(message: string): void

Announce message to screen readers.

```typescript
import { announceToScreenReader } from '@/lib/accessibility'

announceToScreenReader('Text object added to canvas')
```

---

### Canvas Utilities

**Location**: `src/lib/canvas/`

#### serializeObject(object: FabricObject): SerializedObject

Serialize Fabric.js object to JSON.

```typescript
import { serializeObject } from '@/lib/canvas/serialization'

const serialized = serializeObject(fabricObject)
```

#### deserializeObject(data: SerializedObject): Promise<FabricObject>

Deserialize JSON to Fabric.js object.

```typescript
import { deserializeObject } from '@/lib/canvas/serialization'

const object = await deserializeObject(serializedData)
```

#### getObjectBounds(object: FabricObject): Bounds

Get object bounding box.

```typescript
import { getObjectBounds } from '@/lib/canvas/bounds'

const bounds = getObjectBounds(fabricObject)
// Returns: { left, top, width, height }
```

---

## Hooks

### useCopyShortcut()

**Location**: `src/components/CanvasEditor/hooks/useCopyShortcut.ts`

Handle Ctrl+C / Cmd+C keyboard shortcut for copying canvas.

```typescript
import { useCopyShortcut } from '@/components/CanvasEditor/hooks/useCopyShortcut'

export function EditorPage() {
  useCopyShortcut()
  return <CanvasEditor />
}
```

### useUndoRedo()

**Location**: `src/components/CanvasEditor/hooks/useUndoRedo.ts`

Handle Ctrl+Z / Ctrl+Y keyboard shortcuts for undo/redo.

```typescript
import { useUndoRedo } from '@/components/CanvasEditor/hooks/useUndoRedo'

export function EditorPage() {
  useUndoRedo()
  return <CanvasEditor />
}
```

### useCanvasResize()

**Location**: `src/components/CanvasEditor/hooks/useCanvasResize.ts`

Handle canvas resizing on window resize.

```typescript
import { useCanvasResize } from '@/components/CanvasEditor/hooks/useCanvasResize'

export function EditorPage() {
  useCanvasResize()
  return <CanvasEditor />
}
```

---

## Type Definitions

### CanvasState

```typescript
interface CanvasState {
  version: string
  objects: SerializedObject[]
  background?: string
}
```

### SerializedObject

```typescript
interface SerializedObject {
  type: 'text' | 'image' | 'rect' | 'circle' | 'line'
  id: string
  left: number
  top: number
  width: number
  height: number
  angle: number
  fill?: string
  stroke?: string
  text?: string
  fontSize?: number
  src?: string
  [key: string]: any
}
```

### Toast

```typescript
interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}
```

### Bounds

```typescript
interface Bounds {
  left: number
  top: number
  width: number
  height: number
}
```

---

## Error Handling

### Common Errors

#### Canvas Not Initialized

```typescript
const { fabricCanvas } = useCanvasStore()

if (!fabricCanvas) {
  throw new Error('Canvas not initialized')
}
```

#### Clipboard API Not Supported

```typescript
try {
  await copyCanvasToClipboard(fabricCanvas)
} catch (error) {
  // Fallback to download
  downloadCanvas(fabricCanvas)
}
```

#### Invalid Color Format

```typescript
try {
  const ratio = getContrastRatio('#INVALID', '#FFFFFF')
} catch (error) {
  console.error('Invalid color format:', error)
}
```

---

## Performance Considerations

### Memoization

Use `React.memo` for components that don't need frequent updates:

```typescript
export const MyComponent = React.memo(({ prop }) => {
  return <div>{prop}</div>
})
```

### Debouncing

Debounce expensive operations:

```typescript
import { debounce } from 'lodash-es'

const debouncedUpdate = debounce((id, props) => {
  updateObject(id, props)
}, 300)
```

### Lazy Loading

Lazy load heavy components:

```typescript
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
