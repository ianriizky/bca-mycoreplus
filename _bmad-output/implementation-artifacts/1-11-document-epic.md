---
storyId: 1.11
storyKey: 1-11-document-epic
epicId: 1
epicTitle: Initial MVP Architecture
status: ready-for-dev
createdAt: 2026-05-10T03:56:00.000Z
---

# Story 1-11: Document Epic

## Story Overview

Create comprehensive documentation for Epic 1 (Initial MVP Architecture) including architecture overview, component documentation, API documentation, deployment guide, and troubleshooting guide. Ensure all developers and stakeholders understand the system design and can maintain/extend it.

## User Story

**As a** developer joining the BCA MyCore+ project

**I want to** have clear, comprehensive documentation of the architecture and components

**So that** I can understand the system design, contribute effectively, and maintain the codebase with confidence

## Acceptance Criteria

### AC1: Architecture Documentation

- **Given** Epic 1 is complete
- **When** developer reads architecture documentation
- **Then** documentation covers:
  - System overview and design principles
  - Technology stack and version requirements
  - Component architecture and hierarchy
  - State management patterns
  - Data flow and communication
  - Performance optimization strategies
  - Security and privacy considerations

### AC2: Component Documentation

- **Given** all components implemented
- **When** developer reads component documentation
- **Then** documentation includes:
  - Component purpose and responsibility
  - Props interface and types
  - State management (if applicable)
  - Usage examples
  - Accessibility features
  - Known limitations or gotchas

### AC3: API Documentation

- **Given** all stores and utilities implemented
- **When** developer reads API documentation
- **Then** documentation includes:
  - Function signatures and parameters
  - Return types and values
  - Error handling and exceptions
  - Usage examples
  - Performance considerations

### AC4: Deployment Guide

- **Given** application ready for deployment
- **When** developer reads deployment guide
- **Then** guide includes:
  - Build process and commands
  - Environment configuration
  - GitHub Pages deployment steps
  - Performance optimization checklist
  - Monitoring and debugging

### AC5: Troubleshooting Guide

- **Given** developer encounters issues
- **When** developer reads troubleshooting guide
- **Then** guide includes:
  - Common issues and solutions
  - Debug techniques and tools
  - Performance troubleshooting
  - Browser compatibility issues
  - Memory leak detection

### AC6: Developer Setup Guide

- **Given** new developer joins project
- **When** developer reads setup guide
- **Then** guide includes:
  - Prerequisites and dependencies
  - Installation steps
  - Development server setup
  - Testing setup
  - Code style and conventions

### AC7: API Reference

- **Given** stores and utilities exist
- **When** developer reads API reference
- **Then** reference includes:
  - All public functions and methods
  - Type definitions
  - Examples for each API
  - Links to related documentation

### AC8: Changelog

- **Given** Epic 1 completed
- **When** developer reads changelog
- **Then** changelog includes:
  - All features implemented
  - Breaking changes (if any)
  - Bug fixes
  - Performance improvements
  - Dependencies added/updated

## Technical Requirements

### Documentation Structure

```
docs/
├── README.md                    # Overview and quick start
├── ARCHITECTURE.md              # System architecture
├── COMPONENTS.md                # Component documentation
├── API.md                       # API reference
├── SETUP.md                     # Developer setup guide
├── DEPLOYMENT.md                # Deployment guide
├── TROUBLESHOOTING.md           # Troubleshooting guide
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
└── architecture/
    ├── overview.md              # Architecture overview
    ├── state-management.md      # State management patterns
    ├── performance.md           # Performance optimization
    ├── security.md              # Security and privacy
    └── accessibility.md         # Accessibility implementation
```

### README.md Template

````markdown
# BCA MyCore+ - Zero-Server Image Generator

## Overview

BCA MyCore+ is a client-side image generation web application for BCA bank staff to create professional images for WhatsApp communication with customers.

### Key Features

- ✅ Zero-Server Architecture (100% client-side)
- ✅ Clipboard-First Sharing (copy → paste to WhatsApp)
- ✅ ColorThief Palette Extraction
- ✅ Glassmorphism UI with BCA Brand Colors
- ✅ Undo/Redo Support (10 actions)
- ✅ Accessibility (WCAG 2.1 Level A)
- ✅ Mobile-First Responsive Design

### Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test
```
````

### Technology Stack

- **Frontend**: React 19.2.5 + Vite 8.0.10 + TypeScript 6.0.3
- **Canvas**: Fabric.js 6.4.3
- **State**: Zustand 5.0.0
- **Styling**: Tailwind CSS 4.2.4
- **Routing**: TanStack Router
- **Testing**: Vitest + Playwright

### Project Structure

```
src/
├── components/      # React components
├── routes/         # Page routes
├── stores/         # Zustand stores
├── lib/            # Utility functions
└── styles/         # Global styles
```

### Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Components](./docs/COMPONENTS.md)
- [API Reference](./docs/API.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

### Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### License

MIT

````

### ARCHITECTURE.md Template

```markdown
# Architecture Documentation

## System Overview

BCA MyCore+ is a Single Page Application (SPA) built with React and Vite. The application runs 100% in the browser with no backend server.

### Design Principles

1. **Zero-Server**: All processing happens client-side
2. **Performance**: Initial load < 2 seconds, TTI < 2 seconds
3. **Accessibility**: WCAG 2.1 Level A compliance
4. **Simplicity**: Minimal dependencies, clear code structure

## Technology Stack

| Component | Technology | Version | Rationale |
|-----------|-----------|---------|-----------|
| Framework | React | 19.2.5 | Latest, modern features |
| Build Tool | Vite | 8.0.10 | Fast, ESM-native |
| Language | TypeScript | 6.0.3 | Type safety |
| Canvas | Fabric.js | 6.4.3 | Object manipulation |
| State | Zustand | 5.0.0 | Minimal bundle |
| Styling | Tailwind CSS | 4.2.4 | Utility-first |
| Routing | TanStack Router | Latest | File-based routing |

## Component Architecture

### Component Hierarchy

````

App
├── Router (TanStack Router)
│ ├── Home Page
│ ├── Editor Page
│ │ ├── CanvasEditor
│ │ ├── FloatingToolbar
│ │ ├── ColorPalette
│ │ ├── TemplateLibrary
│ │ └── ExportToolbar
│ └── Help Page
└── Toast Container

````

### Key Components

#### CanvasEditor
- **Purpose**: Main canvas rendering and object manipulation
- **Dependencies**: Fabric.js, Zustand
- **Responsibilities**:
  - Initialize and manage Fabric.js canvas
  - Handle object events (add, modify, delete)
  - Sync with Zustand store
  - Manage undo/redo history

#### FloatingToolbar
- **Purpose**: Context-sensitive formatting toolbar
- **Dependencies**: Zustand, Lucide Icons
- **Responsibilities**:
  - Show/hide based on selection
  - Provide text formatting options
  - Handle color changes
  - Manage object deletion

#### ColorPalette
- **Purpose**: Color extraction and selection
- **Dependencies**: ColorThief.js, Zustand
- **Responsibilities**:
  - Extract colors from uploaded images
  - Display color palette
  - Handle color selection
  - Validate contrast ratios

#### ExportToolbar
- **Purpose**: Canvas export and sharing
- **Dependencies**: Clipboard API, Zustand
- **Responsibilities**:
  - Copy canvas to clipboard
  - Generate WhatsApp links
  - Fallback download
  - Show success/error feedback

## State Management

### Zustand Stores

#### Canvas Store
Manages canvas state and objects.

```typescript
interface CanvasStore {
  fabricCanvas: Canvas | null
  objects: SerializedObject[]
  selectedObjectId: string | null
  addObject: (type: string, props?: any) => void
  updateObject: (id: string, props: any) => void
  deleteObject: (id: string) => void
  selectObject: (id: string | null) => void
}
````

#### History Store

Manages undo/redo stacks.

```typescript
interface HistoryStore {
  undoStack: CanvasState[]
  redoStack: CanvasState[]
  pushHistory: (state: CanvasState) => void
  undo: () => void
  redo: () => void
}
```

#### Toast Store

Manages notification toasts.

```typescript
interface ToastStore {
  toasts: Toast[]
  showToast: (message: string, type: string) => void
  removeToast: (id: string) => void
}
```

## Data Flow

```
User Action
    ↓
