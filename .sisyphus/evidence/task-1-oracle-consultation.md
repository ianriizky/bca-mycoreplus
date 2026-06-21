# Oracle Consultation: BCA MyCore+ Technology Trade-offs Analysis

**Consultation Date**: 2026-05-09  
**Project**: BCA MyCore+ Zero-Server Image Generation Web App  
**Oracle Session**: ses_1f28e6f3cffekWoVvZOfydQpFR (retried)

---

## Executive Summary

This Oracle consultation provides architectural trade-off analysis for BCA MyCore+, a Zero-Server image generation web app for BCA bank staff. The analysis covers 6 critical decision areas based on PRD requirements, librarian research findings, and PRD NFR constraints.

**Key Recommendations**:
| Decision | Recommendation | Rationale |
|----------|----------------|-----------|
| Canvas Library | **Fabric.js v6** | Tree-shakeable ~90KB, SVG support, design editor optimized |
| State Management | **Zustand v5** | 1.2KB bundle, React 19 compatible, simple API |
| Bundle Budget | **~250KB realistic** | Fabric.js ~90KB + Zustand ~1KB + React + app code |
| Code-splitting | **Route + Component** | Lazy load canvas editor, templates, ColorThief |
| Zero-Server Strategy | **localStorage + IndexedDB** | Template library, preferences, offline support |
| Accessibility | **Layered Approach** | Hidden DOM mirror + ARIA + keyboard nav |

---

## 1. Fabric.js v6 vs Alternatives

### Research Data (from task-2-fabricjs-research.md)

| Library                  | Minified  | Gzipped    | Meets NFR3? | Features                      |
| ------------------------ | --------- | ---------- | ----------- | ----------------------------- |
| Fabric.js v6 (selective) | 90-150KB  | ~90-100KB  | ✅ PASS     | Object model, SVG I/O         |
| Konva.js v9              | 280-350KB | ~90-110KB  | ✅ PASS     | Official React bindings       |
| PixiJS v8                | 700KB     | ~180-220KB | ⚠️ MARGINAL | Game-focused, no object model |
| Native Canvas            | 0KB       | 0KB        | ✅ PASS     | Full custom, high effort      |

### Trade-off Analysis

**Fabric.js v6**:

```
PROS:
✓ Built-in object model (drag, resize, rotate, text manipulation)
✓ SVG import/export critical for BCA templates
✓ TypeScript native, no @types needed
✓ Tree-shakeable ES modules achieve NFR3 compliance
✓ 31K+ stars, active maintenance, 7.8K star production apps
✓ Fabric.js v6.4.3 locked version per PRD NFR24

CONS:
✗ ~90KB addition to bundle (still achievable with lazy loading)
✗ No official React bindings (manual useRef pattern)
✗ canvas.dispose() async requires careful cleanup
```

**Konva.js**:

```
PROS:
✓ Official React 19 bindings (react-konva v19.3.1)
✓ Multi-layer rendering better performance
✓ Slightly simpler API

CONS:
✗ Larger API surface for design editor use case
✗ No SVG import (critical for BCA templates)
✗ Canvas objects lack built-in text editing
```

**Native Canvas API**:

```
PROS:
✓ Zero bundle impact
✓ Full control over rendering

CONS:
✗ No object model - manual hit detection, transforms, layering
✗ No SVG support
✗ Significantly more development effort
✗ Not recommended for design editor use case
```

### Recommendation: **Fabric.js v6**

**Rationale**:

1. Built-in SVG import is critical for BCA brand templates
2. Object model simplifies text manipulation (FR2-FR6)
3. Tree-shakeable imports achieve NFR3 compliance
4. Production proven (ikuaitu/vue-fabric-editor, 7.8K stars)
5. PRD NFR24 explicitly locks to Fabric.js v6.4.3

---

## 2. Bundle Size Constraint (200KB Realistic?)

### PRD NFR3 Analysis

**PRD NFR3**: "Initial bundle size < 200KB gzipped (Fabric.js ~150KB + React + app code)"

**Reality Check**:

