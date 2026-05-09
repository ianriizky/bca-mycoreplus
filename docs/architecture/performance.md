# Performance Optimization

## Performance Targets

| Metric                         | Target        | Current        |
| ------------------------------ | ------------- | -------------- |
| Initial Load                   | < 2 seconds   | ~1.5s          |
| Time to Interactive (TTI)      | < 2 seconds   | ~1.8s          |
| First Contentful Paint (FCP)   | < 1 second    | ~0.8s          |
| Largest Contentful Paint (LCP) | < 2.5 seconds | ~1.2s          |
| Cumulative Layout Shift (CLS)  | < 0.1         | ~0.05          |
| Bundle Size (gzipped)          | < 250KB       | ~102KB initial |

## Bundle Analysis

### Initial Bundle

```
React + Vite:        ~40KB
Fabric.js:           ~35KB
Tailwind CSS:        ~15KB
Other libraries:     ~12KB
─────────────────────────
Total:              ~102KB gzipped
```

### Full Bundle (with all features)

```
Initial:            ~102KB
ColorThief:         ~50KB
Additional libs:    ~98KB
─────────────────────────
Total:              ~250KB gzipped
```

## Code Splitting Strategy

### Route-Based Splitting

```typescript
// Automatic with TanStack Router
const EditorPage = lazy(() => import('./routes/editor.tsx'))
const HelpPage = lazy(() => import('./routes/help.tsx'))
const AboutPage = lazy(() => import('./routes/about.tsx'))
```

### Component-Based Splitting

```typescript
// Lazy load heavy components
const ColorPalette = lazy(() => import('./components/ColorPalette'))
const TemplateLibrary = lazy(() => import('./components/TemplateLibrary'))

// Use Suspense for fallback
<Suspense fallback={<Skeleton />}>
  <ColorPalette />
</Suspense>
```

### Library-Based Splitting

```typescript
// Dynamic import for heavy libraries
const ColorThief = await import('colorthief')

// Only load when needed
if (needsColorExtraction) {
  const colors = await ColorThief.getPalette(image)
}
```

## Rendering Optimization

### React.memo for Expensive Components

```typescript
// Memoize components that don't need frequent updates
export const FloatingToolbar = React.memo(({ selectedObject }) => {
  return (
    <div className="toolbar">
      {/* Toolbar content */}
    </div>
  )
})
```

### useCallback for Event Handlers

```typescript
// Prevent function recreation on every render
const handleClick = useCallback(() => {
  updateObject(id, props)
}, [id, props])

return <button onClick={handleClick}>Update</button>
```

### useMemo for Expensive Calculations

```typescript
// Memoize expensive calculations
const contrastRatio = useMemo(() => {
  return getContrastRatio(color1, color2)
}, [color1, color2])
```

### Selective Zustand Subscriptions

```typescript
// Only subscribe to needed properties
const selectedObjectId = useCanvasStore((state) => state.selectedObjectId)

// Instead of
const { selectedObjectId, fabricCanvas, objects } = useCanvasStore()
```

## Canvas Optimization

### Batch Rendering

```typescript
// Disable rendering during multiple changes
fabricCanvas.renderOnAddRemove = false

// Make multiple changes
addObject('text', { text: 'Hello' })
addObject('image', { src: 'image.jpg' })

// Render once
fabricCanvas.renderAll()
```

### Object Pooling

```typescript
// Reuse objects instead of creating new ones
const objectPool: FabricObject[] = []

function getObject(type: string) {
  return objectPool.pop() || createNewObject(type)
}

function releaseObject(object: FabricObject) {
  objectPool.push(object)
}
```

### Limit Object Count

```typescript
// Warn when too many objects
const MAX_OBJECTS = 100

if (objects.length >= MAX_OBJECTS) {
  showToast('Too many objects, performance may degrade', 'warning')
}
```

## Memory Management

### Canvas Cleanup

```typescript
// Always dispose canvas on unmount
useEffect(() => {
  const canvas = new Canvas('canvas', { width: 1080, height: 1920 })
  setFabricCanvas(canvas)

  return () => {
    canvas.dispose()
  }
}, [])
```

### URL Object Cleanup

```typescript
// Revoke object URLs after use
useEffect(() => {
  const url = URL.createObjectURL(blob)

  return () => {
    URL.revokeObjectURL(url)
  }
}, [blob])
```

### Event Listener Cleanup

```typescript
// Always remove event listeners
useEffect(() => {
  const handler = (e: Event) => {
    /* ... */
  }
  element.addEventListener('click', handler)

  return () => {
    element.removeEventListener('click', handler)
  }
}, [])
```

