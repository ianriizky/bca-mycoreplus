# Story 2-4: Enhanced Text Editing Features (Canva-like)

**Status:** review
**Epic:** Epic 2 - MVP Improvements & UX Refinement
**Story ID:** 2-4
**Story Key:** 2-4-enhanced-text-editing-features
**Priority:** MEDIUM
**Date Created:** 2026-05-10
**Last Updated:** 2026-05-10
**Depends On:** Story 2-1 (Add Text Button), Story 2-3 (Positioning Controls)

---

## Story Summary

**User Story:**

```
As a BCA staff member,
I want to edit text with Canva-like features (alignment, line height, box resizing),
so that I can create professional-looking text content easily.
```

**Business Value:** Text editing experience yang lebih profesional dan user-friendly. Mendukung workflow cepat untuk membuat greeting cards.

**Implementation Type:** UI Enhancement + Text Object Properties

---

## Acceptance Criteria

| #   | Criteria                                               | Testable Description                              | Implementation Notes                       |
| --- | ------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------ |
| AC1 | Text alignment controls (Left, Center, Right, Justify) | Buttons to change text alignment                  | Add to FloatingToolbar (text-only section) |
| AC2 | Line height control                                    | Slider/buttons to adjust line spacing (1.0 - 2.5) | Add lineHeight property via updateObject   |
| AC3 | Text box resizing (not just font size)                 | Drag handles resize text box, text wraps          | Fabric.js Textbox already supports this    |
| AC4 | Font family selection dropdown                         | Choose from 5-6 preset fonts                      | Add font picker UI                         |
| AC5 | Character spacing control                              | Adjust letter spacing                             | Add charSpacing property                   |

---

## Technical Context

### Fabric.js Textbox Capabilities

Fabric.js `Textbox` object (already used in store) supports:

```typescript
// src/stores/canvas.ts line 138-144 - Current implementation
obj = new Textbox('New Text', {
  left: fabricCanvas.width! / 2,
  top: fabricCanvas.height! / 2,
  fontSize: 48,
  fill: '#0B1F3A',
  fontFamily: 'system-ui',
  // ADDITIONAL PROPERTIES AVAILABLE:
  // textAlign: 'left' | 'center' | 'right' | 'justify'
  // lineHeight: 1.0 - 3.0 (default: 1.16)
  // charSpacing: 0 - 500 (default: 0)
  // width: number (text box width for wrapping)
})
```

**Key insight:** Fabric.js Textbox ALREADY supports all these properties. We just need UI to expose them.

### Current Text Properties

| Property    | Current Value           | Canva-like Value             |
| ----------- | ----------------------- | ---------------------------- |
| textAlign   | Not set (default: left) | User selectable              |
| lineHeight  | Not set (default: 1.16) | User adjustable (1.0-2.5)    |
| charSpacing | Not set (default: 0)    | User adjustable (0-200)      |
| fontFamily  | system-ui               | User selectable from presets |
| width       | Not set (auto)          | User adjustable via handles  |

### Files to Change

| File                                                      | Action | Purpose                            |
| --------------------------------------------------------- | ------ | ---------------------------------- |
| `src/components/FloatingToolbar/TextAlignmentButtons.tsx` | NEW    | Left/Center/Right/Justify controls |
| `src/components/FloatingToolbar/FontFamilySelector.tsx`   | NEW    | Font family dropdown               |
| `src/components/FloatingToolbar/TextSpacingControls.tsx`  | NEW    | Line height + char spacing         |
| `src/components/FloatingToolbar/index.tsx`                | UPDATE | Add new text controls              |
| `src/stores/canvas.ts`                                    | UPDATE | Add default text properties        |

### Files NOT to Change

- Fabric.js library - Already supports all features
- Canvas initialization - No changes needed
- Non-text components - This is text-only feature

---

## Implementation Details

### 1. Text Alignment Buttons

**Location:** `src/components/FloatingToolbar/TextAlignmentButtons.tsx`

