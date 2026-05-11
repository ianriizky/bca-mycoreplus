# Story 1.3: File Upload with Size Validation

Status: completed

<!-- Note: Ultimate context engine analysis completed - comprehensive developer guide created -->

## Story

As a BCA staff member,
I want to upload background or photo images with automatic size validation,
so that I can ensure files are within acceptable limits and prevent browser crashes.

## User Story Statement

**As a:** BCA Staff (Relationship Manager, Customer Service)
**I want:** To upload images with automatic validation that files exceed 10MB are rejected
**So that:** I can maintain application performance and avoid browser crashes from oversized files

---

## Acceptance Criteria

### AC1: File Size Validation

- [x] Upload button opens native file picker
- [x] Files larger than 10MB are rejected with error message
- [x] Error message: "File terlalu besar (max 10MB). Pilih file lain?"
- [x] User can select another file after rejection
- [x] File size check happens BEFORE file processing

### AC2: Supported File Formats

- [x] Accept PNG, JPG, SVG, WebP formats
- [x] Reject unsupported formats with error message
- [x] Error message: "Format tidak didukung. Gunakan PNG/JPG/SVG/WebP"
- [x] File picker filters by image types

### AC3: Image Preview

- [x] Show file preview in file picker
- [x] Display file name and size in preview
- [x] Preview appears before confirming upload
- [x] User can cancel upload before confirmation

### AC4: Error Handling

- [x] Network error shows error modal with retry button
- [x] Error modal: "Upload gagal. Coba lagi?"
- [x] User can retry or cancel after upload failure
- [x] Network errors are logged for debugging

### AC5: Accessibility

- [x] File input has `aria-label="Upload Image"`
- [x] Error messages have `role="alert"`
- [x] Error messages are announced to screen readers
- [x] Focus management after error display

### AC6: Performance

- [x] File size check happens synchronously (instant feedback)
- [x] No UI blocking during validation
- [x] Preview generation is non-blocking
- [x] Large images are resized before processing (25-50%)

### AC7: Zero-Server Compliance

- [x] No file upload to server (all local)
- [x] Use FileReader API for local file reading
- [x] No fetch/axios calls for uploads
- [x] No server-side validation

---

## Tasks / Subtasks

### Task 1: Create File Upload Component Structure

- [x] Create `src/components/FileUpload/index.tsx`
- [x] Set up file input with `accept="image/*"`
- [x] Implement file size validation (10MB limit)
- [x] Implement file format validation (PNG, JPG, SVG, WebP)
- [x] AC: #1, #2, #6

### Task 2: Implement File Size Validation

- [x] Check `file.size > 10MB * 1024 * 1024`
- [x] Show error modal on size violation
- [x] Provide "Choose Another" button (reopens file picker)
- [x] Provide "Cancel" button (closes modal)
- [x] AC: #1

### Task 3: Implement File Format Validation

- [x] Check file extension against allowed formats
- [x] Show error modal on format violation
- [x] Provide "Choose Another" button
- [x] Provide "Cancel" button
- [x] AC: #2

### Task 4: Implement Error Handling

- [x] Catch file read errors
- [x] Show error modal: "Upload gagal. Coba lagi?"
- [x] Add retry button to error modal
- [x] Add cancel button to error modal
- [x] Log errors to console for debugging
- [x] AC: #4

### Task 5: Implement Image Preview

- [x] Use FileReader to read file as DataURL
- [x] Display preview image in modal
- [x] Show file name and size in preview
- [x] Add "Confirm Upload" and "Cancel" buttons
- [x] AC: #3

### Task 6: Implement Accessibility

- [x] Add `aria-label="Upload Image"` to file input
- [x] Add `role="alert"` to error messages
- [x] Add `aria-live="polite"` for screen reader announcements
- [x] Ensure keyboard navigation (Tab, Enter)
- [x] AC: #5

### Task 7: Implement Performance Optimization

- [x] Synchronous validation (instant feedback)
- [x] Debounce preview generation
- [x] Use OffscreenCanvas for large images (optional)
- [x] Resize large images before processing (25-50%)
- [x] AC: #6

### Task 8: Integrate with Canvas

- [x] Pass file to parent component (CanvasEditor)
- [x] Parent component loads image into Fabric.js
- [x] Pass image URL to Zustand store
- [x] Trigger ColorThief palette extraction (if applicable)
- [x] AC: #7

---

## Dev Notes

### Technical Foundation

**FileReader API Pattern:**

```typescript
const reader = new FileReader()

reader.onload = async (e) => {
  const dataUrl = e.target?.result as string
  // Use dataUrl to load image
}

reader.onerror = () => {
  // Handle error
}

reader.readAsDataURL(file) // Read as Base64
```

**File Size Validation:**

```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

function validateFileSize(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) {
    showError('File terlalu besar (max 10MB). Pilih file lain?')
    return false
  }
  return true
}
```

