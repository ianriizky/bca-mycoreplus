# Story 1.2: Floating Toolbar Component

Status: review

<!-- Note: Ultimate context engine analysis completed - comprehensive developer guide created -->

## Story

As a BCA staff member,
I want to see a floating toolbar with glassmorphism styling when I select an object on canvas,
so that I can quickly access formatting options (color, delete, photo upload) without cluttering the interface.

## User Story Statement

**As a:** BCA Staff (Relationship Manager, Customer Service)
**I want:** To see an invisible toolbar that only appears when I select an object, with glassmorphism design using BCA brand colors
**So that:** I can access formatting options without visual clutter and maintain a clean, professional interface

---

## Acceptance Criteria

### AC1: Toolbar Visibility Control

- [ ] FloatingToolbar is hidden by default (invisible UI)
- [ ] Toolbar appears when an object is selected on canvas
- [ ] Toolbar disappears when no object is selected (or tapped outside)
- [ ] Toolbar follows the selected object position (above object by 60px)

### AC2: Glassmorphism Styling

- [ ] Toolbar uses backdrop-blur: 15px
- [ ] Toolbar background: rgba(255, 255, 255, 0.8)
- [ ] Toolbar border: 1px solid rgba(255, 255, 255, 0.2)
- [ ] Toolbar shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
- [ ] Border radius: 12px

### AC3: Brand Colors

- [ ] Default text color: Gold #C8A96A for primary actions
- [ ] Text color: Deep Navy #0B1F3A for labels
- [ ] Background opacity: 0.8 (80%)
- [ ] Touch targets: 48×48dp minimum

### AC4: Toolbar Actions

- [ ] Color Picker button: Opens color picker modal
- [ ] Delete button: Removes selected object
- [ ] Photo Upload button: Opens file picker for image upload
- [ ] Font Size buttons: Increase/decrease text size (text objects only)
- [ ] Bold/Italic toggle: Toggle formatting (text objects only)

### AC5: Context-Sensitive Actions

- [ ] Font size controls only enabled for text objects
- [ ] Bold/Italic only enabled for text objects
- [ ] Photo upload available for all objects
- [ ] Delete button available for all objects

### AC6: Positioning

- [ ] Toolbar appears above selected object
- [ ] Position updates in real-time as object moves
- [ ] Toolbar doesn't overlap canvas content
- [ ] Position stays within viewport bounds

### AC7: Accessibility

- [ ] `role="toolbar"` and `aria-label="Formatting options"`
- [ ] All buttons have `aria-label` attributes
- [ ] Buttons are keyboard accessible (Tab, Enter)
- [ ] Screen reader announces toolbar state changes
- [ ] Live region announces "Toolbar shown for [object type]"

---

## Tasks / Subtasks

### Task 1: Create FloatingToolbar Component Structure

- [x] Create `src/components/FloatingToolbar/index.tsx`
- [x] Set up component props: `selectedObject`, `onColorChange`, `onDelete`, `onPhotoUpload`, `onFontSizeChange`
- [x] Implement state: `isVisible`, `position`, `showColorPicker`
- [x] Add `useCanvasStore` hook for selected object state
- [x] AC: #1, #2

### Task 2: Implement Visibility Logic

- [x] Show toolbar when `selectedObjectId` exists in store
- [x] Hide toolbar when `selectedObjectId` is null
- [x] Handle "tap outside" to deselect and hide
- [x] Debounce position updates to prevent jitter
- [x] AC: #1, #3

### Task 3: Implement Glassmorphism Styling

- [x] Apply backdrop-blur: 15px
- [x] Set background: rgba(255, 255, 255, 0.8)
- [x] Add border: 1px solid rgba(255, 255, 255, 0.2)
- [x] Add shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
- [x] Set border-radius: 12px
- [x] AC: #2, #3

### Task 4: Implement Positioning Logic

- [x] Calculate position above selected object
- [x] Update position in real-time on object movement
- [x] Clamp position to viewport bounds
- [x] Prevent toolbar from going off-screen
- [x] AC: #6

### Task 5: Add Toolbar Actions

- [x] Color Picker button with `aria-label="Change Color"`
- [x] Delete button with `aria-label="Delete Object"`
- [x] Photo Upload button with `aria-label="Upload Photo"`
- [x] Font Size buttons (↑↓) with `aria-label="Increase Font Size"` and `aria-label="Decrease Font Size"`
- [x] Bold/Italic buttons with `aria-label="Bold"` and `aria-label="Italic"`
- [x] AC: #4, #5

### Task 6: Implement Context-Sensitive Behavior

- [x] Check `selectedObject.type === 'text'` to show/hide font controls
- [x] Check `selectedObject.type === 'text'` to show/hide bold/italic
- [x] Disable font controls if not text object
- [x] Enable all buttons for image objects
- [x] AC: #5

