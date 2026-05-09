# Troubleshooting Guide

## Common Issues & Solutions

### Development Server Issues

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5173`

**Solution**:

macOS/Linux:

```bash
# Find process using port 5173
lsof -ti:5173

# Kill the process
lsof -ti:5173 | xargs kill -9
```

Windows:

```bash
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Then restart dev server:

```bash
bun run dev
```

#### Hot Module Replacement Not Working

**Problem**: Changes to files don't reflect in browser

**Solutions**:

1. **Check if file is being saved**:
   - Verify file is saved (look for dot indicator in editor)
   - Check file permissions

2. **Restart dev server**:

   ```bash
   # Stop: Ctrl+C
   bun run dev
   ```

3. **Clear browser cache**:
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty cache and hard refresh"

4. **Check Vite config**:
   - Verify `vite.config.ts` is correct
   - Check for syntax errors

#### Module Not Found Error

**Problem**: `Module not found: Error: Can't resolve '@/components/...'`

**Solutions**:

1. **Check file path**:
   - Verify file exists at specified path
   - Check spelling and case sensitivity

2. **Check tsconfig.json**:

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     }
   }
   ```

3. **Check vite.config.ts**:

   ```typescript
   import react from '@vitejs/plugin-react'
   import { defineConfig } from 'vite'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   })
   ```

### Build Issues

#### Build Fails with TypeScript Errors

**Problem**: `error TS2322: Type 'X' is not assignable to type 'Y'`

**Solutions**:

1. **Check TypeScript errors**:

   ```bash
   npx tsc --noEmit
   ```

2. **Fix type errors**:
   - Review error message
   - Check type definitions
   - Update code to match types

3. **Check tsconfig.json**:
   - Verify `strict: true` is set
   - Check `target` and `module` settings

#### Build Output Too Large

**Problem**: Bundle size > 250KB gzipped

**Solutions**:

1. **Analyze bundle**:

   ```bash
   npm run build:analyze
   ```

2. **Identify large dependencies**:
   - Check `node_modules` sizes
   - Look for duplicate dependencies

3. **Optimize**:
   - Remove unused dependencies
   - Use tree-shaking
   - Lazy load heavy components
   - Enable gzip compression

#### Out of Memory During Build

**Problem**: `JavaScript heap out of memory`

**Solutions**:

1. **Increase Node memory**:

   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 bun run build
   ```

2. **Clear cache**:

   ```bash
   rm -rf node_modules dist
   bun install
   bun run build
   ```

3. **Check for memory leaks**:
   - Review recent code changes
   - Check for circular dependencies

### Runtime Issues

#### Canvas Not Rendering

**Problem**: Canvas appears blank or doesn't display

**Solutions**:

1. **Check canvas element**:

   ```typescript
   const canvas = document.getElementById('canvas')
   if (!canvas) {
     console.error('Canvas element not found')
   }
   ```

2. **Check Fabric.js initialization**:

   ```typescript
   const fabricCanvas = new Canvas('canvas', {
     width: 1080,
     height: 1920,
   })
   console.log('Canvas initialized:', fabricCanvas)
   ```

3. **Check browser console**:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

4. **Verify canvas size**:
   - Check CSS doesn't hide canvas
   - Verify width/height attributes

#### Objects Not Appearing on Canvas

**Problem**: Added objects don't show on canvas

**Solutions**:

1. **Check object properties**:

   ```typescript
   const object = fabricCanvas.getActiveObject()
   console.log('Active object:', object)
   ```

2. **Check object visibility**:
   - Verify `opacity` > 0
   - Verify `visible: true`
   - Check `fill` color is not transparent

3. **Check canvas rendering**:

   ```typescript
   fabricCanvas.renderAll()
   ```

4. **Check z-index**:
   - Verify object is not behind other objects
   - Check `zIndex` property

#### Undo/Redo Not Working

**Problem**: Undo/Redo buttons don't work

**Solutions**:

1. **Check history store**:

   ```typescript
   const { undoStack, redoStack } = useHistoryStore()
   console.log('Undo stack:', undoStack)
   console.log('Redo stack:', redoStack)
   ```

