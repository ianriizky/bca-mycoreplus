import type { FabricObject } from 'fabric'

export type FabricObjectWithId = FabricObject & { id: string }
export interface SelectionCreatedEvent {
  selected?: FabricObject[]
}
export interface SelectionUpdatedEvent {
  selected?: FabricObject[]
  deselected?: FabricObject[]
}
export interface TextEditingEvent {
  target?: FabricObject
}

/**
 * Mock canvas type for testing
 */
export interface MockCanvas {
  getObjects: () => MockFabricObject[]
  getBoundingRect: () => {
    left: number
    top: number
    width: number
    height: number
  }
  discardActiveObject: () => void
  requestRenderAll: () => void
  setActiveObject: (obj: MockFabricObject) => void
  remove: (obj: MockFabricObject) => void
  add: (obj: MockFabricObject) => void
  set: (props: Record<string, unknown>) => void
  on: (event: string, handler: (e: unknown) => void) => void
  off: (event: string, handler: (e: unknown) => void) => void
}

/**
 * Mock Fabric object type for testing
 */
export interface MockFabricObject {
  id: string
  type: string
  left?: number
  top?: number
  fontSize?: number
  getBoundingRect: () => {
    left: number
    top: number
    width: number
    height: number
  }
  set: (props: Record<string, unknown>) => void
}
