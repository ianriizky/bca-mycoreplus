# Task 5: BCA MyCore+ Codebase Exploration Report

## 1. Directory Structure

```
src/
├── main.tsx           # App entry point
├── router.ts         # TanStack Router configuration
├── routeTree.gen.ts  # Auto-generated route tree (do not edit)
├── globals.css       # Global styles with Tailwind v4
├── routes/
│   ├── __root.tsx    # Root layout route
│   ├── index.tsx     # Home page route (/)
│   └── about.tsx     # About page route (/about)
└── assets/           # Static assets (svg, png)
```

## 2. TanStack Router Patterns

### Version

- `@tanstack/react-router`: `^1.169.1`
- `@tanstack/router-plugin`: `^1.167.31`

### File-Based Routing

Routes auto-generated via `tsr generate` (TanStack Router CLI).

**Route Definition Pattern** (`src/routes/index.tsx`):

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  // component logic
}
```

**Root Route with Layout** (`src/routes/__root.tsx`):

```tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <nav className="flex gap-4 border-b border-(--border) p-4">
        <Link to="/" activeProps={{ className: 'font-bold' }}>
          Home
        </Link>
        <Link to="/about" activeProps={{ className: 'font-bold' }}>
          About
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
```

**Router Configuration** (`src/router.ts`):

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

### Key TanStack Router Features Observed

- File-based routing with `createFileRoute()`
- `Link` component with `activeProps` for active state styling
- `Outlet` for nested route content
- `TanStackRouterDevtools` in development
- `tsr generate` for route tree generation
- Type-safe routing via module declaration

## 3. React 19 Patterns

### Version

- `react`: `^19.2.5`
- `react-dom`: `^19.2.5`

### React Compiler

Project uses React Compiler (Babel plugin) via `@vitejs/plugin-react`:

```tsx
// vite.config.ts
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
})
```

### Hooks Usage

Only `useState` observed in codebase (`src/routes/index.tsx`):

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

function IndexComponent() {
  const [count, setCount] = useState(0)
  // ...
}
```

### Entry Point Pattern

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './globals.css'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

### Observed Patterns

- **No Server Components** - All components are client-side
- **No Suspense usage** - Not observed in current codebase
- **Standard component patterns** - Functional components with named exports
- **React Compiler enabled** - Safe automatic memoization

## 4. TypeScript Patterns

### Version

- `typescript`: `^6.0.3`

### Configuration (`tsconfig.app.json`)

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Notable TS Config Features

- `verbatimModuleSyntax` - Enforces `import type` for type-only imports
- `erasableSyntaxOnly` - No non-erasable syntax (const enums, namespace)
- `noUnusedLocals` / `noUnusedParameters` - Strict unused variable checks
- `jsx: react-jsx` - New JSX transform

### Type Usage in Routes

Routes use TypeScript for route typing via module augmentation:

```tsx
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

### Auto-Generated Route Types (`routeTree.gen.ts`)

```typescript
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about'
  id: '__root__' | '/' | '/about'
  fileRoutesById: FileRoutesById
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/about': { ... }
    '/': { ... }
  }
}
```

## 5. Tailwind CSS Patterns

### Version

- `tailwindcss`: `^4.2.4` (v4!)
- `@tailwindcss/vite`: `^4.2.4`

### Configuration Approach

**No `tailwind.config.js`** - Project uses Tailwind v4's CSS-first configuration.

### Tailwind v4 Patterns (`globals.css`)

**Theme Configuration via CSS**:

```css
@import 'tailwindcss';

/* ── Design Tokens ── */
@theme {
  --font-sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --font-heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --font-mono: ui-monospace, Consolas, monospace;
}
```

**Design Tokens as CSS Variables**:

```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  /* ... */
}
```

**Dark Mode via `prefers-color-scheme`**:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --accent: #c084fc;
    /* ... */
  }
}
```

**CSS Variable Usage in Tailwind Classes**:

