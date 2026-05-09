---
storyId: 1.8
storyKey: 1-8-lazy-load-heavy-libraries
epicId: 1
epicTitle: Initial MVP Architecture
status: ready-for-dev
createdAt: 2026-05-10T03:56:00.000Z
---

# Story 1-8: Lazy Load Heavy Libraries

## Story Overview

Implement lazy loading for heavy JavaScript libraries (Fabric.js, ColorThief.js) to reduce initial bundle size and improve Time to Interactive (TTI). Libraries load on-demand when features are accessed, not on page load.

## User Story

**As a** BCA staff member accessing the application on mobile

**I want to** see the app load quickly and become interactive fast

**So that** I can start creating images without waiting for heavy libraries to download and parse

## Acceptance Criteria

### AC1: Initial Bundle Size Reduction

- **Given** application loads for first time
- **When** page renders
- **Then** initial bundle size is < 150KB gzipped (excluding lazy-loaded libraries)
- **And** Time to Interactive (TTI) is < 2 seconds on 4G network

### AC2: Fabric.js Lazy Loading

- **Given** user navigates to canvas editor
- **When** canvas editor component mounts
- **Then** Fabric.js library is loaded dynamically
- **And** loading spinner shown while library loads
- **And** canvas becomes interactive once library loaded

### AC3: ColorThief.js Lazy Loading

- **Given** user uploads an image to canvas
- **When** image upload completes
- **Then** ColorThief.js library is loaded dynamically
- **And** color palette extraction begins
- **And** color picker becomes available

### AC4: Route-Based Code Splitting

- **Given** user navigates to different routes
- **When** route changes
- **Then** only code for that route is loaded
- **And** other routes' code is not downloaded until accessed

### AC5: Component-Based Code Splitting

- **Given** heavy components (ColorPalette, TemplateLibrary) are rendered
- **When** components mount
- **Then** component code is loaded dynamically
- **And** Suspense fallback shown while loading

### AC6: Loading States & Fallbacks

- **Given** lazy-loaded library is loading
- **When** user interacts with UI
- **Then** clear loading indicator shown
- **And** user cannot perform action until library loaded
- **And** error state shown if loading fails

### AC7: No Performance Regression

- **Given** all features are used
- **When** all libraries are loaded
- **Then** total bundle size is < 250KB gzipped
- **And** no performance regression compared to non-lazy version

## Technical Requirements

### Code Splitting Strategy

**Three-Level Approach:**

1. **Route-Based Splitting** (TanStack Router)
2. **Component-Based Splitting** (React.lazy + Suspense)
3. **Library-Based Splitting** (Dynamic imports)

### Route-Based Code Splitting

**TanStack Router Configuration:**

```typescript
// src/router.ts
import { createRouter, lazyRoute } from '@tanstack/react-router'

export const routeTree = RootRoute.addChildren([IndexRoute, lazyRoute('/editor', () => import('./routes/editor')), lazyRoute('/templates', () => import('./routes/templates')), lazyRoute('/help', () => import('./routes/help'))])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent', // Preload on hover/focus
})
```

**Route Files:**

```typescript
// src/routes/editor.tsx
import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const CanvasEditor = lazy(() => import('../components/CanvasEditor'))

export const Route = createFileRoute('/editor')({
  component: EditorPage,
})

function EditorPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CanvasEditor />
    </Suspense>
  )
}
```

### Component-Based Code Splitting

**React.lazy + Suspense Pattern:**

```typescript
// src/components/CanvasEditor/index.tsx
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from 'fabric'

// Lazy load heavy components
const ColorPalette = lazy(() => import('../ColorPalette'))
const TemplateLibrary = lazy(() => import('../TemplateLibrary'))
const FloatingToolbar = lazy(() => import('../FloatingToolbar'))

export function CanvasEditor() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  return (
    <div className="canvas-editor">
      {/* Canvas always loaded */}
      <canvas ref={canvasRef} />

      {/* Lazy load ColorPalette only when image uploaded */}
      {imageLoaded && (
        <Suspense fallback={<div>Loading colors...</div>}>
          <ColorPalette />
        </Suspense>
      )}

      {/* Lazy load TemplateLibrary on demand */}
      {showTemplates && (
        <Suspense fallback={<div>Loading templates...</div>}>
          <TemplateLibrary />
        </Suspense>
      )}

      {/* Lazy load FloatingToolbar when object selected */}
      <Suspense fallback={null}>
        <FloatingToolbar />
      </Suspense>
    </div>
  )
}
```