2. **Check history is being saved**:

   ```typescript
   const { pushHistory } = useHistoryStore()
   // Call pushHistory before making changes
   ```

3. **Check keyboard shortcuts**:
   - Verify Ctrl+Z / Cmd+Z works
   - Check for conflicting shortcuts

4. **Clear history and try again**:
   ```typescript
   const { clearHistory } = useHistoryStore()
   clearHistory()
   ```

#### Clipboard Copy Not Working

**Problem**: Copy to clipboard fails

**Solutions**:

1. **Check browser support**:

   ```typescript
   if (!navigator.clipboard) {
     console.error('Clipboard API not supported')
   }
   ```

2. **Check HTTPS**:
   - Clipboard API requires HTTPS (except localhost)
   - Verify site is served over HTTPS

3. **Check permissions**:
   - Browser may ask for clipboard permission
   - Verify permission is granted

4. **Check canvas state**:

   ```typescript
   const { fabricCanvas } = useCanvasStore()
   if (!fabricCanvas) {
     console.error('Canvas not initialized')
   }
   ```

5. **Use fallback**:
   ```typescript
   try {
     await copyCanvasToClipboard(fabricCanvas)
   } catch (error) {
     // Fallback to download
     downloadCanvas(fabricCanvas)
   }
   ```

### Performance Issues

#### Slow Initial Load

**Problem**: Page takes > 2 seconds to load

**Solutions**:

1. **Run Lighthouse audit**:
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Click "Analyze page load"
   - Review recommendations

2. **Check bundle size**:

   ```bash
   ls -lh dist/
   ```

3. **Optimize images**:
   - Use optimized image formats
   - Compress images
   - Use responsive images

4. **Lazy load components**:

   ```typescript
   const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

   <Suspense fallback={<Skeleton />}>
     <HeavyComponent />
   </Suspense>
   ```

5. **Enable compression**:
   - Enable gzip on server
   - Enable brotli compression

#### Slow Canvas Interactions

**Problem**: Canvas operations are slow/laggy

**Solutions**:

1. **Check number of objects**:

   ```typescript
   const { objects } = useCanvasStore()
   console.log('Number of objects:', objects.length)
   ```

2. **Reduce object count**:
   - Limit to < 100 objects
   - Remove unused objects
   - Merge objects if possible

3. **Optimize rendering**:

   ```typescript
   fabricCanvas.renderOnAddRemove = false
   // ... make changes ...
   fabricCanvas.renderAll()
   ```

4. **Profile with DevTools**:
   - Open DevTools (F12)
   - Go to Performance tab
   - Record interaction
   - Analyze bottlenecks

#### Memory Leak

**Problem**: Memory usage increases over time

**Solutions**:

1. **Check for event listener leaks**:

   ```typescript
   // Always cleanup listeners
   useEffect(() => {
     const handler = () => {
       /* ... */
     }
     element.addEventListener('click', handler)

     return () => {
       element.removeEventListener('click', handler)
     }
   }, [])
   ```

2. **Check for canvas cleanup**:

   ```typescript
   useEffect(() => {
     return () => {
       fabricCanvas?.dispose()
     }
   }, [fabricCanvas])
   ```

3. **Check for URL leaks**:

   ```typescript
   useEffect(() => {
     const url = URL.createObjectURL(blob)
     return () => {
       URL.revokeObjectURL(url)
     }
   }, [blob])
   ```

4. **Profile with DevTools**:
   - Open DevTools (F12)
   - Go to Memory tab
   - Take heap snapshot
   - Look for retained objects

### Browser Compatibility Issues

#### Feature Not Working in Safari

**Problem**: Feature works in Chrome but not Safari

**Solutions**:

