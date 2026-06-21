# State Management Research for BCA MyCore+ (React 19 + Fabric.js)

**Date**: 2026-05-09  
**Project**: BCA MyCore+ Web Application  
**Tech Stack**: React 19.2.5, TypeScript 6.0.3, Vite 8.0.10, TailwindCSS 4.2.4, Fabric.js

---

## Executive Summary

Research compares Zustand, Jotai, Valtio, and React Context for React 19 + Fabric.js canvas state synchronization. Zustand recommended as primary choice with Jotai as secondary for atomic UI state.

---

## 1. Zustand

### Bundle Size

| Metric             | Value               |
| ------------------ | ------------------- |
| Gzipped            | **1.2KB** (minimal) |
| Minified           | ~4KB                |
| npm downloads/week | ~7.8M               |

Source: [PkgPulse State Management 2026](https://www.pkgpulse.com/blog/state-management-2026)

### API Pattern

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CanvasState {
  // Canvas state
  objects: FabricObject[]
  selectedId: string | null

  // Actions
  addObject: (obj: FabricObject) => void
  removeObject: (id: string) => void
  updateObject: (id: string, props: Partial<FabricObject>) => void
  setSelected: (id: string | null) => void
}

export const useCanvasStore = create<CanvasState>()(
  devtools(
    persist(
      (set) => ({
        objects: [],
        selectedId: null,

        addObject: (obj) =>
          set((state) => ({
            objects: [...state.objects, obj],
          })),

        removeObject: (id) =>
          set((state) => ({
            objects: state.objects.filter((o) => o.id !== id),
          })),

        updateObject: (id, props) =>
          set((state) => ({
            objects: state.objects.map((o) => (o.id === id ? { ...o, ...props } : o)),
          })),

        setSelected: (id) => set({ selectedId: id }),
      }),
      { name: 'canvas-storage' },
    ),
  ),
)
```

### Key Features

- **No Provider needed** - direct hook usage
- **Selective subscriptions** - `useStore((s) => s.property)` minimizes re-renders
- **TypeScript** - first-class support with type inference
- **Middleware ecosystem** - persist, devtools, immer, redux
- **Works outside React** - `store.getState()`, `store.setState()`, `store.subscribe()`
- **React 19** - v5.0.0+ fully compatible (confirmed via [GitHub #2841](https://github.com/pmndrs/zustand/issues/2841))

### DevTools

Zustand integrates with Redux DevTools for time-travel debugging.

---

## 2. Jotai

### Bundle Size

| Metric             | Value            |
| ------------------ | ---------------- |
| Gzipped            | **2.5KB** (core) |
| Minified           | ~8KB             |
| npm downloads/week | ~2.1M            |

Source: [PkgPulse State Management 2026](https://www.pkgpulse.com/blog/state-management-2026)

### API Pattern (Atomic Model)

```typescript
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Primitive atoms
const objectsAtom = atom<FabricObject[]>([])
const selectedIdAtom = atom<string | null>(null)

// Derived atoms (computed)
const selectedObjectAtom = atom((get) => {
  const objects = get(objectsAtom)
  const selectedId = get(selectedIdAtom)
  return objects.find((o) => o.id === selectedId) ?? null
})

// Write-only atom for actions
const addObjectAtom = atom(null, (get, set, obj: FabricObject) => {
  set(objectsAtom, [...get(objectsAtom), obj])
})

// Persisted atom
const persistedObjectsAtom = atomWithStorage<FabricObject[]>('canvas-objects', [])

// Usage in component
function CanvasObjects() {
  const objects = useAtomValue(objectsAtom)
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom)

  return (
    <div>
      {objects.map((obj) => (
        <div
          key={obj.id}
          onClick={() => setSelectedId(obj.id)}
          data-selected={obj.id === selectedId}
        />
      ))}
    </div>
  )
}
```

### Key Features

- **Atomic model** - independent state pieces, composed bottom-up
- **Fine-grained reactivity** - only atom-reading components re-render
- **Async atoms** - native support for async operations
- **SSR support** - `jotai-ssr` package for hydration, RSC-compatible via `HydrationBoundary`
- **React 19** - compatible (peer dep: `react >=18.0.0`)

### Jotai SSR/RSC Pattern

```typescript
// Hydrating atoms from server
import { HydrationBoundary } from 'jotai-ssr'

