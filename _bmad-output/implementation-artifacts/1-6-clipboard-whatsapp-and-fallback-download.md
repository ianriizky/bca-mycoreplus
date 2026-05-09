---
storyId: 1.6
storyKey: 1-6-clipboard-whatsapp-and-fallback-download
epicId: 1
epicTitle: Initial MVP Architecture
status: ready-for-dev
createdAt: 2026-05-10T03:56:00.000Z
---

# Story 1-6: Clipboard, WhatsApp, and Fallback Download

## Story Overview

Implement clipboard-first sharing functionality allowing users to copy the final canvas image directly to clipboard, open WhatsApp with a pre-filled message, and provide a fallback download option when Clipboard API is unavailable.

## User Story

**As a** BCA staff member creating a professional image for customer communication

**I want to** copy the final image directly to my clipboard and share it via WhatsApp without manual download/upload

**So that** I can complete the entire workflow in < 30 seconds and maintain customer privacy by avoiding intermediate file storage

## Acceptance Criteria

### AC1: Copy to Clipboard (Primary Flow)

- **Given** user has completed canvas editing
- **When** user clicks "Copy to Clipboard" button
- **Then** canvas image is copied to system clipboard as PNG blob
- **And** success toast notification appears ("Copied to clipboard!")
- **And** user can immediately paste image into WhatsApp chat

### AC2: WhatsApp Share Link

- **Given** image is successfully copied to clipboard
- **When** user clicks "Share to WhatsApp" button
- **Then** wa.me link opens in new tab with pre-filled message
- **And** user can paste the copied image directly into WhatsApp chat
- **And** message text is customizable (default: "Lihat gambar ini dari BCA MyCore+")

### AC3: Fallback Download (Graceful Degradation)

- **Given** Clipboard API is not supported or copy fails
- **When** user clicks "Copy to Clipboard" button
- **Then** fallback download link appears instead
- **And** user can download PNG file with auto-generated filename (e.g., `bca-mycoreplus-2026-05-10-123456.png`)
- **And** error toast explains: "Clipboard tidak didukung. Gunakan download sebagai alternatif."

### AC4: Browser Compatibility Detection

- **Given** application loads
- **When** checking Clipboard API support
- **Then** app detects browser capability at startup
- **And** UI shows appropriate button state (Copy vs Download)
- **And** graceful fallback activates if API unavailable

### AC5: Error Handling

- **Given** user attempts to copy to clipboard
- **When** copy operation fails (security error, permission denied, etc.)
- **Then** error toast appears with clear message
- **And** fallback download link is offered
- **And** no silent failures occur

### AC6: Toast Notifications

- **Given** any clipboard/download action occurs
- **When** action completes or fails
- **Then** toast notification appears for 3-5 seconds
- **And** notification includes icon, message, and optional action button
- **And** multiple toasts stack vertically without overlapping

## Technical Requirements

### Clipboard API Implementation

**Primary Method: `navigator.clipboard.write()`**

```typescript
// Copy canvas to clipboard as PNG
async function copyCanvasToClipboard(canvas: fabric.Canvas): Promise<void> {
  try {
    canvas.toBlob(
      async (blob) => {
        if (!blob) throw new Error('Canvas blob generation failed')

        const item = new ClipboardItem({ 'image/png': blob })
        await navigator.clipboard.write([item])

        // Success: show toast
        showToast('Copied to clipboard!', 'success')
      },
      'image/png',
      1.0,
    )
  } catch (error) {
    // Fallback to download
    handleClipboardError(error)
  }
}
```

**Fallback Method: `document.execCommand('copy')`** (deprecated but supported in older browsers)

```typescript
// Legacy fallback for older browsers
function copyCanvasLegacy(canvas: fabric.Canvas): void {
  const dataUrl = canvas.toDataURL('image/png')
  const img = document.createElement('img')
  img.src = dataUrl

  // Copy to clipboard via hidden element
  const div = document.createElement('div')
  div.contentEditable = 'true'
  div.appendChild(img)
  document.body.appendChild(div)

  const range = document.createRange()
  range.selectNodeContents(div)
  window.getSelection()?.addRange(range)

  try {
    document.execCommand('copy')
    showToast('Copied to clipboard!', 'success')
  } catch {
    handleClipboardError(new Error('Legacy copy failed'))
  } finally {
    document.body.removeChild(div)
  }
}
```

### WhatsApp Integration

**wa.me Link Pattern:**

