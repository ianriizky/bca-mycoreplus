# BCA MyCore+ Project Context

## Project Overview

**Project Name**: BCA MyCore+ - Zero-Server Image Generator
**Status**: MVP Phase (Epic 1 Completed)
**Team**: Ian (Developer)
**Last Updated**: 2026-05-10

## Project Description

BCA MyCore+ adalah aplikasi web untuk generate image profesional yang berjalan 100% di client-side (tanpa server backend). Dirancang khusus untuk staff BCA untuk membuat image berkualitas tinggi untuk komunikasi WhatsApp dengan customer.

### Key Features

- ✅ Zero-Server Architecture (100% client-side)
- ✅ Clipboard-First Sharing (copy → paste ke WhatsApp)
- ✅ ColorThief Palette Extraction
- ✅ Glassmorphism UI dengan BCA Brand Colors
- ✅ Undo/Redo Support (10 actions)
- ✅ Accessibility (WCAG 2.1 Level A)
- ✅ Mobile-First Responsive Design

## Technology Stack

| Component  | Technology          | Version |
| ---------- | ------------------- | ------- |
| Framework  | React               | 19.2.5  |
| Build Tool | Vite                | 8.0.10  |
| Language   | TypeScript          | 6.0.3   |
| Canvas     | Fabric.js           | 6.4.3   |
| State      | Zustand             | 5.0.0   |
| Styling    | Tailwind CSS        | 4.2.4   |
| Routing    | TanStack Router     | Latest  |
| Icons      | Lucide React        | Latest  |
| Testing    | Vitest + Playwright | Latest  |

## Project Structure

```
bca-mycoreplus/
├── src/
│   ├── components/          # React components
│   ├── routes/              # Page routes
│   ├── stores/              # Zustand stores
│   ├── lib/                 # Utility functions
│   └── globals.css          # Global styles
├── tests/                   # Test files
├── docs/                    # Project documentation
├── public/                  # Static assets
└── package.json             # Dependencies
```

## Epic 1: Initial MVP Architecture - COMPLETED ✅

### Stories Completed

1. **1-1-canvas-editor-component** ✅
   - Main canvas component with Fabric.js integration
   - Object manipulation and selection
   - Keyboard shortcuts support

2. **1-2-floating-toolbar-component** ✅
   - Context-sensitive formatting toolbar
   - Text formatting options
   - Color picker integration

3. **1-3-file-upload-with-size-validation** ✅
   - Image upload functionality
   - File size validation
   - Type validation

4. **1-4-safe-zone-overlay** ✅
   - Safe zone visualization for mobile
   - Canvas boundary indicators
   - Responsive overlay

5. **1-5-colorthief-palette-extraction-and-picker** ✅
   - Automatic color extraction from images
   - Color palette display
   - Color selection and history

6. **1-6-clipboard-whatsapp-and-fallback-download** ✅
   - Copy to clipboard functionality
   - WhatsApp sharing integration
   - Fallback download option

7. **1-7-undo-redo-stack-in-zustand** ✅
   - Undo/redo functionality
   - History stack management
   - Keyboard shortcuts

8. **1-8-lazy-load-heavy-libraries** ✅
   - Code splitting implementation
   - Component lazy loading
   - Library dynamic imports

9. **1-9-accessibility-aria-attributes-and-keyboard** ✅
   - WCAG 2.1 Level A compliance
   - ARIA labels and roles
   - Keyboard navigation

10. **1-10-tests-for-main-interaction-flows** ✅
    - Unit tests for utilities
    - Integration tests for components
    - E2E tests for user flows

11. **1-11-document-epic** ✅
    - Architecture documentation
    - Component documentation
    - API reference
    - Setup guide
    - Deployment guide
    - Troubleshooting guide
    - Contributing guidelines

## Epic 2: MVP Improvements & UX Refinement - IN PROGRESS

### Stories Completed

1. **2-3-image-positioning-controls** ✅ (Review)
   - Position controls for fine-tuned object placement
   - Nudge buttons (↑↓←→) move object 1px per click
   - Position indicator shows X/Y coordinates in real-time
   - Snap-to-center button places object at canvas center
   - Works for both text and image objects
   - **Enhancements:**
     - Draggable toolbar with mouse drag support
     - Font family selector (6 fonts)
     - Scale control component for precise sizing
     - Image scale control (0.1x - 5x)
     - Font size control (8px - 200px)
     - FileUpload modal positioning fix

### Stories In Progress

2. **2-1-add-text-button-and-ui** (Review)
3. **2-2-whatsapp-message-customization** (Review)