### Library-Based Code Splitting

**Dynamic Imports for Heavy Libraries:**

```typescript
// src/lib/fabric-loader.ts
let fabricPromise: Promise<typeof import('fabric')> | null = null

export async function loadFabric() {
  if (!fabricPromise) {
    fabricPromise = import('fabric')
  }
  return fabricPromise
}

// Usage in component
async function initializeCanvas() {
  const { Canvas } = await loadFabric()
  const canvas = new Canvas('fabric-canvas')
  return canvas
}
```

```typescript
// src/lib/colorthief-loader.ts
let colorThiefPromise: Promise<typeof ColorThief> | null = null

export async function loadColorThief() {
  if (!colorThiefPromise) {
    colorThiefPromise = import('colorthief').then((m) => m.default)
  }
  return colorThiefPromise
}

// Usage in component
async function extractColors(imageUrl: string) {
  const ColorThief = await loadColorThief()
  const thief = new ColorThief()
  const palette = thief.getPalette(imageUrl, 5)
  return palette
}
```

### Vite Configuration for Code Splitting

**vite.config.ts:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: 'bundle-report.html',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          fabric: ['fabric'],
          colorthief: ['colorthief'],
          vendor: ['react', 'react-dom', 'zustand'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
  },
})
```

### Bundle Analysis

**Commands:**

```bash
# Build and analyze bundle
bun run build

# View bundle report
open dist/bundle-report.html

# Check bundle size
bun run build && ls -lh dist/
```

### Performance Budget Allocation

| Component             | Size (KB)   | Strategy        | Status |
| --------------------- | ----------- | --------------- | ------ |
| React + React DOM     | 45          | Baseline        | ✅     |
| TanStack Router       | 15          | Baseline        | ✅     |
| Tailwind CSS          | 10          | Purged          | ✅     |
| App Shell             | 30          | Baseline        | ✅     |
| **Fabric.js (lazy)**  | **90**      | **Lazy loaded** | ✅     |
| **ColorThief (lazy)** | **15**      | **Lazy loaded** | ✅     |
| Zustand               | 2           | Baseline        | ✅     |
| **Initial Load**      | **~102 KB** | **With lazy**   | ✅     |
| **Total Max**         | **~250 KB** | **All loaded**  | ✅     |

## Architecture & Code Structure

### File Organization

```
src/
├── routes/
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home page (lightweight)
│   ├── editor.tsx      # Editor page (lazy loaded)
│   ├── templates.tsx   # Templates page (lazy loaded)
│   └── help.tsx        # Help page (lazy loaded)
├── components/
│   ├── CanvasEditor/
│   │   └── index.tsx   # Lazy loads ColorPalette, TemplateLibrary
│   ├── ColorPalette/
│   │   └── index.tsx   # Lazy loaded component
│   ├── TemplateLibrary/
│   │   └── index.tsx   # Lazy loaded component
│   └── FloatingToolbar/
│       └── index.tsx   # Lazy loaded component
├── lib/
│   ├── fabric-loader.ts    # NEW - Fabric.js dynamic import
│   ├── colorthief-loader.ts # NEW - ColorThief dynamic import
│   └── loaders.ts          # NEW - Centralized loader utilities
└── vite.config.ts          # Code splitting configuration
```

### Loading States

**Suspense Fallback Components:**

```typescript
// src/components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent" />
      <span className="ml-2 text-sm text-gray-600">Loading...</span>
    </div>
  )
}

