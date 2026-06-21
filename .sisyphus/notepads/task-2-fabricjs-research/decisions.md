# Architectural Decision: Canvas Library Selection for BCA MyCore+

## Options Considered

1. Fabric.js v6 - Design editor optimized
2. Konva.js v9 - Best React integration
3. PixiJS v8 - Game engine, NOT suitable
4. Native Canvas API - Zero bundle, high dev cost

## Decision Factors

- **NFR3 Compliance**: All except PixiJS can meet <200KB gzipped
- **SVG Support**: Only Fabric.js provides
- **React 19**: Only Konva.js has official v19 support
- **Use Case Match**: Design editor → Fabric.js or Konva.js

## Recommendation

Fabric.js v6 with selective ES imports for NFR3 compliance.
Consider Konva.js if React 19 compatibility is paramount.