function Page({ initialData }) {
  return (
    <HydrationBoundary hydrate={[[objectsAtom, initialData.objects]]}>
      <CanvasApp />
    </HydrationBoundary>
  )
}
```

---

## 3. Valtio

### Bundle Size

| Metric             | Value          |
| ------------------ | -------------- |
| Gzipped            | **3KB** (core) |
| Minified           | ~10KB          |
| npm downloads/week | ~800K          |

Source: [PkgPulse State Management 2026](https://www.pkgpulse.com/blog/state-management-2026)

### API Pattern (Proxy Model)

```typescript
import { proxy, snapshot } from 'valtio'
import { useSnapshot } from 'valtio/react'

// Mutable proxy state
const state = proxy({
  objects: [] as FabricObject[],
  selectedId: null as string | null,
})

// Add object
state.objects.push(newObj)

// In component
function CanvasObjects() {
  const snap = useSnapshot(state)

  return (
    <div>
      {snap.objects.map((obj) => (
        <div key={obj.id} data-selected={obj.id === snap.selectedId} />
      ))}
    </div>
  )
}
```

### Key Features

- **Mutable state** - directly mutate `state.property = value`
- **Proxy-based** - automatic tracking of accessed properties
- **useSnapshot** - render-optimized hook, only re-renders on accessed property changes
- **Works outside React** - framework-agnostic core
- **DevTools** - `valtio/utils` provides Redux DevTools integration
- **React 19** - compatible (proxy-based, no hooks limitations)

### Canvas + Valtio Sync Pattern

```typescript
import { proxy, snapshot } from 'valtio'
import { useSnapshot } from 'valtio/react'

const canvasState = proxy({
  fabricCanvas: null as fabric.Canvas | null,
  objects: [] as SerializedObject[],
  selectedId: null as string | null,
})

// Initialize canvas with sync
function initCanvas(el: HTMLCanvasElement) {
  const fabricCanvas = new fabric.Canvas(el)
  canvasState.fabricCanvas = fabricCanvas

  // Sync canvas changes to Valtio state
  fabricCanvas.on('object:modified', () => {
    canvasState.objects = fabricCanvas.getObjects().map(serializeObject)
  })

  fabricCanvas.on('selection:created', (e) => {
    canvasState.selectedId = e.selected?.[0]?.id ?? null
  })
}

// React component
function CanvasToolbar() {
  const snap = useSnapshot(canvasState)

  const addCircle = () => {
    if (!snap.fabricCanvas) return
    const circle = new fabric.Circle({ radius: 50, fill: 'blue' })
    snap.fabricCanvas.add(circle)
    canvasState.objects.push(serializeObject(circle))
  }

  return <button onClick={addCircle}>Add Circle</button>
}
```

---

## 4. React Context + useReducer (Native)

### Bundle Size

| Metric             | Value              |
| ------------------ | ------------------ |
| Gzipped            | **0KB** (built-in) |
| Minified           | N/A                |
| npm downloads/week | N/A                |

### API Pattern

```typescript
import { createContext, useContext, useReducer, ReactNode } from 'react'
import { fabric } from 'fabric'

// Types
interface CanvasState {
  canvas: fabric.Canvas | null
  objects: SerializedObject[]
  selectedId: string | null
}

type CanvasAction =
  | { type: 'SET_CANVAS'; payload: fabric.Canvas }
  | { type: 'ADD_OBJECT'; payload: SerializedObject }
  | { type: 'REMOVE_OBJECT'; payload: string }
  | { type: 'UPDATE_OBJECT'; payload: { id: string; props: Partial<SerializedObject> } }
  | { type: 'SET_SELECTED'; payload: string | null }

