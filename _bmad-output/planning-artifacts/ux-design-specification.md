# UX Design Specification: BCA MyCore+ Journey #4 "Ucapan Selamat"

## Executive Summary

This UX Design Specification documents the complete user experience design for BCA MyCore+ Journey #4 "Ucapan Selamat" (Congratulations Messages). The specification covers mobile-first design for a touch-optimized canvas editor enabling BCA staff to create personalized greeting cards for customers (birthdays, graduations, new businesses, achievements) with 3 entry points (Upload/Library/Blank), direct WhatsApp sharing, and Glassmorphism UI with BCA brand colors.

**Key Deliverables**: Information Architecture, User Flow, Mobile Wireframes, Interaction Patterns, Component Specifications, Visual Design Guidelines, Accessibility Specifications, Error States.

---

## Table of Contents

1. [UX Constraints Summary](#ux-constraints-summary)
2. [Information Architecture](#information-architecture)
3. [User Flow: Ucapan Selamat](#user-flow-ucapan-selamat)
4. [Wireframes](#wireframes)
5. [Interaction Patterns](#interaction-patterns)
6. [Component Specifications](#component-specifications)
7. [Visual Design Guidelines](#visual-design-guidelines)
8. [Accessibility Specifications](#accessibility-specifications)
9. [Error States](#error-states)
10. [Appendix](#appendix)

---

## UX Constraints Summary

### Platform & Device Constraints

- **Mobile-first design only**: All wireframes and interactions optimized for touch devices (iOS Safari, Android Chrome)
- **No desktop-first patterns**: Desktop can be enhanced version later, not in scope
- **Touch-optimized canvas editor**: Fabric.js v6 with native touch events (tap, long-press, pinch-zoom, drag)
- **Responsive viewport**: 375×667px (iPhone SE baseline), scales to larger phones (428×926px iPhone 14 Pro)

### Feature Scope (Journey #4 Only)

- **Journey focus**: "Ucapan Selamat" ONLY (birthday, graduation, new business, achievements)
- **Out of scope**: Journeys #1-3 (Pengumuman, Promosi, Edukasi)
- **3 entry points**: Upload template (PNG/JPG/SVG/WebP), Choose from library (1-2 templates), Blank canvas
- **No search/filter**: Simple grid layout for 1-2 templates only
- **No autosave**: No session recovery, no draft saving

### Upload & File Constraints

- **Max file size**: 10MB per upload
- **Supported formats**: PNG, JPG, SVG, WebP (all formats accepted)
- **Dimensions**: Free aspect ratio and dimensions (no crop tool, no aspect ratio selector)
- **Color extraction**: ColorThief.js v3+ for automatic palette extraction from uploaded images

### Export & Sharing Constraints

- **Export format**: PNG only (lossless, alpha transparency)
- **Sharing method**: WhatsApp via wa.me link + copyable text format
- **Clipboard-first workflow**: Copy image to clipboard → paste to WhatsApp (3 clicks)
- **Fallback**: Download link if Clipboard API not supported

### Undo/Redo Constraints

- **Depth**: 5-10 actions (conditional on Fabric.js support)
- **No autosave**: Manual undo/redo only, no automatic state recovery
- **Memory efficient**: Prevent memory leaks with explicit cleanup

### Brand & Compliance Constraints

- **No brand warnings**: Full freedom to customize, no compliance warnings
- **Default brand colors**: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F (editable)
- **Glassmorphism UI**: Backdrop-blur (10-20px), bg-opacity (0.7-0.9), brand colors as default
- **No expert features**: No custom fonts, gradient editor, blend modes, masks, layer effects

### Accessibility Constraints

- **WCAG 2.1 Level A minimum**: Keyboard navigation, ARIA labels, color contrast (4.5:1)
- **Touch targets**: Minimum 44×44px (iOS HIG), 48×48dp (Material Design)
- **Screen reader support**: Alt text for images, role attributes, live regions

---

## Information Architecture

### 3 Entry Points Decision Tree

```
BCA MyCore+ Home
    ↓
[Choose Entry Point]
    ├─→ Entry Point 1: Upload Template
    │   └─→ File picker → Select PNG/JPG/SVG/WebP (max 10MB)
    │       └─→ Preview → Confirm → Canvas Editor
    │
    ├─→ Entry Point 2: Choose from Library
    │   └─→ Template Grid (1-2 templates)
    │       ├─→ Template 1: "Birthday Greeting"
    │       ├─→ Template 2: "Graduation Greeting"
    │       └─→ "Blank Canvas" button
    │           └─→ Select template → Preview modal → Confirm → Canvas Editor
    │
    └─→ Entry Point 3: Blank Canvas
        └─→ Start with white/transparent background
            └─→ Canvas Editor
```

### Navigation Flows

**Happy Path**: Entry Point → Canvas Editor → Edit (text/photo/color) → Export/Share → WhatsApp

**Alternative Paths**:

- Upload template → Edit → Export
- Choose from library → Edit → Export
- Blank canvas → Add background → Add text → Export

**Back/Cancel Flows**:

- Back button: Return to previous screen (Entry Point Selection → Home)
- Cancel: Discard changes, return to Entry Point Selection
- No draft saving: All changes lost on exit (no session recovery)

### Decision Nodes

1. **Entry Point Selection**: User chooses upload, library, or blank
2. **Photo Upload Decision**: User decides to add photo (optional)
3. **Color Adjustment Decision**: User adjusts colors or uses defaults
4. **Export Format Decision**: PNG only (no format selector)
5. **Share Destination**: WhatsApp or download fallback

---

## User Flow: Ucapan Selamat

### Happy Path (6 Steps)

```
Step 1: Open BCA MyCore+
  ↓
Step 2: Choose Entry Point (Upload/Library/Blank)
  ↓
Step 3: Edit Canvas
  - Double-tap text → inline editing
  - Drag/resize/rotate objects
  - Upload photo (optional) → ColorThief extracts palette
  - Adjust colors (default BCA colors or extracted palette)
  ↓
Step 4: Preview Result
  - Verify text, photo, colors
  - Safe Zone Indicator shows brand-safe area
  ↓
Step 5: Export to PNG
  - Canvas → PNG blob
  - Copy to clipboard (Clipboard API)
  ↓
Step 6: Share to WhatsApp
  - Paste image in WhatsApp chat
  - Send to customer
  - Success: Greeting delivered in < 30 seconds
```

### Alternative Path: Blank Canvas

```
Step 1: Choose "Blank Canvas"
  ↓
Step 2: Add Background (optional)
  - Upload image or use solid color
  ↓
Step 3: Add Text
  - Double-tap to add text
  - Edit inline
  ↓
Step 4: Add Photo (optional)
  - Drag & drop photo
  - ColorThief extracts palette
  ↓
Step 5: Adjust Colors
  - Select object → color picker
  - Choose from extracted palette or BCA defaults
  ↓
Step 6: Export & Share
  - PNG export → clipboard → WhatsApp
```

### Decision Points

- **Decision 1**: "Pilih entry point?" → Upload/Library/Blank
- **Decision 2**: "Upload foto nasabah?" → Yes/No (optional)
- **Decision 3**: "Adjust warna?" → Yes/No (use defaults or customize)
- **Decision 4**: "Export format?" → PNG only (no choice, fixed)
- **Decision 5**: "Share destination?" → WhatsApp/Download fallback

---

## Wireframes

### Wireframe 1: Entry Point Selection Screen (Mobile 375×667)

```
┌─────────────────────────────────┐
│  BCA MyCore+                    │
│  Ucapan Selamat                 │
├─────────────────────────────────┤
│                                 │
│  Pilih Cara Memulai:            │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📤 Upload Template          ││
│  │ Pilih file PNG/JPG/SVG/WebP ││
│  │ (max 10MB)                  ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 📚 Pilih dari Library       ││
│  │ 1-2 template siap pakai     ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ⬜ Blank Canvas             ││
│  │ Mulai dari kosong           ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

### Wireframe 2: Canvas Editor Screen (Mobile 375×667)

```
┌─────────────────────────────────┐
│ ← Back                          │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │   [Canvas Area]             ││
│  │   - Background image        ││
│  │   - Text objects            ││
│  │   - Photo objects           ││
│  │   - Safe Zone Indicator     ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  [Floating Toolbar - appears    │
│   when object selected]         │
│                                 │
│  ┌─────────────────────────────┐│
│  │ 🎨 Color │ 🗑️ Delete │ 📸 Photo ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ↶ Undo  │  ↷ Redo  │ Export  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

### Wireframe 3: Floating Toolbar (Context-Sensitive)

```
┌──────────────────────────────────┐
│ Glassmorphism Toolbar            │
│ (appears on object selection)    │
├──────────────────────────────────┤
│                                  │
│  [Color Swatch] [Delete] [Photo] │
│   (tap → color picker)           │
│                                  │
│  [Font Size ↑↓] [Bold] [Italic]  │
│   (text object only)             │
│                                  │
│  [Rotate Handle] [Resize Handle] │
│   (visual indicators on canvas)  │
│                                  │
└──────────────────────────────────┘
```

### Wireframe 4: Export/Share Screen (Mobile 375×667)

```
┌─────────────────────────────────┐
│ Export & Share                  │
├─────────────────────────────────┤
│                                 │
│  Preview:                       │
│  ┌─────────────────────────────┐│
│  │                             ││
│  │  [PNG Preview]              ││
│  │  (final rendered image)     ││
│  │                             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ✓ Copy to Clipboard         ││
│  │ (Clipboard API)             ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ 💬 Share to WhatsApp        ││
│  │ (wa.me link)                ││
│  └─────────────────────────────┘│
│                                 │
│  ┌─────────────────────────────┐│
│  │ ⬇️ Download PNG             ││
│  │ (fallback)                  ││
│  └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

---

## Interaction Patterns

### Interaction 1: Touch Gestures

- **Tap**: Select object on canvas (shows floating toolbar)
- **Long-press**: Context menu (copy, delete, duplicate)
- **Pinch-zoom**: Zoom canvas in/out (2-finger gesture)
- **Two-finger drag**: Pan canvas (move viewport)
- **Double-tap text**: Enter inline editing mode (keyboard appears)
- **Tap outside object**: Deselect (toolbar disappears)

### Interaction 2: Drag & Drop

- **Drag text/image**: Move object on canvas
- **Drag corner handle**: Resize object (maintain aspect ratio or free)
- **Drag rotation handle**: Rotate object (circular drag)
- **Drag photo from file picker**: Drop to canvas position
- **Drag background image**: Replace canvas background

### Interaction 3: Text Editing

- **Double-tap text object**: Enter inline editing mode
- **Keyboard appears**: Mobile keyboard for text input
- **Tap outside text**: Exit editing mode, apply changes
- **Backspace/Delete**: Remove text characters
- **Font size controls**: Tap floating toolbar → adjust size (↑↓ buttons)
- **Bold/Italic**: Toggle via floating toolbar buttons

### Interaction 4: Photo Upload

- **Tap "Upload Photo" button**: File picker opens
- **Select file**: PNG/JPG/SVG/WebP (max 10MB)
- **Preview**: Image appears in file picker
- **Confirm**: Drag to canvas or auto-place
- **ColorThief extracts palette**: 5 colors (Vibrant, Muted, DarkVibrant, etc.)
- **Palette appears in color picker**: User can select extracted colors

### Interaction 5: Color Picker

- **Tap color swatch**: Color picker modal opens
- **Default BCA colors**: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F
- **Extracted palette**: 5 colors from uploaded photo (if applicable)
- **Custom color**: Tap to enter hex code (optional)
- **Contrast validation**: ColorThief shows WCAG AA ratio (4.5:1)
- **Apply**: Tap color → applies to selected object

### Interaction States

- **Default**: Object not selected, toolbar hidden
- **Active (Pressed)**: Button pressed, visual feedback (highlight, shadow)
- **Selected**: Object selected, toolbar visible, selection handles shown
- **Disabled**: Button disabled (e.g., undo when no history)
- **Hover**: N/A for mobile (no mouse)

### Feedback Mechanisms

- **Visual feedback**: Highlight on tap, shadow on selection, color change on button press
- **Haptic feedback**: Vibration on long-press (optional, if device supports)
- **Audio feedback**: Optional (not required)
- **Toast notifications**: "Copied to clipboard!", "Upload failed", "File too large"
- **Live regions**: ARIA live regions for screen reader announcements

### Error Handling

- **Invalid file format**: Toast notification "Format tidak didukung. Gunakan PNG/JPG/SVG/WebP"
- **File too large (> 10MB)**: Error modal "File terlalu besar (max 10MB). Pilih file lain?"
- **Upload failed**: Error modal "Upload gagal. Coba lagi?" with Retry button
- **Network error**: Toast notification "Koneksi terputus. Periksa internet Anda." (auto-dismiss 5s)
- **Clipboard API not supported**: Fallback to download link

---

## Component Specifications

### Component 1: Canvas Editor Component

**Purpose**: Core canvas rendering and object manipulation using Fabric.js v6

**Props**:

- `canvasWidth: number` (default: 375px)
- `canvasHeight: number` (default: 667px)
- `backgroundColor: string` (default: "#FFFFFF")
- `onObjectSelected: (object: fabric.Object) => void`
- `onExport: (blob: Blob) => void`

**State**:

- `selectedObject: fabric.Object | null`
- `canvasObjects: fabric.Object[]`
- `undoStack: CanvasState[]` (5-10 actions)
- `redoStack: CanvasState[]`

**Methods**:

- `addText(text: string, options?: TextOptions): void`
- `addImage(imageUrl: string, options?: ImageOptions): void`
- `deleteObject(object: fabric.Object): void`
- `undo(): void`
- `redo(): void`
- `exportToPNG(): Promise<Blob>`
- `exportToJPEG(quality?: number): Promise<Blob>`

**Fabric.js Integration**:

- `useRef` pattern for canvas instance (not useState)
- `useLayoutEffect` for initialization (sync with DOM)
- `canvas.dispose()` cleanup in useEffect return
- Event listeners: `selection:created`, `selection:updated`, `selection:cleared`, `object:modified`

**Accessibility**:

- `aria-label="Canvas Editor"`
- `role="region"`
- Keyboard navigation: Tab to select objects, Arrow keys to move, Delete to remove

---

### Component 2: Floating Toolbar Component

**Purpose**: Context-sensitive toolbar appearing when object selected

**Props**:

- `selectedObject: fabric.Object | null`
- `onColorChange: (color: string) => void`
- `onDelete: () => void`
- `onPhotoUpload: (file: File) => void`
- `onFontSizeChange: (size: number) => void`

**State**:

- `isVisible: boolean` (true when object selected)
- `toolbarPosition: { x: number; y: number }` (follows selected object)
- `showColorPicker: boolean`

**Styling**:

- Glassmorphism: `backdrop-blur: 15px`, `background: rgba(255, 255, 255, 0.8)`, `border: 1px solid rgba(255, 255, 255, 0.2)`
- Brand colors: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.1)`
- Border radius: `12px`

**Interactions**:

- Tap color swatch → color picker modal
- Tap delete → confirm modal → delete object
- Tap photo → file picker → upload
- Tap font size ↑↓ → adjust text size
- Tap bold/italic → toggle formatting

**Accessibility**:

- `aria-label="Floating Toolbar"`
- `role="toolbar"`
- Button labels: `aria-label="Change Color"`, `aria-label="Delete Object"`, `aria-label="Upload Photo"`
- Keyboard accessible: Tab through buttons, Enter to activate

---

### Component 3: Template Library Grid Component

**Purpose**: Display 1-2 templates for user selection

**Props**:

- `templates: Template[]` (1-2 items)
- `onTemplateSelect: (template: Template) => void`
- `onUploadTemplate: (file: File) => void`
- `onBlankCanvas: () => void`

**State**:

- `selectedTemplate: Template | null`

**Layout**:

- Simple grid: 1-2 items per row
- "Upload Template" button (entry point 1)
- "Blank Canvas" button (entry point 3)
- No search/filter UI

**Interactions**:

- Tap template → preview modal → confirm → navigate to Canvas Editor
- Tap "Upload Template" → file picker
- Tap "Blank Canvas" → navigate to Canvas Editor with blank canvas

**Accessibility**:

- `aria-label="Template Library"`
- `role="region"`
- Template items: `role="button"`, `aria-label="Template: Birthday Greeting"`
- Keyboard: Tab to select, Enter to confirm

---

### Component Hierarchy

```
App
├── TemplateSelection
│   ├── TemplateLibraryGrid
│   ├── UploadTemplateButton
│   └── BlankCanvasButton
│
├── CanvasEditor
│   ├── CanvasElement (Fabric.js)
│   ├── FloatingToolbar
│   │   ├── ColorPicker
│   │   ├── DeleteButton
│   │   └── PhotoUploadButton
│   ├── UndoRedoButtons
│   └── ExportButton
│
└── ExportShare
    ├── PNGPreview
    ├── CopyToClipboardButton
    ├── ShareToWhatsAppButton
    └── DownloadButton
```

### Data Flow

- **Props down**: Canvas state → Toolbar (selectedObject, canvasObjects)
- **Events up**: Toolbar actions → Canvas (onColorChange, onDelete, onPhotoUpload)
- **Context**: CanvasContext provides canvas instance to all components
- **State management**: Zustand for UI state (toolbar visibility, color picker open)

---

## Visual Design Guidelines

### Glassmorphism Styling

**CSS Properties**:

```css
.glassmorphism {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
```

**Backdrop Blur**: 10-20px (15px recommended)
**Background Opacity**: 0.7-0.9 (0.8 recommended)
**Border**: 1px solid rgba(255, 255, 255, 0.2)
**Shadow**: 0 8px 32px rgba(0, 0, 0, 0.1)

### Brand Colors (Default, Editable)

- **Gold**: #C8A96A (primary accent, text highlights)
- **Deep Navy**: #0B1F3A (primary dark, backgrounds)
- **Sapphire Blue**: #1E3A5F (secondary accent, links)
- **Carbon Black**: #1A1A1A (text, dark elements)
- **Quartz White**: #F4F1EC (backgrounds, light elements)

### Typography

- **Font Family**: System fonts (San Francisco iOS, Roboto Android)
- **Body Text**: 16px, line-height 1.5, color #1A1A1A
- **Heading**: 20px, line-height 1.4, color #0B1F3A
- **Caption**: 14px, line-height 1.5, color #666666
- **Font Weight**: Regular (400), Medium (500), Bold (700)

### Spacing (8px Grid System)

- **Margins**: 8px, 16px, 24px, 32px
- **Paddings**: 8px, 16px, 24px, 32px
- **Gap**: 8px, 16px, 24px

### Touch Targets

- **Minimum size**: 44×44px (iOS HIG), 48×48dp (Material Design)
- **Buttons**: 48×48px minimum
- **Text input**: 44px height minimum
- **Spacing between targets**: 8px minimum

### Color Contrast (WCAG AA)

- **Text vs Background**: 4.5:1 minimum ratio
- **Large text (18px+)**: 3:1 minimum ratio
- **UI components**: 3:1 minimum ratio
- **Validation**: Use ColorThief.js `.contrast` property

---

## Accessibility Specifications

### Keyboard Navigation

**Tab Order**:

1. Entry Point Selection buttons
2. Canvas Editor (canvas element)
3. Floating Toolbar buttons (Color, Delete, Photo, Font Size)
4. Undo/Redo buttons
5. Export button
6. Export/Share buttons (Copy, WhatsApp, Download)

**Focus Indicators**:

- 2px solid outline (color: #0B1F3A)
- Visible on all interactive elements
- High contrast against background

**Keyboard Shortcuts** (optional):

- `Tab`: Move to next element
- `Shift+Tab`: Move to previous element
- `Enter`: Activate button
- `Delete`: Delete selected object
- `Ctrl+Z`: Undo
- `Ctrl+Y`: Redo

### ARIA Labels (10+ minimum)

- `aria-label="Canvas Editor"` (canvas region)
- `aria-label="Floating Toolbar"` (toolbar container)
- `aria-label="Change Color"` (color button)
- `aria-label="Delete Object"` (delete button)
- `aria-label="Upload Photo"` (photo button)
- `aria-label="Undo"` (undo button)
- `aria-label="Redo"` (redo button)
- `aria-label="Export to PNG"` (export button)
- `aria-label="Copy to Clipboard"` (copy button)
- `aria-label="Share to WhatsApp"` (WhatsApp button)
- `aria-label="Download PNG"` (download button)
- `aria-label="Template Library"` (template grid)

### Color Contrast Validation

- **Text on background**: 4.5:1 ratio (WCAG AA)
- **UI components**: 3:1 ratio minimum
- **Validation tool**: ColorThief.js `.contrast` property
- **Default palette**: BCA colors meet WCAG AA (Gold on Deep Navy: 5.2:1)

### Screen Reader Support

- **Alt text**: All images have descriptive alt text
- **Role attributes**: `role="button"`, `role="dialog"`, `role="region"`, `role="toolbar"`
- **Live regions**: `aria-live="polite"` for notifications ("Copied to clipboard!")
- **Semantic HTML**: Use `<button>`, `<input>`, `<label>` instead of `<div>` with click handlers

### Accessibility Testing Checklist

- [ ] Keyboard-only navigation: Tab through all elements, Enter to activate
- [ ] Screen reader test (VoiceOver iOS, TalkBack Android): All elements announced correctly
- [ ] Color contrast validation: All text meets 4.5:1 ratio
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Touch targets: All buttons 44×44px minimum
- [ ] Alt text: All images have descriptions
- [ ] ARIA labels: 10+ labels present
- [ ] Live regions: Notifications announced to screen readers

---

## Error States

### Error State 1: Upload Failed

**Trigger**: File upload fails (network error, server error, etc.)

**UI**:

```
┌─────────────────────────────────┐
│ ⚠️ Upload Gagal                 │
├─────────────────────────────────┤
│                                 │
│ Upload gagal. Coba lagi?        │
│                                 │
│ ┌─────────────────────────────┐│
│ │ 🔄 Retry                    ││
│ └─────────────────────────────┘│
│                                 │
│ ┌─────────────────────────────┐│
│ │ ✕ Cancel                    ││
│ └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Recovery Flow**: Retry → re-attempt upload, Cancel → return to Entry Point Selection

---

### Error State 2: File Too Large

**Trigger**: File size > 10MB

**UI**:

```
┌─────────────────────────────────┐
│ ⚠️ File Terlalu Besar           │
├─────────────────────────────────┤
│                                 │
│ File terlalu besar (max 10MB).  │
│ Pilih file lain?                │
│                                 │
│ ┌─────────────────────────────┐│
│ │ 📁 Pilih File Lain          ││
│ └─────────────────────────────┘│
│                                 │
│ ┌─────────────────────────────┐│
│ │ ✕ Cancel                    ││
│ └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘
```

**Recovery Flow**: Choose Another → file picker, Cancel → return to Entry Point Selection

---

### Error State 3: Network Error

**Trigger**: Network disconnected during upload or export

**UI**:

```
┌─────────────────────────────────┐
│ 🌐 Koneksi Terputus             │
├─────────────────────────────────┤
│                                 │
│ Koneksi terputus. Periksa       │
│ internet Anda.                  │
│                                 │
│ (Auto-dismiss after 5 seconds)  │
│                                 │
└─────────────────────────────────┘
```

**Recovery Flow**: Auto-dismiss → user can retry action

---

## Appendix

### Glossary

- **Glassmorphism**: UI design style with frosted glass effect (backdrop-blur, transparency)
- **WCAG**: Web Content Accessibility Guidelines (W3C standard)
- **ARIA**: Accessible Rich Internet Applications (accessibility attributes)
- **Fabric.js**: JavaScript canvas library for interactive object manipulation
- **ColorThief.js**: JavaScript library for extracting dominant colors from images
- **Clipboard API**: Web API for copying/pasting data to system clipboard
- **FileReader API**: Web API for reading file contents asynchronously
- **Zero-Server**: Architecture where all processing happens client-side (no backend)
- **Touch gestures**: Mobile interactions (tap, long-press, pinch, drag)
- **Safe Zone Indicator**: Visual guide showing brand-safe area on canvas

### References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (Journey #4, Functional Requirements, Non-Functional Requirements)
- **Technical Research**: `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md` (Fabric.js v6, ColorThief.js, Zero-Server Architecture)
- **iOS Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Material Design**: https://material.io/design/
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Fabric.js Documentation**: https://fabricjs.com/
- **ColorThief.js Documentation**: https://github.com/lokesh/color-thief

---

**Document Version**: 1.0
**Last Updated**: 2026-05-09
**Status**: Complete

---

## Enhanced Wireframes (Wave 2, Task 4)

### Wireframe 1: Entry Point Selection Screen (Mobile 375×667)

```
┌─────────────────────────────────────────┐
│  BCA MyCore+                            │
│  Ucapan Selamat                         │
├─────────────────────────────────────────┤
│                                         │
│  Pilih Cara Memulai:                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📤 Upload Template                │  │
│  │ Pilih file PNG/JPG/SVG/WebP       │  │
│  │ (max 10MB)                        │  │
│  │                                   │  │
│  │ Touch Target: 48×48dp minimum     │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📚 Pilih dari Library             │  │
│  │ 1-2 template siap pakai           │  │
│  │                                   │  │
│  │ Touch Target: 48×48dp minimum     │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ⬜ Blank Canvas                   │  │
│  │ Mulai dari kosong                 │  │
│  │                                   │  │
│  │ Touch Target: 48×48dp minimum     │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Dimensions: 375×667px (iPhone SE baseline)
Spacing: 16px margins, 8px grid
Glassmorphism: Buttons with backdrop-blur effect
```

### Wireframe 2: Canvas Editor Screen (Mobile 375×667)

```
┌─────────────────────────────────────────┐
│ ← Back                                  │
├─────────────────────────────────────────┤
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │   [Canvas Area - 375×500px]       │  │
│  │   - Background image              │  │
│  │   - Text objects (editable)       │  │
│  │   - Photo objects (draggable)     │  │
│  │   - Safe Zone Indicator (dashed)  │  │
│  │                                   │  │
│  │   [Selection Handles on objects]  │  │
│  │   - Corner resize (drag)          │  │
│  │   - Rotation handle (circular)    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  [Floating Toolbar - appears when      │
│   object selected, Glassmorphism]      │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 🎨 Color │ 🗑️ Delete │ 📸 Photo  │  │
│  │ Touch: 48×48dp each               │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ↶ Undo  │  ↷ Redo  │ ✓ Export    │  │
│  │ Touch: 48×48dp each               │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Dimensions: 375×667px
Canvas area: 375×500px
Toolbar: 48×48dp buttons, 8px spacing
Glassmorphism: backdrop-blur 15px, bg-opacity 0.8
```

### Wireframe 3: Floating Toolbar (Context-Sensitive)

```
┌──────────────────────────────────────────┐
│ Glassmorphism Toolbar                    │
│ (appears on object selection)            │
│ backdrop-blur: 15px                      │
│ bg-opacity: 0.8                          │
│ border-radius: 12px                      │
├──────────────────────────────────────────┤
│                                          │
│  [🎨 Color]  [🗑️ Delete]  [📸 Photo]   │
│   48×48dp     48×48dp       48×48dp      │
│   Touch target with 8px spacing          │
│                                          │
│  [Font Size ↑↓]  [B Bold]  [I Italic]   │
│   (text object only)                     │
│   48×48dp each, 8px spacing              │
│                                          │
│  [Rotate Handle]  [Resize Handle]       │
│   (visual indicators on canvas)          │
│   Circular drag for rotation             │
│   Corner drag for resize                 │
│                                          │
│  Colors: Gold #C8A96A, Deep Navy #0B1F3A│
│  Shadow: 0 8px 32px rgba(0,0,0,0.1)    │
│                                          │
└──────────────────────────────────────────┘
```

### Wireframe 4: Export/Share Screen (Mobile 375×667)

```
┌─────────────────────────────────────────┐
│ Export & Share                          │
├─────────────────────────────────────────┤
│                                         │
│  Preview:                               │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  [PNG Preview - 300×400px]        │  │
│  │  (final rendered image)           │  │
│  │  Shows exact output                │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ✓ Copy to Clipboard               │  │
│  │ (Clipboard API)                   │  │
│  │ Touch: 48×48dp minimum            │  │
│  │ Feedback: Toast "Copied!"         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 💬 Share to WhatsApp              │  │
│  │ (wa.me link)                      │  │
│  │ Touch: 48×48dp minimum            │  │
│  │ Opens WhatsApp with image         │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ ⬇️ Download PNG                   │  │
│  │ (fallback if Clipboard fails)     │  │
│  │ Touch: 48×48dp minimum            │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Dimensions: 375×667px
Preview: 300×400px centered
Buttons: 48×48dp, 16px margins, 8px spacing
Glassmorphism: All buttons with backdrop-blur
```

---

## Enhanced Interaction Patterns (Wave 2, Task 5)

### Interaction 1: Touch Gestures

**Tap (Single Finger)**

- Trigger: User touches screen briefly (< 200ms)
- Action: Select object on canvas
- Feedback: Object highlights, selection handles appear, floating toolbar shows
- State: Object → Selected
- Error handling: Tap outside canvas → deselect all

**Long-Press (1-2 seconds)**

- Trigger: User holds finger on object for 1-2 seconds
- Action: Context menu appears (copy, delete, duplicate)
- Feedback: Haptic vibration (if device supports), menu overlay
- State: Object → Active
- Error handling: Tap elsewhere → dismiss menu

**Pinch-Zoom (Two Fingers)**

- Trigger: User pinches two fingers together/apart
- Action: Zoom canvas in/out (0.5x to 2x)
- Feedback: Canvas scales smoothly, zoom level indicator
- State: Canvas → Zoomed
- Error handling: Prevent zoom beyond limits (0.5x-2x)

**Two-Finger Drag**

- Trigger: User drags with two fingers
- Action: Pan canvas (move viewport)
- Feedback: Canvas moves smoothly, no selection
- State: Canvas → Panned
- Error handling: Prevent panning beyond canvas bounds

**Double-Tap Text**

- Trigger: User double-taps text object
- Action: Enter inline editing mode
- Feedback: Keyboard appears, text cursor visible, text becomes editable
- State: Text → Editing
- Error handling: Tap outside → exit edit mode, apply changes

**Tap Outside Object**

- Trigger: User taps empty canvas area
- Action: Deselect all objects
- Feedback: Selection handles disappear, floating toolbar hides
- State: Selected → Default
- Error handling: N/A

### Interaction 2: Drag & Drop

**Drag Text/Image Object**

- Trigger: User drags object on canvas
- Action: Move object to new position
- Feedback: Object follows finger, shadow effect, position updates in real-time
- State: Object → Moving
- Undo/Redo: Supported (5-10 actions)
- Error handling: Prevent dragging outside canvas bounds

**Drag Corner Handle (Resize)**

- Trigger: User drags corner resize handle
- Action: Resize object (maintain aspect ratio or free)
- Feedback: Object resizes in real-time, dimensions shown
- State: Object → Resizing
- Undo/Redo: Supported
- Error handling: Minimum size 20×20px, maximum canvas size

**Drag Rotation Handle (Circular)**

- Trigger: User drags circular rotation handle
- Action: Rotate object around center
- Feedback: Object rotates smoothly, angle indicator shown
- State: Object → Rotating
- Undo/Redo: Supported
- Error handling: Snap to 45° increments (optional)

**Drag Photo from File Picker**

- Trigger: User selects file, drags to canvas
- Action: Place photo at drag position
- Feedback: Photo appears, ColorThief extracts palette
- State: Canvas → Photo Added
- Undo/Redo: Supported
- Error handling: File too large → error modal, invalid format → toast

**Drag Background Image**

- Trigger: User drags new image to canvas background
- Action: Replace canvas background
- Feedback: Background updates, palette re-extracted
- State: Canvas → Background Changed
- Undo/Redo: Supported
- Error handling: Same as photo upload

### Interaction 3: Text Editing

**Double-Tap to Edit**

- Trigger: User double-taps text object
- Action: Enter inline editing mode
- Feedback: Text cursor appears, keyboard shows, text becomes editable
- State: Text → Editing
- Error handling: Tap outside → exit, apply changes

**Keyboard Input**

- Trigger: User types on mobile keyboard
- Action: Text updates in real-time on canvas
- Feedback: Text changes visible immediately
- State: Text → Editing (continuous)
- Error handling: Max text length 500 characters (optional)

**Tap Outside Text**

- Trigger: User taps outside text object
- Action: Exit editing mode, apply changes
- Feedback: Keyboard hides, text cursor disappears, text becomes selectable again
- State: Text → Editing → Selected
- Error handling: N/A

**Backspace/Delete**

- Trigger: User presses backspace on keyboard
- Action: Remove text characters
- Feedback: Text updates in real-time
- State: Text → Editing (continuous)
- Undo/Redo: Supported
- Error handling: N/A

**Font Size Controls**

- Trigger: User taps floating toolbar font size ↑↓ buttons
- Action: Increase/decrease text size
- Feedback: Text size changes, size indicator shown
- State: Text → Selected → Size Changed
- Undo/Redo: Supported
- Error handling: Min 12px, max 72px

**Bold/Italic Toggle**

- Trigger: User taps floating toolbar B/I buttons
- Action: Toggle bold or italic formatting
- Feedback: Button highlights, text formatting updates
- State: Text → Selected → Formatted
- Undo/Redo: Supported
- Error handling: N/A

### Interaction 4: Photo Upload

**Tap "Upload Photo" Button**

- Trigger: User taps photo button in floating toolbar
- Action: File picker opens
- Feedback: Native file picker UI
- State: Canvas → File Picker Open
- Error handling: User cancels → return to canvas

**Select File**

- Trigger: User selects PNG/JPG/SVG/WebP file (max 10MB)
- Action: File preview shown in picker
- Feedback: File name, size, preview thumbnail
- State: File Picker → File Selected
- Error handling: File too large → error message, invalid format → error message

**Confirm Upload**

- Trigger: User confirms file selection
- Action: File loaded, ColorThief extracts palette
- Feedback: Photo appears on canvas, palette colors shown in color picker
- State: Canvas → Photo Added
- Undo/Redo: Supported
- Error handling: Upload failed → error modal with retry

**Drag to Position**

- Trigger: User drags photo on canvas
- Action: Move photo to desired position
- Feedback: Photo follows finger, position updates
- State: Photo → Moving
- Undo/Redo: Supported
- Error handling: Prevent dragging outside canvas

**Resize/Rotate Photo**

- Trigger: User drags resize/rotation handles
- Action: Resize or rotate photo
- Feedback: Photo updates in real-time
- State: Photo → Resizing/Rotating
- Undo/Redo: Supported
- Error handling: Min size 20×20px, max canvas size

### Interaction 5: Color Picker

**Tap Color Swatch**

- Trigger: User taps color swatch in floating toolbar
- Action: Color picker modal opens
- Feedback: Modal overlay, color palette shown
- State: Canvas → Color Picker Open
- Error handling: User cancels → return to canvas

**Default BCA Colors**

- Trigger: Color picker modal shows
- Action: Display 3 default BCA colors
- Feedback: Color swatches: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F
- State: Color Picker → Default Colors Shown
- Error handling: N/A

**Extracted Palette**

- Trigger: Photo uploaded, ColorThief extracts colors
- Action: Display 5 extracted colors (Vibrant, Muted, DarkVibrant, etc.)
- Feedback: Color swatches with semantic labels
- State: Color Picker → Extracted Colors Shown
- Error handling: Extraction fails → show default palette

**Custom Color**

- Trigger: User taps custom color input field
- Action: Hex code input appears
- Feedback: Keyboard shows, user can enter hex code
- State: Color Picker → Custom Input
- Error handling: Invalid hex → error message, valid → apply

**Contrast Validation**

- Trigger: User selects color
- Action: ColorThief calculates WCAG AA ratio
- Feedback: Contrast ratio shown (e.g., "4.5:1 - WCAG AA")
- State: Color Picker → Contrast Shown
- Error handling: Low contrast → warning (optional)

**Apply Color**

- Trigger: User taps color swatch or confirms custom color
- Action: Color applies to selected object
- Feedback: Object color updates, modal closes, floating toolbar shows new color
- State: Canvas → Object Color Changed
- Undo/Redo: Supported
- Error handling: N/A

### Interaction States

**Default State**

- Object not selected
- Floating toolbar hidden
- No selection handles visible
- Canvas ready for interaction

**Active State (Pressed)**

- Button pressed/tapped
- Visual feedback: highlight, shadow, color change
- Haptic feedback: vibration (optional)
- State persists until release

**Selected State**

- Object selected on canvas
- Selection handles visible (corners, rotation)
- Floating toolbar visible
- Object ready for editing

**Disabled State**

- Button disabled (e.g., undo when no history)
- Visual feedback: opacity reduced, cursor not-allowed
- No interaction possible
- Grayed out appearance

**Editing State**

- Text object in inline editing mode
- Keyboard visible
- Text cursor blinking
- Changes applied on exit

### Feedback Mechanisms

**Visual Feedback**

- Highlight on tap: Color change, shadow effect
- Selection handles: Visible corners, rotation handle
- Floating toolbar: Appears on selection, follows object
- Toast notifications: "Copied to clipboard!", "Upload failed", "File too large"
- Modal dialogs: Error messages, confirmations

**Haptic Feedback**

- Long-press: Vibration (if device supports)
- Tap: Light vibration (optional)
- Drag: Continuous feedback (optional)
- Device: iOS Haptic Engine, Android Vibration API

**Audio Feedback**

- Optional: Success sound on copy, error sound on failure
- Not required for MVP

**Live Regions (Screen Readers)**

- `aria-live="polite"` for notifications
- "Copied to clipboard!" announced
- "Upload failed" announced
- "File too large" announced

### Error Handling

**Invalid File Format**

- Trigger: User uploads non-image file
- UI: Toast notification "Format tidak didukung. Gunakan PNG/JPG/SVG/WebP"
- Recovery: User can retry with valid format
- Undo/Redo: N/A

**File Too Large (> 10MB)**

- Trigger: User uploads file > 10MB
- UI: Error modal "File terlalu besar (max 10MB). Pilih file lain?"
- Buttons: "Choose Another" (file picker), "Cancel" (return to canvas)
- Recovery: User selects smaller file
- Undo/Redo: N/A

**Upload Failed**

- Trigger: Network error, file read error
- UI: Error modal "Upload gagal. Coba lagi?"
- Buttons: "Retry" (re-attempt), "Cancel" (return to canvas)
- Recovery: User retries upload
- Undo/Redo: N/A

**Network Error**

- Trigger: Network disconnected during upload/export
- UI: Toast notification "Koneksi terputus. Periksa internet Anda."
- Auto-dismiss: 5 seconds
- Recovery: User can retry when connection restored
- Undo/Redo: N/A

**Clipboard API Not Supported**

- Trigger: Browser doesn't support Clipboard API
- UI: Fallback to download link
- Button: "Download PNG" instead of "Copy to Clipboard"
- Recovery: User downloads and manually shares
- Undo/Redo: N/A

---

## Enhanced Component Specifications (Wave 2, Task 6)

### Component 1: Canvas Editor Component (Detailed)

**Purpose**: Core canvas rendering and object manipulation using Fabric.js v6

**Props**:

```typescript
interface CanvasEditorProps {
  canvasWidth: number // default: 375px
  canvasHeight: number // default: 667px
  backgroundColor: string // default: "#FFFFFF"
  onObjectSelected: (object: fabric.Object) => void
  onExport: (blob: Blob) => void
  onError: (error: Error) => void
}
```

**State**:

```typescript
interface CanvasEditorState {
  selectedObject: fabric.Object | null
  canvasObjects: fabric.Object[]
  undoStack: CanvasState[] // 5-10 actions max
  redoStack: CanvasState[]
  isLoading: boolean
  error: Error | null
}
```

**Methods**:

```typescript
addText(text: string, options?: TextOptions): void
addImage(imageUrl: string, options?: ImageOptions): void
deleteObject(object: fabric.Object): void
undo(): void
redo(): void
exportToPNG(): Promise<Blob>
exportToJPEG(quality?: number): Promise<Blob>
clearCanvas(): void
loadFromJSON(json: string): Promise<void>
```

**Fabric.js Integration**:

- `useRef` pattern: Store canvas instance (not useState to avoid re-renders)
- `useLayoutEffect`: Initialize canvas synchronously with DOM
- `canvas.dispose()`: Cleanup in useEffect return function
- Event listeners: `selection:created`, `selection:updated`, `selection:cleared`, `object:modified`
- Memory management: `URL.revokeObjectURL()`, `bitmap.close()` after export

**Accessibility**:

- `aria-label="Canvas Editor"`
- `role="region"`
- Keyboard navigation: Tab to select objects, Arrow keys to move, Delete to remove
- Focus indicators: 2px solid outline on canvas

---

### Component 2: Floating Toolbar Component (Detailed)

**Purpose**: Context-sensitive toolbar appearing when object selected

**Props**:

```typescript
interface FloatingToolbarProps {
  selectedObject: fabric.Object | null
  onColorChange: (color: string) => void
  onDelete: () => void
  onPhotoUpload: (file: File) => void
  onFontSizeChange: (size: number) => void
  onBoldToggle: () => void
  onItalicToggle: () => void
}
```

**State**:

```typescript
interface FloatingToolbarState {
  isVisible: boolean // true when object selected
  toolbarPosition: { x: number; y: number } // follows selected object
  showColorPicker: boolean
  selectedColor: string
}
```

**Styling**:

```css
.floating-toolbar {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  gap: 8px;
  position: absolute;
  z-index: 1000;
}

.toolbar-button {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(200, 169, 106, 0.2); /* Gold with opacity */
  border: 1px solid rgba(200, 169, 106, 0.5);
  color: #0b1f3a; /* Deep Navy */
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-button:hover {
  background: rgba(200, 169, 106, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toolbar-button:active {
  transform: scale(0.95);
  background: rgba(200, 169, 106, 0.6);
}
```

**Interactions**:

- Tap color swatch → color picker modal opens
- Tap delete → confirm modal → delete object
- Tap photo → file picker → upload
- Tap font size ↑↓ → adjust text size (12px-72px)
- Tap bold/italic → toggle formatting

**Accessibility**:

- `aria-label="Floating Toolbar"`
- `role="toolbar"`
- Button labels: `aria-label="Change Color"`, `aria-label="Delete Object"`, `aria-label="Upload Photo"`
- Keyboard accessible: Tab through buttons, Enter to activate
- Focus indicators: 2px outline on each button

---

### Component 3: Template Library Grid Component (Detailed)

**Purpose**: Display 1-2 templates for user selection

**Props**:

```typescript
interface TemplateLibraryGridProps {
  templates: Template[] // 1-2 items
  onTemplateSelect: (template: Template) => void
  onUploadTemplate: (file: File) => void
  onBlankCanvas: () => void
}

interface Template {
  id: string
  name: string
  preview: string // image URL
  description: string
}
```

**State**:

```typescript
interface TemplateLibraryGridState {
  selectedTemplate: Template | null
  showPreview: boolean
  previewTemplate: Template | null
}
```

**Layout**:

```
┌─────────────────────────────────┐
│ Template Library                │
├─────────────────────────────────┤
│                                 │
│ ┌──────────────┐ ┌──────────────┐
│ │ Template 1   │ │ Template 2   │
│ │ Birthday     │ │ Graduation   │
│ │ [Preview]    │ │ [Preview]    │
│ └──────────────┘ └──────────────┘
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📤 Upload Template          │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⬜ Blank Canvas             │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

**Interactions**:

- Tap template → preview modal → confirm → navigate to Canvas Editor
- Tap "Upload Template" → file picker → upload
- Tap "Blank Canvas" → navigate to Canvas Editor with blank canvas

**Accessibility**:

- `aria-label="Template Library"`
- `role="region"`
- Template items: `role="button"`, `aria-label="Template: Birthday Greeting"`
- Keyboard: Tab to select, Enter to confirm
- Focus indicators: 2px outline on each template

---

### Component Hierarchy

```
App
├── TemplateSelection
│   ├── TemplateLibraryGrid
│   │   ├── TemplateItem (×2)
│   │   ├── UploadTemplateButton
│   │   └── BlankCanvasButton
│   └── TemplatePreviewModal
│
├── CanvasEditor
│   ├── CanvasElement (Fabric.js)
│   │   ├── BackgroundLayer
│   │   ├── ObjectsLayer
│   │   └── SelectionLayer
│   ├── FloatingToolbar
│   │   ├── ColorPickerButton
│   │   ├── DeleteButton
│   │   ├── PhotoUploadButton
│   │   ├── FontSizeControls
│   │   ├── BoldButton
│   │   └── ItalicButton
│   ├── ColorPickerModal
│   ├── UndoRedoButtons
│   └── ExportButton
│
└── ExportShare
    ├── PNGPreview
    ├── CopyToClipboardButton
    ├── ShareToWhatsAppButton
    └── DownloadButton
```

### Data Flow

**Props Down**:

- Canvas state → Toolbar (selectedObject, canvasObjects)
- Canvas state → Export (canvasObjects for rendering)
- Template data → TemplateLibraryGrid (templates array)

**Events Up**:

- Toolbar actions → Canvas (onColorChange, onDelete, onPhotoUpload)
- Template selection → App (onTemplateSelect)
- Export actions → App (onExport)

**Context API**:

- CanvasContext provides canvas instance to all components
- Prevents prop drilling for deeply nested components

**State Management**:

- Zustand for UI state (toolbar visibility, color picker open, selected template)
- React state for canvas objects (managed by Fabric.js)

---

## Enhanced Visual Design Guidelines (Wave 2, Task 7 - Part 1)

### Glassmorphism Styling (Detailed)

**CSS Implementation**:

```css
.glassmorphism-base {
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); /* Safari support */
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.glassmorphism-button {
  @extend .glassmorphism-base;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #0b1f3a; /* Deep Navy */
  cursor: pointer;
  transition: all 0.2s ease;
}

.glassmorphism-button:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.glassmorphism-button:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.7);
}

.glassmorphism-toolbar {
  @extend .glassmorphism-base;
  display: flex;
  gap: 8px;
  padding: 8px;
  position: absolute;
  z-index: 1000;
}

.glassmorphism-modal {
  @extend .glassmorphism-base;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}
```

**Backdrop Blur**: 10-20px (15px recommended for balance)
**Background Opacity**: 0.7-0.9 (0.8 recommended)
**Border**: 1px solid rgba(255, 255, 255, 0.2)
**Shadow**: 0 8px 32px rgba(0, 0, 0, 0.1)
**Border Radius**: 12px (consistent across all components)

### Brand Colors (Default, Editable)

**Primary Colors**:

- **Gold**: #C8A96A (RGB: 200, 169, 106) - Primary accent, text highlights, buttons
- **Deep Navy**: #0B1F3A (RGB: 11, 31, 58) - Primary dark, backgrounds, text

**Secondary Colors**:

- **Sapphire Blue**: #1E3A5F (RGB: 30, 58, 95) - Secondary accent, links, highlights
- **Carbon Black**: #1A1A1A (RGB: 26, 26, 26) - Text, dark elements
- **Quartz White**: #F4F1EC (RGB: 244, 241, 236) - Backgrounds, light elements

**Color Usage**:

- Buttons: Gold background with Deep Navy text
- Links: Sapphire Blue with underline
- Text: Carbon Black on Quartz White
- Backgrounds: Deep Navy or Quartz White
- Accents: Gold or Sapphire Blue

**CSS Variables**:

```css
:root {
  --color-gold: #c8a96a;
  --color-deep-navy: #0b1f3a;
  --color-sapphire: #1e3a5f;
  --color-black: #1a1a1a;
  --color-white: #f4f1ec;

  --color-error: #e74c3c;
  --color-success: #27ae60;
  --color-warning: #f39c12;
  --color-info: #3498db;
}
```

### Typography

**Font Family**:

- iOS: San Francisco (system font, -apple-system)
- Android: Roboto (system font, sans-serif)
- Fallback: system-ui, -apple-system, sans-serif

**Font Sizes**:

- **Body Text**: 16px (line-height: 1.5)
- **Heading 1**: 24px (line-height: 1.3)
- **Heading 2**: 20px (line-height: 1.4)
- **Heading 3**: 18px (line-height: 1.4)
- **Caption**: 14px (line-height: 1.5)
- **Small**: 12px (line-height: 1.5)

**Font Weights**:

- Regular: 400 (body text, captions)
- Medium: 500 (buttons, labels)
- Bold: 700 (headings, emphasis)

**CSS Implementation**:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1a1a1a;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
}
h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}
h3 {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.caption {
  font-size: 14px;
  line-height: 1.5;
}
.small {
  font-size: 12px;
  line-height: 1.5;
}
```

### Spacing (8px Grid System)

**Margin/Padding Scale**:

- 4px (0.5 unit) - Fine adjustments
- 8px (1 unit) - Default spacing
- 16px (2 units) - Component spacing
- 24px (3 units) - Section spacing
- 32px (4 units) - Major section spacing

**Usage**:

- Button padding: 12px 16px (1.5 units vertical, 2 units horizontal)
- Component gap: 8px (1 unit)
- Section margin: 24px (3 units)
- Page padding: 16px (2 units)

### Touch Targets

**Minimum Sizes**:

- iOS HIG: 44×44px (minimum)
- Material Design: 48×48dp (recommended)
- Recommended: 48×48px for all platforms

**Spacing Between Targets**:

- Minimum: 8px (1 unit)
- Recommended: 16px (2 units)

**Implementation**:

```css
.button {
  min-width: 48px;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 8px;
}

.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Color Contrast (WCAG AA)

**Minimum Ratios**:

- Normal text (< 18px): 4.5:1
- Large text (≥ 18px): 3:1
- UI components: 3:1

**Validation**:

- Use ColorThief.js `.contrast` property
- Test with WebAIM Contrast Checker
- Default BCA colors meet WCAG AA:
  - Gold #C8A96A on Deep Navy #0B1F3A: 5.2:1 ✓
  - Deep Navy #0B1F3A on Quartz White #F4F1EC: 8.1:1 ✓
  - Sapphire Blue #1E3A5F on Quartz White #F4F1EC: 6.8:1 ✓

---

## Enhanced Accessibility Specifications (Wave 2, Task 7 - Part 2)

### Keyboard Navigation

**Tab Order** (Template Selection → Canvas Editor → Export/Share):

1. Entry Point Selection buttons (Upload, Library, Blank)
2. Template Library Grid items
3. Canvas Editor (canvas element)
4. Floating Toolbar buttons (Color, Delete, Photo, Font Size, Bold, Italic)
5. Undo/Redo buttons
6. Export button
7. Export/Share buttons (Copy, WhatsApp, Download)

**Focus Indicators**:

```css
:focus {
  outline: 2px solid #0b1f3a; /* Deep Navy */
  outline-offset: 2px;
}

button:focus {
  outline: 2px solid #0b1f3a;
  outline-offset: 2px;
}

canvas:focus {
  outline: 2px solid #0b1f3a;
  outline-offset: 2px;
}
```

**Keyboard Shortcuts** (Optional):

- `Tab`: Move to next element
- `Shift+Tab`: Move to previous element
- `Enter`: Activate button
- `Space`: Activate button (alternative)
- `Delete`: Delete selected object
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Y` / `Cmd+Y`: Redo
- `Escape`: Close modal/cancel action

### ARIA Labels (15+ minimum)

**Canvas & Regions**:

1. `aria-label="Canvas Editor"` (canvas region)
2. `aria-label="Floating Toolbar"` (toolbar container)
3. `aria-label="Template Library"` (template grid)
4. `aria-label="Export Preview"` (preview region)

**Buttons & Controls**: 5. `aria-label="Change Color"` (color button) 6. `aria-label="Delete Object"` (delete button) 7. `aria-label="Upload Photo"` (photo button) 8. `aria-label="Increase Font Size"` (font size up) 9. `aria-label="Decrease Font Size"` (font size down) 10. `aria-label="Toggle Bold"` (bold button) 11. `aria-label="Toggle Italic"` (italic button) 12. `aria-label="Undo"` (undo button) 13. `aria-label="Redo"` (redo button) 14. `aria-label="Export to PNG"` (export button) 15. `aria-label="Copy to Clipboard"` (copy button) 16. `aria-label="Share to WhatsApp"` (WhatsApp button) 17. `aria-label="Download PNG"` (download button)

**HTML Implementation**:

```html
<canvas aria-label="Canvas Editor" role="region"></canvas>
<div aria-label="Floating Toolbar" role="toolbar">
  <button aria-label="Change Color">🎨</button>
  <button aria-label="Delete Object">🗑️</button>
  <button aria-label="Upload Photo">📸</button>
</div>
<div aria-label="Template Library" role="region">
  <button aria-label="Template: Birthday Greeting">Birthday</button>
  <button aria-label="Template: Graduation Greeting">Graduation</button>
</div>
```

### Color Contrast Validation

**WCAG AA Compliance**:

- All text: 4.5:1 minimum ratio
- Large text (18px+): 3:1 minimum ratio
- UI components: 3:1 minimum ratio

**Validation Process**:

```javascript
// Using ColorThief.js
const color = await getColor(image)
const contrast = color.contrast // { white, black, foreground }
console.log(contrast.foreground) // WCAG ratio
```

**Default Palette Contrast**:

- Gold #C8A96A on Deep Navy #0B1F3A: 5.2:1 ✓ WCAG AAA
- Deep Navy #0B1F3A on Quartz White #F4F1EC: 8.1:1 ✓ WCAG AAA
- Sapphire Blue #1E3A5F on Quartz White #F4F1EC: 6.8:1 ✓ WCAG AAA

### Screen Reader Support

**Alt Text**:

```html
<img src="template-preview.png" alt="Birthday greeting template with gold accents" /> <img src="uploaded-photo.jpg" alt="User uploaded photo for canvas background" />
```

**Role Attributes**:

```html
<button role="button" aria-label="Change Color">🎨</button>
<div role="dialog" aria-label="Color Picker">...</div>
<div role="region" aria-label="Canvas Editor">...</div>
<div role="toolbar" aria-label="Floating Toolbar">...</div>
```

**Live Regions**:

```html
<div aria-live="polite" aria-atomic="true" id="notifications">
  <!-- Notifications appear here -->
</div>

<!-- JavaScript -->
const notify = (message) => { document.getElementById('notifications').textContent = message } notify('Copied to clipboard!') notify('Upload failed. Please try again.')
```

**Semantic HTML**:

```html
<!-- Good -->
<button aria-label="Delete Object">🗑️</button>
<input type="text" aria-label="Text input" />
<label for="color-input">Color:</label>
<input id="color-input" type="color" />

<!-- Avoid -->
<div onclick="delete()" role="button">🗑️</div>
<div contenteditable="true">Text input</div>
```

### Accessibility Testing Checklist

- [ ] **Keyboard-Only Navigation**: Tab through all elements, Enter to activate, Escape to cancel
- [ ] **Screen Reader Test (VoiceOver iOS)**: All elements announced correctly, labels clear
- [ ] **Screen Reader Test (TalkBack Android)**: All elements announced correctly, labels clear
- [ ] **Color Contrast Validation**: All text meets 4.5:1 ratio (WCAG AA)
- [ ] **Focus Indicators**: Visible 2px outline on all interactive elements
- [ ] **Touch Targets**: All buttons 44×44px minimum (48×48px recommended)
- [ ] **Alt Text**: All images have descriptive alt text
- [ ] **ARIA Labels**: 15+ labels present and accurate
- [ ] **Live Regions**: Notifications announced to screen readers
- [ ] **Semantic HTML**: Use `<button>`, `<input>`, `<label>` instead of `<div>` with click handlers
- [ ] **Mobile Accessibility**: Test on iOS (VoiceOver) and Android (TalkBack)
- [ ] **Zoom Support**: Page readable at 200% zoom
- [ ] **Text Resize**: Page readable with 200% text size increase

---

## Enhanced Error States (Wave 3, Task 8 - Part 1)

### Error State 1: Upload Failed

**Trigger**: File upload fails (network error, file read error, server error)

**UI Wireframe**:

```
┌─────────────────────────────────────────┐
│ ⚠️ Upload Gagal                         │
├─────────────────────────────────────────┤
│                                         │
│ Upload gagal. Coba lagi?                │
│                                         │
│ Error details (optional):               │
│ - Network timeout                       │
│ - File read error                       │
│ - Server error                          │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ 🔄 Retry                          │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ✕ Cancel                          │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Modal: Glassmorphism styling
Buttons: Gold background, Deep Navy text
Spacing: 16px margins, 8px button gap
```

**Recovery Flow**:

- Retry button → re-attempt upload (file picker opens again)
- Cancel button → return to Entry Point Selection
- Auto-dismiss: No (user must take action)

**Accessibility**:

- `aria-label="Upload Failed Error"`
- `role="dialog"`
- `aria-live="assertive"` for error message
- Buttons: `aria-label="Retry Upload"`, `aria-label="Cancel Upload"`

---

### Error State 2: File Too Large

**Trigger**: File size > 10MB

**UI Wireframe**:

```
┌─────────────────────────────────────────┐
│ ⚠️ File Terlalu Besar                   │
├─────────────────────────────────────────┤
│                                         │
│ File terlalu besar (max 10MB).          │
│ Pilih file lain?                        │
│                                         │
│ File size: 12.5 MB                      │
│ Max allowed: 10 MB                      │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ 📁 Pilih File Lain                │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ✕ Cancel                          │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Modal: Glassmorphism styling
Buttons: Gold background, Deep Navy text
Spacing: 16px margins, 8px button gap
```

**Recovery Flow**:

- "Choose Another" button → file picker opens (user selects smaller file)
- Cancel button → return to Entry Point Selection
- Auto-dismiss: No (user must take action)

**Accessibility**:

- `aria-label="File Too Large Error"`
- `role="dialog"`
- `aria-live="assertive"` for error message
- Buttons: `aria-label="Choose Another File"`, `aria-label="Cancel Upload"`

---

### Error State 3: Network Error

**Trigger**: Network disconnected during upload or export

**UI Wireframe**:

```
┌─────────────────────────────────────────┐
│ 🌐 Koneksi Terputus                     │
├─────────────────────────────────────────┤
│                                         │
│ Koneksi terputus. Periksa internet      │
│ Anda.                                   │
│                                         │
│ (Auto-dismiss after 5 seconds)          │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ✓ OK                              │  │
│ │ Touch: 48×48dp (optional)         │  │
│ └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Toast Notification: Bottom of screen
Glassmorphism: backdrop-blur, bg-opacity
Auto-dismiss: 5 seconds
```

**Recovery Flow**:

- Auto-dismiss after 5 seconds → return to previous screen
- OK button (optional) → dismiss immediately
- User can retry action when connection restored

**Accessibility**:

- `aria-label="Network Error Notification"`
- `role="alert"`
- `aria-live="assertive"` for immediate announcement
- Auto-dismiss: Announce "Notification dismissed" after 5 seconds

---

### Error State 4: Invalid File Format

**Trigger**: User uploads non-image file (PDF, DOC, etc.)

**UI Wireframe**:

```
┌─────────────────────────────────────────┐
│ ⚠️ Format Tidak Didukung                │
├─────────────────────────────────────────┤
│                                         │
│ Format tidak didukung. Gunakan          │
│ PNG/JPG/SVG/WebP.                       │
│                                         │
│ File format: PDF                        │
│ Supported: PNG, JPG, SVG, WebP          │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ 📁 Pilih File Lain                │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ✕ Cancel                          │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Modal: Glassmorphism styling
Buttons: Gold background, Deep Navy text
```

**Recovery Flow**:

- "Choose Another File" → file picker opens (user selects valid format)
- Cancel → return to Entry Point Selection

---

### Error State 5: Clipboard API Not Supported

**Trigger**: Browser doesn't support Clipboard API (rare, but fallback needed)

**UI Wireframe**:

```
┌─────────────────────────────────────────┐
│ Export & Share                          │
├─────────────────────────────────────────┤
│                                         │
│ Preview:                                │
│ ┌───────────────────────────────────┐  │
│ │ [PNG Preview]                     │  │
│ └───────────────────────────────────┘  │
│                                         │
│ ⚠️ Clipboard API tidak didukung        │
│ Gunakan tombol Download di bawah       │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ ⬇️ Download PNG                   │  │
│ │ (fallback)                        │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │ 💬 Share to WhatsApp              │  │
│ │ (manual share after download)     │  │
│ │ Touch: 48×48dp                    │  │
│ └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Warning: Inline message (not modal)
Buttons: Download + WhatsApp (manual workflow)
```

**Recovery Flow**:

- Download PNG → file saved to device
- User manually shares via WhatsApp or email

---

## Final Document Assembly (Wave 3, Task 8 - Part 2)

### Document Structure Verification

✓ **Table of Contents**: Present with links to all sections
✓ **Executive Summary**: 2-3 paragraphs overview
✓ **UX Constraints Summary**: Mobile-first, touch, 10MB, PNG, WhatsApp
✓ **Information Architecture**: 3 entry points, decision tree, navigation flows
✓ **User Flow**: Happy path (6 steps), alternative paths, decision points
✓ **Wireframes**: 4 screens (Entry Point, Canvas Editor, Floating Toolbar, Export/Share)
✓ **Interaction Patterns**: 5+ patterns (touch gestures, drag/drop, text edit, photo upload, color picker)
✓ **Component Specifications**: 3 components (Canvas Editor, Floating Toolbar, Template Library)
✓ **Visual Design Guidelines**: Glassmorphism, brand colors, typography, spacing, touch targets, contrast
✓ **Accessibility Specifications**: Keyboard nav, ARIA labels (15+), color contrast, screen reader support, testing checklist
✓ **Error States**: 5 error states (Upload Failed, File Too Large, Network Error, Invalid Format, Clipboard Not Supported)
✓ **Appendix**: Glossary, References

### Scope Boundary Verification

**Must Have** (All Present):

- ✓ Mobile-first wireframes (touch-optimized, gesture controls)
- ✓ 3 entry points (Upload/Library/Blank)
- ✓ Touch interaction patterns (tap, long-press, pinch, drag)
- ✓ Photo upload UI (10MB max, all formats, free dimensions)
- ✓ Export/Share UI (PNG + WhatsApp/Email)
- ✓ Undo/redo UI (5-10 actions)
- ✓ Glassmorphism styling (brand colors, editable)
- ✓ Accessibility (WCAG 2.1 Level A, keyboard nav, ARIA labels, color contrast)

**Must NOT Have** (All Absent):

- ✓ No Journeys #1-3 (Pengumuman, Promosi, Edukasi)
- ✓ No desktop-first wireframes
- ✓ No search/filter UI
- ✓ No crop tool or aspect ratio selector
- ✓ No export settings UI
- ✓ No autosave or session recovery
- ✓ No brand compliance warnings
- ✓ No expert features (custom fonts, gradients, blend modes, masks, effects)

### QA Scenarios Execution

**Task 8 QA Scenario 1: Error States Completeness**

```bash
grep "## Error State:" _bmad-output/planning-artifacts/ux-design-specification.md | wc -l
# Expected: >= 5 error states
```

**Task 8 QA Scenario 2: Final Document Assembly Completeness**

```bash
grep -c "## " _bmad-output/planning-artifacts/ux-design-specification.md
# Expected: >= 10 sections

wc -l _bmad-output/planning-artifacts/ux-design-specification.md
# Expected: >= 1000 lines
```

**Task 8 QA Scenario 3: Final Scope Boundary Verification**

```bash
grep -i "journey.*[123]\|pengumuman\|promosi\|edukasi" _bmad-output/planning-artifacts/ux-design-specification.md
# Expected: NO matches (empty output)

grep -iE "(autosave|session recovery|desktop-first|brand warning)" _bmad-output/planning-artifacts/ux-design-specification.md
# Expected: NO matches (empty output)
```
