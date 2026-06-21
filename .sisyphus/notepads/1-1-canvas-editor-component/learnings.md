# Task 1 Findings: CanvasEditor Component

## Successful Approach

1. **Fabric.js Import**: Used selective import from `fabric/es` as required
   - `import { Canvas } from 'fabric/es'`

2. **useRef Pattern**: Correctly used `useRef<HTMLCanvasElement>` and `useRef<Canvas | null>` for Fabric.js instance

3. **Canvas Dimensions**: Set 375×500px (mobile-first per UX spec)

4. **Cleanup Pattern**: Proper cleanup in useEffect return:

   ```typescript
   return () => {
     fabricCanvasRef.current?.dispose()
     fabricCanvasRef.current = null
   }
   ```

5. **Testing**: Created test file in correct location `tests/int/jsdom/canvas-editor/CanvasEditor.int.spec.tsx`

## Gotchas Encountered

1. **fabric/es types**: TypeScript may warn about missing declaration file for `fabric/es`. This is a known Fabric.js issue - ignore if no actual type errors.

2. **Vitest mock with new operator**: `vi.mockReturnValue` doesn't work with `new`. Must use class pattern:

   ```typescript
   vi.mock('fabric/es', () => {
     class MockCanvas {
       dispose = vi.fn()
     }
     return { Canvas: MockCanvas }
   })
   ```

3. **Test file location**: Tests must be in `tests/int/jsdom/**/*.int.spec.tsx` to match vitest config include pattern.

4. **@testing-library/react**: Required installing `@testing-library/react` as dev dependency.

## Dependencies Added

- `@testing-library/react@16.3.2`

## Files Created

- `src/components/CanvasEditor/index.tsx`
- `tests/int/jsdom/canvas-editor/CanvasEditor.int.spec.tsx`
