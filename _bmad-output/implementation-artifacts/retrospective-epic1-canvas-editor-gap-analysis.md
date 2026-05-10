# Epic 1 MVP Retrospective — Canvas Editor Gap Analysis

**Date:** 2026-05-10
**Analyst:** Ian Rizky (via Sisyphus-Junior)
**Purpose:** Post-MVP discovery of UI gaps in the Canvas Editor page; output for retrospective and action items.

---

## 1. Executive Summary

Epic 1 MVP delivers the **core engine** (Fabric.js canvas, Zustand state, clipboard-first export). Three user-reported gaps are **real and blocking** the < 30-second workflow:

| #   | User Issue                             | Root Cause                                                       | Severity   |
| --- | -------------------------------------- | ---------------------------------------------------------------- | ---------- |
| 1   | No text editor for WhatsApp message    | `addObject('text')` never called from UI; no Add Text button     | **HIGH**   |
| 2   | No feature adding text on canvas       | Same as above — store method exists, no UI trigger               | **HIGH**   |
| 3   | Difficulty positioning image on canvas | Fabric.js drag/resize works; fine-grained nudge controls missing | **MEDIUM** |

The codebase has the **capability** (store methods exist) but lacks the **UX affordances** (buttons/inputs) to expose those capabilities.

---

## 2. File Map — Canvas Editor Page

### Routes & Entry Point

| File                    | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| `src/routes/editor.tsx` | Route definition — lazy-loads CanvasEditor via React.lazy + Suspense |

### Core Components

| File                                                        | Purpose                                                                             |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/components/CanvasEditor/index.tsx`                     | Main canvas component; initializes Fabric.js; wires FileUpload → addObject('image') |
| `src/components/CanvasEditor/hooks/useCanvasEvents.ts`      | Fabric.js event handlers (selection, text editing)                                  |
| `src/components/CanvasEditor/hooks/useKeyboardNav.ts`       | Keyboard navigation                                                                 |
| `src/components/CanvasEditor/hooks/useCopyShortcut.ts`      | Ctrl/Cmd+C shortcut                                                                 |
| `src/components/CanvasEditor/hooks/useUndoRedoShortcuts.ts` | Ctrl+Z/Y shortcuts                                                                  |
| `src/components/CanvasEditor/utils/canvas-utils.ts`         | Serialization, image utilities                                                      |

### Toolbar Components

| File                                                           | Purpose                                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/components/FloatingToolbar/index.tsx`                     | Context toolbar (color, delete, upload, font controls) — **only shows on object selection** |
| `src/components/FloatingToolbar/hooks/useToolbarPosition.ts`   | Positions toolbar near selected object                                                      |
| `src/components/FloatingToolbar/hooks/useToolbarVisibility.ts` | Shows/hides toolbar based on selection                                                      |
| `src/components/ExportToolbar/index.tsx`                       | Bottom toolbar: Copy, WhatsApp, Download                                                    |
| `src/components/ExportToolbar/WhatsAppButton.tsx`              | Opens wa.me — **hardcoded message**                                                         |
| `src/components/ExportToolbar/CopyButton.tsx`                  | Copy canvas to clipboard                                                                    |
| `src/components/ExportToolbar/DownloadButton.tsx`              | Fallback PNG download                                                                       |

### State & Utilities

| File                    | Purpose                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `src/stores/canvas.ts`  | Zustand store — **addObject('text'\|'image') exists but UI never calls it for text** |
| `src/stores/history.ts` | Undo/redo stack                                                                      |
| `src/stores/toast.ts`   | Toast notifications                                                                  |
| `src/lib/clipboard.ts`  | `copyCanvasToClipboard`, `openWhatsApp`, `downloadCanvasAsPNG`                       |

---

## 3. Gap Analysis

### Gap #1: No Add Text Button — `addObject('text')` Dead Code

**What exists:**

```typescript
// src/stores/canvas.ts line 136–145
if (type === 'text') {
  const { Textbox } = await import('fabric')
  obj = new Textbox('New Text', {
    left: fabricCanvas.width! / 2,
    top: fabricCanvas.height! / 2,
    fontSize: 48,
    fill: '#0B1F3A',
    fontFamily: 'system-ui',
  })
  obj.set({ id })
}
```

**What's missing:** The only caller of `addObject` in the entire codebase is:

```typescript
// src/components/CanvasEditor/index.tsx line 98
addObject('image', { imageUrl: preview }) // ← only for images, from FileUpload
```

