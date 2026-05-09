# Developer Setup Guide

## Prerequisites

### Required

- **Node.js** 18.0.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version`

- **Bun** 1.0.0 or higher (recommended) OR **npm** 9.0.0+
  - Bun: `curl -fsSL https://bun.sh/install | bash`
  - npm: Comes with Node.js
  - Verify: `bun --version` or `npm --version`

- **Git** 2.30.0 or higher
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify: `git --version`

### Recommended

- **Visual Studio Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript Vue Plugin
  - Tailwind CSS IntelliSense
  - React DevTools

- **Browser DevTools**:
  - Chrome DevTools
  - Firefox DevTools
  - React DevTools extension
  - Zustand DevTools

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/ianrizky/bca-mycoreplus.git
cd bca-mycoreplus
```

### 2. Install Dependencies

Using Bun (recommended):

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Verify Installation

```bash
# Check Node.js
node --version  # Should be 18.0.0+

# Check package manager
bun --version   # Should be 1.0.0+
# or
npm --version   # Should be 9.0.0+

# Check Git
git --version   # Should be 2.30.0+
```

## Development Server

### Start Development Server

Using Bun:

```bash
bun run dev
```

Or using npm:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Features

- Hot Module Replacement (HMR)
- Fast refresh on file changes
- Source maps for debugging
- TypeScript compilation
- CSS processing

### Stopping Server

Press `Ctrl+C` in terminal

## Project Structure

```
bca-mycoreplus/
├── src/
│   ├── components/          # React components
│   ├── routes/              # Page routes
│   ├── stores/              # Zustand stores
│   ├── lib/                 # Utility functions
│   ├── globals.css          # Global styles
│   ├── main.tsx             # Entry point
│   └── router.ts            # Router configuration
├── tests/
│   ├── unit/                # Unit tests
│   └── int/                 # Integration tests
├── docs/                    # Documentation
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
└── eslint.config.mjs        # ESLint configuration
```

## Code Style & Conventions

### TypeScript

- **Strict Mode**: Enabled
- **Target**: ES2020
- **Module**: ESNext

```typescript
// ✅ Good
interface Props {
  name: string
  age: number
}

const MyComponent: FC<Props> = ({ name, age }) => {
  return <div>{name} - {age}</div>
}

// ❌ Bad
const MyComponent = (props: any) => {
  return <div>{props.name}</div>
}
```

### React Components

- **Naming**: PascalCase for components
- **File Structure**: One component per file
- **Props**: Define interface for all props
- **Hooks**: Use functional components with hooks

```typescript
// ✅ Good
interface ButtonProps {
  label: string
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>
}

// ❌ Bad
export const button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### Naming Conventions

- **Components**: PascalCase (`CanvasEditor`, `FloatingToolbar`)
- **Hooks**: camelCase with `use` prefix (`useCopyShortcut`, `useUndoRedo`)
- **Stores**: camelCase with `Store` suffix (`canvasStore`, `historyStore`)
- **Utilities**: camelCase (`getContrastRatio`, `copyCanvasToClipboard`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_UNDO_STACK`, `CANVAS_WIDTH`)
- **Files**: Match export name or use kebab-case for directories

### CSS & Styling

- **Framework**: Tailwind CSS
- **Approach**: Utility-first
- **No inline styles**: Use Tailwind classes
- **Responsive**: Mobile-first design

```tsx
// ✅ Good
<div className="flex flex-col gap-4 md:flex-row md:gap-8">
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>

// ❌ Bad
<div style={{ display: 'flex', gap: '16px' }}>
  <button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
    Click me
  </button>
</div>
```

### Imports

- **Order**: External → Internal → Types
- **Absolute paths**: Use `@/` alias for src imports
- **No default exports**: Use named exports

```typescript
// ✅ Good
import { FC } from 'react'
import { useCanvasStore } from '@/stores/canvasStore'
import { getContrastRatio } from '@/lib/contrast'

// ❌ Bad
import React from 'react'
import canvasStore from '../../../stores/canvasStore'
import { default as contrast } from '../lib/contrast'
```

## Testing

### Run Tests

```bash
# Run all tests
bun run test
# or
npm run test

# Run tests in watch mode
bun run test:watch
# or
npm run test:watch

# Run tests with UI
bun run test:ui
# or
npm run test:ui

# Run specific test file
bun run test -- FloatingToolbar.int.spec.tsx
```

### Test Structure

```
tests/
├── unit/
│   ├── accessibility/
│   │   └── contrast.test.ts
│   └── stores/
│       └── canvasStore.test.ts
└── int/
    └── jsdom/
        └── FloatingToolbar.int.spec.tsx
```

### Writing Tests

#### Unit Tests

```typescript
import { describe, it, expect } from 'vitest'
import { getContrastRatio } from '@/lib/contrast'

describe('getContrastRatio', () => {
  it('should calculate correct contrast ratio', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(ratio).toBe(21)
  })

  it('should handle invalid colors', () => {
    expect(() => {
      getContrastRatio('#INVALID', '#FFFFFF')
    }).toThrow()
  })
})
```

#### Integration Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FloatingToolbar } from '@/components/FloatingToolbar'

describe('FloatingToolbar', () => {
  beforeEach(() => {
    render(<FloatingToolbar />)
  })

  it('should show toolbar when object selected', async () => {
    const toolbar = screen.queryByRole('toolbar')
    expect(toolbar).toBeInTheDocument()
  })

  it('should delete object on delete button click', async () => {
    const user = userEvent.setup()
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)
    // Assert object deleted
  })
})
```