```tsx
import { useCallback } from 'react'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'
import { useCanvasStore } from '@/stores/canvas'

interface TextAlignmentButtonsProps {
  selectedObjectId: string | null
}

const ALIGNMENTS = [
  { value: 'left', icon: AlignLeft, label: 'Align Left' },
  { value: 'center', icon: AlignCenter, label: 'Align Center' },
  { value: 'right', icon: AlignRight, label: 'Align Right' },
  { value: 'justify', icon: AlignJustify, label: 'Justify' },
]

export function TextAlignmentButtons({ selectedObjectId }: TextAlignmentButtonsProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentAlignment = useCallback(() => {
    if (!selectedObjectId || !fabricCanvas) return 'left'

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === selectedObjectId)
    return (obj as any)?.textAlign || 'left'
  }, [selectedObjectId, fabricCanvas])

  const handleAlignmentChange = useCallback(
    (alignment: 'left' | 'center' | 'right' | 'justify') => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { textAlign: alignment })
    },
    [selectedObjectId, updateObject],
  )

  const currentAlignment = getCurrentAlignment()

  return (
    <div className="flex items-center gap-1">
      {ALIGNMENTS.map(({ value, icon: Icon, label }) => (
        <button key={value} onClick={() => handleAlignmentChange(value as any)} disabled={!selectedObjectId} className={`flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors ${currentAlignment === value ? 'bg-white/40' : 'hover:bg-white/20'} disabled:cursor-not-allowed disabled:opacity-50`} aria-label={label} aria-pressed={currentAlignment === value} title={label}>
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}
```

### 2. Font Family Selector

**Location:** `src/components/FloatingToolbar/FontFamilySelector.tsx`

```tsx
import { useCallback } from 'react'
import { useCanvasStore } from '@/stores/canvas'

interface FontFamilySelectorProps {
  selectedObjectId: string | null
}

const FONT_PRESETS = [
  { value: 'system-ui', label: 'System UI' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Courier New, monospace', label: 'Courier' },
  { value: 'Times New Roman, serif', label: 'Times' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
]

export function FontFamilySelector({ selectedObjectId }: FontFamilySelectorProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentFont = useCallback(() => {
    if (!selectedObjectId || !fabricCanvas) return 'system-ui'

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === selectedObjectId)
    return (obj as any)?.fontFamily || 'system-ui'
  }, [selectedObjectId, fabricCanvas])

  const handleFontChange = useCallback(
    (fontFamily: string) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { fontFamily })
    },
    [selectedObjectId, updateObject],
  )

  const currentFont = getCurrentFont()

  return (
    <select value={currentFont} onChange={(e) => handleFontChange(e.target.value)} disabled={!selectedObjectId} className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" aria-label="Select font family" title="Font Family">
      {FONT_PRESETS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
```

### 3. Text Spacing Controls

**Location:** `src/components/FloatingToolbar/TextSpacingControls.tsx`

```tsx
import { useCallback } from 'react'
import { useCanvasStore } from '@/stores/canvas'

interface TextSpacingControlsProps {
  selectedObjectId: string | null
}

const LINE_HEIGHT_MIN = 1.0
const LINE_HEIGHT_MAX = 2.5
const LINE_HEIGHT_STEP = 0.1

const CHAR_SPACING_MIN = 0
const CHAR_SPACING_MAX = 200
const CHAR_SPACING_STEP = 10

export function TextSpacingControls({ selectedObjectId }: TextSpacingControlsProps) {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const updateObject = useCanvasStore((s) => s.updateObject)

  const getCurrentLineHeight = useCallback(() => {
    if (!selectedObjectId || !fabricCanvas) return 1.16

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === selectedObjectId)
    return (obj as any)?.lineHeight || 1.16
  }, [selectedObjectId, fabricCanvas])

  const getCurrentCharSpacing = useCallback(() => {
    if (!selectedObjectId || !fabricCanvas) return 0

    const obj = fabricCanvas.getObjects().find((o: any) => (o as any).id === selectedObjectId)
    return (obj as any)?.charSpacing || 0
  }, [selectedObjectId, fabricCanvas])

  const handleLineHeightChange = useCallback(
    (lineHeight: number) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { lineHeight })
    },
    [selectedObjectId, updateObject],
  )

  const handleCharSpacingChange = useCallback(
    (charSpacing: number) => {
      if (!selectedObjectId) return
      updateObject(selectedObjectId, { charSpacing })
    },
    [selectedObjectId, updateObject],
  )

  return (
    <div className="flex items-center gap-2 text-xs text-gray-700">
      <label className="flex items-center gap-1">
        <span title="Line Height">LH:</span>
        <input type="range" min={LINE_HEIGHT_MIN} max={LINE_HEIGHT_MAX} step={LINE_HEIGHT_STEP} value={getCurrentLineHeight()} onChange={(e) => handleLineHeightChange(parseFloat(e.target.value))} disabled={!selectedObjectId} className="h-1 w-16 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Line height" />
        <span className="w-6 font-mono">{getCurrentLineHeight().toFixed(1)}</span>
      </label>

      <label className="flex items-center gap-1">
        <span title="Character Spacing">CS:</span>
        <input type="range" min={CHAR_SPACING_MIN} max={CHAR_SPACING_MAX} step={CHAR_SPACING_STEP} value={getCurrentCharSpacing()} onChange={(e) => handleCharSpacingChange(parseInt(e.target.value))} disabled={!selectedObjectId} className="h-1 w-16 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Character spacing" />
        <span className="w-6 font-mono">{getCurrentCharSpacing()}</span>
      </label>
    </div>
  )
}
```

