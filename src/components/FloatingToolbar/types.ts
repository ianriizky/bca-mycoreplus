import type { Object as FabricObject } from 'fabric'

export interface FloatingToolbarProps {
  selectedObject: FabricObject | null
  onColorChange: (color: string) => void
  onDelete: () => void
  onPhotoUpload: (file: File) => void
  onFontSizeChange: (delta: number) => void
  onBoldToggle: () => void
  onItalicToggle: () => void
}

export interface ToolbarPosition {
  x: number
  y: number
  isVisible: boolean
}