// Reducer
function canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'SET_CANVAS':
      return { ...state, canvas: action.payload }
    case 'ADD_OBJECT':
      return { ...state, objects: [...state.objects, action.payload] }
    case 'REMOVE_OBJECT':
      return { ...state, objects: state.objects.filter((o) => o.id !== action.payload) }
    case 'UPDATE_OBJECT':
      return {
        ...state,
        objects: state.objects.map((o) =>
          o.id === action.payload.id ? { ...o, ...action.payload.props } : o
        ),
      }
    case 'SET_SELECTED':
      return { ...state, selectedId: action.payload }
    default:
      return state
  }
}

// Context
const CanvasContext = createContext<{
  state: CanvasState
  dispatch: React.Dispatch<CanvasAction>
} | null>(null)

// Provider
export function CanvasProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(canvasReducer, {
    canvas: null,
    objects: [],
    selectedId: null,
  })

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  )
}

// Hook
export function useCanvas() {
  const ctx = useContext(CanvasContext)
  if (!ctx) throw new Error('useCanvas must be used within CanvasProvider')
  return ctx
}
```

### Key Features

- **Zero bundle impact** - no external dependencies
- **Native React** - built-in Context + useReducer
- **Predictable** - pure reducer pattern with explicit actions
- **Debuggable** - Redux DevTools extension support possible
- **React 19** - fully supported (core React)

### Limitations

- **Provider wrapper required** - adds boilerplate
- **Global re-renders** - all consumers re-render on any state change
- **No selective subscription** - requires manual memoization (`useMemo`, `useCallback`)
- **Zombie child problem** - potential issue with concurrent rendering

---

## 5. Canvas + React State Synchronization Patterns

### Pattern A: Bidirectional Sync (Fabric ↔ React)

```typescript
// Zustand store for canvas state
const useCanvasStore = create<CanvasState>()((set, get) => ({
  objects: [],
  selectedId: null,
  fabricCanvas: null,

  initCanvas: (el: HTMLCanvasElement) => {
    const canvas = new fabric.Canvas(el)
    set({ fabricCanvas: canvas })

    // Sync Fabric → React
    canvas.on('object:added', () => {
      set({ objects: canvas.getObjects().map(serializeObject) })
    })
    canvas.on('object:removed', () => {
      set({ objects: canvas.getObjects().map(serializeObject) })
    })
    canvas.on('selection:created', (e) => {
      set({ selectedId: (e.selected?.[0] as any)?.id })
    })
    canvas.on('selection:cleared', () => {
      set({ selectedId: null })
    })
  },

  // React → Fabric (explicit)
  addObject: (obj) => {
    const { fabricCanvas } = get()
    if (!fabricCanvas) return
    fabricCanvas.add(fabric.Object.fromObject(obj))
    fabricCanvas.renderAll()
  },
}))
```

### Pattern B: Ref-Based (No External State)

```typescript
// Best for simple cases, avoids sync complexity
function CanvasEditor() {
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [, forceUpdate] = useReducer((n) => n + 1, 0)

  useLayoutEffect(() => {
    canvasRef.current = new fabric.Canvas(canvasRef.current!)
    const canvas = canvasRef.current

    canvas.on('after:render', forceUpdate)

    return () => {
      canvas.dispose()
    }
  }, [])

  const addShape = () => {
    canvasRef.current?.add(new fabric.Rect({
      left: 100, top: 100, width: 100, height: 100, fill: '#333'
    }))
  }

  // Access current state directly from canvas
  const getSelected = () => {
    const active = canvasRef.current?.getActiveObject()
    return active ? (active as any).id : null
  }

  return (
    <>
      <canvas ref={canvasRef} />
      <button onClick={addShape}>Add Shape</button>
    </>
  )
}
```

### Pattern C: Context + Ref Hybrid (Stack Overflow Pattern)

```typescript
// Canvas context with ref (best practice from Stack Overflow)
const FabricContext = createContext<{
  canvas: fabric.Canvas | null
  initCanvas: (el: HTMLCanvasElement) => void
}>(null)

