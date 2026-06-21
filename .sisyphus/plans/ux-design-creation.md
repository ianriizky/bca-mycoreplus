# UX Design Specification - BCA MyCore+ (Journey: Ucapan Selamat)

## TL;DR

> **Quick Summary**: Membuat UX Design Specification lengkap untuk BCA MyCore+ dengan fokus eksklusif pada User Journey #4 "Ucapan Selamat" (birthday, wisuda, toko baru, pencapaian). Prioritas mobile-first dengan touch-optimized canvas editor, template library minimal (1-2 templates), dan sharing langsung ke WhatsApp.
>
> **Deliverables**:
>
> - Information Architecture diagram (3 entry points: Upload/Library/Blank)
> - User Flow diagram untuk journey "Ucapan Selamat"
> - Wireframes mobile-first (Template Selection, Canvas Editor, Floating Toolbar, Export/Share)
> - Interaction pattern specifications (touch gestures, drag-drop, text edit)
> - Component specifications (Canvas Editor, Floating Toolbar, Template Library)
> - Visual design guidelines (Glassmorphism, brand colors flexibility)
> - Accessibility specifications (WCAG 2.1 Level A minimum)
> - Error state wireframes (upload failed, file too large, network error)
>
> **Estimated Effort**: Medium (8 tasks, 3 waves)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 2 → Task 5 → Task 8

---

## Context

### Original Request

User meminta bantuan menyusun UX design berdasarkan PRD yang sudah ada, dengan fokus pada User Journey #4: "Staf Frontline - Ucapan Selamat".

### Interview Summary

**Key Discussions**:

- **Fokus Prioritas**: Journey #4 "Ucapan Selamat" ONLY (birthday, wisuda, toko baru, pencapaian)
- **Template Approach**: Kombinasi 3 entry points (Upload template ATAU Pilih dari library ATAU Blank canvas)
- **Platform Priority**: True mobile-first (touch-optimized canvas, gesture controls)
- **Template Library Size**: 1-2 templates saja (simple grid, no search/filter needed)
- **Photo Upload**: Max 5MB, semua format (PNG/JPG/SVG/WebP), dimensi & aspect ratio bebas
- **Export Format**: PNG + Share to WhatsApp/Email (wa.me link + copyable text format)
- **Undo/Redo**: 5-10 actions (jika library support), no autosave, no session recovery
- **Brand Compliance**: No warnings (full freedom, default BCA colors tapi bisa diubah)

**Research Findings**:

- Fabric.js v6 mendukung touch events untuk mobile canvas editing
- ColorThief.js v3+ untuk ekstraksi warna dari uploaded photos
- Zero-Server Architecture (100% client-side, no backend)
- Glassmorphism UI dengan brand colors BCA (Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F)

### Metis Review

**Identified Gaps** (addressed):

- Platform priority clarified: Mobile-first
- Template library scope: 1-2 templates (simple grid)
- Photo upload constraints: 5MB max, all formats, free dimensions
- Export format: PNG + WhatsApp/Email sharing
- Undo/redo depth: 5-10 actions (conditional on library support)
- Brand compliance: No warnings (full freedom)

---

## Work Objectives

### Core Objective

Membuat UX Design Specification lengkap untuk User Journey #4 "Ucapan Selamat" yang mobile-first, touch-optimized, dengan 3 entry points (Upload/Library/Blank canvas) dan sharing langsung ke WhatsApp.

### Concrete Deliverables

- `_bmad-output/planning-artifacts/ux-design-specification.md` (dokumen utama)
- Information Architecture diagram (Mermaid/ASCII)
- User Flow diagram untuk "Ucapan Selamat" journey
- 4 wireframes mobile-first: Template Selection, Canvas Editor, Floating Toolbar, Export/Share
- Interaction pattern specs (touch gestures, drag-drop, text edit, photo upload, color picker)
- Component specs: Canvas Editor, Floating Toolbar, Template Library Grid
- Visual design guidelines: Glassmorphism, brand colors, typography
- Accessibility specs: Keyboard nav, ARIA labels, color contrast
- Error state wireframes: Upload failed, file too large, network error

### Definition of Done

- [ ] UX Design Specification file exists: `test -f _bmad-output/planning-artifacts/ux-design-specification.md`
- [ ] Information Architecture section complete: `grep -q "## Information Architecture" _bmad-output/planning-artifacts/ux-design-specification.md`
- [ ] User Flow section complete: `grep -q "## User Flow: Ucapan Selamat" _bmad-output/planning-artifacts/ux-design-specification.md`
- [ ] 4 wireframes documented: `grep -c "### Wireframe:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 4)
- [ ] Interaction patterns documented: `grep -c "### Interaction:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 5)
- [ ] Component specs documented: `grep -c "## Component:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 3)
- [ ] Accessibility specs documented: `grep -c "ARIA label:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 10)
- [ ] Error states documented: `grep -c "## Error State:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 3)

### Must Have

- Mobile-first wireframes (touch-optimized, gesture controls)
- 3 entry points: Upload template, Choose from library (1-2 templates), Blank canvas
- Touch interaction patterns: Tap, long-press, pinch-zoom, drag-drop
- Photo upload UI: Max 5MB, all formats, free dimensions
- Export/Share UI: PNG download + WhatsApp/Email sharing (wa.me link + copyable text)
- Undo/redo UI: 5-10 actions (conditional on Fabric.js support)
- Glassmorphism styling: Brand colors BCA (Gold, Deep Navy, Sapphire Blue) as default, editable
- Accessibility: WCAG 2.1 Level A minimum (keyboard nav, ARIA labels, color contrast)

### Must NOT Have (Guardrails)

- ❌ UX untuk Journeys #1-3 (Pengumuman, Promosi, Edukasi) - OUT OF SCOPE
- ❌ Desktop-first wireframes (mobile-first only, desktop dapat enhanced version nanti)
- ❌ Search/filter UI untuk template library (hanya 1-2 templates, simple grid cukup)
- ❌ Crop tool atau aspect ratio selector (dimensi & aspect ratio bebas)
- ❌ Export settings UI (resolution picker, format selector) - PNG only, fixed resolution
- ❌ Autosave atau session recovery UI (no autosave, no recovery)
- ❌ Brand compliance warnings (no warnings, full freedom)
- ❌ "Expert" features: Custom fonts upload, gradient editor, blend modes, masks, layer effects
- ❌ Features not explicitly agreed: Shape drawing, filters, advanced typography (kerning, leading)

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision

- **Infrastructure exists**: N/A (UX design documentation, no code)
- **Automated tests**: N/A (documentation deliverable)
- **Framework**: N/A

### QA Policy

Every task MUST include agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Documentation**: Use `grep`, `wc -l`, `test -f` untuk verify file existence dan content completeness
- **Wireframes**: Use `identify` (ImageMagick) untuk verify image dimensions (jika wireframes sebagai image files)
- **Scope Compliance**: Use `grep` negative assertions untuk verify no out-of-scope content

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.

```
Wave 1 (Start Immediately - foundation):
├── Task 1: Review PRD & Technical Research untuk UX constraints [quick]
├── Task 2: Information Architecture - 3 entry points mapping [quick]
└── Task 3: User Flow diagram - "Ucapan Selamat" journey [quick]