// src/components/SkeletonLoader.tsx
export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
    </div>
  )
}
```

## Dependencies & Versions

### Required Libraries (Already in project)

- **React**: 19.2.5+ (already installed)
- **Vite**: 8.0.10+ (already installed)
- **TanStack Router**: Latest (already installed)
- **Tailwind CSS**: 4.2.4+ (already installed)

### Libraries to Lazy Load

- **Fabric.js**: 6.4.3 (lazy load on editor route)
- **ColorThief.js**: 3.3.1+ (lazy load on image upload)

### New Dependencies

None required. All functionality uses existing libraries and native browser APIs.

## UI/UX Specifications

### Loading States

**Initial Page Load:**

- Show app shell immediately (header, navigation)
- Show loading spinner for main content
- TTI target: < 2 seconds

**Route Navigation:**

- Show loading spinner when navigating to heavy routes
- Preload on hover/focus (TanStack Router intent preload)
- Smooth transition to loaded content

**Component Loading:**

- Show Suspense fallback while component loads
- Keep UI responsive during loading
- No blocking operations

### Error Handling

**Loading Failures:**

- Show error message if library fails to load
- Provide retry button
- Fallback to basic functionality if possible

```typescript
// Error boundary for lazy components
<ErrorBoundary fallback={<ErrorMessage />}>
  <Suspense fallback={<LoadingSpinner />}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>
```

## Testing Requirements

### Unit Tests (Vitest)

1. **Library Loaders**
   - Test: `loadFabric()` returns Fabric module
   - Test: `loadColorThief()` returns ColorThief module
   - Test: Loaders cache results (single import)
   - Test: Error handling on import failure

2. **Code Splitting**
   - Test: Route chunks are separate files
   - Test: Component chunks are separate files
   - Test: Library chunks are separate files

### Integration Tests (Playwright)

1. **Initial Load Performance**
   - Measure TTI on 4G network
   - Verify < 2 seconds
   - Verify initial bundle < 150KB

2. **Route Navigation**
   - Navigate to editor route
   - Verify Fabric.js loads
   - Verify canvas becomes interactive

3. **Component Loading**
   - Upload image
   - Verify ColorThief loads
   - Verify color palette appears

4. **Bundle Size**
   - Build application
   - Verify total size < 250KB gzipped
   - Verify no regressions

### Performance Tests

```bash
# Lighthouse CI
npm run lighthouse

# Bundle analysis
npm run build && npm run analyze