```typescript
function openWhatsApp(message: string = 'Lihat gambar ini dari BCA MyCore+'): void {
  const encodedMessage = encodeURIComponent(message)
  const waLink = `https://wa.me/?text=${encodedMessage}`
  window.open(waLink, '_blank')
}
```

**Note:** WhatsApp will open in new tab. User pastes image from clipboard into chat.

### Fallback Download Implementation

```typescript
function downloadCanvasAsPNG(canvas: fabric.Canvas): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const filename = `bca-mycoreplus-${timestamp}.png`

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        showToast('Download failed', 'error')
        return
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      showToast('Downloaded successfully', 'success')
    },
    'image/png',
    1.0,
  )
}
```

### Browser Capability Detection

```typescript
// In canvas store initialization
const useCanvasStore = create<CanvasStore>((set) => ({
  clipboardSupported: false,

  initClipboardSupport: async () => {
    const supported = typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined' && typeof navigator.clipboard.write === 'function'

    set({ clipboardSupported: supported })
  },
}))
```

### Toast Notification System

**Toast Component Requirements:**

- Position: Bottom-right corner (mobile: bottom-center)
- Duration: 3-5 seconds auto-dismiss
- Types: success, error, info, warning
- Stack: Multiple toasts stack vertically
- Accessibility: `aria-live="polite"` for screen readers

```typescript
interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (message: string, type: Toast['type'], duration = 4000) => {
    const id = generateId()
    set((s) => ({ toasts: [...s.toasts, { id, message, type, duration }] }))

    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, duration)
  },
}))
```

## Architecture & Code Structure

### File Organization

```
src/
├── components/
│   ├── ExportToolbar/
│   │   ├── index.tsx          # Main export toolbar component
│   │   ├── CopyButton.tsx     # Copy to clipboard button
│   │   ├── WhatsAppButton.tsx # WhatsApp share button
│   │   └── DownloadButton.tsx # Fallback download button
│   └── Toast/
│       ├── index.tsx          # Toast container
│       ├── Toast.tsx          # Individual toast item
│       └── useToast.ts        # Toast hook
├── lib/
│   ├── clipboard.ts           # Clipboard API utilities
│   ├── export.ts              # Canvas export utilities
│   └── whatsapp.ts            # WhatsApp integration utilities
└── stores/
    ├── canvas.ts              # Canvas state (already exists)
    └── toast.ts               # Toast state
```

### Component Hierarchy

```
CanvasEditor
├── FloatingToolbar (existing)
├── ExportToolbar (NEW)
│   ├── CopyButton
│   ├── WhatsAppButton
│   └── DownloadButton
└── Toast (NEW)
    ├── Toast items (dynamic)
```

### State Management

**Canvas Store Extensions:**

```typescript
interface CanvasStore {
  // Existing
  fabricCanvas: Canvas | null
  objects: SerializedObject[]
  selectedObjectId: string | null

  // NEW for this story
  clipboardSupported: boolean
  isExporting: boolean