Wave 2 (After Wave 1 - core UX deliverables, MAX PARALLEL):
├── Task 4: Wireframes mobile-first (4 screens) [visual-engineering]
├── Task 5: Interaction pattern specifications [unspecified-high]
├── Task 6: Component specifications [unspecified-high]
└── Task 7: Visual design guidelines + Accessibility specs [visual-engineering]

Wave 3 (After Wave 2 - polish & validation):
└── Task 8: Error state wireframes + Final document assembly [quick]

Critical Path: Task 1 → Task 2 → Task 5 → Task 8
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 2)
```

### Dependency Matrix

- **1**: - - 2, 3
- **2**: 1 - 4, 5, 6
- **3**: 1 - 4, 5
- **4**: 2, 3 - 8
- **5**: 2, 3 - 8
- **6**: 2 - 8
- **7**: 2 - 8
- **8**: 4, 5, 6, 7 - -

### Agent Dispatch Summary

- **Wave 1**: 3 tasks - T1 → `quick`, T2 → `quick`, T3 → `quick`
- **Wave 2**: 4 tasks - T4 → `visual-engineering`, T5 → `unspecified-high`, T6 → `unspecified-high`, T7 → `visual-engineering`
- **Wave 3**: 1 task - T8 → `quick`

---

## TODOs

- [ ] 1. Review PRD & Technical Research untuk UX Constraints

  **What to do**:
  - Baca lengkap PRD section: User Journeys (Journey #4 "Ucapan Selamat"), Functional Requirements (FR7-FR45), Non-Functional Requirements (NFR1-NFR26)
  - Baca Technical Research: Fabric.js v6 touch events, ColorThief.js integration, Zero-Server Architecture patterns
  - Ekstrak UX-relevant constraints: Mobile-first, touch gestures, 5MB upload limit, PNG export, wa.me sharing
  - Dokumentasikan findings di section "UX Constraints Summary" dalam ux-design-specification.md

  **Must NOT do**:
  - Jangan baca atau reference Journeys #1-3 (out of scope)
  - Jangan include desktop-specific patterns (mobile-first only)
  - Jangan include features yang tidak explicitly agreed (autosave, session recovery, brand warnings)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward document review dan extraction task, tidak butuh deep analysis
  - **Skills**: []
    - No specialized skills needed untuk document review

  **Parallelization**:
  - **Can Run In Parallel**: NO (foundational task, blocks Wave 1)
  - **Parallel Group**: Wave 1 - Start (with Tasks 2, 3 after this completes)
  - **Blocks**: Tasks 2, 3 (Information Architecture dan User Flow butuh constraints dari task ini)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing docs to extract from):
  - `_bmad-output/planning-artifacts/prd.md:142-247` - User Journey #4 "Ucapan Selamat" dengan 4 variasi (birthday, wisuda, toko baru, pencapaian)
  - `_bmad-output/planning-artifacts/prd.md:249-327` - Functional Requirements (FR1-FR45) untuk canvas editor, template library, color extraction, clipboard sharing
  - `_bmad-output/planning-artifacts/prd.md:329-370` - Non-Functional Requirements (NFR1-NFR26) untuk performance, security, accessibility
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:195-230` - Fabric.js v6 features (tactile text manipulation, touch events, ESM modules)
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:292-443` - Architectural Patterns (Zero-Server SPA, Invisible UI, Glassmorphism)

  **API/Type References** (technical constraints):
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:499-523` - Clipboard API (async, HTTPS/localhost requirement, MIME types)
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:525-558` - Data Formats (PNG, JPEG, Blob, DataURL, OKLCH color space)

  **WHY Each Reference Matters**:
  - PRD User Journey #4: Defines exact user flow, pain points, dan success criteria untuk "Ucapan Selamat" journey
  - PRD Functional Requirements: Lists all features yang harus ada di UX (template library, canvas editor, clipboard sharing)
  - PRD Non-Functional Requirements: Performance targets (< 30 detik workflow, < 500MB memory), accessibility (WCAG 2.1 Level A)
  - Technical Research Fabric.js: Touch events support, tactile manipulation patterns untuk mobile canvas editing
  - Technical Research Architecture: Zero-Server patterns, Glassmorphism styling, Invisible UI approach

  **Acceptance Criteria**:

  **AGENT-EXECUTABLE VERIFICATION ONLY**:
  - [ ] UX Constraints Summary section exists: `grep -q "## UX Constraints Summary" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Mobile-first constraint documented: `grep -q "mobile-first" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Touch gestures constraint documented: `grep -q "touch.*gesture" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Upload limit documented: `grep -q "5MB" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Export format documented: `grep -q "PNG.*WhatsApp" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: UX Constraints Extraction Completeness
    Tool: grep + wc -l
    Preconditions: PRD dan Technical Research files exist
    Steps:
      1. grep -c "mobile-first\|touch\|gesture" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 3 mentions)
      2. grep -q "5MB.*upload" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Upload limit documented"
      3. grep -q "PNG.*export" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Export format documented"
      4. grep -q "wa.me.*WhatsApp" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: WhatsApp sharing documented"
    Expected Result: All 4 key constraints documented (mobile-first, upload limit, export format, WhatsApp sharing)
    Failure Indicators: Missing any of the 4 key constraints
    Evidence: .sisyphus/evidence/task-1-constraints-extraction.txt

  Scenario: Scope Boundary Enforcement (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: UX Constraints Summary section written
    Steps:
      1. grep -i "journey.*[123]" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
      2. grep -iE "(pengumuman|promosi|edukasi)" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches in feature context)
      3. grep -iE "(desktop-first|autosave|session recovery|brand warning)" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
    Expected Result: Empty grep output (exit code 1) - no out-of-scope content
    Failure Indicators: Any matches found (out-of-scope journeys or forbidden features mentioned)
    Evidence: .sisyphus/evidence/task-1-scope-boundary-check.txt
  ```

  **Evidence to Capture**:
  - [ ] task-1-constraints-extraction.txt: Output dari grep commands showing documented constraints
  - [ ] task-1-scope-boundary-check.txt: Output dari negative grep assertions (should be empty)

  **Commit**: NO (documentation work, commit at end)

- [ ] 2. Information Architecture - 3 Entry Points Mapping

  **What to do**:
  - Buat diagram Information Architecture untuk journey "Ucapan Selamat" dengan 3 entry points:
    1. Upload Template (user upload PNG/JPG/SVG/WebP, max 5MB)
    2. Choose from Library (1-2 templates, simple grid)
    3. Blank Canvas (start from scratch)
  - Map decision nodes: "Pilih entry point" → "Canvas Editor" → "Export/Share"
  - Dokumentasikan dalam format Mermaid flowchart atau ASCII diagram
  - Include navigation flows: Back button, Cancel, Save Draft (jika applicable)

  **Must NOT do**:
  - Jangan include navigation ke journeys lain (Pengumuman, Promosi, Edukasi)
  - Jangan include search/filter UI (hanya 1-2 templates, simple grid cukup)
  - Jangan include autosave atau session recovery flows

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward IA mapping task, 3 entry points sudah clear dari interview
  - **Skills**: []
    - No specialized skills needed

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1)
  - **Parallel Group**: Wave 1 (with Task 3)
  - **Blocks**: Tasks 4, 5, 6 (wireframes dan interaction patterns butuh IA structure)
  - **Blocked By**: Task 1 (butuh UX constraints dari PRD review)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/prd.md:209-231` - Journey #4 Rising Action: 6 steps dari pilih template hingga export
  - Task 1 output: UX Constraints Summary (3 entry points decision)

  **WHY Each Reference Matters**:
  - PRD Journey #4 Rising Action: Defines exact steps user takes, informing IA decision nodes
  - Task 1 UX Constraints: Confirms 3 entry points (Upload/Library/Blank) dan no search/filter needed

  **Acceptance Criteria**:
  - [ ] Information Architecture section exists: `grep -q "## Information Architecture" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 3 entry points documented: `grep -c "Entry Point" _bmad-output/planning-artifacts/ux-design-specification.md` (expect 3)
  - [ ] Decision nodes documented: `grep -c "Decision Node\|Decision:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 2)
  - [ ] Diagram exists (Mermaid or ASCII): `grep -q "```mermaid\|```" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios**:

  ````
  Scenario: Information Architecture Completeness
    Tool: grep + wc -l
    Preconditions: Task 1 completed (UX Constraints documented)
    Steps:
      1. grep "## Information Architecture" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: IA section exists"
      2. grep -c "Entry Point" _bmad-output/planning-artifacts/ux-design-specification.md (expect 3: Upload/Library/Blank)
      3. grep -c "Decision Node\|Decision:" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 2)
      4. grep -q "```mermaid\|```" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Diagram exists"
    Expected Result: IA section with 3 entry points, 2+ decision nodes, and diagram
    Failure Indicators: Missing entry points, no decision nodes, no diagram
    Evidence: .sisyphus/evidence/task-2-ia-completeness.txt

  Scenario: IA Scope Boundary (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: IA section written
    Steps:
      1. grep -i "search\|filter\|pagination" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches in IA context)
      2. grep -i "autosave\|session recovery" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
    Expected Result: No forbidden features in IA
    Failure Indicators: Search/filter, autosave, or session recovery mentioned
    Evidence: .sisyphus/evidence/task-2-ia-scope-check.txt
  ````

  **Evidence to Capture**:
  - [ ] task-2-ia-completeness.txt
  - [ ] task-2-ia-scope-check.txt

  **Commit**: NO

- [ ] 7. Visual Design Guidelines + Accessibility Specifications

  **What to do**:
  - **Visual Design Guidelines**:
    - **Glassmorphism Styling**: backdrop-blur (10-20px), bg-opacity (0.7-0.9), border (1px solid rgba(255,255,255,0.2)), shadow (0 8px 32px rgba(0,0,0,0.1))
    - **Brand Colors** (default, editable): Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F, Carbon Black #1A1A1A, Quartz White #F4F1EC
    - **Typography**: System fonts (San Francisco iOS, Roboto Android), font sizes (16px body, 20px heading, 14px caption), line height (1.5)
    - **Spacing**: 8px grid system (8px, 16px, 24px, 32px margins/paddings)
    - **Touch Targets**: Minimum 44x44px (iOS HIG), 48x48dp (Material Design)
  - **Accessibility Specifications** (WCAG 2.1 Level A minimum):
    - **Keyboard Navigation**: Tab order (Template Selection → Canvas Editor → Floating Toolbar → Export/Share), Focus indicators (2px solid outline)
    - **ARIA Labels**: 10+ labels untuk canvas elements (aria-label="Canvas Editor", aria-label="Text Object", aria-label="Upload Photo Button", dll.)
    - **Color Contrast**: WCAG AA ratio (4.5:1) untuk text vs background, use ColorThief.js `.contrast` untuk validation
    - **Screen Reader Support**: Alt text untuk images, role attributes (role="button", role="dialog"), live regions (aria-live="polite" untuk notifications)
  - Include accessibility testing checklist: Keyboard-only navigation test, Screen reader test (VoiceOver iOS, TalkBack Android), Color contrast validation

  **Must NOT do**:
  - Jangan target WCAG AAA (Level A minimum sudah cukup untuk internal app)
  - Jangan include desktop-specific accessibility patterns (mouse hover tooltips)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual design + accessibility task, butuh design expertise dan WCAG knowledge
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 2)
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6)
  - **Blocks**: Task 8 (final assembly butuh visual design guidelines)
  - **Blocked By**: Task 2 (butuh IA untuk inform accessibility navigation order)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/prd.md:282-287` - FR19-FR22: Invisible UI dengan Glassmorphism styling
  - `_bmad-output/planning-artifacts/prd.md:499-517` - NFR13-NFR17: Accessibility requirements (WCAG 2.1 Level A, keyboard nav, focus indicators, color contrast)
  - `_bmad-output/planning-artifacts/product-brief-bca-mycoreplus-distillate.md:142-158` - Brand Guidelines Context: Primary colors (Gold, Deep Navy), Secondary colors (Sapphire Blue, Carbon Black, Quartz White)
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:356-365` - Contextual UI (Invisible UI) patterns dengan Glassmorphism

  **External References**:
  - WCAG 2.1 Guidelines: Level A success criteria
  - iOS Human Interface Guidelines: Accessibility (VoiceOver, Dynamic Type)
  - Material Design: Accessibility (TalkBack, color contrast)

  **WHY Each Reference Matters**:
  - PRD FR19-FR22: Glassmorphism styling requirements (backdrop-blur, bg-opacity)
  - PRD NFR13-NFR17: Accessibility targets (WCAG 2.1 Level A, keyboard nav, color contrast 4.5:1)
  - Product Brief Brand Guidelines: BCA brand colors (Gold, Deep Navy, Sapphire Blue) as default
  - Technical Research Contextual UI: Glassmorphism implementation patterns dengan OKLCH primitives

  **Acceptance Criteria**:
  - [ ] Visual Design Guidelines section exists: `grep -q "## Visual Design Guidelines" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Glassmorphism styling documented: `grep -q "Glassmorphism\|backdrop-blur\|bg-opacity" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Brand colors documented: `grep -q "#C8A96A\|#0B1F3A\|#1E3A5F" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Typography documented: `grep -q "font.*size\|line.*height\|typography" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Accessibility Specifications section exists: `grep -q "## Accessibility Specifications" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Keyboard navigation documented: `grep -q "keyboard.*navigation\|tab.*order" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] ARIA labels documented: `grep -c "aria-label\|ARIA label" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 10)
  - [ ] Color contrast documented: `grep -q "color.*contrast\|WCAG.*AA\|4.5:1" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios**:

  ```
  Scenario: Visual Design Guidelines Completeness
    Tool: grep + wc -l
    Preconditions: Task 2 completed (IA documented)
    Steps:
      1. grep "## Visual Design Guidelines" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Visual Design section exists"
      2. grep -q "Glassmorphism.*backdrop-blur.*bg-opacity" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Glassmorphism documented"
      3. grep -q "#C8A96A.*#0B1F3A.*#1E3A5F" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Brand colors documented"
      4. grep -q "font.*size.*line.*height" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Typography documented"
      5. grep -q "44.*44\|48.*48" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Touch targets documented"
    Expected Result: Visual Design with Glassmorphism, brand colors, typography, touch targets
    Failure Indicators: Missing Glassmorphism, brand colors, typography, or touch targets
    Evidence: .sisyphus/evidence/task-7-visual-design-completeness.txt

  Scenario: Accessibility Specifications Completeness
    Tool: grep + wc -l
    Preconditions: Task 2 completed (IA documented for navigation order)
    Steps:
      1. grep "## Accessibility Specifications" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Accessibility section exists"
      2. grep -q "keyboard.*navigation\|tab.*order" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Keyboard nav documented"
      3. grep -c "aria-label\|ARIA label" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 10)
      4. grep -q "color.*contrast.*4.5:1\|WCAG.*AA" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Color contrast documented"
      5. grep -q "screen reader\|VoiceOver\|TalkBack" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Screen reader support documented"
    Expected Result: Accessibility with keyboard nav, 10+ ARIA labels, color contrast, screen reader support
    Failure Indicators: Missing keyboard nav, < 10 ARIA labels, no color contrast, no screen reader support
    Evidence: .sisyphus/evidence/task-7-accessibility-completeness.txt
  ```

  **Evidence to Capture**:
  - [ ] task-7-visual-design-completeness.txt
  - [ ] task-7-accessibility-completeness.txt

  **Commit**: NO

- [ ] 8. Error State Wireframes + Final Document Assembly

  **What to do**:
  - **Error State Wireframes** (3+ states):
    1. **Upload Failed**: Error modal dengan message "Upload gagal. Coba lagi?", "Retry" button, "Cancel" button
    2. **File Too Large**: Error modal dengan message "File terlalu besar (max 5MB). Pilih file lain?", "Choose Another" button, "Cancel" button
    3. **Network Error**: Toast notification dengan message "Koneksi terputus. Periksa internet Anda.", auto-dismiss setelah 5 detik
  - Include error recovery flows: Retry button → re-attempt upload, Cancel button → return to previous screen
  - **Final Document Assembly**:
    - Review semua sections: UX Constraints Summary, Information Architecture, User Flow, Wireframes, Interaction Patterns, Component Specs, Visual Design Guidelines, Accessibility Specs, Error States
    - Add Table of Contents dengan links ke sections
    - Add Executive Summary (1-2 paragraphs) di awal dokumen
    - Add Appendix: Glossary (Glassmorphism, WCAG, ARIA, etc.), References (PRD, Technical Research, iOS HIG, Material Design)
    - Verify no out-of-scope content (grep untuk journeys #1-3, autosave, desktop-first)
    - Format check: Consistent heading levels (##, ###), proper Markdown syntax, code blocks untuk technical specs

  **Must NOT do**:
  - Jangan include error states untuk features yang out of scope (autosave failed, session recovery failed)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Error states wireframes + document assembly task, straightforward polish work
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO (final assembly, depends on all previous tasks)
  - **Parallel Group**: Wave 3 (sequential after Wave 2)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 4, 5, 6, 7 (butuh semua deliverables untuk final assembly)

  **References**:

  **Pattern References**:
  - Tasks 1-7 outputs: All sections untuk final assembly
  - `_bmad-output/planning-artifacts/prd.md:311-322` - FR35-FR38: Image upload & management (inform error states)

  **WHY Each Reference Matters**:
  - Tasks 1-7 outputs: All content untuk final document assembly
  - PRD FR35-FR38: Image upload constraints (5MB limit, format validation) inform error states

  **Acceptance Criteria**:
  - [ ] Error States section exists: `grep -q "## Error States" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 3+ error states documented: `grep -c "## Error State:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 3)
  - [ ] Upload Failed error: `grep -q "Upload.*Failed\|Upload.*gagal" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] File Too Large error: `grep -q "File.*Too Large\|File.*terlalu besar" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Network Error: `grep -q "Network.*Error\|Koneksi.*terputus" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Table of Contents exists: `grep -q "## Table of Contents\|## Daftar Isi" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Executive Summary exists: `grep -q "## Executive Summary\|## Ringkasan Eksekutif" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] All sections present: `grep -c "## " _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 10 sections)

  **QA Scenarios**:

  ```
  Scenario: Error States Completeness
    Tool: grep + wc -l
    Preconditions: Tasks 4, 5, 6, 7 completed (all core deliverables done)
    Steps:
      1. grep "## Error States" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Error States section exists"
      2. grep -c "## Error State:" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 3)
      3. grep -q "Upload.*Failed\|Upload.*gagal" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Upload Failed error"
      4. grep -q "File.*Too Large\|File.*terlalu besar" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: File Too Large error"
      5. grep -q "Network.*Error\|Koneksi.*terputus" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Network Error"
    Expected Result: 3+ error states (Upload Failed, File Too Large, Network Error)
    Failure Indicators: < 3 error states, missing any of the 3 key errors
    Evidence: .sisyphus/evidence/task-8-error-states-completeness.txt

  Scenario: Final Document Assembly Completeness
    Tool: grep + wc -l
    Preconditions: All tasks 1-7 completed
    Steps:
      1. grep -q "## Table of Contents\|## Daftar Isi" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: TOC exists"
      2. grep -q "## Executive Summary\|## Ringkasan Eksekutif" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Executive Summary exists"
      3. grep -c "## " _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 10 sections)
      4. wc -l _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 500 lines)
    Expected Result: Complete document with TOC, Executive Summary, 10+ sections, 500+ lines
    Failure Indicators: Missing TOC, no Executive Summary, < 10 sections, < 500 lines
    Evidence: .sisyphus/evidence/task-8-document-assembly-completeness.txt

  Scenario: Final Scope Boundary Verification (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: Final document assembled
    Steps:
      1. grep -i "journey.*[123]\|pengumuman\|promosi\|edukasi" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
      2. grep -iE "(autosave|session recovery|desktop-first|brand warning)" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
      3. grep -iE "(search.*filter|gradient editor|blend mode|layer effect)" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
    Expected Result: No out-of-scope journeys, no forbidden features
    Failure Indicators: Out-of-scope content found
    Evidence: .sisyphus/evidence/task-8-final-scope-verification.txt
  ```

  **Evidence to Capture**:
  - [ ] task-8-error-states-completeness.txt
  - [ ] task-8-document-assembly-completeness.txt
  - [ ] task-8-final-scope-verification.txt

  **Commit**: YES
  - Message: `docs(ux): add UX Design Specification for Journey #4 Ucapan Selamat`
  - Files: `_bmad-output/planning-artifacts/ux-design-specification.md`
  - Pre-commit: `grep -q "## Executive Summary" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS" || exit 1`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**

- [ ] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (grep untuk sections). For each "Must NOT Have": search codebase for forbidden patterns — reject with line number if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
      Output: `Must Have [8/8] | Must NOT Have [0/0] | Tasks [8/8] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Content Quality Review** — `unspecified-high`
      Read ux-design-specification.md end-to-end. Verify: (1) All 8 sections complete (UX Constraints, IA, User Flow, Wireframes, Interactions, Components, Visual Design, Error States), (2) Mobile-first compliance (no desktop wireframes), (3) Scope boundary (no journeys #1-3), (4) Accessibility (10+ ARIA labels, WCAG 2.1 Level A), (5) Technical accuracy (Fabric.js patterns, ColorThief.js integration).
      Output: `Sections [8/8] | Mobile-First [PASS/FAIL] | Scope [PASS/FAIL] | Accessibility [PASS/FAIL] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high`
      Execute EVERY QA scenario from EVERY task (Tasks 1-8). Follow exact steps, capture evidence to .sisyphus/evidence/. Test: (1) Constraints extraction (Task 1), (2) IA completeness (Task 2), (3) User Flow completeness (Task 3), (4) Wireframes completeness (Task 4), (5) Interaction patterns (Task 5), (6) Component specs (Task 6), (7) Visual design + accessibility (Task 7), (8) Error states + final assembly (Task 8).
      Output: `Scenarios [16/16 pass] | Evidence Files [16/16] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", read actual output in ux-design-specification.md. Verify 1:1 — everything in spec was documented (no missing), nothing beyond spec was documented (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N including content from out-of-scope journeys. Flag unaccounted content.
      Output: `Tasks [8/8 compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N items] | VERDICT`

---

## Commit Strategy

- **Final Commit**: `docs(ux): add UX Design Specification for Journey #4 Ucapan Selamat` - \_bmad-output/planning-artifacts/ux-design-specification.md, `grep -q "## Executive Summary" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS" || exit 1`

---

## Success Criteria

### Verification Commands

```bash
# File exists
test -f _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: File exists"

# All sections present
grep -c "## " _bmad-output/planning-artifacts/ux-design-specification.md  # Expected: >= 10

# Mobile-first compliance
grep -q "375.*667\|mobile.*first" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Mobile-first"

# Accessibility compliance
grep -c "aria-label\|ARIA label" _bmad-output/planning-artifacts/ux-design-specification.md  # Expected: >= 10

# Scope boundary
grep -i "journey.*[123]" _bmad-output/planning-artifacts/ux-design-specification.md && echo "FAIL: Out-of-scope journey" || echo "PASS: Scope clean"
```

### Final Checklist

- [ ] All "Must Have" present (mobile-first wireframes, 3 entry points, touch interactions, photo upload UI, export/share UI, undo/redo UI, Glassmorphism, accessibility)
- [ ] All "Must NOT Have" absent (journeys #1-3, desktop-first, search/filter, autosave, brand warnings, expert features)
- [ ] All 8 tasks completed with evidence files
- [ ] All 16 QA scenarios passed
- [ ] Final Verification Wave: 4/4 agents APPROVE
- [ ] User explicit "okay" received

  **What to do**:
  - Dokumentasikan 5+ interaction patterns untuk mobile canvas editor:
    1. **Touch Gestures**: Tap (select object), Long-press (context menu), Pinch-zoom (canvas zoom), Two-finger drag (canvas pan)
    2. **Drag & Drop**: Drag text/image objects, resize handles (corner drag), rotate handle (circular drag)
    3. **Text Editing**: Double-tap text → inline editing mode, keyboard appears, tap outside → exit edit mode
    4. **Photo Upload**: Tap "Upload Photo" → file picker → preview → drag to position → resize/rotate
    5. **Color Picker**: Tap color swatch → color picker modal → select color (default BCA colors + custom), apply to selected object
  - Include interaction states: Default, Hover (N/A for mobile), Active (pressed), Selected, Disabled
  - Include feedback: Visual feedback (highlight, shadow), haptic feedback (vibration on long-press), audio feedback (optional)
  - Include error handling: Invalid file format → toast notification, File too large (> 5MB) → error modal with retry

  **Must NOT do**:
  - Jangan include desktop-specific interactions (mouse hover, right-click, keyboard shortcuts)
  - Jangan include autosave interactions (no autosave)
  - Jangan include brand compliance warning interactions (no warnings)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex interaction design task, butuh deep understanding of mobile touch patterns dan Fabric.js capabilities
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Tasks 2, 3)
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7)
  - **Blocks**: Task 8 (final assembly butuh interaction specs)
  - **Blocked By**: Tasks 2, 3 (butuh IA dan User Flow untuk inform interactions)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/prd.md:253-259` - FR1-FR6: Canvas editor core interactions (drag, resize, rotate, double-click text edit)
  - `_bmad-output/planning-artifacts/prd.md:311-322` - FR35-FR38: Image upload & management interactions
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:195-230` - Fabric.js v6 features: Tactile text manipulation, touch events, inline editing
  - Task 3 output: User Flow (interaction sequences)

  **External References**:
  - iOS Human Interface Guidelines: Touch gestures (tap, long-press, pinch, swipe)
  - Material Design: Mobile interaction patterns (ripple effect, elevation changes)
  - Fabric.js v6 documentation: Touch events API, object manipulation methods

  **WHY Each Reference Matters**:
  - PRD FR1-FR6: Defines core canvas interactions (drag, resize, rotate, text edit)
  - PRD FR35-FR38: Defines image upload interactions (drag & drop, FileReader API)
  - Technical Research Fabric.js: Touch events support, tactile manipulation patterns untuk mobile
  - iOS/Material Design: Platform conventions untuk touch gestures dan feedback

  **Acceptance Criteria**:
  - [ ] Interaction Patterns section exists: `grep -q "## Interaction Patterns" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 5+ patterns documented: `grep -c "### Interaction:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 5)
  - [ ] Touch gestures documented: `grep -q "tap\|long-press\|pinch\|drag" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Interaction states documented: `grep -q "Default\|Active\|Selected\|Disabled" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Feedback mechanisms documented: `grep -q "visual feedback\|haptic\|vibration" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Error handling documented: `grep -q "error.*handling\|Invalid file\|File too large" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios**:

  ```
  Scenario: Interaction Patterns Completeness
    Tool: grep + wc -l
    Preconditions: Tasks 2, 3 completed (IA dan User Flow documented)
    Steps:
      1. grep "## Interaction Patterns" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Interaction Patterns section exists"
      2. grep -c "### Interaction:" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 5)
      3. grep -q "tap.*long-press.*pinch" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Touch gestures documented"
      4. grep -q "Default.*Active.*Selected" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Interaction states documented"
      5. grep -q "visual feedback.*haptic" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Feedback mechanisms documented"
    Expected Result: 5+ interaction patterns with touch gestures, states, and feedback
    Failure Indicators: < 5 patterns, missing touch gestures, no states/feedback
    Evidence: .sisyphus/evidence/task-5-interaction-completeness.txt

  Scenario: Mobile-First Interaction Compliance (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: Interaction Patterns section written
    Steps:
      1. grep -i "mouse.*hover\|right-click\|keyboard shortcut" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
      2. grep -i "autosave.*interaction\|session recovery.*interaction" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
    Expected Result: No desktop-specific interactions, no autosave interactions
    Failure Indicators: Mouse hover, right-click, keyboard shortcuts, autosave interactions mentioned
    Evidence: .sisyphus/evidence/task-5-mobile-interaction-compliance.txt
  ```

  **Evidence to Capture**:
  - [ ] task-5-interaction-completeness.txt
  - [ ] task-5-mobile-interaction-compliance.txt

  **Commit**: NO

