# Architecture Decision Document - BCA MyCore+

## TL;DR

> **Quick Summary**: Create comprehensive Architecture Decision Document for BCA MyCore+ Zero-Server image generation web app, covering technology stack decisions, component architecture, state management, memory management, accessibility, and performance optimization patterns.
>
> **Deliverables**:
>
> - Architecture Decision Document (`.sisyphus/output/architecture-decision-document.md`)
> - Technology evaluation reports (Fabric.js vs alternatives, Zustand vs alternatives)
> - Component architecture diagrams
> - State management flow diagrams
> - Memory management patterns documentation
> - Performance optimization strategy
> - Accessibility architecture specification
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Oracle Consultation → Technology Decisions → Component Architecture → Integration Patterns

---

## Context

### Original Request

User completed PRD and UX Design Specification, now needs Architecture Decision Document to guide implementation phase.

### Interview Summary

**Key Discussions**:

- User wants to proceed directly to architecture planning after PRD completion
- No additional consultation needed - straight to work plan generation

**Research Findings**:

- PRD defines 45 functional requirements (FR1-FR45)
- UX Design provides complete wireframes, interaction patterns, component specs
- Product Brief emphasizes Zero-Server, Clipboard-First, Invisible UI (Glassmorphism)
- Current codebase: React 19.2.5 + Vite 8.0.10 + TypeScript 6.0.3 + Tailwind CSS 4.2.4 + TanStack Router
- Missing: Fabric.js, ColorThief.js not yet installed

### Metis Review

**Identified Gaps** (addressed):

- Bundle size constraint (200KB) may be unrealistic with Fabric.js (~200KB alone) → Will validate and propose realistic budget
- Architecture scope unclear (all 45 requirements vs core only) → Will focus on core architecture, defer feature-specific patterns
- State management solution not confirmed (Zustand mentioned but not decided) → Will evaluate and document decision
- Zero-Server constraint implications need explicit documentation → Will address storage, offline, template library strategies
- Accessibility architecture underspecified for canvas-based UI → Will define screen reader, keyboard navigation patterns
- Clipboard API browser compatibility risks → Will define fallback strategies

---

## Work Objectives

### Core Objective

Create Architecture Decision Document that provides clear technical guidance for implementing BCA MyCore+ Zero-Server image generation web app, ensuring consistency across all implementation tasks.

### Concrete Deliverables

- Architecture Decision Document (markdown file in `.sisyphus/output/`)
- Technology evaluation reports (Fabric.js, ColorThief.js, state management)
- Component hierarchy diagrams
- State management architecture specification
- Memory management patterns documentation
- Performance optimization strategy
- Accessibility architecture specification
- Zero-Server constraint documentation

### Definition of Done

- [ ] Architecture document covers all critical decisions (technology, component, state, memory, accessibility, performance)
- [ ] Each major decision includes WHY rationale (not just WHAT)
- [ ] Bundle size validated against realistic budget (with Oracle consultation)
- [ ] Zero-Server constraints explicitly documented (storage, offline, templates)
- [ ] Accessibility architecture defined (WCAG 2.1 Level A compliance for canvas UI)
- [ ] All acceptance criteria are agent-executable (no manual verification)
- [ ] QA scenarios defined with specific commands and assertions

### Must Have

- Oracle consultation for technology trade-offs (Fabric.js vs alternatives, bundle size validation)
- Technology stack decisions (canvas library, state management, styling approach)
- Component architecture (hierarchy, responsibilities, communication patterns)
- State management architecture (global vs local, persistence, undo/redo)
- Memory management patterns (cleanup, disposal, leak prevention)
- Performance optimization strategy (code splitting, lazy loading, bundle analysis)
- Accessibility architecture (screen reader, keyboard navigation, WCAG compliance)
- Zero-Server constraint documentation (storage, offline, template library)

### Must NOT Have (Guardrails)

- Pseudo-code or implementation-level code examples (architecture = decisions + patterns, NOT code)
- Feature-specific implementation details (defer to implementation phase)
- Assumptions about Fabric.js without bundle size validation
- Manual verification acceptance criteria (all must be agent-executable)
- Architecture for all 45 PRD requirements without scope confirmation (focus on core architecture)
- Server-side capabilities assumptions (no backend, no API, no SSR)

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision

- **Infrastructure exists**: YES (Bun test runner available)
- **Automated tests**: Tests-after (architecture validation tests after document creation)
- **Framework**: Bun test
- **If TDD**: N/A (architecture documentation, not code implementation)

### QA Policy

Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Architecture Validation**: Use Bash commands (grep, find, du, bun commands)
- **Bundle Size Validation**: Use Bash (bun run build, du -sh dist/)
- **Zero-Server Validation**: Use Bash (grep for fetch/axios calls)
- **Type Safety Validation**: Use Bash (bun run type-check)
- **Dependency Validation**: Use Bash (grep package.json)

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.
> Target: 5-8 tasks per wave. Fewer than 3 per wave (except final) = under-splitting.