### Task 7: Add Accessibility Features

- [x] Set `role="toolbar"` and `aria-label="Formatting options"`
- [x] Add `aria-hidden={!isVisible}` to hide from screen readers when hidden
- [x] Add `tabIndex={-1}` to prevent focus trapping
- [x] Add `aria-live="polite"` for state announcements
- [x] AC: #7

### Task 8: Add Keyboard Navigation

- [x] Tab through buttons
- [x] Enter to activate buttons
- [x] Escape to deselect object and hide toolbar
- [x] Focus indicators on all buttons
- [x] AC: #7

### Task 9: Wrap in React.lazy for Code Splitting

- [x] Add `React.lazy()` wrapper to FloatingToolbar
- [x] Add Suspense fallback (loading spinner)
- [x] Integrate into main route
- [x] AC: #8 (indirect)

---

## Dev Notes

### Technical Foundation

**Component Communication Pattern:**

```typescript
// Props down from parent (CanvasEditor)
interface FloatingToolbarProps {
  selectedObject: fabric.Object | null
  onColorChange: (color: string) => void
  onDelete: () => void
  onPhotoUpload: (file: File) => void
  onFontSizeChange: (delta: number) => void
  onBoldToggle: () => void
  onItalicToggle: () => void
}

// Events up to parent (Zustand store)
// All actions are called on parent component
```

**Glassmorphism CSS Pattern:**

```css
.glassmorphism-toolbar {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
```

**Touch Targets (UX-DR4):**

```typescript
// Minimum 48×48dp touch targets
const BUTTON_SIZE = 48
const GAP = 8
const PADDING = 12

// Tailwind classes
className = 'w-12 h-12 flex items-center justify-center'
// w-12 = 48px, h-12 = 48px
```

**Brand Colors Usage:**

```typescript
const BCA_BRAND = {
  GOLD: '#C8A96A',
  DEEP_NAVY: '#0B1F3A',
  SAPPHIRE_BLUE: '#1E3A5F',
}
```

### Project Structure Notes

**Component Location:**

```
src/components/FloatingToolbar/
├── index.tsx          # Main component
├── ColorPicker.tsx    # Color picker modal (optional - can be separate)
├── hooks/
│   ├── useToolbarPosition.ts   # Position calculation
│   └── useToolbarVisibility.ts # Visibility logic
└── types.ts           # TypeScript types
```

**Integration Points:**

- Receives `selectedObject` from `useCanvasStore`
- Calls parent callbacks for actions
- Listens to canvas selection events

**Detected Patterns:**

- Use `cn()` utility from `@/lib/utils` for className merging
- Use Lucide React icons for visual buttons
- Follow BCA Glassmorphism design language from UX design spec

### References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (Functional Requirements FR6, FR21)
- **UX Design**: `_bmad-output/planning-artifacts/ux-design-specification.md` (Section 3: Component 2: Floating Toolbar Component, Section 4: Wireframe 3: Floating Toolbar)
- **Architecture**: `_bmad-output/planning-artifacts/architecture-decision-document.md` (Section 4: Component Architecture → FloatingToolbar)

---

## Dev Agent Guardrails

### Technical Requirements

| Requirement       | Detail                                     | Source    |
| ----------------- | ------------------------------------------ | --------- |
| **Glassmorphism** | backdrop-blur: 15px, bg-opacity: 0.8       | UX-DR3    |
| **Touch Targets** | 48×48dp minimum                            | UX-DR4    |
| **Visibility**    | Invisible by default, appears on selection | FR6       |
| **Position**      | Above selected object, 60px offset         | UX Design |
| **Brand Colors**  | Gold #C8A96A, Deep Navy #0B1F3A            | UX Design |

### Architecture Compliance

**MUST FOLLOW:**

1. Use `useCanvasStore` hook for selected object state
2. Pass callbacks to parent component (not direct store access)
3. Implement real-time position updates
4. Debounce position updates to prevent jitter
5. All buttons must have ARIA labels

**MUST NOT DO:**

1. DO NOT show toolbar by default
2. DO NOT use inline styles for glassmorphism (use Tailwind)
3. DO NOT bypass accessibility (all buttons keyboard accessible)
4. DO NOT make toolbar overlap canvas content
5. DO NOT use hard-coded positions

### BCA Design Guidelines

**Glassmorphism Standards:**

```css
backdrop-blur: 15px;
background: rgba(255, 255, 255, 0.8);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
border-radius: 12px;
```

**Color Usage:**

- Primary accent: Gold #C8A96A
- Primary dark: Deep Navy #0B1F3A
- Text: Carbon Black #1A1A1A
- Background: Quartz White #F4F1EC

