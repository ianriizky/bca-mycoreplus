import { useToastStore } from '@/stores/toast'

export async function copyCanvasToClipboard(
  canvas: HTMLCanvasElement,
): Promise<void> {
  const showToast = useToastStore.getState().showToast

  try {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          throw new Error('Canvas blob generation failed')
        }

        try {
          const item = new ClipboardItem({ 'image/png': blob })
          await navigator.clipboard.write([item])
          showToast('Copied to clipboard!', 'success')
        } catch (clipboardError) {
          console.error('Clipboard write failed:', clipboardError)
          throw clipboardError
        }
      },
      'image/png',
      1.0,
    )
  } catch (error) {
    console.error('Copy to clipboard failed:', error)
    showToast(
      'Clipboard tidak didukung. Gunakan download sebagai alternatif.',
      'error',
    )
    throw error
  }
}

export function checkClipboardSupport(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.clipboard !== 'undefined' &&
    typeof navigator.clipboard.write === 'function'
  )
}

export function downloadCanvasAsPNG(canvas: HTMLCanvasElement): void {
  const showToast = useToastStore.getState().showToast

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const filename = `bca-mycoreplus-${timestamp}.png`

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        showToast('Download failed', 'error')

        return
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showToast('Downloaded successfully', 'success')
    },
    'image/png',
    1.0,
  )
}

export function openWhatsApp(
  message: string = 'Lihat gambar ini dari BCA MyCore+',
): void {
  const encodedMessage = encodeURIComponent(message)
  const waLink = `https://wa.me/?text=${encodedMessage}`
  window.open(waLink, '_blank')
}