### 4. FloatingToolbar Integration

**Location:** `src/components/FloatingToolbar/index.tsx`

**Add new components to text-only section:**

```tsx
import { TextAlignmentButtons } from './TextAlignmentButtons'
import { FontFamilySelector } from './FontFamilySelector'
import { TextSpacingControls } from './TextSpacingControls'

export function FloatingToolbar() {
  // ... existing code ...

  return (
    <div className="fixed z-50 flex flex-col gap-2 ...">
      {/* Position controls (from Story 2-3) */}
      <div className="flex items-center gap-2">
        <PositionDisplay selectedObjectId={selectedObjectId} />
        <NudgeButtons selectedObjectId={selectedObjectId} />
      </div>

      {/* Standard controls */}
      <div className="flex items-center gap-2">{/* Color, Delete, Upload... */}</div>

      {/* Text-specific controls (expanded) */}
      {isText && (
        <>
          {/* Font size, Bold, Italic */}
          <div className="flex items-center gap-2">
            {/* existing font size buttons */}
            {/* existing bold/italic buttons */}
          </div>

          {/* NEW: Text alignment */}
          <div className="flex items-center gap-2">
            <TextAlignmentButtons selectedObjectId={selectedObjectId} />
          </div>

          {/* NEW: Font family + Spacing */}
          <div className="flex items-center gap-2">
            <FontFamilySelector selectedObjectId={selectedObjectId} />
            <TextSpacingControls selectedObjectId={selectedObjectId} />
          </div>
        </>
      )}
    </div>
  )
}
```

### 5. Store Update (Optional Enhancement)

**Location:** `src/stores/canvas.ts`

**Add default text properties:**

```typescript
if (type === 'text') {
  const { Textbox } = await import('fabric')
  obj = new Textbox('New Text', {
    left: fabricCanvas.width! / 2,
    top: fabricCanvas.height! / 2,
    fontSize: 48,
    fill: '#0B1F3A',
    fontFamily: 'system-ui',
    // NEW DEFAULTS:
    textAlign: 'left',
    lineHeight: 1.2,
    charSpacing: 0,
    width: 300, // Fixed width for text wrapping
  })
  obj.set({ id })
}
```

---

## Developer Guardrails

### ⚠️ CRITICAL: Fabric.js Already Supports These Features

1. **Do NOT implement text rendering logic** - Fabric.js handles this
2. **Do NOT create custom text editor** - Use Fabric.js inline editing
3. **Do NOT reimplement alignment/spacing** - Just expose via `updateObject()`

### ⚠️ CRITICAL: Wire to Existing Store Methods

1. **Use `updateObject(id, props)`** - Already accepts `{ textAlign, lineHeight, charSpacing, fontFamily }`
2. **Use existing Textbox object** - Already supports all properties
3. **No changes to Fabric.js** - Library handles everything

### ✅ Required: UI Exposure Only

1. **Create UI components** - Buttons, dropdowns, sliders
2. **Wire to `updateObject()`** - Call with correct property names
3. **Real-time updates** - Changes reflect immediately on canvas

---

## Testing Requirements

### Unit Tests

| Test Case                             | Expected Behavior   | File Location                                                         |
| ------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| Alignment left → text aligned left    | textAlign: 'left'   | `tests/unit/components/FloatingToolbar/TextAlignmentButtons.test.tsx` |
| Alignment center → text centered      | textAlign: 'center' | `tests/unit/components/FloatingToolbar/TextAlignmentButtons.test.tsx` |
| Line height change → spacing updates  | lineHeight: 1.5     | `tests/unit/components/FloatingToolbar/TextSpacingControls.test.tsx`  |
| Font family change → font updates     | fontFamily: 'Arial' | `tests/unit/components/FloatingToolbar/FontFamilySelector.test.tsx`   |
| Char spacing change → spacing updates | charSpacing: 50     | `tests/unit/components/FloatingToolbar/TextSpacingControls.test.tsx`  |