```
Wave 1 (Start Immediately - Oracle consultation + research):
├── Task 1: Oracle consultation - technology trade-offs [oracle]
├── Task 2: Librarian research - Fabric.js v6 bundle size + alternatives [librarian]
├── Task 3: Librarian research - State management solutions comparison [librarian]
├── Task 4: Librarian research - Canvas accessibility patterns [librarian]
└── Task 5: Explore current codebase - existing patterns and conventions [explore]

Wave 2 (After Wave 1 - core architecture decisions):
├── Task 6: Technology stack decisions (canvas library, state management) [deep]
├── Task 7: Bundle size budget validation and code-splitting strategy [deep]
├── Task 8: Zero-Server architecture constraints documentation [deep]
├── Task 9: Component architecture design (hierarchy, responsibilities) [deep]
├── Task 10: State management architecture specification [deep]
└── Task 11: Memory management patterns documentation [deep]

Wave 3 (After Wave 2 - specialized architectures):
├── Task 12: Performance optimization architecture [unspecified-high]
├── Task 13: Accessibility architecture specification [unspecified-high]
├── Task 14: Brand compliance architecture [unspecified-high]
├── Task 15: Mobile-first responsive design architecture [visual-engineering]
└── Task 16: Clipboard API integration architecture [unspecified-high]

Wave 4 (After Wave 3 - integration and validation):
├── Task 17: Integration patterns documentation [deep]
├── Task 18: Architecture validation tests [unspecified-high]
├── Task 19: Architecture document compilation and review [deep]
└── Task 20: Architecture acceptance criteria validation [unspecified-high]

Wave FINAL (After ALL tasks - 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Architecture quality review (unspecified-high)
├── Task F3: Architecture validation execution (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

Critical Path: Task 1 → Task 6 → Task 9 → Task 17 → Task 19 → F1-F4 → user okay
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 5 (Wave 1)

### Dependency Matrix

**Wave 1 (Independent - all can start immediately)**:

- Task 1: - → 6, 7, 8
- Task 2: - → 6, 7
- Task 3: - → 6, 10
- Task 4: - → 13
- Task 5: - → 9, 10, 11

**Wave 2 (Depends on Wave 1)**:

- Task 6: 1, 2, 3 → 9, 10, 12, 17
- Task 7: 1, 2 → 12, 17
- Task 8: 1 → 16, 17
- Task 9: 5, 6 → 17, 19
- Task 10: 3, 5, 6 → 11, 17, 19
- Task 11: 5, 10 → 12, 17, 19

**Wave 3 (Depends on Wave 2)**:

- Task 12: 6, 7, 11 → 17, 19
- Task 13: 4, 9 → 17, 19
- Task 14: 9 → 17, 19
- Task 15: 9 → 17, 19
- Task 16: 8 → 17, 19

**Wave 4 (Depends on Wave 3)**:

- Task 17: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 → 19, 20
- Task 18: 17 → 20
- Task 19: 9, 10, 11, 12, 13, 14, 15, 16, 17 → 20, F1-F4
- Task 20: 17, 18, 19 → F1-F4

**Wave FINAL (Depends on Wave 4)**:

- F1: 19, 20 → user okay
- F2: 19, 20 → user okay
- F3: 19, 20 → user okay
- F4: 19, 20 → user okay

### Agent Dispatch Summary

- **Wave 1**: 5 tasks - T1 → oracle, T2-T4 → librarian, T5 → explore
- **Wave 2**: 6 tasks - T6-T11 → deep
- **Wave 3**: 5 tasks - T12-T14,T16 → unspecified-high, T15 → visual-engineering
- **Wave 4**: 4 tasks - T17,T19 → deep, T18,T20 → unspecified-high
- **Wave FINAL**: 4 tasks - F1 → oracle, F2-F3 → unspecified-high, F4 → deep

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [x] 1. Oracle Consultation - Technology Trade-offs Analysis

  **What to do**:
  - Consult Oracle agent for architectural trade-off analysis
  - Analyze: Fabric.js v6 vs alternatives (Konva.js, PixiJS, native Canvas API)
  - Analyze: Bundle size constraint (200KB realistic? If not, what's realistic?)
  - Analyze: State management options (Zustand vs Jotai vs Valtio vs React Context)
  - Analyze: Code-splitting strategy to meet performance budget
  - Analyze: Zero-Server architecture risks (storage limits, offline capability)
  - Analyze: Canvas accessibility architecture (WCAG 2.1 Level A compliance)
  - Document: Options, trade-offs, recommendations with rationale

  **Must NOT do**:
  - Make final decisions without presenting options to user
  - Assume Fabric.js without validating bundle size impact
  - Ignore Zero-Server constraint implications

  **Recommended Agent Profile**:
  - **Category**: `oracle`
    - Reason: High-IQ reasoning specialist for debugging hard problems and architecture design trade-offs
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A (Oracle consultation doesn't require additional skills)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: Tasks 6, 7, 8 (technology decisions depend on Oracle analysis)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  **Context References**:
  - `_bmad-output/planning-artifacts/prd.md` - 45 functional requirements, technical constraints
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Component specs, interaction patterns
  - `_bmad-output/planning-artifacts/product-brief-bca-mycoreplus.md` - Zero-Server, Clipboard-First, Invisible UI

  **Technical Constraints**:
  - Bundle budget: < 200KB gzipped (aggressive constraint)
  - Performance: TTI < 2s, Peak memory < 500MB
  - Zero-Server: 100% client-side, no backend, no API calls
  - Mobile-first: 375×667px baseline, touch-optimized

  **WHY This Reference Matters**:
  - Oracle needs full context to provide trade-off analysis
  - Bundle size constraint is critical - Fabric.js alone is ~200KB
  - Zero-Server constraint affects technology choices (no server-side rendering, no backend storage)

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Oracle consultation output saved to `.sisyphus/evidence/task-1-oracle-consultation.md`
  - [ ] Output contains technology recommendations with rationale
  - [ ] Output addresses all 6 analysis points (Fabric.js, bundle size, state management, code-splitting, Zero-Server, accessibility)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Oracle consultation produces comprehensive analysis
    Tool: Bash (file validation)
    Preconditions: Oracle agent invoked with full context
    Steps:
      1. Check output file exists: test -f .sisyphus/evidence/task-1-oracle-consultation.md
      2. Validate content has technology recommendations: grep -q "Fabric.js" .sisyphus/evidence/task-1-oracle-consultation.md
      3. Validate content has bundle size analysis: grep -q "bundle" .sisyphus/evidence/task-1-oracle-consultation.md
      4. Validate content has state management analysis: grep -q "state management" .sisyphus/evidence/task-1-oracle-consultation.md
    Expected Result: All grep commands return 0 (found)
    Failure Indicators: File missing, content incomplete
    Evidence: .sisyphus/evidence/task-1-oracle-consultation.md

  Scenario: Oracle recommendations include trade-off analysis
    Tool: Bash (content validation)
    Preconditions: Oracle consultation complete
    Steps:
      1. Check for trade-offs section: grep -i "trade-off\|pros\|cons" .sisyphus/evidence/task-1-oracle-consultation.md
      2. Check for recommendations: grep -i "recommend" .sisyphus/evidence/task-1-oracle-consultation.md
      3. Validate rationale provided: grep -i "because\|rationale\|reason" .sisyphus/evidence/task-1-oracle-consultation.md
    Expected Result: All patterns found (trade-offs, recommendations, rationale)
    Evidence: .sisyphus/evidence/task-1-oracle-consultation-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Oracle consultation output: task-1-oracle-consultation.md
  - [ ] Validation results: task-1-oracle-consultation-validation.txt

  **Commit**: NO (research only, no code changes)

- [x] 2. Librarian Research - Fabric.js v6 Bundle Size + Alternatives

  **What to do**:
  - Research Fabric.js v6 official documentation for bundle size (minified + gzipped)
  - Research alternatives: Konva.js, PixiJS, native Canvas API
  - Compare bundle sizes, features, performance, accessibility support
  - Find production examples of each library in OSS projects
  - Document findings with specific numbers and sources

  **Must NOT do**:
  - Make recommendations without data (Oracle does that)
  - Include tutorial content (production patterns only)
  - Assume bundle size without verification

  **Recommended Agent Profile**:
  - **Category**: `librarian`
    - Reason: Specialized for searching remote codebases, official documentation, and OSS examples
  - **Skills**: []
  - **Skills Evaluated but Omitted**: N/A

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: Tasks 6, 7 (technology decisions depend on research)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Research Targets**:
  - Fabric.js v6 official docs: https://fabricjs.com/
  - Konva.js docs: https://konvajs.org/
  - PixiJS docs: https://pixijs.com/
  - GitHub repos: Search for production usage (1000+ stars)

  **WHY This Reference Matters**:
  - Bundle size is critical constraint (< 200KB total)
  - Need accurate data for Oracle to make recommendations
  - Production examples show real-world trade-offs

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Research output saved to `.sisyphus/evidence/task-2-fabricjs-research.md`
  - [ ] Output contains bundle size numbers for all libraries
  - [ ] Output contains at least 2 production examples per library

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Research produces bundle size data
    Tool: Bash (file validation)
    Preconditions: Librarian research complete
    Steps:
      1. Check output file exists: test -f .sisyphus/evidence/task-2-fabricjs-research.md
      2. Validate Fabric.js bundle size mentioned: grep -i "fabric.*kb\|fabric.*size" .sisyphus/evidence/task-2-fabricjs-research.md
      3. Validate alternatives mentioned: grep -i "konva\|pixi\|canvas api" .sisyphus/evidence/task-2-fabricjs-research.md
      4. Validate production examples: grep -i "github\|example\|production" .sisyphus/evidence/task-2-fabricjs-research.md
    Expected Result: All patterns found
    Failure Indicators: Missing bundle size data, no alternatives, no examples
    Evidence: .sisyphus/evidence/task-2-fabricjs-research.md
  ```

  **Evidence to Capture**:
  - [ ] Research output: task-2-fabricjs-research.md

  **Commit**: NO (research only)

