import type { Object as FabricObject } from 'fabric'

export function useToolbarVisibility(selectedObject: FabricObject | null) {
  const isVisible = selectedObject !== null

  return { isVisible }
}
