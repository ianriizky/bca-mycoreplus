import type { Object as FabricObject } from 'fabric'

import { useMemo } from 'react'

import type { ToolbarPosition } from '../types'

const TOOLBAR_OFFSET_Y = 60
const TOOLBAR_WIDTH = 280
const TOOLBAR_HEIGHT = 60
const PADDING = 8

function calculateToolbarPosition(
  selectedObject: FabricObject | null,
): ToolbarPosition {
  if (!selectedObject) {
    return {
      x: 0,
      y: 0,
      isVisible: false,
    }
  }

  const bbox = selectedObject.getBoundingRect()
  if (!bbox) {
    return {
      x: 0,
      y: 0,
      isVisible: false,
    }
  }

  let x = bbox.left + bbox.width / 2 - TOOLBAR_WIDTH / 2
  let y = bbox.top - TOOLBAR_OFFSET_Y

  // Clamp to viewport bounds
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Clamp x position
  if (x < PADDING) {
    x = PADDING
  } else if (x + TOOLBAR_WIDTH > viewportWidth - PADDING) {
    x = viewportWidth - TOOLBAR_WIDTH - PADDING
  }

  // Clamp y position - try above first
  if (y < PADDING) {
    // Try below the object
    const belowY = bbox.top + bbox.height + TOOLBAR_OFFSET_Y
    if (belowY + TOOLBAR_HEIGHT <= viewportHeight - PADDING) {
      y = belowY
    } else {
      // If below doesn't fit either, position at bottom with padding
      y = viewportHeight - TOOLBAR_HEIGHT - PADDING
    }
  } else if (y + TOOLBAR_HEIGHT > viewportHeight - PADDING) {
    // If below viewport, try above with reduced offset
    const aboveY = bbox.top - TOOLBAR_HEIGHT - PADDING
    if (aboveY >= PADDING) {
      y = aboveY
    } else {
      // Last resort: position at top
      y = PADDING
    }
  }

  return {
    x,
    y,
    isVisible: true,
  }
}

export function useToolbarPosition(selectedObject: FabricObject | null) {
  const position = useMemo(
    () => calculateToolbarPosition(selectedObject),
    [selectedObject],
  )

  return position
}