- [x] 3. Librarian Research - State Management Solutions Comparison

  **What to do**:
  - Research Zustand official documentation (API, patterns, bundle size)
  - Research alternatives: Jotai, Valtio, React Context + useReducer
  - Compare: bundle size, React 19 compatibility, TypeScript support, devtools
  - Find production examples of canvas + React state synchronization
  - Document findings with specific comparisons

  **Must NOT do**:
  - Make final decision (Oracle does that)
  - Include beginner tutorials (production patterns only)

  **Recommended Agent Profile**:
  - **Category**: `librarian`
    - Reason: Specialized for official documentation and OSS examples
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: Tasks 6, 10 (state management decisions)
  - **Blocked By**: None

  **References**:

  **Research Targets**:
  - Zustand: https://github.com/pmndrs/zustand
  - Jotai: https://jotai.org/
  - Valtio: https://github.com/pmndrs/valtio
  - React 19 state patterns: Official React docs

  **WHY This Reference Matters**:
  - State management is foundational architecture decision
  - Canvas + React state sync is complex (Fabric.js state vs React state)
  - Need production patterns, not tutorials

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Research output saved to `.sisyphus/evidence/task-3-state-management-research.md`
  - [ ] Output compares at least 3 solutions (Zustand, Jotai, Valtio)
  - [ ] Output includes bundle size comparison

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Research compares state management solutions
    Tool: Bash (file validation)
    Preconditions: Librarian research complete
    Steps:
      1. Check output exists: test -f .sisyphus/evidence/task-3-state-management-research.md
      2. Validate Zustand mentioned: grep -i "zustand" .sisyphus/evidence/task-3-state-management-research.md
      3. Validate alternatives: grep -i "jotai\|valtio" .sisyphus/evidence/task-3-state-management-research.md
      4. Validate bundle size comparison: grep -i "bundle\|size\|kb" .sisyphus/evidence/task-3-state-management-research.md
    Expected Result: All solutions compared with bundle sizes
    Evidence: .sisyphus/evidence/task-3-state-management-research.md
  ```

  **Evidence to Capture**:
  - [ ] Research output: task-3-state-management-research.md

  **Commit**: NO

- [x] 4. Librarian Research - Canvas Accessibility Patterns

  **What to do**:
  - Research WCAG 2.1 Level A compliance for canvas-based UIs
  - Research screen reader strategies for canvas content (ARIA labels, live regions)
  - Research keyboard navigation patterns for canvas editors
  - Find production examples of accessible canvas applications
  - Document patterns with specific techniques

  **Must NOT do**:
  - Claim full WCAG compliance without manual testing caveat
  - Include theoretical patterns without production examples

  **Recommended Agent Profile**:
  - **Category**: `librarian`
    - Reason: Specialized for official documentation (W3C WCAG) and OSS examples
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 5)
  - **Blocks**: Task 13 (accessibility architecture)
  - **Blocked By**: None

  **References**:

  **Research Targets**:
  - WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
  - Canvas accessibility: W3C techniques
  - Production examples: Accessible canvas editors (Figma, Canva alternatives)

  **WHY This Reference Matters**:
  - Canvas accessibility is notoriously difficult
  - Need proven patterns, not theoretical approaches
  - WCAG Level A is minimum, need specific techniques

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Research output saved to `.sisyphus/evidence/task-4-accessibility-research.md`
  - [ ] Output includes WCAG 2.1 Level A requirements for canvas
  - [ ] Output includes at least 2 production examples

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Research provides accessibility patterns
    Tool: Bash (file validation)
    Preconditions: Librarian research complete
    Steps:
      1. Check output exists: test -f .sisyphus/evidence/task-4-accessibility-research.md
      2. Validate WCAG mentioned: grep -i "wcag" .sisyphus/evidence/task-4-accessibility-research.md
      3. Validate screen reader patterns: grep -i "screen reader\|aria" .sisyphus/evidence/task-4-accessibility-research.md
      4. Validate keyboard navigation: grep -i "keyboard" .sisyphus/evidence/task-4-accessibility-research.md
    Expected Result: All accessibility aspects covered
    Evidence: .sisyphus/evidence/task-4-accessibility-research.md
  ```

  **Evidence to Capture**:
  - [ ] Research output: task-4-accessibility-research.md

  **Commit**: NO