```tsx
className = 'border-b border-(--border) p-4'
className = 'bg-(--accent-bg) text-(--accent)'
className = 'shadow-(--shadow)'
```

### Tailwind v4 Features Used

- `@import 'tailwindcss'` - V4 import syntax
- `@theme {}` block - Theme configuration
- CSS variables as design tokens
- `color-scheme: light dark` - Native dark mode
- Arbitrary values via `calc()` and custom properties

### Component Layer Patterns

```css
@layer components {
  .hero {
    position: relative;
    /* nested selectors */
  }

  .ticks {
    position: relative;
    width: 100%;
    &::before, &::after { ... }
  }
}
```

## 6. Project Conventions

### Naming Conventions

- **Route components**: `Route` named export + `{Component}` suffix for implementation
- **File names**: kebab-case for routes (`about.tsx`, `index.tsx`)
- **Route tree**: `routeTree.gen.ts` (auto-generated)

### Import Patterns

- Route imports use named exports: `import { Route } from './routes/...'`
- Components use default exports pattern in naming
- CSS imports for global styles: `import './globals.css'`

### Component Structure Pattern

```tsx
// 1. Route definition at top
export const Route = createFileRoute('/path')({
  component: ComponentName,
})

// 2. Component implementation below
function ComponentName() {
  // 3. Hooks (if any)
  // 4. Derived state
  // 5. Render
  return (...)
}
```

### Routing Patterns

- File-based routing via TanStack Router
- Layout routes use `__root.tsx` naming convention
- Nested routes via file system hierarchy
- Route parameters use dynamic segments like `$id.tsx`

### State Management

- **No external state management** observed (no Zustand, Redux, Jotai, etc.)
- Local component state via React hooks (`useState`)
- TanStack Router handles URL-based state

### Asset Handling

- Static assets in `src/assets/`
- Direct import for images: `import heroImg from '../assets/hero.png'`
- SVG icons via sprite system: `<use href="/icons.svg#icon-name">`

### Testing Patterns

- Vitest for testing (`vitest.config.ts`)
- `@vitest/coverage-v8` for coverage
- `@vitest/ui` for UI
- JSdom for DOM testing

## 7. Build & Tooling

### Vite Configuration

```tsx
// vite.config.ts
export default defineConfig({
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] })],
})
```

### Scripts

```json
{
  "build": "tsr generate && tsc -b && vite build",
  "start:dev": "vite",
  "lint": "eslint .",
  "format": "prettier . --write",
  "test": "bun run test:int"
}
```

### Linting

- ESLint with `eslint-plugin-react-hooks`
- `eslint-plugin-perfectionist` for import sorting
- `eslint-plugin-prettier` for formatting

## 8. Summary

| Aspect         | Pattern                                         |
| -------------- | ----------------------------------------------- |
| **Routing**    | TanStack Router v1, file-based, code generation |
| **React**      | v19, React Compiler enabled, no RSC             |
| **TypeScript** | v6, strict mode, verbatim module syntax         |
| **Styling**    | Tailwind v4, CSS-first config, design tokens    |
| **State**      | Local hooks only, no external library           |
| **Testing**    | Vitest with V8 coverage                         |

## 9. Files Found

| File Path               | Purpose                        |
| ----------------------- | ------------------------------ |
| `src/main.tsx`          | App entry point                |
| `src/router.ts`         | Router configuration           |
| `src/routeTree.gen.ts`  | Auto-generated route tree      |
| `src/routes/__root.tsx` | Root layout component          |
| `src/routes/index.tsx`  | Home page route                |
| `src/routes/about.tsx`  | About page route               |
| `src/globals.css`       | Global styles with Tailwind v4 |
| `tsconfig.json`         | Project references             |
| `tsconfig.app.json`     | App TypeScript config          |
| `vite.config.ts`        | Vite configuration             |
| `package.json`          | Dependencies and scripts       |
| `vitest.config.ts`      | Test configuration             |
| `eslint.config.mjs`     | Linting rules                  |