1. **Check browser support**:
   - Visit [caniuse.com](https://caniuse.com)
   - Search for feature
   - Check Safari version support

2. **Use polyfills**:

   ```typescript
   // Example: Clipboard API polyfill
   if (!navigator.clipboard) {
     // Provide fallback implementation
   }
   ```

3. **Test in Safari**:
   - Use Safari DevTools
   - Check console for errors
   - Test on actual device

#### Feature Not Working in Firefox

**Problem**: Feature works in Chrome but not Firefox

**Solutions**:

1. **Check Firefox support**:
   - Visit [caniuse.com](https://caniuse.com)
   - Check Firefox version support

2. **Check for vendor prefixes**:

   ```css
   /* Example: CSS property with vendor prefix */
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   ```

3. **Test in Firefox**:
   - Use Firefox DevTools
   - Check console for errors

### Accessibility Issues

#### Screen Reader Not Announcing Content

**Problem**: Screen reader doesn't announce content

**Solutions**:

1. **Check ARIA labels**:

   ```tsx
   <button aria-label="Delete object">
     <TrashIcon />
   </button>
   ```

2. **Check semantic HTML**:

   ```tsx
   // ✅ Good
   <button>Click me</button>

   // ❌ Bad
   <div onClick={handleClick}>Click me</div>
   ```

3. **Check live regions**:

   ```tsx
   <div role="status" aria-live="polite">
     {message}
   </div>
   ```

4. **Test with screen reader**:
   - Use NVDA (Windows) or JAWS
   - Use VoiceOver (macOS)
   - Test keyboard navigation

#### Keyboard Navigation Not Working

**Problem**: Can't navigate with Tab key

**Solutions**:

1. **Check focus management**:

   ```tsx
   <button autoFocus>Click me</button>
   ```

2. **Check tabindex**:

   ```tsx
   <div tabIndex={0}>Focusable element</div>
   ```

3. **Check keyboard handlers**:

   ```tsx
   <input
     onKeyDown={(e) => {
       if (e.key === 'Enter') {
         handleSubmit()
       }
     }}
   />
   ```

4. **Test keyboard navigation**:
   - Press Tab to navigate
   - Press Shift+Tab to go back
   - Press Enter to activate

#### Color Contrast Issues

**Problem**: Text not readable due to low contrast

**Solutions**:

1. **Check contrast ratio**:

   ```typescript
   import { getContrastRatio, meetsWCAGAA } from '@/lib/contrast'

   const ratio = getContrastRatio('#C8A96A', '#FFFFFF')
   if (!meetsWCAGAA(ratio)) {
     console.warn('Low contrast ratio:', ratio)
   }
   ```

2. **Increase contrast**:
   - Use darker text on light backgrounds
   - Use lighter text on dark backgrounds
   - Target 4.5:1 ratio for normal text

3. **Test with tools**:
   - Use WebAIM Contrast Checker
   - Use Lighthouse audit
   - Use browser extensions

## Debug Techniques

### Enable Debug Logging

```typescript
// In browser console
localStorage.setItem('DEBUG', 'true')

// In code
if (localStorage.getItem('DEBUG')) {
  console.log('Debug info:', data)
}
```

### Use React DevTools

1. Install React DevTools extension
2. Open DevTools (F12)
3. Go to Components tab
4. Inspect component tree
5. Check props and state

### Use Zustand DevTools

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

### Use Browser DevTools

1. **Console**: Check for errors and logs
2. **Network**: Monitor requests (should be none)
3. **Performance**: Profile rendering
4. **Memory**: Check for leaks
5. **Storage**: Check localStorage usage

### Add Logging

```typescript
// Add logging to track execution
console.log('Component mounted')
console.log('Canvas initialized:', fabricCanvas)
console.log('Object added:', objectId)
```

## Getting Help

1. **Check this guide** - Most issues are covered here
2. **Check [SETUP.md](./SETUP.md)** - For setup issues
3. **Check [DEPLOYMENT.md](./DEPLOYMENT.md)** - For deployment issues
4. **Review GitHub issues** - Search for similar issues
5. **Check project documentation** - In `docs/` folder

## Reporting Issues

When reporting an issue, include:

1. **Environment**:
   - OS (Windows, macOS, Linux)
   - Browser (Chrome, Firefox, Safari)
   - Node.js version
   - Package manager (bun, npm)

2. **Steps to reproduce**:
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Error message**:
   - Full error message
   - Stack trace
   - Console logs

4. **Screenshots/Videos**:
   - Visual evidence of issue
   - DevTools console output

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