**No UI path ever calls `addObject('text')`.** The FloatingToolbar has no Add Text button. The ExportToolbar has no Add Text button. The story spec (1-1) says "Users can add text objects via floating toolbar" but the floating toolbar only appears _after_ an object is selected.

**Impact:** User cannot add text to an empty canvas. Core workflow broken.

---

### Gap #2: WhatsApp Message Customization UI Missing

**What exists:**

```typescript
// src/components/ExportToolbar/WhatsAppButton.tsx line 10–12
const handleWhatsApp = useCallback(() => {
  openWhatsApp('Lihat gambar ini dari BCA MyCore+') // ← hardcoded
}, [])
```

**Story 1-6 acceptance criteria says:**

> AC2: user clicks "Share to WhatsApp" → wa.me link opens with **pre-filled message** → **message text is customizable** (default: "Lihat gambar ini dari BCA MyCore+")

**What's missing:** The default message is implemented but there's **no UI for the user to customize it**. The story spec calls for a text input before sending. Currently the WhatsAppButton just opens wa.me with the hardcoded string.

**Impact:** User cannot personalize the WhatsApp message. Violates AC2.

---

### Gap #3: Image Positioning — Fine-Grained Controls Missing

**What exists:** Fabric.js natively supports drag (move), corner handles (resize), rotation handle. These work out of the box. The `updateObject(id, props)` store method accepts `left`, `top`, `width`, `height`, `angle`.

**What's missing:** The FloatingToolbar has color picker, font size, bold/italic, image upload — but **zero position/nudge controls**. No:

- Arrow nudge buttons (move 1px/10px)
- X/Y coordinate input fields
- Snap to grid / snap to safe zone
- Alignment tools (align left/center/right)
- Layer ordering (bring forward/send backward) — the story mentions this in FloatingToolbar but only `duplicate` is present

```typescript
// src/components/FloatingToolbar/index.tsx — current buttons:
// Palette (color) | Trash2 (delete) | Upload (image upload)
// [+ / - (font size)] | [Bold] | [Italic] ← only when text selected
// NO position controls whatsoever
```

**Impact:** Power users can't precisely position images. May slow workflow for < 30s target.

---

## 4. Retrospective Assessment

### What Went Well

- **Architecture solid** — Zustand store pattern, lazy loading, cleanup on unmount all correctly implemented
- **Clipboard-first flow** — copy, WhatsApp, download fallback all wired correctly
- **Fabric.js integration** — canvas init, object manipulation, selection events all working
- **Story spec completeness** — acceptance criteria are detailed and testable
- **Memory management** — disposeCanvas, URL.revokeObjectURL patterns in place

### What Went Wrong

- **Add Text story AC checked but never wired** — AC2 in story 1-1 says "Users can add text objects to canvas via floating toolbar or double-tap" — the toolbar exists but has no Add Text button
- **AC2 in story 1-6 partially implemented** — customizable message in spec, hardcoded value in code
- **Positioning UX not scoped** — PRD FR3 mentions "tactile manipulation" but fine-grained controls were never designed or implemented
- **No integration tests for the add-text flow** — store has the method, component doesn't call it

### Root Cause

**Implementation isolated stories without end-to-end user flow validation.** Each story was implemented top-to-bottom in its own scope, but the cross-story user journeys (e.g., "upload image → add text → copy → WhatsApp") were never tested as a sequence. The store methods existed but the UI wiring was incomplete for story 1-1's Add Text AC.

---

## 5. Action Items

### Sprint 2 — Must Fix (Blocking < 30s Workflow)

| #      | Action                                                                 | File(s) to Change                                                                            | Owner | Effort |
| ------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----- | ------ |
| **A1** | Add "Add Text" button to FloatingToolbar                               | `src/components/FloatingToolbar/index.tsx` — add `<Type>` button calling `addObject('text')` | Dev   | 1h     |
| **A2** | Add "Add Text" button to ExportToolbar (for empty canvas)              | `src/components/ExportToolbar/index.tsx` + new component                                     | Dev   | 1h     |
| **A3** | Add custom WhatsApp message input UI                                   | `src/components/ExportToolbar/WhatsAppButton.tsx` — add collapsible input for message text   | Dev   | 2h     |
| **A4** | Test end-to-end: empty canvas → add text → edit text → copy → WhatsApp | `tests/int/jsdom/` — new integration test                                                    | QA    | 2h     |

### Sprint 2 — Should Fix (UX Polish)