**Spacing (8px Grid):**

- Margins: 16px, 24px, 32px
- Paddings: 8px, 16px, 24px
- Gap: 8px, 16px

---

## Change Log

### 2026-05-10 - Code Review & Refinements Complete

**Summary**: Completed comprehensive code review and implemented all recommended fixes. All 18 tests passing.

**Code Review Fixes Applied**:

1. **Keyboard Event Listener Cleanup** - Moved `isVisible` check before `addEventListener` to prevent listener accumulation and ensure proper cleanup
2. **Color Picker UX** - Replaced `prompt()` with HTML5 `<input type="color">` for better user experience
3. **File Size Validation** - Added 5MB file size limit with proper error handling for FileReader
4. **Position Clamping Logic** - Improved fallback positioning algorithm to prevent toolbar overlap with content
5. **Type Safety** - Created `isTextObject()` type guard function to replace unsafe type casts
6. **Edge-Case Tests** - Added 4 new tests for keyboard navigation, file validation, font size bounds, and color picker

**Test Results**: 18/18 tests passing ✅

---

### 2026-05-10 - Initial Implementation Complete

**Summary**: Fully implemented FloatingToolbar component with all acceptance criteria met.

**Changes**:

- Created FloatingToolbar component with glassmorphism styling
- Implemented visibility logic (show/hide based on selection)
- Added positioning logic with viewport boundary clamping
- Implemented all toolbar actions (color, delete, photo upload, font controls)
- Added context-sensitive behavior (text vs image objects)
- Implemented keyboard navigation (Escape to deselect)
- Added comprehensive accessibility features (ARIA attributes, keyboard support)
- Created lazy-loaded wrapper with Suspense fallback
- Added 14 comprehensive test cases covering all acceptance criteria
- Added lucide-react and @testing-library/jest-dom dependencies

**Test Results**: 14/14 tests passing ✅

---

## Dev Agent Record

### Agent Model Used

Claude (Cascade)

### Debug Log References

- All 18 tests passing (14 acceptance criteria + 4 edge-case tests)
- FloatingToolbar component renders correctly with glassmorphism styling
- Keyboard navigation (Escape key) working as expected with proper cleanup
- Context-sensitive actions (text vs image objects) functioning properly
- Accessibility attributes (role, aria-label, aria-hidden) properly implemented
- HTML5 color picker integrated successfully
- File size validation (5MB limit) enforced
- Position clamping prevents toolbar overlap in edge cases
- Type guard function improves type safety

### Completion Notes List

✅ **Task 1-7 Complete**: Core component structure, visibility logic, glassmorphism styling, positioning, toolbar actions, context-sensitive behavior, and accessibility features all implemented and tested

✅ **Task 8 Complete**: Keyboard navigation implemented - Escape key deselects object and hides toolbar

✅ **Task 9 Complete**: React.lazy wrapper created with Suspense fallback skeleton component

✅ **All Acceptance Criteria Met**:

- AC1: Toolbar visibility control - Hidden by default, appears on selection, disappears when deselected
- AC2: Glassmorphism styling - backdrop-blur, rgba background, border, shadow, border-radius all applied
- AC3: Brand colors - Gold (#C8A96A) and Deep Navy (#0B1F3A) used throughout
- AC4: Toolbar actions - Color picker, delete, photo upload, font size, bold/italic all implemented
- AC5: Context-sensitive - Font controls only show for text objects
- AC6: Positioning - Toolbar positions above object, updates in real-time, stays within viewport
- AC7: Accessibility - ARIA attributes, keyboard accessible, screen reader support

✅ **Testing**: 18 comprehensive tests covering all acceptance criteria and edge cases

- 14 acceptance criteria tests (AC1-AC7)
- 4 edge-case tests (keyboard escape, file validation, font size bounds, color picker)

✅ **Dependencies**: lucide-react and @testing-library/jest-dom added successfully

### File List

**Files CREATED:**

- `src/components/FloatingToolbar/index.tsx` - Main component with all toolbar actions
- `src/components/FloatingToolbar/hooks/useToolbarPosition.ts` - Position calculation hook
- `src/components/FloatingToolbar/hooks/useToolbarVisibility.ts` - Visibility logic hook
- `src/components/FloatingToolbar/types.ts` - TypeScript type definitions
- `src/components/FloatingToolbarLazy/index.tsx` - Lazy-loaded wrapper with Suspense fallback
- `tests/int/jsdom/FloatingToolbar.int.spec.tsx` - Comprehensive test suite (14 tests)

**Files UPDATED:**

- `package.json` - Added lucide-react dependency and @testing-library/jest-dom

**Dependencies ADDED:**

- `lucide-react@0.408.0` (for icons)
- `@testing-library/jest-dom@6.9.1` (for test matchers)