### Integration Tests

| Test Case                                      | Expected Behavior |
| ---------------------------------------------- | ----------------- |
| Add text → set alignment → verify visual       | E2E test          |
| Add text → change font → verify appearance     | E2E test          |
| Add text → adjust line height → verify spacing | E2E test          |
| Add text → resize box → text wraps             | E2E test          |

---

## Previous Story Learnings

### From Story 2-1 (Add Text Button)

- Store method `addObject('text')` creates Textbox with defaults
- UI wiring is essential - Expose all properties via UI

### From Story 2-3 (Positioning Controls)

- Position controls work for ALL objects
- Text controls should be text-specific (shown only when text selected)

### From Fabric.js Documentation

- `Textbox` supports: textAlign, lineHeight, charSpacing, fontFamily, width
- All properties update via `object.set()` and `canvas.renderAll()`

---

## UX Considerations

### Toolbar Layout (Expanded for Text)

```
┌─────────────────────────────────────────────────────────┐
│ [X: 100 | Y: 150] [↑][↓][←][→][◎]                      │  ← Position (Story 2-3)
├─────────────────────────────────────────────────────────┤
│ [🎨] [🗑️] [📷]                                         │  ← Common controls
├─────────────────────────────────────────────────────────┤
│ [+][-][B][I]                                            │  ← Font size, Bold, Italic
│ [⬅][⏺][➡][≡]                                          │  ← Alignment (NEW)
│ [Arial ▼] [LH: 1.2 ▬▬] [CS: 0 ▬]                      │  ← Font + Spacing (NEW)
└─────────────────────────────────────────────────────────┘
```

### Font Presets Selection

Using web-safe fonts (no loading required):

- System UI (default)
- Arial
- Georgia (serif, elegant)
- Courier New (monospace, technical)
- Times New Roman (classic)
- Verdana (clean sans-serif)

### Text Box Width

**Current behavior:** Textbox auto-sizes to content
**Canva-like behavior:** Fixed width with text wrapping

**Implementation:**

- Set initial width: 300px
- User can resize via drag handles (Fabric.js supports this)
- Text wraps within box width

---

## Fabric.js Property Reference

| Property    | Type   | Range                                | Default           | Description                 |
| ----------- | ------ | ------------------------------------ | ----------------- | --------------------------- |
| textAlign   | string | 'left', 'center', 'right', 'justify' | 'left'            | Text alignment within box   |
| lineHeight  | number | 1.0 - 3.0                            | 1.16              | Space between lines         |
| charSpacing | number | 0 - 500                              | 0                 | Space between characters    |
| fontFamily  | string | Any CSS font                         | 'Times New Roman' | Font family name            |
| fontSize    | number | 1 - 500                              | 40                | Text size in pixels         |
| fontWeight  | string | 'normal', 'bold'                     | 'normal'          | Bold toggle                 |
| fontStyle   | string | 'normal', 'italic'                   | 'normal'          | Italic toggle               |
| width       | number | Any positive                         | Auto              | Text box width for wrapping |

---

## Bundle Size Consideration

**Current bundle:** ~102KB gzipped
**Story impact:** Minimal (~1.5KB for components)

- No new dependencies
- Using native HTML elements (select, input range)
- Lucide-react icons already in bundle

---

## Files Created/Modified Summary

| File                                                      | Action | Lines Changed                 |
| --------------------------------------------------------- | ------ | ----------------------------- |
| `src/components/FloatingToolbar/TextAlignmentButtons.tsx` | NEW    | ~50 lines                     |
| `src/components/FloatingToolbar/FontFamilySelector.tsx`   | NEW    | ~45 lines                     |
| `src/components/FloatingToolbar/TextSpacingControls.tsx`  | NEW    | ~70 lines                     |
| `src/components/FloatingToolbar/index.tsx`                | UPDATE | +15 lines                     |
| `src/stores/canvas.ts`                                    | UPDATE | +5 lines (default text props) |
| `tests/unit/components/FloatingToolbar/*.test.tsx`        | NEW    | ~100 lines total              |

---

## Tasks/Subtasks

