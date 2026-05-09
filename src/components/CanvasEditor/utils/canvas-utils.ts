import type { Canvas } from 'fabric'

export interface ImageLoadOptions {
  crossOrigin?: string
  maxWidth?: number
  maxHeight?: number
}

/**
 * Load image from File object and return data URL
 */
export async function loadImageFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('Failed to read file'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Revoke object URL to free memory
 */
export function revokeObjectUrl(url: string): void {
  try {
    URL.revokeObjectURL(url)
  } catch (error) {
    console.warn('Failed to revoke object URL:', error)
  }
}

/**
 * Calculate dimensions maintaining aspect ratio
 */
export function calculateAspectRatioDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight

  let width = originalWidth
  let height = originalHeight

  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }

  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }

  return { width, height }
}

/**
 * Serialize canvas state to JSON
 */
export function serializeCanvas(canvas: Canvas): string {
  try {
    const json = canvas.toJSON()

    return JSON.stringify(json)
  } catch (error) {
    console.error('Failed to serialize canvas:', error)

    return ''
  }
}

/**
 * Deserialize canvas state from JSON
 */
export async function deserializeCanvas(
  canvas: Canvas,
  json: string,
): Promise<void> {
  try {
    const data = JSON.parse(json)
    await canvas.loadFromJSON(data, () => {
      canvas.requestRenderAll()
    })
  } catch (error) {
    console.error('Failed to deserialize canvas:', error)
  }
}

/**
 * Export canvas as image
 */
export function exportCanvasAsImage(
  canvas: Canvas,
  format: 'png' | 'jpeg' = 'png',
): string {
  try {
    const dataUrl = canvas.toDataURL({
      format,
      quality: 0.95,
      multiplier: 1,
    })

    return dataUrl
  } catch (error) {
    console.error('Failed to export canvas:', error)

    return ''
  }
}

/**
 * Clear all objects from canvas
 */
export function clearCanvas(canvas: Canvas): void {
  try {
    canvas.clear()
    canvas.requestRenderAll()
  } catch (error) {
    console.error('Failed to clear canvas:', error)
  }
}