- [ ] 6. Component Specifications

  **What to do**:
  - Dokumentasikan 3 core components dengan detailed specs:
    1. **Canvas Editor Component**:
       - Props: canvasWidth, canvasHeight, backgroundColor, onObjectSelected, onExport
       - State: selectedObject, canvasObjects[], undoStack[] (5-10 actions)
       - Methods: addText(), addImage(), deleteObject(), undo(), redo(), exportToPNG()
       - Fabric.js integration: useRef pattern, useLayoutEffect initialization, canvas.dispose() cleanup
    2. **Floating Toolbar Component**:
       - Props: selectedObject, onColorChange, onDelete, onPhotoUpload
       - State: isVisible (true when object selected), toolbarPosition (follow selected object)
       - Styling: Glassmorphism (backdrop-blur, bg-opacity), brand colors (Gold, Deep Navy, Sapphire Blue)
       - Interactions: Tap color swatch → color picker, Tap delete → confirm modal, Tap photo → file picker
    3. **Template Library Grid Component**:
       - Props: templates[] (1-2 items), onTemplateSelect, onUploadTemplate, onBlankCanvas
       - State: selectedTemplate
       - Layout: Simple grid (1-2 items), "Upload Template" button, "Blank Canvas" button
       - Interactions: Tap template → preview modal → confirm → navigate to Canvas Editor
  - Include component hierarchy: App → TemplateSelection → CanvasEditor → FloatingToolbar
  - Include data flow: Props down, events up (React unidirectional data flow)

  **Must NOT do**:
  - Jangan include components untuk journeys lain (Pengumuman, Promosi, Edukasi)
  - Jangan include autosave atau session recovery components
  - Jangan include search/filter components (hanya 1-2 templates)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Technical component design task, butuh understanding of React patterns dan Fabric.js integration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 2)
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 7)
  - **Blocks**: Task 8 (final assembly butuh component specs)
  - **Blocked By**: Task 2 (butuh IA untuk inform component hierarchy)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:479-496` - React Integration Patterns: useRef, useLayoutEffect, Context API, cleanup pattern
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:332-365` - Fabric.js Application Architecture: FabricContext, Plugin Architecture, Command Pattern
  - `_bmad-output/planning-artifacts/prd.md:282-287` - FR19-FR22: Invisible UI (Floating Toolbar) requirements
  - Task 2 output: Information Architecture (component hierarchy)

  **WHY Each Reference Matters**:
  - Technical Research React Integration: useRef pattern untuk Fabric.js Canvas instance, cleanup dengan canvas.dispose()
  - Technical Research Fabric.js Architecture: Plugin pattern, Command pattern untuk undo/redo
  - PRD FR19-FR22: Floating Toolbar behavior (appears on object selection, Glassmorphism styling)
  - IA: Component hierarchy dan navigation flow

  **Acceptance Criteria**:
  - [ ] Component Specifications section exists: `grep -q "## Component Specifications" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 3 components documented: `grep -c "## Component:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect 3)
  - [ ] Canvas Editor component: `grep -q "Canvas Editor Component" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Floating Toolbar component: `grep -q "Floating Toolbar Component" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Template Library component: `grep -q "Template Library.*Component" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Props/State/Methods documented: `grep -c "Props:\|State:\|Methods:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 9: 3 per component)

  **QA Scenarios**:

  ```
  Scenario: Component Specifications Completeness
    Tool: grep + wc -l
    Preconditions: Task 2 completed (IA documented)
    Steps:
      1. grep "## Component Specifications" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Component Specs section exists"
      2. grep -c "## Component:" _bmad-output/planning-artifacts/ux-design-specification.md (expect 3)
      3. grep -q "Canvas Editor Component" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Canvas Editor documented"
      4. grep -q "Floating Toolbar Component" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Floating Toolbar documented"
      5. grep -q "Template Library.*Component" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Template Library documented"
      6. grep -c "Props:\|State:\|Methods:" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 9)
    Expected Result: 3 components with Props/State/Methods documented
    Failure Indicators: < 3 components, missing Props/State/Methods
    Evidence: .sisyphus/evidence/task-6-component-completeness.txt

  Scenario: Component Scope Boundary (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: Component Specs section written
    Steps:
      1. grep -i "autosave.*component\|session recovery.*component" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
      2. grep -i "search.*component\|filter.*component" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches)
    Expected Result: No autosave, session recovery, search, or filter components
    Failure Indicators: Forbidden components mentioned
    Evidence: .sisyphus/evidence/task-6-component-scope-check.txt
  ```

  **Evidence to Capture**:
  - [ ] task-6-component-completeness.txt
  - [ ] task-6-component-scope-check.txt

  **Commit**: NO

  **What to do**:
  - Buat detailed user flow diagram untuk journey "Ucapan Selamat" dari start hingga finish
  - Flow harus cover 3 entry points: Upload Template, Choose from Library (1-2 templates), Blank Canvas
  - Include decision points: "Pilih entry point", "Upload foto nasabah?", "Adjust warna?", "Export format?"
  - Include happy path: Pilih template → Edit teks → Upload foto (optional) → Adjust warna → Export PNG → Share to WhatsApp
  - Include alternative paths: Blank canvas → Add background → Add text → Export
  - Dokumentasikan dalam format Mermaid flowchart atau ASCII diagram dengan swimlanes (jika applicable)

  **Must NOT do**:
  - Jangan include flows untuk journeys lain (Pengumuman, Promosi, Edukasi)
  - Jangan include autosave atau session recovery flows
  - Jangan include desktop-specific flows (mobile-first only)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: User flow mapping task, straightforward dari PRD Journey #4
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1, parallel with Task 2)
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 4, 5 (wireframes dan interaction patterns butuh user flow)
  - **Blocked By**: Task 1 (butuh UX constraints)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/prd.md:209-231` - Journey #4 Rising Action: 6 steps detailed flow
  - `_bmad-output/planning-artifacts/prd.md:142-161` - Journey #4 Opening Scene dan Climax (start dan end states)
  - Task 1 output: UX Constraints Summary (3 entry points, photo upload optional, export to PNG + WhatsApp)

  **WHY Each Reference Matters**:
  - PRD Journey #4 Rising Action: Exact 6 steps user takes (pilih template → edit teks → upload foto → adjust warna → export → share)
  - PRD Opening Scene/Climax: Context (why user starts journey) dan success state (gambar terkirim dalam < 30 detik)
  - Task 1 UX Constraints: Technical constraints yang affect flow (5MB upload limit, PNG export, wa.me sharing)

  **Acceptance Criteria**:
  - [ ] User Flow section exists: `grep -q "## User Flow: Ucapan Selamat" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 3 entry points in flow: `grep -c "Entry Point\|entry point" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 3)
  - [ ] Decision points documented: `grep -c "Decision:\|decision point" _bmad-output/planning-artifacts/ux-design-specification.md` (expect >= 3)
  - [ ] Happy path documented: `grep -q "happy path\|Happy Path" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Alternative paths documented: `grep -q "alternative path\|Alternative Path" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Diagram exists: `grep -q "```mermaid\|```" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios**:

  ```
  Scenario: User Flow Completeness
    Tool: grep + wc -l
    Preconditions: Task 1 completed (UX Constraints documented)
    Steps:
      1. grep "## User Flow: Ucapan Selamat" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: User Flow section exists"
      2. grep -c "Entry Point\|entry point" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 3)
      3. grep -c "Decision:\|decision point" _bmad-output/planning-artifacts/ux-design-specification.md (expect >= 3)
      4. grep -q "happy path" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Happy path documented"
      5. grep -q "alternative path" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Alternative paths documented"
    Expected Result: User Flow with 3 entry points, 3+ decision points, happy path, alternative paths
    Failure Indicators: Missing entry points, no decision points, no happy/alternative paths
    Evidence: .sisyphus/evidence/task-3-user-flow-completeness.txt

  Scenario: User Flow Scope Boundary (Negative Test)
    Tool: grep (negative assertion)
    Preconditions: User Flow section written
    Steps:
      1. grep -i "journey.*[123]\|pengumuman\|promosi\|edukasi" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches in User Flow context)
      2. grep -i "autosave\|session recovery\|desktop" _bmad-output/planning-artifacts/ux-design-specification.md (expect NO matches in User Flow)
    Expected Result: No out-of-scope journeys or forbidden features in User Flow
    Failure Indicators: Other journeys mentioned, autosave/desktop flows included
    Evidence: .sisyphus/evidence/task-3-user-flow-scope-check.txt
  ```

  **Evidence to Capture**:
  - [ ] task-3-user-flow-completeness.txt
  - [ ] task-3-user-flow-scope-check.txt

  **Commit**: NO

