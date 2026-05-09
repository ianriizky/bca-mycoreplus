# Architecture Documentation

## System Overview

BCA MyCore+ adalah Single Page Application (SPA) yang dibangun dengan React dan Vite. Aplikasi berjalan 100% di browser dengan tidak ada backend server.

### Design Principles

1. **Zero-Server** - Semua processing terjadi di client-side
2. **Performance** - Initial load < 2 seconds, TTI < 2 seconds
3. **Accessibility** - WCAG 2.1 Level A compliance
4. **Simplicity** - Minimal dependencies, clear code structure
5. **User-Centric** - Fokus pada user experience WhatsApp

## Technology Stack

| Komponen        | Technology      | Version | Alasan                              |
| --------------- | --------------- | ------- | ----------------------------------- |
| **Framework**   | React           | 19.2.5  | Latest, modern features, hooks      |
| **Build Tool**  | Vite            | 8.0.10  | Fast, ESM-native, excellent DX      |
| **Language**    | TypeScript      | 6.0.3   | Type safety, better IDE support     |
| **Canvas**      | Fabric.js       | 6.4.3   | Object manipulation, event handling |
| **State**       | Zustand         | 5.0.0   | Minimal bundle, simple API          |
| **Styling**     | Tailwind CSS    | 4.2.4   | Utility-first, responsive design    |
| **Routing**     | TanStack Router | Latest  | File-based routing, type-safe       |
| **Icons**       | Lucide React    | Latest  | Beautiful SVG icons, tree-shakeable |
| **Testing**     | Vitest          | Latest  | Fast, Vite-native testing           |
| **E2E Testing** | Playwright      | Latest  | Cross-browser testing               |

## Component Architecture

### Component Hierarchy

```
App
├── Router (TanStack Router)
│   ├── Home Page
│   │   └── Hero section with CTA
│   ├── Editor Page
│   │   ├── CanvasEditor
│   │   │   ├── Canvas element
│   │   │   └── Fabric.js instance
│   │   ├── FloatingToolbar
│   │   │   ├── Text formatting buttons
│   │   │   ├── Color picker
│   │   │   └── Delete button
│   │   ├── ColorPalette
│   │   │   ├── Color extraction
│   │   │   └── Color selection
│   │   ├── TemplateLibrary
│   │   │   └── Template selection
│   │   └── ExportToolbar
│   │       ├── Copy to clipboard
│   │       ├── Download
│   │       └── Share options
│   ├── Help Page
│   │   └── Documentation & FAQs
│   └── About Page
│       └── Project information
└── Toast Container
    └── Notification toasts
```

### Key Components

#### CanvasEditor

**Purpose**: Main canvas component managing Fabric.js integration and object manipulation.

**Location**: `src/components/CanvasEditor/index.tsx`

**Responsibilities**:

- Initialize Fabric.js canvas
- Handle canvas events (object add, modify, delete)
- Sync with Zustand store
- Manage undo/redo history
- Handle keyboard shortcuts

**Dependencies**:

- Fabric.js for canvas rendering
- Zustand for state management
- React hooks for lifecycle

**Key Features**:

- Canvas size: 1080×1920px (Instagram story format)
- Object selection with visual feedback
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Delete)
- Touch support for mobile

#### FloatingToolbar

**Purpose**: Context-sensitive formatting toolbar appearing when object selected.

**Location**: `src/components/FloatingToolbar/index.tsx`

**Responsibilities**:

- Show/hide based on selection
- Provide text formatting options (bold, italic, underline)
- Handle color changes
- Manage object deletion
- Position toolbar relative to selected object

**Dependencies**:

- Zustand for state management
- Lucide React for icons
- Tailwind CSS for styling

**Key Features**:

- Auto-positioning to avoid viewport overflow
- Keyboard accessible
- Touch-friendly button sizes
- Real-time preview

#### ColorPalette

**Purpose**: Color extraction and selection component.

**Location**: `src/components/ColorPalette/index.tsx`