### Stories Ready for Dev

4. **2-4-enhanced-text-editing-features** (Ready)
5. **2-5-story-spec-process-improvement** (Ready)

### Main Documentation Files

- **README.md** - Project overview and quick start
- **ARCHITECTURE.md** - System architecture and design
- **COMPONENTS.md** - Component documentation
- **API.md** - API reference
- **SETUP.md** - Developer setup guide
- **DEPLOYMENT.md** - Deployment guide
- **TROUBLESHOOTING.md** - Common issues and solutions
- **CONTRIBUTING.md** - Contribution guidelines

### Architecture Documentation

- **architecture/overview.md** - High-level architecture
- **architecture/state-management.md** - Zustand stores and patterns
- **architecture/performance.md** - Performance optimization
- **architecture/security.md** - Security and privacy
- **architecture/accessibility.md** - Accessibility implementation

## Development Setup

### Prerequisites

- Node.js 18.0.0+
- Bun 1.0.0+ or npm 9.0.0+
- Git 2.30.0+

### Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Build for production
bun run build
```

## Key Decisions

### Zero-Server Architecture

**Decision**: Build 100% client-side application
**Rationale**:

- No backend infrastructure needed
- Reduced deployment complexity
- Better privacy (no data transmission)
- Faster development cycle

### Zustand for State Management

**Decision**: Use Zustand instead of Redux/Context
**Rationale**:

- Minimal bundle size (~2KB)
- Simple API without boilerplate
- Good performance
- Easy to test

### Fabric.js for Canvas

**Decision**: Use Fabric.js for canvas manipulation
**Rationale**:

- Object-oriented API
- Event handling built-in
- Good documentation
- Active community

### Tailwind CSS for Styling

**Decision**: Use Tailwind CSS utility-first approach
**Rationale**:

- Consistent design system
- Small bundle size (~15KB)
- Mobile-first responsive design
- Easy to maintain

## Performance Targets

| Metric           | Target      | Status         |
| ---------------- | ----------- | -------------- |
| Initial Load     | < 2 seconds | ✅ ~1.5s       |
| TTI              | < 2 seconds | ✅ ~1.8s       |
| Bundle Size      | < 250KB     | ✅ ~102KB      |
| Lighthouse Score | 90+         | ✅ In progress |

## Accessibility Standards

- ✅ WCAG 2.1 Level A compliance
- ✅ Keyboard navigation support
- ✅ Screen reader support
- ✅ Color contrast validation
- ✅ Focus indicators

## Security Model

- ✅ Zero-server (no network requests)
- ✅ No data transmission
- ✅ No API keys or secrets
- ✅ Input validation
- ✅ Type safety with TypeScript

## Code Quality Standards

- **Language**: TypeScript with strict mode
- **Linting**: ESLint with custom rules
- **Formatting**: Prettier
- **Testing**: Vitest + Playwright
- **Coverage**: Target 80%+

## Team & Roles

- **Ian** - Developer (Full-stack)
- **Mary** - Business Analyst (Available via @bmad-agent-analyst)
- **Paige** - Technical Writer (Available via @bmad-agent-tech-writer)
- **John** - Product Manager (Available via @bmad-agent-pm)
- **Sally** - UX Designer (Available via @bmad-agent-ux-designer)
- **Winston** - System Architect (Available via @bmad-agent-architect)
- **Amelia** - Senior Engineer (Available via @bmad-agent-dev)

## Next Steps

### Phase 2: Enhanced Features (Planned)

- [ ] Template library system
- [ ] Advanced text formatting
- [ ] Shape tools
- [ ] Layer management UI
- [ ] Additional export formats

### Phase 3: Advanced Features (Planned)

- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] AI-powered suggestions
- [ ] Advanced filters
- [ ] Animation support

## Resources

- **GitHub Repository**: https://github.com/ianrizky/bca-mycoreplus
- **Documentation**: `/docs` folder
- **Issues & Discussions**: GitHub Issues
- **Development**: `bun run dev`
- **Testing**: `bun run test`
- **Building**: `bun run build`

## Important Links

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System design
- [COMPONENTS.md](./docs/COMPONENTS.md) - Component guide
- [API.md](./docs/API.md) - API reference
- [SETUP.md](./docs/SETUP.md) - Setup guide
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment guide
- [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) - Troubleshooting
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Contributing guide

## Contact & Support

For questions or issues:

1. Check documentation in `/docs`
2. Review GitHub issues
3. Check TROUBLESHOOTING.md
4. Contact project maintainers

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
**Status**: MVP Complete - Ready for Phase 2
