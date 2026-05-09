---
stepsCompleted:
  - step-01-validate-prerequisites.completed
inputDocuments:
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/prd.md
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/architecture-decision-document.md
  - /Users/ianrizky/Sites/bca-mycoreplus/_bmad-output/planning-artifacts/ux-design-specification.md
---

# BCA MyCore+ - Epic Breakdown

## Overview

Wujudkan aplikasi web generator gambar client‑side untuk BCA.

## Requirements Inventory

### Functional Requirements

- FR1: Upload logo/background image via drag‑drop or file picker.
- FR2: Add, edit, delete, resize, rotate, and reposition text objects.
- FR3: Add and manipulate image objects (drag, resize, rotate).
- FR4: Select objects to show context‑sensitive toolbar.
- FR5: Display brand‑compliant safe zone indicator.
- FR6: Enable invisible UI toolbar that appears only when an object is selected.
- FR7: Provide template library with pre‑approved BCA templates.
- FR8: Allow custom template uploads with validation against brand guidelines.
- FR9: Offer a template‑only mode to restrict edits to pre‑approved templates.
- FR10: Auto‑generate and display a 5‑color palette using ColorThief.js after an image is uploaded.
- FR11: Let users choose colors from the palette or default BCA colors.
- FR12: Reset selected text or image colors back to brand defaults.
- FR13: Copy the final canvas to clipboard using the Clipboard API.
- FR14: Open a wa.me link for sharing via WhatsApp.
- FR15: Provide a fallback download link if Clipboard API is unavailable.
- FR16: Show a glassmorphism floating toolbar on object selection.
- FR17: Hide the toolbar and context menu when no object is selected.
- FR18: Include undo/redo support for up to 10 actions.
- FR19: Display error modals for upload failures, oversized files, and network errors.
- FR20: Ensure keyboard navigation for all interactive elements.
- FR21: Implement ARIA labels and live regions for accessibility.
- FR22: Confirm zero‑server operation (no external network calls).

### Non‑Functional Requirements

- NFR1: Total bundle size < 250 KB gzipped.
- NFR2: Initial page load time (TTI) < 2 s.
- NFR3: Peak memory usage < 500 MB in mobile browsers.
- NFR4: All clipboard operations succeed > 95 % of the time.
- NFR5: Rendering of canvas operations completes < 100 ms.
- NFR6: Color contrast between text and background meets WCAG 2.1 Level A (≥ 4.5:1).
- NFR7: No data leaves the client browser (0 % leakage).
- NFR8: Application uses HTTPS/localhost for Clipboard API.
- NFR9: CORS handling allows only same‑origin or marked external images.
- NFR10: All Fabric.js actions are cleaned up with canvas.dispose() and URL.revokeObjectURL().
- NFR11: Offline readiness via PWA service workers (optional after MVP).
- NFR12: No auto‑save, state lives only in session.

### Additional Requirements (Architecture)

- Use Fabric.js v6.4.3 for canvas rendering.
- Use Zustand as global state store.
- Store templates in IndexedDB under `bca-mycoreplus-templates`.
- Persist user preferences in localStorage.
- Implement lazy loading of route components and heavy libraries (Fabric.js, ColorThief).
- Enforce brand colors and safe zone dimensions.
- Enable swipe‑to‑copy to clipboard and provide fallback download.

### UX Design Requirements

- UX‑DR1: Entry point screen offers three options (Upload template, Browse library, Blank canvas).
- UX‑DR2: Canvas area sized 375×500 px on mobile, 100 % width on large screens.
- UX‑DR3: Glassmorphism toolbar with backdrop‑blur and 0.8 opacity.
- UX‑DR4: 48 × 48 dp touch targets for all toolbar buttons.
- UX‑DR5: Live preview of the final PNG before clipboard.
- UX‑DR6: Safe zone outlined in dashed gray, brand‑compliant when exceeded.
- UX‑DR7: Undo/Redo buttons disabled when no history.
- UX‑DR8: Toast notifications for clipboard copy, upload errors, and network failures.
- UX‑DR9: Screen reader live region announcing actions.
- UX‑DR10: Keyboard navigation: Tab for selection, Arrow keys for movement, Ctrl+Z/Ctrl+Y for undo/redo.

### FR Coverage Map

| FR   | Covered in Epic | Notes                     |
| ---- | --------------- | ------------------------- |
| FR1  | Yes             | File upload component     |
| FR2  | Yes             | Text editing component    |
| FR3  | Yes             | Image manipulation        |
| FR4  | Yes             | Toolbar visibility logic  |
| FR5  | Yes             | Safe zone component       |
| FR6  | Yes             | Toolbar rendering         |
| FR7  | Yes             | Template library page     |
| FR8  | Yes             | Upload validation         |
| FR9  | Yes             | Template‑only mode toggle |
| FR10 | Yes             | ColorThief integration    |
| FR11 | Yes             | Color picker              |
| FR12 | Yes             | Reset color action        |
| FR13 | Yes             | Clipboard API wrapper     |
| FR14 | Yes             | WhatsApp share link       |
| FR15 | Yes             | Fallback download button  |
| FR16 | Yes             | Toolbar styling           |
| FR17 | Yes             | Toolbar hide logic        |
| FR18 | Yes             | Undo/Redo stack           |
| FR19 | Yes             | Error handling UI         |
| FR20 | Yes             | Keyboard navigation       |
| FR21 | Yes             | ARIA labels               |
| FR22 | Yes             | No external calls         |

### Epic 1 – Initial MVP Architecture

Goal: Build a zero‑server client‑side image editor with brand compliance, clipboard sharing, and minimal bundle size.

#### Acceptance Criteria

1. Users can upload a background image up to 5 MB and drag it onto the canvas.
2. Users can add, edit, delete, resize, rotate, and move text objects.
3. Users can add, drag, resize, and rotate image objects.
4. Toolbar appears only when an object is selected and disappears when deselected.
5. Canvas shows a safe‑zone overlay; attempts to place objects outside the zone display a visual warning.
6. Color palette auto‑generated from the uploaded image is displayed; selecting a color changes the selected object.
7. Copy to clipboard works on supported browsers; a visible toast confirms success.
8. WhatsApp “share” launches wa.me link after a successful copy.
9. Fallback download button appears if Clipboard API fails.
10. Undo/Redo stacks work for up to 10 actions.
11. All components are lazy‑loaded and bundle size < 250 KB when site first loaded.
12. All Fabric.js cleanup occurs on component unmount.

#### Tasks

- Create `CanvasEditor` component with Fabric.js integration.
- Create `FloatingToolbar` component with glassmorphism styling.
- Implement file upload with size validation.
- Implement safe‑zone overlay.
- Implement ColorThief palette extraction and picker.
- Implement clipboard copy, WhatsApp link, and fallback download.
- Implement undo/redo stack in Zustand.
- Lazy‑load all heavy libraries.
- Add accessibility ARIA attributes and keyboard support.
- Write tests for main interaction flows.
- Document the epic in this file.

---