**Responsibilities**:

- Extract colors from uploaded images using ColorThief
- Display extracted color palette
- Handle color selection
- Validate contrast ratios (WCAG compliance)
- Manage color history

**Dependencies**:

- ColorThief.js for color extraction
- Zustand for state management
- Contrast utility for WCAG validation

**Key Features**:

- Automatic color extraction
- Contrast ratio display
- Color history tracking
- Accessibility validation

#### TemplateLibrary

**Purpose**: Template management and selection.

**Location**: `src/components/TemplateLibrary/index.tsx`

**Responsibilities**:

- Display available templates
- Handle template selection
- Apply template to canvas
- Manage template customization

**Dependencies**:

- Zustand for state management
- Canvas store for applying templates

#### ExportToolbar

**Purpose**: Canvas export and sharing.

**Location**: `src/components/ExportToolbar/index.tsx`

**Responsibilities**:

- Copy canvas to clipboard
- Generate download link
- Show success/error feedback
- Handle fallback for unsupported browsers

**Dependencies**:

- Clipboard API
- Zustand for state management
- Toast store for notifications

**Key Features**:

- One-click copy to clipboard
- Fallback download option
- Success/error notifications
- Browser compatibility detection

## State Management

### Zustand Stores

#### Canvas Store

**Location**: `src/stores/canvasStore.ts`

Manages canvas state and objects.

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

**Methods**:

- `setFabricCanvas(canvas: Canvas)` - Set Fabric.js canvas instance
- `addObject(type: string, props?: any): string` - Add object to canvas, returns object ID
- `updateObject(id: string, props: any)` - Update object properties
- `deleteObject(id: string)` - Remove object from canvas
- `selectObject(id: string | null)` - Select/deselect object
- `clearCanvas()` - Clear all objects from canvas

#### History Store

**Location**: `src/stores/historyStore.ts`

Manages undo/redo stacks.

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

**Methods**:

- `pushHistory(state: CanvasState)` - Add state to undo stack, clear redo stack
- `undo(): CanvasState | null` - Revert to previous state
- `redo(): CanvasState | null` - Move to next state
- `canUndo(): boolean` - Check if undo available
- `canRedo(): boolean` - Check if redo available
- `clearHistory()` - Clear all history

**Constraints**:

- Maximum 10 states in undo stack
- Redo stack cleared on new action

#### Toast Store

**Location**: `src/stores/toastStore.ts`

Manages notification toasts.

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

**Methods**:

- `showToast(message: string, type: string, duration?: number)` - Show notification
- `removeToast(id: string)` - Remove specific toast
- `clearToasts()` - Clear all toasts

**Auto-dismiss**:

- Success: 3 seconds
- Error: 5 seconds
- Info: 3 seconds
- Warning: 4 seconds

## Data Flow

```
User Action (click, type, drag)
    ↓
Event Handler (onClick, onChange, onDrag)
    ↓
Zustand Store Update (setters/actions)
    ↓
Fabric.js Canvas Update (object manipulation)
    ↓
Component Re-render (React reconciliation)
    ↓
UI Update (DOM update)
    ↓
User Sees Result
```

### Example: Adding Text

1. User clicks "Add Text" button
2. `addObject('text', { text: 'New Text' })` called
3. Canvas store creates new text object
4. Fabric.js adds object to canvas
5. Component re-renders with new object
6. FloatingToolbar appears for formatting
7. User sees text on canvas

### Example: Undo Action

1. User presses Ctrl+Z
2. `undo()` called on history store
3. Previous canvas state retrieved
4. Canvas store updated with previous state
5. Fabric.js canvas redrawn
6. Component re-renders
7. User sees previous state

## Performance Optimization

### Code Splitting

- **Route-based**: Each page route is lazy-loaded
- **Component-based**: Heavy components (ColorThief) are lazy-loaded
- **Library-based**: Large libraries are dynamically imported

### Bundle Size