# Network throttling test
# Use Chrome DevTools: Throttle to 4G
```

## Previous Story Intelligence

### Story 1-7: Undo/Redo Stack (JUST CREATED)

**Key Learnings:**

- Zustand store for state management
- Event listeners for tracking changes
- Serialization/deserialization of complex objects

### Story 1-6: Clipboard, WhatsApp, Fallback Download (COMPLETED)

**Key Learnings:**

- Async operations with loading states
- Toast notifications for feedback
- Error handling with fallbacks

**Relevant Code Patterns:**

```typescript
// Async pattern from story 1-6
const copyToClipboard = async () => {
  set({ isExporting: true })
  try {
    // Perform async operation
    set({ isExporting: false })
  } catch (error) {
    set({ isExporting: false })
    showToast('Error', 'error')
  }
}
```

## Git Intelligence

**Recent Commits (Last 5):**

1. `feat: implement undo/redo stack` (Story 1-7)
2. `feat: implement clipboard and whatsapp sharing` (Story 1-6)
3. `feat: implement colorthief palette extraction` (Story 1-5)
4. `feat: add safe zone overlay component` (Story 1-4)
5. `feat: implement file upload with size validation` (Story 1-3)

**Code Patterns Established:**

- Zustand store pattern
- React.lazy + Suspense for code splitting
- Async operations with loading states
- Error handling with fallbacks

## Implementation Checklist

### Phase 1: Route-Based Code Splitting

- [ ] Configure TanStack Router with lazy routes
- [ ] Create separate route files for editor, templates, help
- [ ] Test route loading and navigation
- [ ] Verify chunk files generated

### Phase 2: Component-Based Code Splitting

- [ ] Wrap heavy components with React.lazy
- [ ] Add Suspense boundaries with fallbacks
- [ ] Test component loading on mount
- [ ] Verify component chunks generated

### Phase 3: Library Loaders

- [ ] Create `src/lib/fabric-loader.ts`
- [ ] Create `src/lib/colorthief-loader.ts`
- [ ] Implement caching for loaders
- [ ] Test dynamic imports

### Phase 4: Vite Configuration

- [ ] Configure manual chunks in vite.config.ts
- [ ] Setup bundle analyzer (visualizer)
- [ ] Configure chunk size warnings
- [ ] Test build output

### Phase 5: Loading States

- [ ] Create LoadingSpinner component
- [ ] Create SkeletonLoader component
- [ ] Add Suspense fallbacks to all lazy components
- [ ] Test loading states on slow network

### Phase 6: Error Handling

- [ ] Create ErrorBoundary component
- [ ] Add error handling to loaders
- [ ] Test error states
- [ ] Implement retry logic

### Phase 7: Performance Testing

- [ ] Measure TTI on 4G network
- [ ] Verify bundle sizes
- [ ] Run Lighthouse audit
- [ ] Compare before/after metrics

### Phase 8: Testing

- [ ] Unit tests for loaders
- [ ] Integration tests for route navigation
- [ ] Performance tests
- [ ] Manual testing on real devices

## Known Constraints & Considerations

### Browser Compatibility

| Browser      | Dynamic Import | Code Splitting | Status          |
| ------------ | -------------- | -------------- | --------------- |
| Chrome 63+   | ✅             | ✅             | Fully supported |
| Safari 11.1+ | ✅             | ✅             | Fully supported |
| Firefox 67+  | ✅             | ✅             | Fully supported |
| Edge 79+     | ✅             | ✅             | Fully supported |

### Performance Considerations

1. **Network Latency**
   - Lazy loading adds latency when accessing features
   - Preload on intent (hover/focus) to mitigate
   - Consider preloading on home page for common routes

2. **Parsing Time**
   - Large libraries (Fabric.js) take time to parse
   - Show loading indicator during parsing
   - Monitor main thread blocking

3. **Memory Usage**
   - Lazy loading reduces initial memory
   - Total memory same when all libraries loaded
   - Monitor for memory leaks

### Edge Cases

1. **Rapid Route Navigation**
   - User navigates away before chunk loads
   - Abort pending requests to avoid memory leaks
   - Handle race conditions

2. **Offline Loading**
   - Lazy loading fails if offline
   - Show error message
   - Provide retry option

3. **Slow Network**
   - Loading takes longer on 3G/4G
   - Show progress indicator
   - Consider timeout handling

## Success Metrics

1. **Performance**
   - Initial TTI < 2 seconds on 4G network
   - Initial bundle < 150KB gzipped
   - Total bundle < 250KB gzipped
   - No performance regression when all features used

2. **User Experience**
   - App shell loads immediately
   - Loading indicators clear and informative
   - Smooth transitions between loaded states
   - No blocking operations

3. **Code Quality**
   - All lazy components have Suspense boundaries
   - All loaders have error handling
   - Unit test coverage > 80%
   - Integration tests cover all routes

4. **Bundle Analysis**
   - Separate chunks for routes
   - Separate chunks for heavy components
   - Separate chunks for heavy libraries
   - No duplicate code across chunks

## References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (NFR2, NFR3)
- **Architecture**: `_bmad-output/planning-artifacts/architecture-decision-document.md` (Bundle Size Budget & Code-Splitting)
- **Vite Docs**: https://vitejs.dev/guide/code-splitting.html
- **React.lazy**: https://react.dev/reference/react/lazy
- **TanStack Router**: https://tanstack.com/router/latest
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse

---

**Story Status**: ready-for-dev  
**Created**: 2026-05-10T03:56:00.000Z  
**Last Updated**: 2026-05-10T03:56:00.000Z