- [x] 5. Explore Current Codebase - Existing Patterns and Conventions

  **What to do**:
  - Explore current codebase structure (src/ directory layout)
  - Find existing React 19 patterns (Server Components, Suspense usage)
  - Find existing TypeScript patterns (type definitions, interfaces)
  - Find existing Tailwind CSS patterns (utility classes, custom config)
  - Find existing TanStack Router patterns (file-based routing, route structure)
  - Document findings with file paths and code examples

  **Must NOT do**:
  - Modify any files (read-only exploration)
  - Make assumptions about patterns not found in codebase

  **Recommended Agent Profile**:
  - **Category**: `explore`
    - Reason: Contextual grep for codebases, specialized in finding patterns
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3, 4)
  - **Blocks**: Tasks 9, 10, 11 (component and state architecture)
  - **Blocked By**: None

  **References**:

  **Codebase Targets**:
  - `src/` directory structure
  - `src/routes/` - TanStack Router patterns
  - `src/components/` - React component patterns (if exists)
  - `tailwind.config.js` - Tailwind customization
  - `tsconfig.json` - TypeScript configuration

  **WHY This Reference Matters**:
  - Architecture must follow existing codebase conventions
  - Avoid introducing conflicting patterns
  - Leverage existing infrastructure (routing, styling, types)

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Exploration output saved to `.sisyphus/evidence/task-5-codebase-exploration.md`
  - [ ] Output documents directory structure
  - [ ] Output includes existing patterns with file paths

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Exploration documents existing patterns
    Tool: Bash (file validation)
    Preconditions: Explore agent complete
    Steps:
      1. Check output exists: test -f .sisyphus/evidence/task-5-codebase-exploration.md
      2. Validate directory structure documented: grep -i "src/\|directory" .sisyphus/evidence/task-5-codebase-exploration.md
      3. Validate React patterns found: grep -i "react\|component" .sisyphus/evidence/task-5-codebase-exploration.md
      4. Validate routing patterns: grep -i "router\|route" .sisyphus/evidence/task-5-codebase-exploration.md
    Expected Result: Codebase patterns documented with file paths
    Evidence: .sisyphus/evidence/task-5-codebase-exploration.md
  ```

  **Evidence to Capture**:
  - [ ] Exploration output: task-5-codebase-exploration.md

  **Commit**: NO

- [x] 6. Technology Stack Decisions (Canvas Library, State Management)

  **What to do**:
  - Review Oracle consultation findings (Task 1)
  - Review Librarian research (Tasks 2, 3)
  - Make final technology decisions with rationale:
    - Canvas library: Fabric.js v6 vs alternatives (document WHY)
    - State management: Zustand vs alternatives (document WHY)
    - Bundle size budget: Validate 200KB or propose realistic alternative
  - Document trade-offs for each decision
  - Create "Technology Stack Decisions" section in architecture document

  **Must NOT do**:
  - Make decisions without reviewing research findings
  - Omit WHY rationale for decisions
  - Assume technologies without bundle size validation

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Goal-oriented autonomous problem-solving, thorough research before action
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10, 11)
  - **Blocks**: Tasks 9, 10, 12, 17 (component and integration architecture depend on tech stack)
  - **Blocked By**: Tasks 1, 2, 3 (Oracle consultation and research)

  **References**:

  **Input Documents**:
  - `.sisyphus/evidence/task-1-oracle-consultation.md` - Oracle recommendations
  - `.sisyphus/evidence/task-2-fabricjs-research.md` - Canvas library research
  - `.sisyphus/evidence/task-3-state-management-research.md` - State management research

  **WHY This Reference Matters**:
  - Decisions must be based on research findings, not assumptions
  - Oracle provides trade-off analysis, research provides data
  - Bundle size constraint is critical - must validate against research

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Technology decisions documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section "Technology Stack Decisions" exists: `grep -q "## Technology Stack Decisions" .sisyphus/output/architecture-decision-document.md`
  - [ ] Canvas library decision documented: `grep -q "Fabric.js\|Konva\|PixiJS" .sisyphus/output/architecture-decision-document.md`
  - [ ] State management decision documented: `grep -q "Zustand\|Jotai\|Valtio" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Technology decisions include WHY rationale
    Tool: Bash (content validation)
    Preconditions: Technology decisions documented
    Steps:
      1. Check section exists: grep -q "## Technology Stack Decisions" .sisyphus/output/architecture-decision-document.md
      2. Validate rationale provided: grep -i "because\|rationale\|reason\|why" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate trade-offs documented: grep -i "trade-off\|pros\|cons" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate bundle size addressed: grep -i "bundle.*size\|200kb" .sisyphus/output/architecture-decision-document.md
    Expected Result: Rationale count > 2, trade-offs count > 1, bundle size mentioned
    Failure Indicators: No rationale, no trade-offs, bundle size ignored
    Evidence: .sisyphus/evidence/task-6-technology-decisions-validation.txt

  Scenario: Decisions reference research findings
    Tool: Bash (cross-reference validation)
    Preconditions: Technology decisions documented
    Steps:
      1. Extract canvas library decision: grep -A 10 "Canvas Library" .sisyphus/output/architecture-decision-document.md > /tmp/canvas-decision.txt
      2. Check if references research: grep -i "research\|oracle\|librarian" /tmp/canvas-decision.txt
      3. Extract state management decision: grep -A 10 "State Management" .sisyphus/output/architecture-decision-document.md > /tmp/state-decision.txt
      4. Check if references research: grep -i "research\|oracle\|librarian" /tmp/state-decision.txt
    Expected Result: Both decisions reference research findings
    Evidence: .sisyphus/evidence/task-6-research-references.txt
  ```

  **Evidence to Capture**:
  - [ ] Technology decisions validation: task-6-technology-decisions-validation.txt
  - [ ] Research references check: task-6-research-references.txt

  **Commit**: YES
  - Message: `docs(architecture): add technology stack decisions`
  - Files: `.sisyphus/output/architecture-decision-document.md`
  - Pre-commit: `grep -q "## Technology Stack Decisions" .sisyphus/output/architecture-decision-document.md`

- [x] 7. Bundle Size Budget Validation and Code-Splitting Strategy

  **What to do**:
  - Validate 200KB bundle budget against Fabric.js + dependencies (from Task 2 research)
  - If 200KB unrealistic, propose realistic budget with justification
  - Design code-splitting strategy:
    - Route-based splitting (TanStack Router lazy loading)
    - Component-based splitting (lazy load Fabric.js canvas editor)
    - Feature-based splitting (lazy load ColorThief.js)
  - Define bundle analysis strategy (webpack-bundle-analyzer or vite-bundle-visualizer)
  - Create "Bundle Size Budget & Code-Splitting" section in architecture document

  **Must NOT do**:
  - Accept 200KB budget without validation
  - Design code-splitting without considering TanStack Router patterns
  - Omit bundle analysis strategy

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of bundling, code-splitting, and performance optimization
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10, 11)
  - **Blocks**: Tasks 12, 17 (performance optimization and integration)
  - **Blocked By**: Tasks 1, 2 (Oracle consultation and Fabric.js research)

  **References**:

  **Input Documents**:
  - `.sisyphus/evidence/task-1-oracle-consultation.md` - Bundle size recommendations
  - `.sisyphus/evidence/task-2-fabricjs-research.md` - Fabric.js bundle size data
  - `vite.config.ts` - Existing Vite configuration

  **WHY This Reference Matters**:
  - Bundle size is critical performance constraint
  - Code-splitting strategy must align with TanStack Router
  - Realistic budget prevents implementation surprises

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Bundle strategy documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "Bundle Size Budget" .sisyphus/output/architecture-decision-document.md`
  - [ ] Code-splitting strategy defined: `grep -q "code-splitting\|lazy load" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Bundle budget validated against research
    Tool: Bash (content validation)
    Preconditions: Bundle strategy documented
    Steps:
      1. Check section exists: grep -q "Bundle Size Budget" .sisyphus/output/architecture-decision-document.md
      2. Validate budget number mentioned: grep -E "[0-9]+KB|[0-9]+MB" .sisyphus/output/architecture-decision-document.md
      3. Validate Fabric.js size referenced: grep -i "fabric.*[0-9]+kb" .sisyphus/output/architecture-decision-document.md
      4. Validate code-splitting strategy: grep -i "lazy\|dynamic import\|code-split" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Budget number present, Fabric.js size referenced, code-splitting count > 2
    Evidence: .sisyphus/evidence/task-7-bundle-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Bundle validation: task-7-bundle-validation.txt

  **Commit**: YES (grouped with Task 6)

- [x] 8. Zero-Server Architecture Constraints Documentation

  **What to do**:
  - Document Zero-Server constraint implications:
    - No backend API calls (validate with grep for fetch/axios)
    - No server-side rendering (pure client-side SPA)
    - No server-side storage (all data in browser)
  - Define storage strategy:
    - Template library: Bundled JSON vs CDN vs lazy-loaded
    - User preferences: localStorage vs IndexedDB
    - Undo/redo history: In-memory only (no persistence)
  - Define offline capability strategy (Service Worker, cache strategy)
  - Address storage quota limits (localStorage 5-10MB, IndexedDB ~50MB)
  - Create "Zero-Server Architecture Constraints" section in architecture document

  **Must NOT do**:
  - Assume server-side capabilities
  - Ignore storage quota limits
  - Omit offline strategy

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of browser storage, offline capabilities, and constraints
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10, 11)
  - **Blocks**: Tasks 16, 17 (Clipboard API and integration)
  - **Blocked By**: Task 1 (Oracle consultation)

  **References**:

  **Input Documents**:
  - `.sisyphus/evidence/task-1-oracle-consultation.md` - Zero-Server risks analysis
  - `_bmad-output/planning-artifacts/prd.md` - Zero-Server requirements (FR27-FR30)

  **WHY This Reference Matters**:
  - Zero-Server is fundamental constraint affecting all architecture decisions
  - Storage limits are real browser constraints
  - Offline capability affects user experience

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Zero-Server constraints documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "Zero-Server" .sisyphus/output/architecture-decision-document.md`
  - [ ] Storage strategy defined: `grep -q "localStorage\|IndexedDB" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Zero-Server constraints explicitly documented
    Tool: Bash (content validation)
    Preconditions: Zero-Server section documented
    Steps:
      1. Check section exists: grep -q "Zero-Server" .sisyphus/output/architecture-decision-document.md
      2. Validate no backend mentioned: grep -i "no backend\|no server\|client-side" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate storage strategy: grep -i "localStorage\|IndexedDB\|storage" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate offline strategy: grep -i "offline\|service worker\|cache" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: No backend count > 1, storage count > 2, offline count > 1
    Evidence: .sisyphus/evidence/task-8-zero-server-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Zero-Server validation: task-8-zero-server-validation.txt

  **Commit**: YES (grouped with Task 6)

- [x] 9. Component Architecture Design (Hierarchy, Responsibilities)

  **What to do**:
  - Design component hierarchy based on UX Design Specification
  - Define component responsibilities:
    - CanvasEditor: Fabric.js canvas management, object manipulation
    - FloatingToolbar: Context-sensitive toolbar, Glassmorphism UI
    - TemplateLibrary: Template selection, preview
    - ColorPicker: Color selection, ColorThief.js integration
    - ExportShare: PNG export, Clipboard API, WhatsApp sharing
  - Define component communication patterns (props, context, state management)
  - Define mobile vs desktop component variations
  - Create component hierarchy diagram (ASCII or Mermaid)
  - Create "Component Architecture" section in architecture document

  **Must NOT do**:
  - Design components for features beyond confirmed scope
  - Include implementation-level code (architecture-level only)
  - Ignore existing codebase patterns (from Task 5)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of React architecture, component design, and state flow
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10, 11)
  - **Blocks**: Tasks 17, 19 (integration patterns and document compilation)
  - **Blocked By**: Tasks 5, 6 (codebase exploration and technology decisions)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Component specs (lines 380-528)
  - `.sisyphus/evidence/task-5-codebase-exploration.md` - Existing React patterns
  - `.sisyphus/evidence/task-6-technology-decisions.md` - Technology stack decisions

  **WHY This Reference Matters**:
  - UX spec defines component requirements and interactions
  - Existing codebase patterns must be followed for consistency
  - Technology decisions affect component design (Fabric.js integration, state management)

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Component architecture documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Component Architecture" .sisyphus/output/architecture-decision-document.md`
  - [ ] Component hierarchy diagram present: `grep -q "CanvasEditor\|FloatingToolbar\|TemplateLibrary" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Component architecture defines hierarchy and responsibilities
    Tool: Bash (content validation)
    Preconditions: Component architecture documented
    Steps:
      1. Check section exists: grep -q "## Component Architecture" .sisyphus/output/architecture-decision-document.md
      2. Validate components listed: grep -E "CanvasEditor|FloatingToolbar|TemplateLibrary|ColorPicker|ExportShare" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate responsibilities defined: grep -i "responsibility\|manages\|handles" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate communication patterns: grep -i "props\|context\|state" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Components count >= 5, responsibilities count > 3, communication count > 2
    Evidence: .sisyphus/evidence/task-9-component-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Component validation: task-9-component-validation.txt

  **Commit**: YES
  - Message: `docs(architecture): add component architecture`
  - Files: `.sisyphus/output/architecture-decision-document.md`

- [x] 10. State Management Architecture Specification

  **What to do**:
  - Define state management architecture based on Task 6 decision (Zustand/alternative)
  - Define state scope:
    - Global state: Canvas state, template library, user preferences
    - Local state: UI interactions, form inputs, toolbar visibility
  - Define state synchronization between Fabric.js canvas and React state
  - Define persistence strategy (localStorage, IndexedDB, sessionStorage)
  - Define undo/redo implementation approach (history stack, memory limits)
  - Create state flow diagram (ASCII or Mermaid)
  - Create "State Management Architecture" section in architecture document

  **Must NOT do**:
  - Include implementation-level code (architecture patterns only)
  - Design state without considering Fabric.js integration
  - Ignore memory constraints for undo/redo history

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of state management, React patterns, and Fabric.js integration
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9, 11)
  - **Blocks**: Tasks 11, 17, 19 (memory management and integration)
  - **Blocked By**: Tasks 3, 5, 6 (state management research, codebase exploration, technology decisions)

  **References**:

  **Input Documents**:
  - `.sisyphus/evidence/task-3-state-management-research.md` - State management research
  - `.sisyphus/evidence/task-6-technology-decisions.md` - State management decision
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - State requirements (lines 536-537)

  **WHY This Reference Matters**:
  - State management is foundational for React + Fabric.js integration
  - Undo/redo requires careful state architecture
  - Persistence strategy affects user experience

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] State management documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## State Management" .sisyphus/output/architecture-decision-document.md`
  - [ ] State scope defined: `grep -q "global state\|local state" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: State management architecture defines scope and patterns
    Tool: Bash (content validation)
    Preconditions: State management documented
    Steps:
      1. Check section exists: grep -q "## State Management" .sisyphus/output/architecture-decision-document.md
      2. Validate state scope: grep -i "global\|local" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate Fabric.js sync: grep -i "fabric.*state\|canvas.*state" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate undo/redo: grep -i "undo\|redo\|history" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Scope count > 2, Fabric sync count > 1, undo/redo count > 1
    Evidence: .sisyphus/evidence/task-10-state-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] State validation: task-10-state-validation.txt

  **Commit**: YES (grouped with Task 9)

- [x] 11. Memory Management Patterns Documentation

  **What to do**:
  - Define memory management principles for Zero-Server architecture
  - Document Fabric.js cleanup patterns:
    - `canvas.dispose()` in useEffect cleanup
    - Object disposal when removed from canvas
  - Document image URL cleanup:
    - `URL.revokeObjectURL()` after image loaded
    - `bitmap.close()` after canvas export
  - Document memory profiling strategy (Chrome DevTools, heap snapshots)
  - Document memory leak detection approach (development vs production)
  - Define memory budget (peak < 500MB per PRD NFR4)
  - Create "Memory Management Patterns" section in architecture document

  **Must NOT do**:
  - Include line-by-line cleanup code (architecture patterns only)
  - Ignore memory constraints (500MB peak)
  - Omit memory profiling strategy

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of browser memory management, Fabric.js lifecycle, and performance profiling
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9, 10)
  - **Blocks**: Tasks 12, 17, 19 (performance optimization and integration)
  - **Blocked By**: Tasks 5, 10 (codebase exploration and state management)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/prd.md` - Memory requirements (NFR4: peak < 500MB)
  - `.sisyphus/evidence/task-5-codebase-exploration.md` - Existing cleanup patterns

  **WHY This Reference Matters**:
  - Memory leaks are critical in Zero-Server architecture (no page refresh)
  - Fabric.js canvas can consume significant memory
  - 500MB peak is aggressive constraint for mobile browsers

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Memory management documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Memory Management" .sisyphus/output/architecture-decision-document.md`
  - [ ] Cleanup patterns defined: `grep -q "dispose\|revokeObjectURL\|cleanup" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Memory management patterns documented
    Tool: Bash (content validation)
    Preconditions: Memory management documented
    Steps:
      1. Check section exists: grep -q "## Memory Management" .sisyphus/output/architecture-decision-document.md
      2. Validate Fabric.js cleanup: grep -i "canvas.dispose\|dispose" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate URL cleanup: grep -i "revokeObjectURL" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate memory budget: grep -i "500MB\|memory.*budget" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Fabric cleanup count > 1, URL cleanup count > 0, budget count > 0
    Evidence: .sisyphus/evidence/task-11-memory-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Memory validation: task-11-memory-validation.txt

  **Commit**: YES (grouped with Task 9)

- [x] 12. Performance Optimization Architecture

  **What to do**:
  - Define performance budget enforcement strategy (CI checks, bundle analysis)
  - Define code-splitting boundaries (route-based, component-based, feature-based)
  - Define lazy-loading strategy (Fabric.js, ColorThief.js, templates)
  - Define TTI optimization strategy (critical path, render-blocking resources)
  - Address mobile performance constraints (lower-end devices, slow networks)
  - Define performance monitoring strategy (Web Vitals, Lighthouse CI)
  - Create "Performance Optimization Architecture" section in architecture document

  **Must NOT do**:
  - Include implementation-level optimization code
  - Ignore mobile performance constraints
  - Omit performance monitoring strategy

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring performance expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 13, 14, 15, 16)
  - **Blocks**: Tasks 17, 19 (integration and document compilation)
  - **Blocked By**: Tasks 6, 7, 11 (technology decisions, bundle strategy, memory management)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/prd.md` - Performance requirements (NFR1-NFR6)
  - `.sisyphus/evidence/task-7-bundle-validation.txt` - Bundle strategy
  - `.sisyphus/evidence/task-11-memory-validation.txt` - Memory management

  **WHY This Reference Matters**:
  - Performance is critical for mobile-first Zero-Server app
  - TTI < 2s is aggressive constraint
  - Bundle size and memory management affect performance

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Performance architecture documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Performance" .sisyphus/output/architecture-decision-document.md`
  - [ ] TTI strategy defined: `grep -q "TTI\|Time to Interactive" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Performance optimization architecture defined
    Tool: Bash (content validation)
    Preconditions: Performance section documented
    Steps:
      1. Check section exists: grep -q "## Performance" .sisyphus/output/architecture-decision-document.md
      2. Validate TTI strategy: grep -i "tti\|time to interactive" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate lazy loading: grep -i "lazy\|dynamic import" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate monitoring: grep -i "lighthouse\|web vitals\|monitoring" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: TTI count > 0, lazy loading count > 1, monitoring count > 0
    Evidence: .sisyphus/evidence/task-12-performance-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Performance validation: task-12-performance-validation.txt

  **Commit**: YES
  - Message: `docs(architecture): add performance optimization architecture`
  - Files: `.sisyphus/output/architecture-decision-document.md`

- [x] 13. Accessibility Architecture Specification

  **What to do**:
  - Define screen reader strategy for canvas content (ARIA labels, live regions, alternative text)
  - Define keyboard navigation patterns (focus management, shortcuts, tab order)
  - Address WCAG 2.1 Level A compliance for canvas-based UI
  - Define focus management for floating toolbar
  - Define color contrast validation strategy (ColorThief.js integration)
  - Include manual testing caveat (automated tools insufficient for canvas)
  - Create "Accessibility Architecture" section in architecture document

  **Must NOT do**:
  - Claim full WCAG compliance without manual testing caveat
  - Include implementation-level accessibility code
  - Ignore canvas-specific accessibility challenges

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring accessibility expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 14, 15, 16)
  - **Blocks**: Tasks 17, 19 (integration and document compilation)
  - **Blocked By**: Tasks 4, 9 (accessibility research, component architecture)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/prd.md` - Accessibility requirements (NFR13-NFR17)
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Accessibility specs (lines 599-665)
  - `.sisyphus/evidence/task-4-accessibility-research.md` - Accessibility patterns research

  **WHY This Reference Matters**:
  - Canvas accessibility is notoriously difficult
  - WCAG 2.1 Level A is minimum requirement
  - UX spec provides detailed accessibility requirements

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Accessibility architecture documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Accessibility" .sisyphus/output/architecture-decision-document.md`
  - [ ] WCAG compliance addressed: `grep -q "WCAG" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Accessibility architecture addresses canvas challenges
    Tool: Bash (content validation)
    Preconditions: Accessibility section documented
    Steps:
      1. Check section exists: grep -q "## Accessibility" .sisyphus/output/architecture-decision-document.md
      2. Validate WCAG mentioned: grep -i "wcag" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate screen reader strategy: grep -i "screen reader\|aria" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate keyboard navigation: grep -i "keyboard" .sisyphus/output/architecture-decision-document.md | wc -l
      5. Validate manual testing caveat: grep -i "manual.*test\|testing.*required" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: WCAG count > 0, screen reader count > 1, keyboard count > 1, manual test count > 0
    Evidence: .sisyphus/evidence/task-13-accessibility-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Accessibility validation: task-13-accessibility-validation.txt

  **Commit**: YES (grouped with Task 12)

- [x] 14. Brand Compliance Architecture

  **What to do**:
  - Define BCA brand color enforcement (color constants, validation)
  - Define Safe Zone validation architecture (template validation, runtime checks)
  - Define template validation rules (brand compliance, accessibility, performance)
  - Define Glassmorphism UI implementation patterns (backdrop-blur, bg-opacity)
  - Define "Reset to BCA Brand" functionality architecture
  - Create "Brand Compliance Architecture" section in architecture document

  **Must NOT do**:
  - Implement validation logic (architecture patterns only)
  - Ignore brand color accessibility (contrast ratios)
  - Omit template validation strategy

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring brand and design system expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 15, 16)
  - **Blocks**: Tasks 17, 19 (integration and document compilation)
  - **Blocked By**: Task 9 (component architecture)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/prd.md` - Brand compliance requirements (FR23-FR26)
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Brand colors (lines 560-567)
  - `_bmad-output/planning-artifacts/product-brief-bca-mycoreplus.md` - Brand compliance section

  **WHY This Reference Matters**:
  - Brand compliance is critical for BCA internal application
  - Glassmorphism UI is key differentiator
  - Safe Zone validation prevents brand violations

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Brand compliance documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Brand Compliance" .sisyphus/output/architecture-decision-document.md`
  - [ ] BCA colors defined: `grep -q "#C8A96A\|#0B1F3A\|#1E3A5F" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Brand compliance architecture defines validation
    Tool: Bash (content validation)
    Preconditions: Brand compliance section documented
    Steps:
      1. Check section exists: grep -q "## Brand Compliance" .sisyphus/output/architecture-decision-document.md
      2. Validate BCA colors: grep -E "#C8A96A|#0B1F3A|#1E3A5F" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate Safe Zone: grep -i "safe zone" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate Glassmorphism: grep -i "glassmorphism\|backdrop-blur" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: BCA colors count >= 3, Safe Zone count > 0, Glassmorphism count > 0
    Evidence: .sisyphus/evidence/task-14-brand-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Brand validation: task-14-brand-validation.txt

  **Commit**: YES (grouped with Task 12)

- [x] 15. Mobile-First Responsive Design Architecture

  **What to do**:
  - Define mobile-first design strategy (375×667px baseline, scale up)
  - Define touch gesture patterns (tap, long-press, pinch-zoom, drag)
  - Define responsive breakpoints (mobile, tablet, desktop)
  - Define component variations for mobile vs desktop
  - Define touch target sizes (44×44px iOS, 48×48dp Android)
  - Define viewport configuration and meta tags
  - Create "Mobile-First Responsive Design" section in architecture document

  **Must NOT do**:
  - Design desktop-first patterns
  - Ignore touch gesture requirements
  - Omit touch target size guidelines

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Frontend, UI/UX, design, styling expertise required
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14, 16)
  - **Blocks**: Tasks 17, 19 (integration and document compilation)
  - **Blocked By**: Task 9 (component architecture)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Mobile-first design (lines 27-34, 192-304)
  - `_bmad-output/planning-artifacts/prd.md` - Mobile browser requirements (NFR31-NFR34)

  **WHY This Reference Matters**:
  - Mobile-first is critical for staf BCA (field workers)
  - Touch gestures are primary interaction method
  - UX spec provides detailed mobile wireframes and interactions

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Mobile-first architecture documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Mobile-First" .sisyphus/output/architecture-decision-document.md`
  - [ ] Touch gestures defined: `grep -q "touch\|gesture" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Mobile-first architecture defines responsive strategy
    Tool: Bash (content validation)
    Preconditions: Mobile-first section documented
    Steps:
      1. Check section exists: grep -q "## Mobile-First" .sisyphus/output/architecture-decision-document.md
      2. Validate baseline viewport: grep -i "375.*667\|baseline" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate touch gestures: grep -i "tap\|pinch\|drag\|gesture" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate touch targets: grep -i "44.*44\|48.*48\|touch target" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Baseline count > 0, gestures count > 2, touch targets count > 0
    Evidence: .sisyphus/evidence/task-15-mobile-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Mobile validation: task-15-mobile-validation.txt

  **Commit**: YES (grouped with Task 12)

- [x] 16. Clipboard API Integration Architecture

  **What to do**:
  - Define Clipboard API integration strategy (navigator.clipboard.write)
  - Define browser compatibility handling (HTTPS requirement, permission prompts)
  - Define iOS Safari workarounds (Clipboard API limitations)
  - Define fallback strategy when Clipboard API unavailable (download link)
  - Define error handling for permission denials
  - Define WhatsApp sharing integration (wa.me link)
  - Create "Clipboard API Integration" section in architecture document

  **Must NOT do**:
  - Assume Clipboard API works everywhere (browser compatibility issues)
  - Ignore iOS Safari limitations
  - Omit fallback strategy

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring browser API expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14, 15)
  - **Blocks**: Tasks 17, 19 (integration and document compilation)
  - **Blocked By**: Task 8 (Zero-Server constraints)

  **References**:

  **Input Documents**:
  - `_bmad-output/planning-artifacts/prd.md` - Clipboard-First requirements (FR15-FR18)
  - `_bmad-output/planning-artifacts/ux-design-specification.md` - Clipboard workflow (lines 54-55)

  **WHY This Reference Matters**:
  - Clipboard-First is key differentiator for BCA MyCore+
  - Browser compatibility is critical (iOS Safari limitations)
  - Fallback strategy ensures functionality across all browsers

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Clipboard API architecture documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Clipboard API" .sisyphus/output/architecture-decision-document.md`
  - [ ] Fallback strategy defined: `grep -q "fallback\|download" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Clipboard API architecture addresses browser compatibility
    Tool: Bash (content validation)
    Preconditions: Clipboard API section documented
    Steps:
      1. Check section exists: grep -q "## Clipboard API" .sisyphus/output/architecture-decision-document.md
      2. Validate Clipboard API mentioned: grep -i "navigator.clipboard\|clipboard api" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate iOS Safari workarounds: grep -i "ios\|safari" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate fallback strategy: grep -i "fallback\|download" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Clipboard API count > 1, iOS count > 0, fallback count > 0
    Evidence: .sisyphus/evidence/task-16-clipboard-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Clipboard validation: task-16-clipboard-validation.txt

  **Commit**: YES (grouped with Task 12)

- [x] 17. Integration Patterns Documentation

  **What to do**:
  - Document integration patterns between architectural components:
    - Fabric.js canvas ↔ React state (state synchronization)
    - ColorThief.js ↔ Color picker (palette extraction)
    - Clipboard API ↔ Export/Share (image blob handling)
    - Template library ↔ Canvas editor (template loading)
    - Memory management ↔ Component lifecycle (cleanup patterns)
  - Define data flow between components
  - Define error propagation patterns
  - Define loading state patterns
  - Create integration flow diagrams (ASCII or Mermaid)
  - Create "Integration Patterns" section in architecture document

  **Must NOT do**:
  - Include implementation-level integration code
  - Design integrations without considering all architectural decisions
  - Omit error handling patterns

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of all architectural components and their interactions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential after Wave 3)
  - **Blocks**: Tasks 19, 20 (document compilation and validation)
  - **Blocked By**: Tasks 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 (all architectural decisions)

  **References**:

  **Input Documents**:
  - All previous task outputs (Tasks 6-16)
  - `.sisyphus/output/architecture-decision-document.md` - All architectural sections

  **WHY This Reference Matters**:
  - Integration patterns tie all architectural decisions together
  - Data flow must be consistent across all components
  - Error handling must be unified

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Integration patterns documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Section exists: `grep -q "## Integration Patterns" .sisyphus/output/architecture-decision-document.md`
  - [ ] Data flow diagrams present: `grep -q "flow\|diagram" .sisyphus/output/architecture-decision-document.md`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Integration patterns document component interactions
    Tool: Bash (content validation)
    Preconditions: Integration patterns documented
    Steps:
      1. Check section exists: grep -q "## Integration Patterns" .sisyphus/output/architecture-decision-document.md
      2. Validate Fabric.js integration: grep -i "fabric.*react\|canvas.*state" .sisyphus/output/architecture-decision-document.md | wc -l
      3. Validate ColorThief integration: grep -i "colorthief\|palette.*extract" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Validate error patterns: grep -i "error.*handling\|error.*propagation" .sisyphus/output/architecture-decision-document.md | wc -l
    Expected Result: Fabric integration count > 1, ColorThief count > 0, error patterns count > 1
    Evidence: .sisyphus/evidence/task-17-integration-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Integration validation: task-17-integration-validation.txt

  **Commit**: YES
  - Message: `docs(architecture): add integration patterns`
  - Files: `.sisyphus/output/architecture-decision-document.md`

- [x] 18. Architecture Validation Tests

  **What to do**:
  - Create validation test suite for architectural decisions:
    - Bundle size validation: `bun run build && du -sh dist/`
    - Zero-Server validation: `grep -r "fetch\|axios" src/ | grep -v "//cdn"`
    - Type safety validation: `bun run type-check`
    - Dependency validation: `grep "fabric\|colorThief" package.json`
  - Document test commands in architecture document
  - Create test execution script (`.sisyphus/scripts/validate-architecture.sh`)
  - Execute validation tests and capture results

  **Must NOT do**:
  - Skip validation test execution
  - Create tests without executable commands
  - Ignore test failures

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring testing expertise
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential after Task 17)
  - **Blocks**: Task 20 (acceptance criteria validation)
  - **Blocked By**: Task 17 (integration patterns)

  **References**:

  **Input Documents**:
  - `.sisyphus/output/architecture-decision-document.md` - All architectural decisions

  **WHY This Reference Matters**:
  - Validation tests ensure architectural decisions are implementable
  - Executable tests provide confidence in architecture
  - Test results inform implementation phase

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Validation tests documented in `.sisyphus/output/architecture-decision-document.md`
  - [ ] Test script exists: `test -f .sisyphus/scripts/validate-architecture.sh`
  - [ ] Test results captured: `test -f .sisyphus/evidence/task-18-validation-results.txt`

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Architecture validation tests execute successfully
    Tool: Bash (test execution)
    Preconditions: Validation tests created
    Steps:
      1. Check test script exists: test -f .sisyphus/scripts/validate-architecture.sh
      2. Make script executable: chmod +x .sisyphus/scripts/validate-architecture.sh
      3. Execute validation tests: .sisyphus/scripts/validate-architecture.sh > .sisyphus/evidence/task-18-validation-results.txt 2>&1
      4. Check exit code: echo $? (0 = success)
    Expected Result: Script executes, results captured, exit code 0
    Failure Indicators: Script missing, execution fails, non-zero exit code
    Evidence: .sisyphus/evidence/task-18-validation-results.txt
  ```

  **Evidence to Capture**:
  - [ ] Validation results: task-18-validation-results.txt

  **Commit**: YES
  - Message: `test(architecture): add architecture validation tests`
  - Files: `.sisyphus/scripts/validate-architecture.sh`

