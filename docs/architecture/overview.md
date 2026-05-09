# Architecture Overview

## System Design

BCA MyCore+ is a client-side image generation application built with modern web technologies. The system is designed around three core principles:

1. **Zero-Server**: All processing happens in the browser
2. **Performance**: Fast initial load and responsive interactions
3. **Accessibility**: WCAG 2.1 Level A compliance

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Environment                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │              React Application                    │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │         Router (TanStack Router)           │  │   │
│  │  │  ┌──────────────────────────────────────┐  │  │   │
│  │  │  │  Editor Page                         │  │  │   │
│  │  │  │  ┌────────────────────────────────┐  │  │  │   │
│  │  │  │  │ CanvasEditor (Fabric.js)       │  │  │  │   │
│  │  │  │  │ FloatingToolbar                │  │  │  │   │
│  │  │  │  │ ColorPalette                   │  │  │  │   │
│  │  │  │  │ ExportToolbar                  │  │  │  │   │
│  │  │  │  └────────────────────────────────┘  │  │  │   │
│  │  │  └──────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │         State Management (Zustand)               │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │ Canvas Store │ History Store │ Toast Store │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Utilities & Libraries                    │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │ Clipboard │ Contrast │ Canvas │ A11y      │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Component Layers

### Presentation Layer

**Responsibility**: Render UI and handle user interactions

**Components**:

- `CanvasEditor` - Main canvas display
- `FloatingToolbar` - Context-sensitive toolbar
- `ColorPalette` - Color selection
- `ExportToolbar` - Export options
- `TemplateLibrary` - Template selection

**Technologies**:

- React 19.2.5
- Tailwind CSS 4.2.4
- Lucide React icons

### State Management Layer

**Responsibility**: Manage application state

**Stores**:

- `canvasStore` - Canvas state and objects
- `historyStore` - Undo/redo history
- `toastStore` - Notifications

**Technology**: Zustand 5.0.0

### Canvas Layer

**Responsibility**: Handle canvas rendering and manipulation

**Components**:

- Fabric.js Canvas
- Object serialization/deserialization
- Event handling

**Technology**: Fabric.js 6.4.3

### Utility Layer

**Responsibility**: Provide reusable functions

**Utilities**:

- Clipboard operations
- Color contrast calculations
- Canvas utilities
- Accessibility helpers

**Technologies**:

- ColorThief.js for color extraction
- WCAG contrast ratio calculations

## Data Flow

### User Interaction Flow

```
User Action
    ↓
Event Handler (onClick, onChange, etc.)
    ↓
Store Action (Zustand setter)
    ↓
Store State Update
    ↓
Component Re-render (React)
    ↓
DOM Update
    ↓
Visual Feedback
```

### Example: Adding Text

1. User clicks "Add Text" button
2. `onClick` handler calls `addObject('text', props)`
3. Canvas store creates new text object
4. Fabric.js adds object to canvas
5. Component re-renders with new object
6. FloatingToolbar appears for formatting
7. User sees text on canvas

### Example: Undo Action

1. User presses Ctrl+Z
2. Keyboard handler calls `undo()`
3. History store retrieves previous state
4. Canvas store updates with previous state
5. Fabric.js redraws canvas
6. Component re-renders
7. User sees previous state

## Scaling Considerations

### Performance Limits

- **Objects per canvas**: ~100 objects recommended
- **Undo/redo stack**: 10 states maximum
- **Bundle size**: ~250KB gzipped total
- **Initial load**: < 2 seconds target

### Optimization Strategies

1. **Code Splitting**:
   - Route-based splitting
   - Component-based lazy loading
   - Library-based dynamic imports

2. **Rendering Optimization**:
   - React.memo for expensive components
   - Zustand selective subscriptions
   - Fabric.js render optimization

3. **Memory Management**:
   - Canvas disposal on unmount
   - URL object cleanup
   - Bounded history stack

## Security Model

### Zero-Server Verification

✅ **No network requests**:

- No fetch() calls
- No WebSocket connections
- No external API calls

✅ **No data transmission**:

- All processing client-side
- No server communication
- No analytics tracking

✅ **No sensitive data**:

- No API keys in code
- No authentication tokens
- No user data collection

### Input Validation

- Text input sanitization
- Image dimension validation
- File size limits
- Type checking with TypeScript

## Accessibility Architecture

### WCAG 2.1 Level A Compliance

1. **Keyboard Navigation**:
   - Tab through elements
   - Enter/Space to activate
   - Escape to close modals

2. **Screen Reader Support**:
   - Semantic HTML
   - ARIA labels and roles
   - Live regions for updates

3. **Visual Accessibility**:
   - Color contrast ratios
   - Focus indicators
   - High contrast mode support

4. **Motor Accessibility**:
   - Large click targets
   - Keyboard shortcuts
   - Touch support

## Extension Points

### Adding New Components

1. Create component in `src/components/`
2. Use Zustand stores for state
3. Style with Tailwind CSS
4. Add TypeScript types
5. Write tests

### Adding New Stores

1. Create store in `src/stores/`
2. Define TypeScript interface
3. Implement with Zustand
4. Export hook function
5. Document in API.md

### Adding New Routes

1. Create route in `src/routes/`
2. Export component as default
3. Router auto-discovers routes
4. Add navigation links
5. Update documentation

## Technology Rationale

### React 19.2.5

- Modern hooks API
- Excellent ecosystem
- Strong community support
- Good performance

### Vite 8.0.10

- Fast build times
- ESM-native
- Excellent DX
- Small bundle size

### TypeScript 6.0.3

- Type safety
- Better IDE support
- Fewer runtime errors
- Self-documenting code

### Fabric.js 6.4.3

- Object manipulation
- Event handling
- Canvas rendering
- Good documentation

### Zustand 5.0.0

- Minimal bundle size
- Simple API
- No boilerplate
- Good performance

### Tailwind CSS 4.2.4

- Utility-first approach
- Responsive design
- Consistent styling
- Small bundle size

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│       Development Environment            │
│  - Hot Module Replacement               │
│  - Source maps                          │
│  - Debug logging                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Build Process (Vite)               │
│  - TypeScript compilation               │
│  - Code bundling                        │
│  - Asset optimization                   │
│  - Minification                         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Production Bundle (dist/)          │
│  - ~102KB gzipped (initial)             │
│  - ~250KB gzipped (total)               │
│  - Optimized assets                     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Static Hosting                     │
│  - GitHub Pages                         │
│  - Vercel                               │
│  - Netlify                              │
│  - AWS S3 + CloudFront                  │
└─────────────────────────────────────────┘
```

## Future Architecture Considerations

### Phase 2: Enhanced Features

- Template library system
- Advanced text formatting
- Shape tools
- Layer management UI

### Phase 3: Advanced Features

- Collaborative editing
- Cloud storage integration
- AI-powered suggestions
- Advanced filters
- Animation support

## References

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Fabric.js Documentation](http://fabricjs.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