Event Handler
    ↓
Zustand Store Update
    ↓
Fabric.js Canvas Update
    ↓
Component Re-render
    ↓
UI Update
```

## Performance Optimization

### Code Splitting

- Route-based splitting (TanStack Router)
- Component-based splitting (React.lazy)
- Library-based splitting (dynamic imports)

### Bundle Size

- Initial: ~102KB gzipped
- Total: ~250KB gzipped (with all features)

### Rendering Optimization

- Memoization (React.memo)
- Selective re-renders (Zustand)
- Canvas rendering optimization

## Security & Privacy

### Zero-Server Verification

- No fetch/axios/WebSocket calls
- All processing client-side
- No data transmitted to servers

### CORS Handling

- Local image uploads only
- No external image URLs
- Prevents tainted canvas

### Memory Management

- canvas.dispose() on unmount
- URL.revokeObjectURL() after use
- Bounded undo/redo stack (10 items)

## Deployment

### Build Process

```bash
bun run build
# Outputs to dist/
```

### GitHub Pages Deployment

```bash
# Deploy to GitHub Pages
bun run deploy
```

### Environment Variables

None required (Zero-Server architecture)

## Monitoring & Debugging

### Performance Monitoring

- Lighthouse audits
- Bundle analysis
- Runtime performance metrics

### Error Tracking

- Console error logging
- Error boundaries
- User-facing error messages

### Browser DevTools

- React DevTools
- Zustand DevTools
- Network tab for bundle analysis

````

### COMPONENTS.md Template

```markdown
# Component Documentation

## CanvasEditor

### Purpose
Main canvas component managing Fabric.js integration and object manipulation.

### Props
None (uses Zustand store)

### State
- fabricCanvas: Fabric.js Canvas instance
- selectedObject: Currently selected object
- isLoading: Loading state

### Usage
```tsx
import { CanvasEditor } from '@/components/CanvasEditor'

export function EditorPage() {
  return <CanvasEditor />
}
````

### Accessibility

- `role="region"` with `aria-label="Canvas editor"`
- Keyboard navigation support
- Focus indicators on objects

### Known Limitations

- Canvas size fixed at 1080×1920px
- No multi-object selection
- No grouping support

---

## FloatingToolbar

### Purpose

Context-sensitive toolbar appearing when object selected.

### Props

None (uses Zustand store)

### State

- isVisible: Toolbar visibility
- toolbarPosition: Position relative to selected object

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

### Accessibility

- `role="toolbar"`
- ARIA labels on all buttons
- Keyboard accessible

---

## ColorPalette

### Purpose

Extract and display color palette from uploaded images.

### Props

None (uses Zustand store)

### State

- palette: Extracted colors
- isLoading: Loading state
- selectedColor: Currently selected color

### Usage

```tsx
import { ColorPalette } from '@/components/ColorPalette'

export function EditorPage() {
  return <ColorPalette />
}
```

### Dependencies

- ColorThief.js for color extraction
- Zustand for state management

---

## ExportToolbar

### Purpose

Export canvas and share via clipboard/WhatsApp.

### Props

None (uses Zustand store)

### State

- isExporting: Export in progress
- clipboardSupported: Clipboard API available

### Usage

```tsx
import { ExportToolbar } from '@/components/ExportToolbar'

export function EditorPage() {
  return <ExportToolbar />
}
```

### Accessibility

- ARIA labels on all buttons
- Keyboard shortcuts (Ctrl+C)
- Toast announcements

---

[Additional component documentation...]

````

### API.md Template

```markdown
# API Reference

## Stores

### Canvas Store

#### useCanvasStore()
Access canvas state and actions.