### Test Coverage

Target: 80% code coverage

```bash
# Run tests with coverage
bun run test:coverage
```

## Building for Production

### Build Command

```bash
bun run build
# or
npm run build
```

### Output

- **Location**: `dist/` directory
- **Size**: ~102KB gzipped (initial)
- **Format**: Optimized JavaScript and CSS

### Build Optimization

- Tree-shaking unused code
- Minification
- CSS optimization
- Asset optimization
- Source map generation

### Verify Build

```bash
# Preview production build locally
bun run preview
# or
npm run preview
```

## Deployment

### GitHub Pages Deployment

```bash
bun run deploy
# or
npm run deploy
```

### Manual Deployment

1. Build production bundle:

   ```bash
   bun run build
   ```

2. Deploy `dist/` folder to hosting service:
   - GitHub Pages
   - Vercel
   - Netlify
   - Any static hosting

## Debugging

### Browser DevTools

1. Open DevTools: `F12` or `Cmd+Option+I`
2. **Console**: Check for errors and logs
3. **Network**: Monitor API calls (should be none)
4. **Performance**: Profile rendering
5. **Storage**: Check localStorage usage

### React DevTools

1. Install React DevTools extension
2. Open DevTools → Components tab
3. Inspect component tree
4. Check props and state

### Zustand DevTools

Enable in development:

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

### Debug Logging

Enable debug mode:

```typescript
// In browser console
localStorage.setItem('DEBUG', 'true')
```

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///./src/*": "${webspaceFolder}/src/*"
      }
    }
  ]
}
```

## Common Tasks

### Adding a New Component

1. Create component file: `src/components/ComponentName/index.tsx`
2. Define props interface
3. Implement component logic
4. Add Tailwind CSS styling
5. Create test file: `tests/int/jsdom/ComponentName.int.spec.tsx`
6. Update documentation in `docs/COMPONENTS.md`

### Adding a New Store

1. Create store file: `src/stores/storeNameStore.ts`
2. Define store interface
3. Implement with Zustand
4. Export hook function
5. Create test file: `tests/unit/stores/storeNameStore.test.ts`
6. Document in `docs/API.md`

### Adding a New Route

1. Create route file: `src/routes/routeName.tsx`
2. Export component as default
3. Router auto-discovers routes
4. Add navigation links
5. Update documentation

### Running Specific Tests

```bash
# Run single test file
bun run test -- FloatingToolbar.int.spec.tsx

# Run tests matching pattern
bun run test -- --grep "FloatingToolbar"

# Run with coverage
bun run test:coverage
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
# macOS/Linux
lsof -ti:5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencies Not Installing

```bash
# Clear cache and reinstall
bun install --force
# or
npm ci
```

### TypeScript Errors

```bash
# Rebuild TypeScript
bun run build
# Check for type errors
npx tsc --noEmit
```

### Hot Module Replacement Not Working

1. Check if file is being saved
2. Restart dev server: `Ctrl+C` then `bun run dev`
3. Clear browser cache: `Ctrl+Shift+Delete`

### Tests Failing

```bash
# Run tests with verbose output
bun run test -- --reporter=verbose

# Run single test
bun run test -- FloatingToolbar.int.spec.tsx

# Update snapshots
bun run test -- -u
```

## Environment Variables

No environment variables required (Zero-Server architecture).

## Performance Tips

1. **Use React DevTools Profiler** to identify slow components
2. **Memoize expensive components** with `React.memo`
3. **Debounce input handlers** to prevent excessive updates
4. **Lazy load heavy components** with `React.lazy`
5. **Monitor bundle size** with `vite-plugin-visualizer`

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Fabric.js Documentation](http://fabricjs.com/)
- [Vite Documentation](https://vitejs.dev/)

## Getting Help

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review existing issues on GitHub
3. Check documentation in `docs/`
4. Ask in project discussions

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
