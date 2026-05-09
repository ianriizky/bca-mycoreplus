# BCA MyCore+ - Zero-Server Image Generator

## Overview

BCA MyCore+ adalah aplikasi web untuk generate image profesional yang berjalan 100% di client-side (tanpa server backend). Dirancang khusus untuk staff BCA untuk membuat image berkualitas tinggi untuk komunikasi WhatsApp dengan customer.

### Key Features

- ✅ **Zero-Server Architecture** - 100% client-side, tidak ada server backend
- ✅ **Clipboard-First Sharing** - Copy → Paste langsung ke WhatsApp
- ✅ **ColorThief Palette Extraction** - Extract warna otomatis dari image
- ✅ **Glassmorphism UI** - Design modern dengan BCA brand colors
- ✅ **Undo/Redo Support** - Undo/Redo hingga 10 aksi
- ✅ **Accessibility** - WCAG 2.1 Level A compliant
- ✅ **Mobile-First Responsive** - Responsive di semua device

## Quick Start

### Prerequisites

- Node.js 18+ atau Bun 1.0+
- npm, yarn, atau bun package manager

### Installation

```bash
# Install dependencies
bun install
# atau
npm install
```

### Development Server

```bash
# Start development server
bun run dev
# atau
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
bun run build
# atau
npm run build
```

Output akan tersimpan di folder `dist/`

### Run Tests

```bash
# Run all tests
bun run test
# atau
npm run test

# Run tests dengan watch mode
bun run test:watch

# Run tests dengan UI
bun run test:ui
```

## Technology Stack

| Komponen       | Technology          | Version | Alasan                  |
| -------------- | ------------------- | ------- | ----------------------- |
| **Framework**  | React               | 19.2.5  | Latest, modern features |
| **Build Tool** | Vite                | 8.0.10  | Fast, ESM-native        |
| **Language**   | TypeScript          | 6.0.3   | Type safety             |
| **Canvas**     | Fabric.js           | 6.4.3   | Object manipulation     |
| **State**      | Zustand             | 5.0.0   | Minimal bundle          |
| **Styling**    | Tailwind CSS        | 4.2.4   | Utility-first           |
| **Routing**    | TanStack Router     | Latest  | File-based routing      |
| **Icons**      | Lucide React        | Latest  | Beautiful SVG icons     |
| **Testing**    | Vitest + Playwright | Latest  | Modern testing tools    |

## Project Structure

```
bca-mycoreplus/
├── src/
│   ├── components/          # React components
│   │   ├── CanvasEditor/    # Main canvas component
│   │   ├── FloatingToolbar/ # Context-sensitive toolbar
│   │   ├── ColorPalette/    # Color extraction & selection
│   │   ├── TemplateLibrary/ # Template management
│   │   └── ExportToolbar/   # Export & sharing
│   ├── routes/              # Page routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── editor.tsx       # Editor page
│   │   ├── about.tsx        # About page
│   │   └── help.tsx         # Help page
│   ├── stores/              # Zustand stores
│   │   ├── canvasStore.ts   # Canvas state
│   │   ├── historyStore.ts  # Undo/redo
│   │   └── toastStore.ts    # Notifications
│   ├── lib/                 # Utility functions
│   │   ├── canvas/          # Canvas utilities
│   │   ├── clipboard.ts     # Clipboard operations
│   │   ├── contrast.ts      # Color contrast
│   │   └── accessibility.ts # A11y helpers
│   ├── globals.css          # Global styles
│   ├── main.tsx             # Entry point
│   └── router.ts            # Router config
├── tests/                   # Test files
│   ├── unit/                # Unit tests
│   └── int/                 # Integration tests
├── docs/                    # Documentation
│   ├── README.md            # Overview (this file)
│   ├── ARCHITECTURE.md      # System architecture
│   ├── COMPONENTS.md        # Component documentation
│   ├── API.md               # API reference
│   ├── SETUP.md             # Developer setup
│   ├── DEPLOYMENT.md        # Deployment guide
│   ├── TROUBLESHOOTING.md   # Troubleshooting
│   ├── CONTRIBUTING.md      # Contribution guidelines
│   └── architecture/        # Architecture details
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
├── vitest.config.ts         # Vitest config
└── README.md                # Project README
```

## Documentation

Dokumentasi lengkap tersedia di folder `docs/`:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Sistem architecture, design principles, tech stack, component hierarchy, state management, data flow, performance optimization, security & privacy
- **[COMPONENTS.md](./COMPONENTS.md)** - Dokumentasi setiap component dengan props, state, usage examples, accessibility features, dan known limitations
- **[API.md](./API.md)** - API reference untuk semua stores dan utilities dengan code examples
- **[SETUP.md](./SETUP.md)** - Developer setup guide dengan prerequisites, installation, development server, testing setup, dan code style
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide untuk production build dan GitHub Pages deployment
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues, debug techniques, performance troubleshooting, browser compatibility
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines dan code of conduct

### Architecture Documentation

Dokumentasi architecture detail tersedia di `docs/architecture/`:

- **[overview.md](./architecture/overview.md)** - Architecture overview dan design patterns
- **[state-management.md](./architecture/state-management.md)** - State management patterns dan best practices
- **[performance.md](./architecture/performance.md)** - Performance optimization strategies
- **[security.md](./architecture/security.md)** - Security dan privacy considerations
- **[accessibility.md](./architecture/accessibility.md)** - Accessibility implementation details

## Key Concepts

### Zero-Server Architecture

Aplikasi ini berjalan 100% di browser tanpa backend server:

- ✅ Semua processing terjadi di client-side
- ✅ Tidak ada network requests ke server
- ✅ Data tidak pernah dikirim ke server
- ✅ Offline-capable (setelah initial load)

### Canvas-Based Image Generation

Menggunakan Fabric.js untuk manipulasi object di canvas:

- Text objects dengan formatting
- Image objects dengan transformasi
- Shape objects (rectangle, circle, line)
- Undo/redo support
- Export ke clipboard atau download

### Clipboard-First Sharing

Fokus pada user experience WhatsApp:

- Copy canvas ke clipboard dengan satu klik
- Paste langsung ke WhatsApp chat
- Fallback download untuk browser yang tidak support clipboard API
- Toast notifications untuk feedback

## Performance Targets

- **Initial Load**: < 2 seconds
- **Time to Interactive (TTI)**: < 2 seconds
- **Bundle Size**: ~102KB gzipped (initial)
- **Total Bundle**: ~250KB gzipped (dengan semua features)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk guidelines tentang cara berkontribusi.

## License

MIT License - Lihat [LICENSE.md](../LICENSE.md) untuk detail lengkap.

## Support

Untuk pertanyaan atau issues:

1. Baca [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) terlebih dahulu
2. Check existing issues di GitHub
3. Buat issue baru dengan detail lengkap

## Roadmap

### Phase 1: MVP (Current)

- ✅ Canvas editor dengan text & image
- ✅ Color palette extraction
- ✅ Undo/redo support
- ✅ Clipboard export
- ✅ Accessibility (WCAG 2.1 Level A)

### Phase 2: Enhanced Features

- [ ] Template library
- [ ] Advanced text formatting
- [ ] Shape tools
- [ ] Layer management
- [ ] Custom fonts

### Phase 3: Advanced Features

- [ ] Collaborative editing
- [ ] Cloud storage
- [ ] AI-powered suggestions
- [ ] Advanced filters
- [ ] Animation support

## Changelog

Lihat [CHANGELOG.md](../CHANGELOG.md) untuk history lengkap dari semua releases.

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