export function FabricProvider({ children }) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)

  const initCanvas = useCallback((el: HTMLCanvasElement) => {
    const c = new fabric.Canvas(el, { /* options */ })
    setCanvas(c)
    return () => c.dispose()
  }, [])

  return (
    <FabricContext.Provider value={{ canvas, initCanvas }}>
      {children}
    </FabricContext.Provider>
  )
}
```

---

## 6. Bundle Size Comparison

| Library       | Gzipped Size | Minified Size | Weekly Downloads |
| ------------- | ------------ | ------------- | ---------------- |
| **Zustand**   | **1.2KB**    | ~4KB          | 7.8M             |
| **Jotai**     | **2.5KB**    | ~8KB          | 2.1M             |
| **Valtio**    | **3KB**      | ~10KB         | 800K             |
| Redux Toolkit | 11KB         | ~35KB         | 9.2M             |
| MobX          | 16KB         | ~50KB         | 1.1M             |
| React Context | 0KB          | N/A           | N/A (built-in)   |

Source: [PkgPulse State Management 2026](https://www.pkgpulse.com/blog/state-management-2026), [BuildPilot](https://trybuildpilot.com/386-zustand-vs-jotai-vs-valtio-2026)

### Performance (Render Time for Single Update)

| Library       | Update Time | Re-renders                       |
| ------------- | ----------- | -------------------------------- |
| Signals       | 2ms         | Only signal-reading components   |
| Jotai         | 5ms         | Only atom-reading components     |
| Valtio        | 6ms         | Only snapshot-reading components |
| Zustand       | 8ms         | Only subscribing components      |
| Redux Toolkit | 12ms        | All connected components         |

---

## 7. React 19 Compatibility

### Server Components Support

| Library           | RSC Compatible | Notes                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------ |
| **Zustand**       | ❌ Client only | Must use in Client Components with `"use client"`                        |
| **Jotai**         | ⚠️ Partial     | SSR utilities exist (`jotai-ssr`), RSC hydration via `HydrationBoundary` |
| **Valtio**        | ⚠️ Partial     | Proxy works outside React, but `useSnapshot` requires client context     |
| **React Context** | ⚠️ Partial     | Works in RSC for read-only, mutations require Client Components          |

### React 19 Specific Features

| Feature                  | Zustand | Jotai | Valro |
| ------------------------ | ------- | ----- | ----- |
| `use` hook compatibility | ✅      | ✅    | ✅    |
| Concurrent rendering     | ✅      | ✅    | ✅    |
| Suspense                 | ✅      | ✅    | ✅    |
| Server Actions           | ✅      | ✅    | ✅    |

### Zustand React 19 Status

- **v5.0.0+** - Full React 19 support (released 2024-10-14)
- Dependency update to `use-sync-external-store@1.4.0+` resolves React 19 compatibility
- Source: [GitHub Issue #2841](https://github.com/pmndrs/zustand/issues/2841)

### Jotai React 19 Status

- **v2.11.0+** - React 19 support via `peerDependencies: "react >=18.0.0"`
- SSR/RSC utilities available via `jotai-ssr` package

### Valtio React 19 Status

- Proxy-based approach avoids hooks versioning issues
- `useSnapshot` should work with React 19

---

## 8. TypeScript Support

| Library           | TypeScript     | Type Quality                                   |
| ----------------- | -------------- | ---------------------------------------------- |
| **Zustand**       | ✅ First-class | Excellent inference with `create<T>()` generic |
| **Jotai**         | ✅ First-class | Excellent with atom generics                   |
| **Valtio**        | ✅ First-class | Types through proxy inference                  |
| **React Context** | ✅ Built-in    | Standard React types                           |

### TypeScript Examples

**Zustand**:

```typescript
interface BearState {
  bears: number
  increase: (by: number) => void
}
const useStore = create<BearState>()((set) => ({ bears: 0, increase: (by) => set((s) => ({ bears: s.bears + by })) }))
// Full type safety on useStore
```

**Jotai**:

```typescript
const countAtom = atom<number>(0) // primitive type inference
const userAtom = atom<User | null>(null) // complex type inference
// Derived atoms fully typed
```

**Valtio**:

```typescript
const state = proxy<{ objects: FabricObject[] }>({ objects: [] })
// useSnapshot infers types
```

---

## 9. DevTools Support

| Library           | DevTools                      | Time Travel | State Inspection |
| ----------------- | ----------------------------- | ----------- | ---------------- |
| **Zustand**       | Redux DevTools                | ✅          | ✅               |
| **Jotai**         | ✅ Jotai DevTools             | ✅          | ✅               |
| **Valtio**        | Redux DevTools                | ✅          | ✅               |
| **React Context** | Redux DevTools (via enhancer) | ⚠️ Manual   | ⚠️ Manual        |

---

## 10. Recommendations for BCA MyCore+

### Primary: Zustand + Fabric.js

**Rationale**:

1. Smallest bundle (1.2KB) - critical for canvas-heavy app
2. Simple API - no Provider needed, direct hook usage
3. Selective subscriptions - only re-render on specific state changes
4. React 19 confirmed compatible (v5.0.0+)
5. Works outside React - canvas operations can update store directly
6. Massive community - 7.8M weekly downloads

### Secondary: Jotai for Atomic UI State

**Use case**: If you have many independent UI state pieces (toolbar state, panel visibility, selection modes)

**Rationale**:

1. Atomic model fits canvas objects perfectly
2. Fine-grained reactivity - only affected objects re-render
3. SSR/RSC support via `jotai-ssr`
4. Good for complex derived state

### Avoid: Valtio

**Rationale**: Proxy mutations feel intuitive but can lead to unexpected re-renders if property access isn't carefully managed.

### Avoid: Redux Toolkit

**Rationale**: 11KB bundle size, high boilerplate, overkill for canvas state management.

---

## 11. Implementation Strategy

### Recommended Architecture

```
src/
├── stores/
│   ├── canvasStore.ts      # Zustand - main canvas state
│   └── uiStore.ts          # Zustand - UI state (panels, modals)
├── hooks/
│   ├── useFabricCanvas.ts  # Fabric.js initialization
│   └── useCanvasSync.ts    # Bidirectional sync logic
└── components/
    └── Canvas/
        ├── CanvasEditor.tsx
        ├── Toolbar.tsx
        └── LayersPanel.tsx
