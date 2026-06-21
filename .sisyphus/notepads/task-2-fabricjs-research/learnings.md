# Task 2 Learnings: Canvas Library Research

## Key Findings

### Bundle Size Insights

1. **Fabric.js v6** (PR #9624): Minified ES build = 304KB, tree-shaking reduces to ~90-150KB
2. **Konva.js v9**: npm unpacked 1.4MB, but gzip brings down to ~90-110KB
3. **PixiJS v8**: 700KB minified, ~180-220KB gzipped - borderline for NFR3
4. **Tree-shaking critical**: All libraries can meet NFR3 with selective imports

### Production Usage Patterns

1. Fabric.js: Popular for design editors (ikuaitu/vue-fabric-editor - 7813 stars)
2. Konva.js: Best React integration via react-konva (6319 stars)
3. PixiJS: Primarily games, not design tools

### Feature Comparison

- SVG import/export: Fabric.js only option ✅
- Interactive object manipulation: Fabric.js and Konva.js both excellent
- React 19 support: react-konva has official v19 release (2026-02-03)

### Critical Sources

- Fabric.js bundle analysis: https://github.com/fabricjs/fabric.js/pull/9624
- PixiJS tree-shaking improvement: https://github.com/pixijs/pixijs/pull/11833
- npm registry for konva package size
