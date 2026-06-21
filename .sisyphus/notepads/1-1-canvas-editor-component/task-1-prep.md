# Dev Story: 1-1 Canvas Editor Component

# Model: intermediate

# Language: Bahasa Indonesia

## 1. TASK

Implement Task 1: Create CanvasEditor Component Structure

**Subtasks:**

- [ ] Create `src/components/CanvasEditor/index.tsx` main component
- [ ] Set up Fabric.js Canvas initialization with useRef pattern
- [ ] Configure canvas dimensions: 375×500px mobile, 100% width desktop
- [ ] Implement canvas cleanup in useEffect return function
- [ ] AC: #1, #6

## 2. EXPECTED OUTCOME

- [ ] Files created: `src/components/CanvasEditor/index.tsx`
- [ ] Fabric.js canvas initialized with useRef (NOT useState)
- [ ] Canvas dimensions: 375×500px on mobile, 100% width on desktop
- [ ] Background color: #FFFFFF
- [ ] Cleanup function with `canvas.dispose()` in useEffect
- [ ] Canvas accessible via `role="application"`, `aria-label="Image editor canvas"`
- [ ] Tests pass: `bun run test`

## 3. REQUIRED TOOLS

- Read: Existing project structure
- Write: Create CanvasEditor component file
- Bash: Install fabric@6.4.3 if not present
- LSP: Check TypeScript diagnostics
- Bash: Run tests with `bun run test`

## 4. MUST DO

- Follow architecture patterns from Dev Notes
- Use `useRef` for Fabric.js canvas instance (CRITICAL)
- Use selective import from `fabric/es` to optimize bundle size
- Implement cleanup in useEffect return function
- Set canvas dimensions: 375×500px mobile, responsive desktop
- Add ARIA attributes for accessibility
- Write tests for canvas initialization and cleanup
- Append findings to notepad

## 5. MUST NOT DO

- DO NOT use `useState` for Fabric.js canvas
- DO NOT use full Fabric.js import (use `fabric/es`)
- DO NOT skip `canvas.dispose()` cleanup
- DO NOT hardcode dimensions - use responsive values
- DO NOT make any network calls

## 6. CONTEXT

### Notepad Paths

- READ: .sisyphus/notepads/1-1-canvas-editor-component/\*.md
- WRITE: Append to appropriate category

### Inherited Wisdom

- Project uses `@/` path alias for src/
- Use `cn()` utility from `@/lib/utils` for className merging
- Tailwind CSS v4.2.4 with `@tailwindcss/vite` plugin
- TypeScript strict mode enabled
- Use `bun --bun run` for all commands
- Component exports: `export function ComponentName()`

### Dependencies

- Fabric.js v6.4.3 (CRITICAL - exact version)
- Zustand v5.0.0+ for state management
- React 19.2.5
- TypeScript 6.0.3

### Architecture Patterns

```typescript
// Canvas initialization pattern
useEffect(() => {
  if (!canvasRef.current) return

  const canvas = new Canvas(canvasRef.current, {
    width: 1080,
    height: 1920,
    backgroundColor: '#ffffff',
    selection: true,
    preserveObjectStacking: true,
  })

  initCanvas(canvas)

  return () => {
    disposeCanvas()
    canvas.dispose() // CRITICAL
    canvasRef.current = null
  }
}, [initCanvas, disposeCanvas])
```

### BCA Brand Colors

- Gold: #C8A96A
- Deep Navy: #0B1F3A
- Sapphire Blue: #1E3A5F
- Carbon Black: #1A1A1A
- Quartz White: #F4F1EC