| #      | Action                                                                      | File(s) to Change                                                                                            | Owner | Effort |
| ------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----- | ------ |
| **B1** | Add position nudge buttons (+/- arrows) to FloatingToolbar                  | `src/components/FloatingToolbar/index.tsx` — `handleNudge(dx, dy)` calling `updateObject(id, { left, top })` | Dev   | 2h     |
| **B2** | Add X/Y coordinate display or input to FloatingToolbar                      | `src/components/FloatingToolbar/index.tsx`                                                                   | Dev   | 1h     |
| **B3** | Add layer ordering buttons (bring forward/send backward) to FloatingToolbar | `src/stores/canvas.ts` + `src/components/FloatingToolbar/index.tsx`                                          | Dev   | 2h     |
| **B4** | Verify double-tap inline text editing works on Textbox objects              | `src/components/CanvasEditor/hooks/useCanvasEvents.ts` — test and document                                   | Dev   | 1h     |

### Sprint 2 — Nice to Have

| #      | Action                                             | File(s) to Change                          | Owner | Effort |
| ------ | -------------------------------------------------- | ------------------------------------------ | ----- | ------ |
| **C1** | Add safe zone snap / alignment grid overlay toggle | `src/components/SafeZoneOverlay/index.tsx` | Dev   | 3h     |
| **C2** | Add "Reset position" button                        | `src/components/FloatingToolbar/index.tsx` | Dev   | 1h     |

### Process Improvements

| #      | Action                                                                                                          | Notes                                 |
| ------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **P1** | Add **end-to-end journey tests** per user story — test the full sequence, not just unit coverage                | Playwright or Vitest integration      |
| **P2** | Add **feature checklist** in story spec: for each story, list every UI trigger that must call each store method | Prevents dead code                    |
| **P3** | Cross-review between stories for **cross-story wiring gaps**                                                    | Story 1-1 + 1-6 overlap on toolbar UX |
| **P4** | Add **smoke test**: open `/editor`, add text, add image, copy, WhatsApp — must all work                         | CI gate                               |

---

## 6. Proposed Code Changes (Priority A1 — Add Text Button)

### File: `src/components/FloatingToolbar/index.tsx`

Add a "Type" button (or "Add Text") that appears when **no object is selected** (toolbar hidden anyway), OR add it to the ExportToolbar for when the canvas is empty. Recommend **adding to ExportToolbar** since FloatingToolbar only appears on selection.

```tsx
// In ExportToolbar/index.tsx — add new component
import { Type } from 'lucide-react'
import { useCanvasStore } from '@/stores/canvas'

export function AddTextButton() {
  const addObject = useCanvasStore((s) => s.addObject)
  const handleAddText = () => {
    addObject('text')
  }

  return (
    <button onClick={handleAddText} className="flex items-center gap-2 rounded-lg ..." aria-label="Add text to canvas">
      <Type size={18} />
      <span>Add Text</span>
    </button>
  )
}
```

### File: `src/components/ExportToolbar/WhatsAppButton.tsx`

Replace hardcoded message with a stateful custom message input:

```tsx
// Add state for custom message
const [customMessage, setCustomMessage] = useState('Lihat gambar ini dari BCA MyCore+')
// Add collapsible input in the button or as a popover
// Pass customMessage to openWhatsApp(customMessage)
```

---

## 7. Verification Plan

| Test Case                     | Steps                                                    | Expected Result                           |
| ----------------------------- | -------------------------------------------------------- | ----------------------------------------- |
| TC1: Add text to empty canvas | Open /editor → click "Add Text" → text appears at center | Textbox with "New Text" appears, selected |
| TC2: Edit text inline         | Double-click text → type → click outside                 | Text updates                              |
| TC3: Custom WhatsApp message  | Click WhatsApp → type custom message → confirm           | wa.me opens with typed message            |
| TC4: Nudge image              | Select image → click nudge arrow                         | Image moves 1px in direction              |
| TC5: Full workflow            | Add image → add text → copy → WhatsApp                   | Completes in < 30s                        |

---

## 8. Files Summary

| Category            | Count | Key Files                                                          |
| ------------------- | ----- | ------------------------------------------------------------------ |
| Route / Page        | 1     | `src/routes/editor.tsx`                                            |
| Canvas Core         | 6     | `src/components/CanvasEditor/` + `src/stores/canvas.ts`            |
| Toolbar UI          | 6     | `src/components/FloatingToolbar/`, `src/components/ExportToolbar/` |
| Export / Clipboard  | 1     | `src/lib/clipboard.ts`                                             |
| **Gaps identified** | 3     | Add Text UI, WhatsApp message UI, position controls                |

---

_Generated for Epic 1 retrospective — BCA MyCore+ project_