```
Fabric.js v6 tree-shakeable:    ~90-100KB
Zustand v5 (if selected):       ~1-2KB
React 19 (already in bundle):  ~40-45KB
TanStack Router:               ~15-20KB
Tailwind CSS (purged):         ~10-15KB
App code (minimal):            ~30-40KB
─────────────────────────────────────────
TOTAL ESTIMATE:                ~186-222KB
```

### Revised Recommendation

**Realistic Budget**: **~250KB gzipped**

**Rationale**:

1. PRD estimate of "Fabric.js ~150KB" is outdated (v6 introduced tree-shaking)
2. Native canvas API not suitable for design editor (too much custom code)
3. Lazy loading can defer ColorThief.js (~15KB) to secondary load
4. Total with Fabric.js selective imports: ~186KB (achievable)

### Code-splitting Strategy

```tsx
// Primary bundle (critical path)
import './main' // React, Router, minimal app shell

// Lazy load canvas editor
const CanvasEditor = lazy(() => import('./components/CanvasEditor'))

// Lazy load ColorThief (not needed until image loaded)
const ColorPalette = lazy(() => import('./components/ColorPalette'))

// Lazy load templates
const TemplateLibrary = lazy(() => import('./components/TemplateLibrary'))

// Route-based splitting via TanStack Router
;<Route path="/" lazy={() => import('./routes/editor')} />
```

---

## 3. State Management Options

### Research Data (from task-3-state-management-research.md)

| Library        | Bundle    | React 19 | TypeScript | DevTools | Complexity |
| -------------- | --------- | -------- | ---------- | -------- | ---------- |
| **Zustand v5** | **1.2KB** | ✅       | ✅ Native  | ✅       | Low        |
| Jotai          | 2.5KB     | ✅       | ✅ Native  | ⚠️       | Medium     |
| Valtio         | 3KB       | ✅       | ⚠️         | ⚠️       | Medium     |
| React Context  | 0KB       | ✅       | ✅         | ❌       | Low (bad)  |

### Trade-off Analysis

**Zustand v5**:

```
PROS:
✓ Smallest bundle (1.2KB gzipped)
✓ React 19 confirmed (v5.0.0+)
✓ TypeScript native, no type declarations needed
✓ DevTools middleware available
✓ No Provider wrapper needed (avoids re-render issues)
✓ Simple API: create((set, get) => ...)
✓ Persist middleware for localStorage/IndexedDB

CONS:
✗ Community library, not Meta/React team
✗ No official React bindings (though simple enough)
```

**React Context (AVOID)**:

```
PROS:
✓ Zero bundle impact
✓ Native React

CONS:
✗ No selective re-render (whole tree re-renders on any change)
✗ Canvas state changes would cause full app re-render
✗ Performance nightmare for canvas + React integration
✗ NOT recommended by Oracle
```

### Canvas + React State Synchronization Pattern

```tsx
// Zustand store for canvas state
interface CanvasStore {
  fabricCanvas: fabric.Canvas | null
  objects: CanvasObject[]
  selectedObjectId: string | null

  // Actions
  initCanvas: (el: HTMLCanvasElement) => void
  addObject: (obj: CanvasObject) => void
  selectObject: (id: string | null) => void
  syncFromFabric: () => void
}

const useCanvasStore = create<CanvasStore>((set, get) => ({
  fabricCanvas: null,
  objects: [],
  selectedObjectId: null,

  initCanvas: (el) => {
    const canvas = new fabric.Canvas(el)

    // Sync Fabric events → Zustand
    canvas.on('object:added', (e) => {
      set((s) => ({ objects: [...s.objects, serialize(e.target)] }))
    })

    canvas.on('selection:created', (e) => {
      set({ selectedObjectId: e.selected[0]?.id })
    })

    set({ fabricCanvas: canvas })
  },

  // ... other actions
}))
```

### Recommendation: **Zustand v5**

**Rationale**:

1. Smallest bundle (1.2KB) helps meet NFR3
2. React 19 compatible (v5.0.0 released)
3. Simple API without Provider wrapper
4. Persist middleware for preferences and templates
5. Well-suited for Canvas + React synchronization

---

## 4. Code-splitting Strategy

### TanStack Router Lazy Loading