- [x] Create TextAlignmentButtons component with Left/Center/Right/Justify controls
- [x] Create FontFamilySelector component with 6 preset fonts
- [x] Create TextSpacingControls component with line height and char spacing sliders
- [x] Update FloatingToolbar to integrate new text controls
- [x] Update canvas.ts to add default text properties (textAlign, lineHeight, charSpacing, width)
- [x] Create unit tests for TextAlignmentButtons
- [x] Create unit tests for FontFamilySelector
- [x] Create unit tests for TextSpacingControls
- [x] Run all tests and verify they pass
- [x] Run build and verify no TypeScript errors

---

## Dev Agent Record

### Implementation Plan

Implemented Canva-like text editing features by creating three new components:

1. **TextAlignmentButtons** - 4 alignment buttons (left, center, right, justify)
2. **FontFamilySelector** - Dropdown with 6 web-safe fonts
3. **TextSpacingControls** - Line height (1.0-2.5) and character spacing (0-200) sliders

All components follow existing patterns from NudgeButtons and PositionDisplay. Used Fabric.js built-in properties - no custom text rendering needed.

### Debug Log

- Initial implementation completed without issues
- Fixed TypeScript errors in test files by adding `as unknown[]` type assertion to mock getObjects
- All 283 tests pass
- Build successful with no errors

### Completion Notes

✅ All acceptance criteria met:

- AC1: Text alignment controls (Left, Center, Right, Justify) ✅
- AC2: Line height control (1.0 - 2.5) ✅
- AC3: Text box resizing (Fabric.js native support) ✅
- AC4: Font family selection (6 presets) ✅
- AC5: Character spacing control (0 - 200) ✅

Implementation follows red-green-refactor:

- Tests written first and verified to fail
- Implementation added to make tests pass
- Code refactored for clarity and consistency

---

## File List

### New Files

- `src/components/FloatingToolbar/TextAlignmentButtons.tsx`
- `src/components/FloatingToolbar/FontFamilySelector.tsx`
- `src/components/FloatingToolbar/TextSpacingControls.tsx`
- `tests/int/unit/components/FloatingToolbar/TextAlignmentButtons.test.tsx`
- `tests/int/unit/components/FloatingToolbar/FontFamilySelector.test.tsx`
- `tests/int/unit/components/FloatingToolbar/TextSpacingControls.test.tsx`

### Modified Files

- `src/components/FloatingToolbar/index.tsx` - Integrated new text controls
- `src/stores/canvas.ts` - Added default text properties
- `tests/int/unit/components/FloatingToolbar/NudgeButtons.test.tsx` - Fixed TypeScript mock
- `tests/int/unit/components/FloatingToolbar/PositionDisplay.test.tsx` - Fixed TypeScript mock

---

## Change Log

**2026-05-10** - Story implementation completed

- Created TextAlignmentButtons component with 4 alignment options
- Created FontFamilySelector component with 6 web-safe fonts
- Created TextSpacingControls component with line height and char spacing sliders
- Integrated all new components into FloatingToolbar
- Added default text properties to canvas store (textAlign: 'left', lineHeight: 1.2, charSpacing: 0, width: 300)
- Created comprehensive unit tests for all new components (36 test cases)
- Fixed TypeScript errors in test mocks
- All 283 tests passing
- Build successful with no errors
- Story marked as ready for review

---

## Completion Status

- [x] Story file created
- [x] Implementation scope defined
- [x] Files to change identified
- [x] Guardrails established
- [x] Testing requirements documented
- [x] Previous learnings incorporated
- [x] Fabric.js capabilities documented

**Ready for Dev Agent Implementation**

---

## Notes for Developer

1. **Fabric.js ALREADY supports all these features** - No custom implementation needed
2. **Properties are already in Fabric.js Textbox** - Just need UI to expose them
3. **Use existing `updateObject()` method** - It accepts all these properties
4. **Text-only controls** - Show only when text object is selected
5. **Real-time updates** - Changes reflect immediately via `fabricCanvas.requestRenderAll()`

6. **Key Fabric.js properties:**
   - `textAlign`: 'left' | 'center' | 'right' | 'justify'
   - `lineHeight`: 1.0 - 2.5 (line spacing)
   - `charSpacing`: 0 - 200 (character spacing)
   - `fontFamily`: 'Arial', 'Georgia', etc.
   - `width`: number (text box width for wrapping)

7. **No font loading needed** - Use web-safe fonts that are available on all devices

---

**Related Stories:** Story 2-1 (Add Text), Story 2-3 (Positioning)
**Retrospective Source:** `_bmad-output/implementation-artifacts/epic-1-retro-2026-05-10.md`