```

### Canvas Store Pattern

```typescript
// stores/canvasStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { fabric } from 'fabric'

interface CanvasObject {
  id: string
  type: string
  left: number
  top: number
  // ... other serialized properties
}

interface CanvasState {
  // State
  fabricCanvas: fabric.Canvas | null
  objects: CanvasObject[]
  selectedId: string | null
  zoom: number

  // Actions
  initCanvas: (el: HTMLCanvasElement) => void
  disposeCanvas: () => void
  addObject: (obj: Partial<fabric.Object>) => void
  removeObject: (id: string) => void
  updateObject: (id: string, props: Partial<CanvasObject>) => void
  setSelected: (id: string | null) => void
  setZoom: (zoom: number) => void
}

export const useCanvasStore = create<CanvasState>()(
  devtools(
    persist(
      (set, get) => ({
        fabricCanvas: null,
        objects: [],
        selectedId: null,
        zoom: 1,

        initCanvas: (el) => {
          const canvas = new fabric.Canvas(el, {
            selection: true,
            preserveObjectStacking: true,
          })
          set({ fabricCanvas: canvas })

          // Sync Fabric events → Zustand
          canvas.on('object:added', () => {
            set({ objects: canvas.getObjects().map(serializeObject) })
          })
          canvas.on('object:removed', () => {
            set({ objects: canvas.getObjects().map(serializeObject) })
          })
          canvas.on('selection:created', (e) => {
            set({ selectedId: (e.selected?.[0] as any)?.id ?? null })
          })
          canvas.on('selection:cleared', () => {
            set({ selectedId: null })
          })
        },

        disposeCanvas: () => {
          const { fabricCanvas } = get()
          fabricCanvas?.dispose()
          set({ fabricCanvas: null, objects: [], selectedId: null })
        },

        addObject: (obj) => {
          const { fabricCanvas } = get()
          if (!fabricCanvas) return
          const fabricObj = new fabric.Object({ ...obj, id: generateId() })
          fabricCanvas.add(fabricObj)
          fabricCanvas.renderAll()
        },

        removeObject: (id) => {
          const { fabricCanvas } = get()
          if (!fabricCanvas) return
          const obj = fabricCanvas.getObjects().find((o) => (o as any).id === id)
          if (obj) {
            fabricCanvas.remove(obj)
            fabricCanvas.renderAll()
          }
        },

        updateObject: (id, props) => {
          const { fabricCanvas } = get()
          if (!fabricCanvas) return
          const obj = fabricCanvas.getObjects().find((o) => (o as any).id === id)
          if (obj) {
            obj.set(props)
            fabricCanvas.renderAll()
          }
        },

        setSelected: (id) => set({ selectedId: id }),
        setZoom: (zoom) => set({ zoom }),
      }),
      { name: 'canvas-storage' },
    ),
  ),
)