- [x] 19. Architecture Document Compilation and Review

  **What to do**:
  - Compile all architectural sections into final document
  - Review document for completeness (all required sections present)
  - Review document for consistency (no contradictions)
  - Review document for clarity (WHY rationale for each decision)
  - Add table of contents
  - Add executive summary
  - Add glossary of terms
  - Format document for readability (headings, diagrams, code blocks)
  - Final proofread and polish

  **Must NOT do**:
  - Skip completeness review
  - Ignore inconsistencies between sections
  - Omit executive summary or table of contents

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Requires deep understanding of all architectural decisions for consistency review
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential after Task 17)
  - **Blocks**: Task 20, F1-F4 (acceptance validation and final reviews)
  - **Blocked By**: Tasks 9, 10, 11, 12, 13, 14, 15, 16, 17 (all architectural sections)

  **References**:

  **Input Documents**:
  - `.sisyphus/output/architecture-decision-document.md` - All architectural sections

  **WHY This Reference Matters**:
  - Final document must be cohesive and consistent
  - Executive summary provides quick overview
  - Table of contents enables navigation

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] Final document exists: `test -f .sisyphus/output/architecture-decision-document.md`
  - [ ] Table of contents present: `grep -q "## Table of Contents" .sisyphus/output/architecture-decision-document.md`
  - [ ] Executive summary present: `grep -q "## Executive Summary" .sisyphus/output/architecture-decision-document.md`
  - [ ] All required sections present (Technology, Component, State, Memory, Performance, Accessibility, Brand, Mobile, Clipboard, Integration)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Architecture document is complete and consistent
    Tool: Bash (content validation)
    Preconditions: Document compiled
    Steps:
      1. Check document exists: test -f .sisyphus/output/architecture-decision-document.md
      2. Validate all sections: for section in "Technology Stack" "Component Architecture" "State Management" "Memory Management" "Performance" "Accessibility" "Brand Compliance" "Mobile-First" "Clipboard API" "Integration Patterns"; do grep -q "$section" .sisyphus/output/architecture-decision-document.md || echo "Missing: $section"; done
      3. Count WHY rationale: grep -i "because\|rationale\|reason\|why" .sisyphus/output/architecture-decision-document.md | wc -l
      4. Check document length: wc -l .sisyphus/output/architecture-decision-document.md
    Expected Result: All sections present, WHY count > 10, length > 500 lines
    Failure Indicators: Missing sections, insufficient rationale, too short
    Evidence: .sisyphus/evidence/task-19-document-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Document validation: task-19-document-validation.txt

  **Commit**: YES
  - Message: `docs(architecture): finalize architecture decision document`
  - Files: `.sisyphus/output/architecture-decision-document.md`