- **Initial**: ~102KB gzipped
- **Total**: ~250KB gzipped (with all features)
- **Breakdown**:
  - React + Vite: ~40KB
  - Fabric.js: ~35KB
  - Tailwind CSS: ~15KB
  - Other: ~12KB

### Rendering Optimization

- **Memoization**: Components wrapped with React.memo where appropriate
- **Selective Re-renders**: Zustand only re-renders subscribed components
- **Canvas Optimization**: Fabric.js renders only changed objects
- **Debouncing**: Input handlers debounced to prevent excessive updates

### Memory Management

- Canvas disposed on component unmount
- Object URLs revoked after use
- Undo/redo stack limited to 10 items
- Event listeners cleaned up on unmount

## Security & Privacy

### Zero-Server Verification

- ✅ No `fetch()`, `axios()`, or WebSocket calls
- ✅ All processing client-side
- ✅ No data transmitted to servers
- ✅ No analytics or tracking

### CORS Handling

- Local image uploads only (no external URLs)
- Canvas taint prevention
- Same-origin policy compliance

### Memory Management

- `canvas.dispose()` on unmount
- `URL.revokeObjectURL()` after use
- Bounded undo/redo stack (10 items)
- No sensitive data in localStorage

### Input Validation

- Text input sanitized
- Image dimensions validated
- File size limits enforced
- Type checking with TypeScript

## Deployment

### Build Process

```bash
bun run build
# Outputs to dist/
```

**Build Steps**:

1. TypeScript compilation
2. Vite bundling
3. CSS minification
4. JavaScript minification
5. Asset optimization

### GitHub Pages Deployment

```bash
bun run deploy
```

**Process**:

1. Build production bundle
2. Deploy to gh-pages branch
3. GitHub Pages serves from dist/

### Environment Variables

None required (Zero-Server architecture)

## Monitoring & Debugging

### Performance Monitoring

- Lighthouse audits
- Bundle analysis with `vite-plugin-visualizer`
- Runtime performance metrics
- Core Web Vitals tracking

### Error Tracking

- Console error logging
- Error boundaries for React errors
- User-facing error messages
- Toast notifications for feedback

### Browser DevTools

- React DevTools for component inspection
- Zustand DevTools for state debugging
- Network tab for bundle analysis
- Performance tab for profiling

### Debug Mode

Enable debug logging:

```typescript
// In environment
localStorage.setItem('DEBUG', 'true')
```

## Accessibility

### WCAG 2.1 Level A Compliance

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ Focus indicators
- ✅ ARIA labels and roles

### Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Ctrl+C` / `Cmd+C` - Copy to clipboard
- `Delete` - Delete selected object
- `Tab` - Navigate between elements
- `Enter` - Confirm action

### Screen Reader Support

- Semantic HTML
- ARIA labels on interactive elements
- Role attributes for custom components
- Live regions for notifications

## Extensibility

### Adding New Components

1. Create component in `src/components/`
2. Import Zustand stores as needed
3. Use Tailwind CSS for styling
4. Add TypeScript types
5. Write tests in `tests/`

### Adding New Stores

1. Create store in `src/stores/`
2. Define TypeScript interface
3. Implement with Zustand
4. Export hook function
5. Document in API.md

### Adding New Routes

1. Create route file in `src/routes/`
2. Export component as default
3. Router automatically discovers routes
4. Add navigation links
5. Update documentation

## Best Practices

### Code Organization

- One component per file
- Stores in dedicated directory
- Utilities in lib/ directory
- Tests co-located with source

### Naming Conventions

- Components: PascalCase (e.g., `CanvasEditor`)
- Hooks: camelCase with `use` prefix (e.g., `useCopyShortcut`)
- Stores: camelCase with `Store` suffix (e.g., `canvasStore`)
- Files: match export name

### Type Safety

- All functions have return types
- All props have interfaces
- No `any` types without justification
- Strict TypeScript mode enabled

### Testing

- Unit tests for utilities
- Integration tests for components
- E2E tests for user flows
- Minimum 80% code coverage

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