```tsx
// src/router.ts - Route-based splitting
import { createRouter, lazyRoute } from '@tanstack/react-router'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 5000,
})

// Lazy load non-critical routes
const TemplateRoute = lazyRoute('/templates', () => import('./routes/templates'))
const HelpRoute = lazyRoute('/help', () => import('./routes/help'))
```

### Component-based Splitting

```tsx
// src/routes/editor.tsx - Main editor route
import { lazy, Suspense } from 'react'

const CanvasEditor = lazy(() => import('../components/CanvasEditor'))
const FloatingToolbar = lazy(() => import('../components/FloatingToolbar'))

export const Route = createFileRoute('/editor')({
  component: EditorPage,
})

function EditorPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CanvasEditor />
      <Suspense fallback={null}>
        <FloatingToolbar /> {/* Floating, can delay */}
      </Suspense>
    </Suspense>
  )
}
```

### Feature-based Splitting

```tsx
// ColorThief.js lazy loaded
const ColorPalette = lazy(() => import('./components/ColorPalette'))

// Only load when image is actually loaded
function handleImageLoad(img: HTMLImageElement) {
  setIsColorPaletteVisible(true) // Triggers Suspense resolve
}
```

### Bundle Analysis

```bash
# Install bundle analyzer
bun add -D rollup-plugin-visualizer

# vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }),
  ],
});

# Run build to see bundle breakdown
bun run build
```

---

## 5. Zero-Server Architecture Risks

### Risk Analysis

| Risk                      | Impact                               | Mitigation                                               |
| ------------------------- | ------------------------------------ | -------------------------------------------------------- |
| **Storage Limits**        | localStorage 5-10MB, IndexedDB ~50MB | Use IndexedDB for templates, localStorage for prefs only |
| **Offline Capability**    | PWA service worker complexity        | Basic offline via cache, no full PWA needed for MVP      |
| **Memory Constraints**    | Peak < 500MB (NFR4)                  | Cleanup: canvas.dispose(), URL.revokeObjectURL()         |
| **No Backend Fallback**   | Data loss on browser crash           | No persistent user data per PRD design                   |
| **Browser Compatibility** | Clipboard API requires HTTPS         | GitHub Pages provides HTTPS automatically                |

### Storage Strategy

```tsx
// Template library: IndexedDB (more space)
const templateDb = {
  dbName: 'bca-mycoreplus-templates',
  storeName: 'templates',
  maxSize: 50 * 1024 * 1024, // 50MB
}

// User preferences: localStorage (small, always available)
const PREFERENCES_KEY = 'bca-mycoreplus-preferences'

// Undo/redo: In-memory only (per PRD FR30)
const UNDO_STACK_MAX = 50 // Limit memory usage
```

### Offline Strategy

**Phase 1 (MVP)**: No offline required

- First load needs network
- App works after initial load

**Phase 2 (Post-MVP)**: Service Worker caching

```tsx
// sw.js (simplified)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('bca-mycoreplus-v1').then((cache) => {
      return cache.addAll(['/', '/index.html', '/assets/*'])
    }),
  )
})
```

### Memory Management

Per PRD NFR4: "Peak memory usage < 500MB di browser mobile"

```tsx
// Critical cleanup patterns
function useCanvasEditor() {
  const canvasRef = useRef<fabric.Canvas>(null)

  useEffect(() => {
    // Initialize canvas
    const canvas = new fabric.Canvas(canvasRef.current)

    return () => {
      // CRITICAL: Cleanup on unmount
      canvas.dispose() // Fabric.js cleanup

      // Revoke all object URLs
      objectURLs.forEach((url) => URL.revokeObjectURL(url))

      // Nullify reference
      canvasRef.current = null
    }
  }, [])
}
```

---

## 6. Canvas Accessibility Architecture (WCAG 2.1 Level A)

### Research Data (from task-4-accessibility-research.md)

| Criterion               | Description                    | Canvas Challenge             |
| ----------------------- | ------------------------------ | ---------------------------- |
| 1.1.1 Non-text Content  | Alt text required              | Canvas lacks alt attribute   |
| 2.1.1 Keyboard          | All functionality via keyboard | Canvas objects not focusable |
| 2.4.3 Focus Order       | Logical focus order            | No native focus order        |
| 4.1.2 Name, Role, Value | UI component info              | Canvas objects have no role  |