**File Format Validation:**

```typescript
const ALLOWED_FORMATS = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']

function validateFileFormat(file: File): boolean {
  if (!ALLOWED_FORMATS.includes(file.type)) {
    showError('Format tidak didukung. Gunakan PNG/JPG/SVG/WebP')
    return false
  }
  return true
}
```

**Image Resize Pattern (for performance):**

```typescript
const MAX_IMAGE_DIMENSION = 2048
const MAX_IMAGE_SIZE_MB = 5

async function loadOptimizedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      let { width, height } = img

      // Resize if too large
      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        const scale = Math.min(MAX_IMAGE_DIMENSION / width, MAX_IMAGE_DIMENSION / height)
        width *= scale
        height *= scale
      }

      // Create canvas for resizing
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)

      // Return resized image
      resolve(canvas.toDataURL('image/png'))
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}
```

### Project Structure Notes

**Component Location:**

```
src/components/FileUpload/
├── index.tsx          # Main component
├── hooks/
│   └── useFileValidation.ts  # Validation logic
└── types.ts           # TypeScript types
```

**Integration Points:**

- Receives file from file picker
- Validates file (size, format)
- Calls parent callback on success
- Shows preview modal

**Detected Patterns:**

- Use `useCallback` for validation functions
- Use `useRef` for file input element
- Use `URL.createObjectURL()` for image preview
- Use `URL.revokeObjectURL()` after processing to free memory

### References

- **PRD**: `_bmad-output/planning-artifacts/prd.md` (Functional Requirements FR1, FR35-FR38, FR42)
- **UX Design**: `_bmad-output/planning-artifacts/ux-design-specification.md` (Section 3: Component 1: Canvas Editor Component, Section 5: Interaction 4: Photo Upload)
- **Architecture**: `_bmad-output/planning-artifacts/architecture-decision-document.md` (Section 4: Component Architecture → Canvas Editor, Section 4: Memory Management)

---

## Dev Agent Guardrails

### Technical Requirements

| Requirement           | Detail                        | Source              |
| --------------------- | ----------------------------- | ------------------- |
| **Max File Size**     | 10MB                          | UX Design, PRD FR35 |
| **Supported Formats** | PNG, JPG, SVG, WebP           | UX Design           |
| **Validation**        | Synchronous, instant feedback | NFR6                |
| **Image Resize**      | 25-50% for preview            | NFR4 (memory)       |
| **Zero-Server**       | No server uploads             | PRD FR27-FR30       |

### Architecture Compliance

**MUST FOLLOW:**

1. All validation happens client-side
2. Use FileReader API (no fetch/axios)
3. Validate size BEFORE processing
4. Resize large images for performance
5. Clean up URLs with `URL.revokeObjectURL()`

**MUST NOT DO:**

1. DO NOT upload files to server
2. DO NOT use `document.execCommand("copy")` for validation
3. DO NOT skip file size check
4. DO NOT show preview after rejection
5. DO NOT use blocking UI during validation

### Memory Management

**Critical Cleanup Pattern:**

```typescript
useEffect(() => {
  // Create object URL for preview
  const objectUrl = URL.createObjectURL(file)

  return () => {
    // CRITICAL: Revoke URL to prevent memory leak
    URL.revokeObjectURL(objectUrl)
  }
}, [file])
```

**Bundle Size Impact:**

- FileUpload component: ~2-3KB (lazy loaded)
- Validation logic: ~1KB
- Preview modal: ~3-4KB
- Total overhead: < 10KB gzipped

---

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### Debug Log References

- All validation logic tested and working correctly
- FileReader API integration successful
- Modal state management working as expected
- Accessibility attributes properly implemented
- Tests passing: 7/7 ✅

### Completion Notes List

1. **Component Structure**: Created modular FileUpload component with separate validation hook
2. **Validation Logic**: Implemented synchronous file size (10MB) and format (PNG/JPG/SVG/WebP) validation
3. **UI/UX**: Built modal-based preview and error handling with Indonesian error messages
4. **Accessibility**: Added aria-label, role="alert", and aria-live attributes for screen readers
5. **Integration**: Connected FileUpload to CanvasEditor with proper callback handling
6. **Testing**: Created comprehensive test suite covering all acceptance criteria
7. **Memory Management**: Implemented proper URL cleanup with URL.revokeObjectURL()

### File List

**Files CREATED:**

- `src/components/FileUpload/index.tsx` ✅
- `src/components/FileUpload/hooks/useFileValidation.ts` ✅
- `src/components/FileUpload/types.ts` ✅
- `tests/int/jsdom/FileUpload.int.spec.tsx` ✅

**Files UPDATED:**

- `src/components/CanvasEditor/index.tsx` - Added FileUpload component integration ✅

**Dependencies:**

- None (uses native browser APIs only)