```typescript
const {
  fabricCanvas,
  objects,
  selectedObjectId,
  addObject,
  updateObject,
  deleteObject,
  selectObject,
} = useCanvasStore()
````

**Methods:**

- `addObject(type: string, props?: any): string`
  - Adds object to canvas
  - Returns object ID
  - Example: `const id = addObject('text', { text: 'Hello' })`

- `updateObject(id: string, props: any): void`
  - Updates object properties
  - Example: `updateObject(id, { text: 'World' })`

- `deleteObject(id: string): void`
  - Removes object from canvas
  - Example: `deleteObject(id)`

- `selectObject(id: string | null): void`
  - Selects/deselects object
  - Example: `selectObject(id)`

---

### History Store

#### useHistoryStore()

Access undo/redo state and actions.

```typescript
const { undoStack, redoStack, pushHistory, undo, redo, canUndo, canRedo } = useHistoryStore()
```

**Methods:**

- `pushHistory(state: CanvasState): void`
  - Adds state to undo stack
  - Clears redo stack

- `undo(): CanvasState | null`
  - Reverts to previous state
  - Returns previous state or null

- `redo(): CanvasState | null`
  - Moves to next state
  - Returns next state or null

- `canUndo(): boolean`
  - Checks if undo available

- `canRedo(): boolean`
  - Checks if redo available

---

## Utilities

### Clipboard

#### copyCanvasToClipboard(canvas: Canvas): Promise<void>

Copies canvas to system clipboard.

```typescript
import { copyCanvasToClipboard } from '@/lib/clipboard'

try {
  await copyCanvasToClipboard(fabricCanvas)
  showToast('Copied to clipboard!', 'success')
} catch (error) {
  showToast('Copy failed', 'error')
}
```

---

### Contrast

#### getContrastRatio(color1: string, color2: string): number

Calculates contrast ratio between two colors.

```typescript
import { getContrastRatio, meetsWCAGAA } from '@/lib/contrast'

const ratio = getContrastRatio('#C8A96A', '#FFFFFF')
if (meetsWCAGAA(ratio)) {
  console.log('Meets WCAG AA standard')
}
```

---

[Additional API documentation...]

```

## Implementation Checklist

### Phase 1: Architecture Documentation
- [ ] Write system overview
- [ ] Document technology stack
- [ ] Document component architecture
- [ ] Document state management
- [ ] Document data flow

### Phase 2: Component Documentation
- [ ] Document each component
- [ ] Add usage examples
- [ ] Document props and state
- [ ] Document accessibility features
- [ ] Document known limitations

### Phase 3: API Documentation
- [ ] Document all stores
- [ ] Document all utilities
- [ ] Add code examples
- [ ] Document error handling
- [ ] Document performance considerations

### Phase 4: Developer Guides
- [ ] Write setup guide
- [ ] Write deployment guide
- [ ] Write troubleshooting guide
- [ ] Write contribution guidelines
- [ ] Write code style guide

### Phase 5: Reference Documentation
- [ ] Create API reference
- [ ] Create component reference
- [ ] Create store reference
- [ ] Create utility reference
- [ ] Create keyboard shortcuts reference

### Phase 6: Additional Documentation
- [ ] Write changelog
- [ ] Write FAQ
- [ ] Write glossary
- [ ] Create diagrams
- [ ] Create screenshots

## Documentation Tools

### Markdown
- Simple, version-controllable format
- GitHub-rendered documentation
- Easy to maintain

### Diagrams
- Use Mermaid for architecture diagrams
- Use ASCII art for simple diagrams
- Include component hierarchy diagrams

### Code Examples
- Use TypeScript syntax highlighting
- Include complete, runnable examples
- Show both correct and incorrect usage

## Success Metrics

1. **Completeness**
   - All components documented
   - All stores documented
   - All utilities documented
   - All deployment steps documented

2. **Clarity**
   - Documentation easy to understand
   - Examples clear and runnable
   - Terminology consistent
   - No ambiguity

3. **Maintainability**
   - Documentation easy to update
   - Version-controlled
   - Linked to source code
   - Automated checks (if possible)

4. **Accessibility**
   - Documentation searchable
   - Documentation indexed
   - Clear navigation
   - Mobile-friendly

## References

- [Markdown Guide](https://www.markdownguide.org/)
- [Google Style Guide](https://google.github.io/styleguide/)
- [Write the Docs](https://www.writethedocs.org/)

---

**Story Status**: ready-for-dev
**Created**: 2026-05-10T03:56:00.000Z
**Last Updated**: 2026-05-10T03:56:00.000Z
```