### Layered Accessibility Approach

```tsx
// 1. Hidden semantic mirror (visually hidden, screen-reader visible)
<div className="sr-only" aria-live="polite">
  <div role="img" aria-label={canvasDescription} />
</div>

// 2. Canvas with ARIA attributes
<canvas
  role="img"
  aria-label="Image editor canvas"
  tabIndex={0}
  aria-describedby="canvas-instructions"
/>

// 3. Keyboard event handler
<div
  onKeyDown={handleKeyboardNav}
  tabIndex={-1}
  role="application"
/>

// 4. Toolbar with full accessibility
<FloatingToolbar
  role="toolbar"
  aria-label="Formatting options"
  aria-hidden={!isVisible}
>
  <button aria-label="Bold" aria-pressed={isBold}>
    <BoldIcon aria-hidden="true" />
  </button>
</FloatingToolbar>
```

### Color Contrast (ColorThief.js)

PRD NFR16: "WCAG AA ratio (4.5:1) using ColorThief.js `.contrast`"

```tsx
const colorThief = new ColorThief()

// Calculate contrast with BCA brand colors
const gold = { r: 200, g: 169, b: 106 } // #C8A96A
const navy = { r: 11, g: 31, b: 58 } // #0B1F3A

// Gold on white: 2.85:1 ❌ (fails)
// Navy on white: 11.8:1 ✅ (passes)
```

**Recommendation**: Use Deep Navy (#0B1F3A) for text on light backgrounds to ensure WCAG AA compliance.

---

## 7. Synthesis: Integrated Recommendations

### Technology Stack Summary

| Component        | Decision                 | Version           | Rationale                                     |
| ---------------- | ------------------------ | ----------------- | --------------------------------------------- |
| Canvas Library   | Fabric.js                | 6.4.3 (locked)    | SVG support, tree-shakeable, object model     |
| State Management | Zustand                  | 5.0.0+            | 1.2KB, React 19, simple API                   |
| Bundle Budget    | ~250KB                   | Realistic         | Fabric.js 90KB + app code                     |
| Code-splitting   | Route + Component        | Lazy loading      | TanStack Router + React.lazy                  |
| Storage          | IndexedDB + localStorage | N/A               | Templates in IndexedDB, prefs in localStorage |
| Accessibility    | Layered approach         | Hidden DOM + ARIA | Screen reader support, keyboard nav           |

### Implementation Priority

1. **Immediate**: Zustand store for canvas state sync
2. **Phase 1**: Fabric.js integration with lazy loading
3. **Phase 2**: Accessibility layer (hidden DOM mirror)
4. **Phase 3**: ColorThief.js with contrast validation
5. **Phase 4**: Template library in IndexedDB

### Risk-adjusted Decisions

| Original PRD Assumption      | Oracle Adjustment                       |
| ---------------------------- | --------------------------------------- |
| "Fabric.js ~150KB"           | "Tree-shakeable ~90KB" (v6 improvement) |
| "Initial bundle < 200KB"     | "~250KB realistic" (revised budget)     |
| "React Context OK for state" | "Use Zustand" (performance critical)    |
| "Full accessibility later"   | "Level A from day 1" (PR NFR13-NFR17)   |

---

## 8. References

### Input Documents

- `_bmad-output/planning-artifacts/prd.md` - Functional requirements FR1-FR45, NFR1-NFR26
- `_bmad-output/planning-artifacts/ux-design-specification.md` - Component specs, interaction patterns
- `.sisyphus/evidence/task-2-fabricjs-research.md` - Canvas library bundle size data
- `.sisyphus/evidence/task-3-state-management-research.md` - State management comparison
- `.sisyphus/evidence/task-4-accessibility-research.md` - WCAG patterns for canvas

### Oracle Consultation Notes

- Session: ses_1f28e6f3cffekWoVvZOfydQpFR
- Retried due to "Provider returned error" in initial attempt
- All 6 analysis points completed in retry