- [ ] 4. Wireframes Mobile-First (4 Screens)

  **What to do**:
  - Buat 4 wireframes mobile-first (portrait orientation, 375x667px base - iPhone SE):
    1. **Template Selection Screen**: Grid 1-2 templates + "Upload Template" button + "Blank Canvas" button
    2. **Canvas Editor Screen**: Canvas area (full-width), Floating Toolbar (Glassmorphism, appears on object selection), Bottom action bar (Undo, Export, Share)
    3. **Floating Toolbar**: Contextual toolbar (text edit, color picker, photo upload, delete) dengan Glassmorphism effect
    4. **Export/Share Screen**: PNG preview, "Download PNG" button, "Share to WhatsApp" button (wa.me link), "Copy Text Format" button
  - Wireframes bisa dalam format: Figma screenshot, hand-drawn sketch (digitized), ASCII art, atau Mermaid diagram
  - Include annotations: Touch targets (min 44x44px), gesture hints (tap, long-press, pinch-zoom), spacing (8px grid)
  - Include brand colors: Gold #C8A96A, Deep Navy #0B1F3A, Sapphire Blue #1E3A5F (as default, editable)

  **Must NOT do**:
  - Jangan buat desktop wireframes (mobile-first only)
  - Jangan include search/filter UI (hanya 1-2 templates)
  - Jangan include autosave indicators atau session recovery UI
  - Jangan include brand compliance warnings

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/UX design task, butuh visual design expertise untuk Glassmorphism dan mobile-first patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Tasks 2, 3)
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Task 8 (final assembly butuh wireframes)
  - **Blocked By**: Tasks 2, 3 (butuh IA dan User Flow untuk inform wireframe structure)

  **References**:

  **Pattern References**:
  - `_bmad-output/planning-artifacts/prd.md:282-287` - FR19-FR22: Invisible UI (Glassmorphism) requirements
  - `_bmad-output/planning-artifacts/research/technical-text-to-image-generation-client-side-react-vite-research-2026-05-08.md:356-365` - Contextual UI (Invisible UI) patterns
  - Task 2 output: Information Architecture (3 entry points structure)
  - Task 3 output: User Flow (screen transitions)

  **External References**:
  - iOS Human Interface Guidelines: Touch targets (44x44px minimum)
  - Material Design: Mobile gestures (tap, long-press, swipe, pinch-zoom)
  - Glassmorphism design patterns: backdrop-blur, bg-opacity, frosted glass effect

  **WHY Each Reference Matters**:
  - PRD FR19-FR22: Defines Invisible UI behavior (toolbar only appears on object selection, Glassmorphism styling)
  - Technical Research Contextual UI: Patterns untuk contextual rendering dan Glassmorphism dengan OKLCH primitives
  - IA dan User Flow: Inform screen structure dan navigation between screens
  - iOS/Material Design guidelines: Ensure touch targets dan gestures follow platform conventions

  **Acceptance Criteria**:
  - [ ] Wireframes section exists: `grep -q "## Wireframes" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] 4 wireframes documented: `grep -c "### Wireframe:" _bmad-output/planning-artifacts/ux-design-specification.md` (expect 4)
  - [ ] Template Selection wireframe: `grep -q "Template Selection" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Canvas Editor wireframe: `grep -q "Canvas Editor" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Floating Toolbar wireframe: `grep -q "Floating Toolbar" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Export/Share wireframe: `grep -q "Export.*Share" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Touch targets annotated: `grep -q "44.*44\|touch target" _bmad-output/planning-artifacts/ux-design-specification.md`
  - [ ] Glassmorphism mentioned: `grep -q "Glassmorphism\|backdrop-blur" _bmad-output/planning-artifacts/ux-design-specification.md`

  **QA Scenarios**:

  ```
  Scenario: Wireframes Completeness
    Tool: grep + wc -l
    Preconditions: Tasks 2, 3 completed (IA dan User Flow documented)
    Steps:
      1. grep "## Wireframes" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Wireframes section exists"
      2. grep -c "### Wireframe:" _bmad-output/planning-artifacts/ux-design-specification.md (expect 4)
      3. grep -q "Template Selection" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Template Selection wireframe"
      4. grep -q "Canvas Editor" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Canvas Editor wireframe"
      5. grep -q "Floating Toolbar" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Floating Toolbar wireframe"
      6. grep -q "Export.*Share" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Export/Share wireframe"
    Expected Result: 4 wireframes documented (Template Selection, Canvas Editor, Floating Toolbar, Export/Share)
    Failure Indicators: Missing any of the 4 wireframes
    Evidence: .sisyphus/evidence/task-4-wireframes-completeness.txt

  Scenario: Mobile-First Compliance
    Tool: grep
    Preconditions: Wireframes section written
    Steps:
      1. grep -q "375.*667\|mobile\|portrait" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Mobile dimensions specified"
      2. grep -q "44.*44\|touch target" _bmad-output/planning-artifacts/ux-design-specification.md && echo "PASS: Touch targets annotated"
      3. grep -i "desktop" _bmad-output/planning-artifacts/ux-design-specification.md && echo "FAIL: Desktop wireframes found" || echo "PASS: No desktop wireframes"
    Expected Result: Mobile dimensions (375x667px), touch targets (44x44px), no desktop wireframes
    Failure Indicators: Desktop wireframes present, no mobile dimensions, no touch target annotations
    Evidence: .sisyphus/evidence/task-4-mobile-first-compliance.txt
  ```

  **Evidence to Capture**:
  - [ ] task-4-wireframes-completeness.txt
  - [ ] task-4-mobile-first-compliance.txt

  **Commit**: NO