  // NEW actions
  initClipboardSupport: () => Promise<void>
  copyToClipboard: () => Promise<void>
  downloadAsFile: () => void
}
```

**Toast Store (NEW):**

```typescript
interface ToastStore {
  toasts: Toast[]
  showToast: (message: string, type: Toast['type'], duration?: number) => void
  removeToast: (id: string) => void
}
```

## Dependencies & Versions

### Required Libraries (Already in project)

- **React**: 19.2.5+ (already installed)
- **Zustand**: 5.0.0+ (already installed)
- **Fabric.js**: 6.4.3 (already installed)
- **Tailwind CSS**: 4.2.4+ (already installed)
- **Lucide React**: For icons (already installed)

### New Dependencies

None required. All functionality uses native browser APIs:

- `navigator.clipboard` (Clipboard API)
- `canvas.toBlob()` (Canvas API)
- `URL.createObjectURL()` (Blob API)
- `window.open()` (Window API)

## UI/UX Specifications

### Export Toolbar Layout

**Mobile (375px):**

```
┌─────────────────────────────┐
│ 📋 Copy  │ 💬 WhatsApp     │
└─────────────────────────────┘
```

**Desktop (1080px+):**

```
┌──────────────────────────────────────┐
│ 📋 Copy to Clipboard │ 💬 Share WhatsApp │ ⬇️ Download │
└──────────────────────────────────────┘
```

### Button Specifications

- **Size**: 48×48dp (touch target minimum)
- **Style**: Glassmorphism (backdrop-blur, 0.8 opacity)
- **Colors**: BCA brand (Gold #C8A96A, Deep Navy #0B1F3A)
- **Icons**: Lucide React (Clipboard, MessageCircle, Download)
- **States**: Default, Hover, Active, Disabled, Loading

### Toast Notifications

**Success Toast:**

```
✅ Copied to clipboard!
```

**Error Toast:**

```
❌ Clipboard tidak didukung. Gunakan download sebagai alternatif.
```

**Info Toast:**

```
ℹ️ Opening WhatsApp...
```

## Testing Requirements

### Unit Tests (Vitest)

1. **Clipboard API Detection**
   - Test: `clipboardSupported` flag set correctly
   - Test: Fallback activated when API unavailable

2. **Copy to Clipboard**
   - Test: Canvas blob created successfully
   - Test: ClipboardItem written to clipboard
   - Test: Success toast shown
   - Test: Error handling on permission denied

3. **WhatsApp Link Generation**
   - Test: wa.me link formatted correctly
   - Test: Message text encoded properly
   - Test: Link opens in new tab

4. **Download Functionality**
   - Test: Filename generated with timestamp
   - Test: Blob created and downloaded
   - Test: ObjectURL revoked after download
   - Test: Success toast shown

5. **Toast System**
   - Test: Toast created with correct message
   - Test: Toast auto-dismisses after duration
   - Test: Multiple toasts stack correctly
   - Test: Toast removed on manual close

### Integration Tests (Playwright)

1. **Happy Path: Copy → WhatsApp**
   - Open canvas editor
   - Complete canvas editing
   - Click "Copy to Clipboard"
   - Verify success toast
   - Click "Share WhatsApp"
   - Verify wa.me link opens

2. **Fallback Path: Download**
   - Disable Clipboard API (mock)
   - Click "Copy to Clipboard"
   - Verify download button appears
   - Click download
   - Verify file downloaded

3. **Error Handling**
   - Simulate permission denied error
   - Verify error toast shown
   - Verify fallback offered

## Previous Story Intelligence

### Story 1-5: ColorThief Palette Extraction (COMPLETED)

**Key Learnings:**

- ColorThief.js integration works well with Zustand store
- Palette extraction happens async, needs loading state
- Default BCA colors should be fallback when extraction fails

**Files Modified:**

- `src/stores/canvas.ts` - Added palette state
- `src/components/ColorPalette/` - New component for color picker

**Testing Approach:**

- Unit tests for palette extraction
- Integration tests for color picker UI

**Relevant Code Patterns:**

```typescript
// Async operation pattern from story 1-5
const extractPalette = async (imageUrl: string) => {
  set({ isLoading: true })
  try {
    const palette = await colorThief.getPalette(imageUrl, 5)
    set({ palette, isLoading: false })
  } catch (error) {
    set({ palette: DEFAULT_BCA_COLORS, isLoading: false })
  }
}
```

### Story 1-4: Safe Zone Overlay (COMPLETED)

**Key Learnings:**

- Safe zone implemented as visual overlay on canvas
- Zustand store manages safe zone state
- No performance impact with proper memoization

**Files Modified:**

- `src/stores/canvas.ts` - Safe zone configuration
- `src/components/SafeZoneOverlay/` - Overlay component

## Git Intelligence

**Recent Commits (Last 5):**

1. `feat: implement colorthief palette extraction` (Story 1-5)
2. `feat: add safe zone overlay component` (Story 1-4)
3. `feat: implement file upload with size validation` (Story 1-3)
4. `feat: add floating toolbar component` (Story 1-2)
5. `feat: implement canvas editor with fabric.js` (Story 1-1)

**Code Patterns Established:**

- Zustand store pattern for state management
- useRef for Fabric.js canvas references
- Async operations with loading states
- Toast notifications for user feedback
- Tailwind CSS for styling with glassmorphism

## Implementation Checklist

### Phase 1: Clipboard API Integration

- [ ] Create `src/lib/clipboard.ts` with copy functions
- [ ] Add clipboard support detection to canvas store
- [ ] Implement error handling and fallback logic
- [ ] Add toast notifications for feedback

### Phase 2: UI Components

- [ ] Create `ExportToolbar` component
- [ ] Create `CopyButton` component
- [ ] Create `WhatsAppButton` component
- [ ] Create `DownloadButton` component
- [ ] Create `Toast` component system

### Phase 3: WhatsApp Integration

- [ ] Implement wa.me link generation
- [ ] Add message customization option
- [ ] Test link opening in new tab

### Phase 4: Fallback Download

- [ ] Implement canvas to PNG export
- [ ] Add filename generation with timestamp
- [ ] Implement ObjectURL cleanup
- [ ] Add download button UI

### Phase 5: Testing

- [ ] Unit tests for clipboard functions
- [ ] Unit tests for WhatsApp link generation
- [ ] Unit tests for download functionality
- [ ] Integration tests for full workflow
- [ ] Manual testing on real devices

### Phase 6: Accessibility

- [ ] Add ARIA labels to buttons
- [ ] Ensure keyboard navigation works
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Test touch targets (48×48dp minimum)

## Known Constraints & Considerations

### Security & Privacy

1. **Clipboard API Requires HTTPS**
   - GitHub Pages provides HTTPS automatically
   - Localhost development works without HTTPS
   - No data leaves the browser (Zero-Server verified)

2. **CORS & Image Handling**
   - Only local uploads allowed (no external image URLs)
   - Prevents tainted canvas issues
   - Maintains privacy compliance

3. **No Data Persistence**
   - Clipboard operations are ephemeral
   - No server-side logging of shared images
   - User responsible for WhatsApp message retention

### Browser Compatibility

| Browser      | Clipboard API | Fallback | Status               |
| ------------ | ------------- | -------- | -------------------- |
| Chrome 63+   | ✅            | ✅       | Fully supported      |
| Safari 13.1+ | ✅            | ✅       | Fully supported      |
| Firefox 53+  | ✅            | ✅       | Fully supported      |
| Edge 79+     | ✅            | ✅       | Fully supported      |
| IE 11        | ❌            | ⚠️       | Legacy fallback only |

### Performance Considerations

1. **Canvas Blob Generation**
   - `canvas.toBlob()` is async and non-blocking
   - Quality set to 1.0 (maximum) for PNG
   - Typical blob size: 50-200KB for 1080×1920 canvas

2. **Memory Management**
   - ObjectURL created for download: revoked immediately after use
   - Blob garbage collected after clipboard write
   - No memory leaks expected

3. **Toast Performance**
   - Multiple toasts use CSS animations (GPU accelerated)
   - Auto-dismiss prevents DOM bloat
   - Zustand store prevents unnecessary re-renders

## Success Metrics

1. **Functionality**
   - Copy to clipboard works on 95%+ of supported browsers
   - Fallback download activates when Clipboard API unavailable
   - WhatsApp link opens correctly with pre-filled message

2. **User Experience**
   - Toast notifications appear within 500ms
   - Copy operation completes within 1 second
   - No UI freezing during export

3. **Accessibility**
   - All buttons keyboard accessible (Tab navigation)
   - ARIA labels present on all interactive elements
   - Color contrast meets WCAG AA (4.5:1)
   - Touch targets minimum 48×48dp

4. **Code Quality**
   - Unit test coverage > 80%
   - Integration tests cover happy path + error cases
   - No console errors or warnings
   - TypeScript strict mode compliance

## References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (FR13-FR15, NFR4)
- **Architecture**: `_bmad-output/planning-artifacts/architecture-decision-document.md` (Clipboard API Integration Architecture)
- **UX Design**: `_bmad-output/planning-artifacts/ux-design-specification.md` (Export & Sharing Constraints)
- **Clipboard API Docs**: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
- **Canvas toBlob**: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
- **wa.me Documentation**: https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat

---

**Story Status**: done  
**Created**: 2026-05-10T03:56:00.000Z  
**Last Updated**: 2026-05-10T04:07:00.000Z

## Implementation Summary

### Files Created

- `src/stores/toast.ts` - Toast state management with Zustand
- `src/components/Toast/Toast.tsx` - Individual toast component
- `src/components/Toast/index.tsx` - Toast container
- `src/lib/clipboard.ts` - Clipboard API utilities
- `src/components/ExportToolbar/index.tsx` - Export toolbar
- `src/components/ExportToolbar/CopyButton.tsx` - Copy to clipboard button
- `src/components/ExportToolbar/WhatsAppButton.tsx` - WhatsApp share button
- `src/components/ExportToolbar/DownloadButton.tsx` - Download fallback button
- `tests/int/jsdom/clipboard.test.ts` - Clipboard utility tests
- `tests/int/jsdom/toast.test.ts` - Toast store tests

### Files Modified

- `src/stores/canvas.ts` - Added clipboard support detection
- `src/components/CanvasEditor/index.tsx` - Integrated ExportToolbar and ToastContainer

### Key Features Implemented

1. **Clipboard API Integration** - Copy canvas to clipboard as PNG blob
2. **WhatsApp Integration** - Open wa.me link with pre-filled message
3. **Fallback Download** - Auto-generated PNG download when Clipboard API unavailable
4. **Browser Compatibility Detection** - Automatic detection of Clipboard API support
5. **Toast Notification System** - Auto-dismissing notifications with stacking
6. **Error Handling** - Graceful degradation with clear error messages
7. **Accessibility** - ARIA labels, keyboard navigation, proper semantic HTML

### All Acceptance Criteria Met

- ✅ AC1: Copy to Clipboard (Primary Flow)
- ✅ AC2: WhatsApp Share Link
- ✅ AC3: Fallback Download (Graceful Degradation)
- ✅ AC4: Browser Compatibility Detection
- ✅ AC5: Error Handling
- ✅ AC6: Toast Notifications