function serializeObject(obj: fabric.Object): CanvasObject {
  return {
    id: (obj as any).id ?? '',
    type: obj.type ?? '',
    left: obj.left ?? 0,
    top: obj.top ?? 0,
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
```

---

## 12. Conclusion

| Criteria             | Zustand      | Jotai        | Valtio       | React Context |
| -------------------- | ------------ | ------------ | ------------ | ------------- |
| Bundle Size          | ✅ 1.2KB     | ✅ 2.5KB     | ✅ 3KB       | ✅ 0KB        |
| React 19 Support     | ✅ Full      | ✅ Full      | ✅ Full      | ✅ Full       |
| TypeScript           | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Good       |
| DevTools             | ✅ Redux     | ✅ Jotai     | ✅ Redux     | ⚠️ Manual     |
| API Simplicity       | ✅ High      | ✅ High      | ✅ High      | ⚠️ Medium     |
| Selective Re-renders | ✅ Selector  | ✅ Atom      | ✅ Snapshot  | ❌ None       |
| Canvas Fit           | ✅ Excellent | ✅ Excellent | ✅ Good      | ⚠️ Manual     |

**Final Recommendation**: **Zustand** as primary state management solution. Smallest bundle, simple API, React 19 confirmed compatible, excellent TypeScript support. Use selective subscriptions to minimize re-renders in canvas-heavy components.

---

## Sources

1. [PkgPulse - State Management 2026](https://www.pkgpulse.com/blog/state-management-2026)
2. [BuildPilot - Zustand vs Jotai vs Valtio](https://trybuildpilot.com/386-zustand-vs-jotai-vs-valtio-2026)
3. [GitHub - Zustand React 19 Issue #2841](https://github.com/pmndrs/zustand/issues/2841)
4. [GitHub - Zustand v5.0.0 Release](https://github.com/pmndrs/zustand/releases/tag/v5.0.0)
5. [Zustand Official Docs](https://zustand.docs.pmnd.rs)
6. [Jotai Official Docs](https://jotai.org)
7. [Valtio Official Docs](https://valtio.pmnd.rs)
8. [Stack Overflow - Fabric.js React Context](https://stackoverflow.com/questions/73720497/fabric-js-in-react-context-api)
9. [jotai-ssr npm](https://www.npmjs.com/package/jotai-ssr)
