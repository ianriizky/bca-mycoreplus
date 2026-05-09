import { Download } from 'lucide-react'
import { useCallback, useState } from 'react'

import { downloadCanvasAsPNG } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'

export function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false)
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)

  const handleDownload = useCallback(() => {
    if (!fabricCanvas) return

    setIsLoading(true)
    try {
      const canvas = fabricCanvas.getElement() as HTMLCanvasElement
      downloadCanvasAsPNG(canvas)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [fabricCanvas])

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading || !fabricCanvas}
      className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#0B1F3A] to-[#051220] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#152A4A] hover:to-[#0A1A2F] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Download as PNG"
    >
      <Download size={18} />
      <span className="hidden sm:inline">Download</span>
    </button>
  )
}