- [x] 20. Architecture Acceptance Criteria Validation

  **What to do**:
  - Execute all acceptance criteria from Success Criteria section
  - Validate document exists and has required sections
  - Validate all evidence files exist
  - Validate all QA scenarios executed
  - Generate final validation report
  - Prepare for Final Verification Wave (F1-F4)

  **Must NOT do**:
  - Skip any acceptance criteria
  - Proceed to Final Verification without validation
  - Ignore validation failures

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: High effort task requiring thorough validation
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential after Tasks 17, 18, 19)
  - **Blocks**: F1-F4 (final verification wave)
  - **Blocked By**: Tasks 17, 18, 19 (integration, validation tests, document compilation)

  **References**:

  **Input Documents**:
  - `.sisyphus/output/architecture-decision-document.md` - Final document
  - `.sisyphus/evidence/` - All evidence files

  **WHY This Reference Matters**:
  - Acceptance criteria validation ensures plan objectives met
  - Evidence files prove work completed
  - Validation report informs Final Verification Wave

  **Acceptance Criteria**:

  **Agent-Executable Verification**:
  - [ ] All Success Criteria commands executed successfully
  - [ ] Validation report generated: `test -f .sisyphus/evidence/task-20-acceptance-validation.txt`
  - [ ] All evidence files exist (20+ files)

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: All acceptance criteria pass
    Tool: Bash (validation execution)
    Preconditions: All tasks complete
    Steps:
      1. Execute Success Criteria commands from plan
      2. Check document exists: test -f .sisyphus/output/architecture-decision-document.md
      3. Check all sections: grep -q "## Technology Stack Decisions" .sisyphus/output/architecture-decision-document.md && grep -q "## Component Architecture" .sisyphus/output/architecture-decision-document.md && grep -q "## State Management" .sisyphus/output/architecture-decision-document.md && grep -q "## Memory Management" .sisyphus/output/architecture-decision-document.md && grep -q "## Performance" .sisyphus/output/architecture-decision-document.md && grep -q "## Accessibility" .sisyphus/output/architecture-decision-document.md && grep -q "## Zero-Server" .sisyphus/output/architecture-decision-document.md
      4. Check evidence files: find .sisyphus/evidence/ -name "task-*" | wc -l
      5. Generate validation report: echo "All acceptance criteria passed" > .sisyphus/evidence/task-20-acceptance-validation.txt
    Expected Result: All commands return 0, evidence count >= 20
    Failure Indicators: Any command fails, insufficient evidence files
    Evidence: .sisyphus/evidence/task-20-acceptance-validation.txt
  ```

  **Evidence to Capture**:
  - [ ] Acceptance validation: task-20-acceptance-validation.txt

  **Commit**: NO (validation only, no code changes)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.

- [x] F1. **Plan Compliance Audit** — `oracle`
      Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, check document sections). For each "Must NOT Have": search for forbidden patterns — reject if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
      Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Architecture Quality Review** — `unspecified-high`
      Review architecture document for: completeness (all critical decisions documented), clarity (WHY rationale for each decision), consistency (no contradictions), feasibility (realistic constraints). Check for pseudo-code or implementation details (should be architecture-level only). Verify all major decisions have trade-off analysis.
      Output: `Completeness [PASS/FAIL] | Clarity [PASS/FAIL] | Consistency [PASS/FAIL] | Feasibility [PASS/FAIL] | VERDICT`

- [x] F3. **Architecture Validation Execution** — `unspecified-high`
      Execute ALL QA scenarios from ALL tasks — follow exact commands, capture evidence. Validate bundle size constraints, Zero-Server compliance, type safety, dependency installation. Test cross-task integration (architecture decisions work together). Save to `.sisyphus/evidence/final-qa/`.
      Output: `Scenarios [N/N pass] | Integration [N/N] | Constraints [N tested] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
      For each task: read "What to do", verify deliverable exists and matches spec. Verify 1:1 — everything in spec was created (no missing), nothing beyond spec was created (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N producing Task M's deliverables. Flag unaccounted outputs.
      Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: No commits (research only)
- **Wave 2**: `docs(architecture): add core architecture decisions` - architecture.md sections
- **Wave 3**: `docs(architecture): add specialized architectures` - architecture.md sections
- **Wave 4**: `docs(architecture): finalize architecture document` - architecture.md complete

---

## Success Criteria

### Verification Commands

```bash
# Architecture document exists
test -f .sisyphus/output/architecture-decision-document.md

# Document has required sections
grep -q "## Technology Stack Decisions" .sisyphus/output/architecture-decision-document.md
grep -q "## Component Architecture" .sisyphus/output/architecture-decision-document.md
grep -q "## State Management Architecture" .sisyphus/output/architecture-decision-document.md
grep -q "## Memory Management Patterns" .sisyphus/output/architecture-decision-document.md
grep -q "## Performance Optimization Strategy" .sisyphus/output/architecture-decision-document.md
grep -q "## Accessibility Architecture" .sisyphus/output/architecture-decision-document.md
grep -q "## Zero-Server Constraints" .sisyphus/output/architecture-decision-document.md

# All evidence files exist
test -d .sisyphus/evidence/
find .sisyphus/evidence/ -name "task-*" | wc -l  # Expected: 20+ files
```

### Final Checklist

- [ ] All "Must Have" sections present in architecture document
- [ ] All "Must NOT Have" patterns absent (no pseudo-code, no implementation details)
- [ ] Oracle consultation completed with technology recommendations
- [ ] Bundle size validated against realistic budget
- [ ] Zero-Server constraints explicitly documented
- [ ] All acceptance criteria are agent-executable
- [ ] All QA scenarios executed with evidence captured