### Bounded History Stack

```typescript
// Limit undo/redo to 10 states
const MAX_HISTORY = 10

const pushHistory = (state: CanvasState) => {
  set((store) => ({
    undoStack: [state, ...store.undoStack].slice(0, MAX_HISTORY),
    redoStack: [],
  }))
}
```

## Network Optimization

### Zero Network Requests

✅ **No API calls**: All processing client-side
✅ **No external resources**: No external images or fonts
✅ **No analytics**: No tracking or telemetry
✅ **No CDN**: All assets bundled

### Asset Optimization

```typescript
// Vite automatically optimizes:
// - Images (compression)
// - CSS (minification)
// - JavaScript (minification)
// - Source maps (optional)
```

## CSS Optimization

### Tailwind CSS Purging

```typescript
// Tailwind automatically removes unused CSS
// Only includes classes used in code
// Result: ~15KB gzipped
```

### Critical CSS

```typescript
// Inline critical CSS for faster FCP
<style>
  /* Critical styles for above-the-fold content */
</style>
```

## JavaScript Optimization

### Tree Shaking

```typescript
// Import only what you need
import { getContrastRatio } from '@/lib/contrast'

// Instead of
import * as contrast from '@/lib/contrast'
```

### Minification

```typescript
// Vite automatically minifies in production
// Removes comments, whitespace, unused code
```

### Dead Code Elimination

```typescript
// Remove unused code before bundling
// Use ESLint to find unused variables
```

## Profiling & Monitoring

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review metrics:
   - Performance: Target 90+
   - Accessibility: Target 90+
   - Best Practices: Target 90+
   - SEO: Target 90+

### React DevTools Profiler

```typescript
// Profile component rendering
1. Open React DevTools
2. Go to Profiler tab
3. Record interaction
4. Analyze render times
5. Identify slow components
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build:analyze

# View interactive visualization
# Identify large dependencies
# Find optimization opportunities
```

### Performance Metrics

```typescript
// Measure Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## Optimization Checklist

### Development

- [ ] Use React.memo for expensive components
- [ ] Use useCallback for event handlers
- [ ] Use useMemo for expensive calculations
- [ ] Lazy load heavy components
- [ ] Avoid unnecessary re-renders

### Build

- [ ] Enable code splitting
- [ ] Enable minification
- [ ] Enable gzip compression
- [ ] Optimize images
- [ ] Remove source maps (optional)

### Deployment

- [ ] Enable HTTP/2
- [ ] Enable gzip compression
- [ ] Set cache headers
- [ ] Use CDN for static assets
- [ ] Monitor Core Web Vitals

### Monitoring

- [ ] Run Lighthouse audit
- [ ] Monitor bundle size
- [ ] Profile with DevTools
- [ ] Check memory usage
- [ ] Test on slow networks

## Performance Tips

### 1. Lazy Load Components

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

### 2. Debounce Input Handlers

```typescript
const debouncedUpdate = debounce((id, props) => {
  updateObject(id, props)
}, 300)

<input onChange={(e) => debouncedUpdate(id, { text: e.target.value })} />
```

### 3. Memoize Expensive Calculations

```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b)
}, [a, b])
```

### 4. Use Production Build

```bash
# Always use production build for testing
bun run build
bun run preview
```

### 5. Monitor Real User Metrics

```typescript
// Track actual user experience
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0]
  console.log('Load time:', perfData.loadEventEnd - perfData.loadEventStart)
})
```

## Common Performance Issues

### Issue: Slow Initial Load

**Cause**: Large bundle size or slow network

**Solution**:

1. Analyze bundle with `npm run build:analyze`
2. Remove unused dependencies
3. Enable code splitting
4. Enable gzip compression

### Issue: Slow Canvas Interactions

**Cause**: Too many objects or expensive operations

**Solution**:

1. Limit objects to < 100
2. Batch render operations
3. Use requestAnimationFrame for animations
4. Profile with DevTools

### Issue: Memory Leak

**Cause**: Event listeners or objects not cleaned up

**Solution**:

1. Always cleanup in useEffect
2. Dispose canvas on unmount
3. Revoke object URLs
4. Profile with DevTools Memory tab

### Issue: Janky Animations

**Cause**: Blocking main thread

**Solution**:

1. Use requestAnimationFrame
2. Offload to Web Worker
3. Use CSS animations
4. Profile with DevTools Performance tab

## References

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [React Performance](https://react.dev/reference/react/useMemo)
- [Vite Performance](https://vitejs.dev/guide/features.html)

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
