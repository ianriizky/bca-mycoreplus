import { Clipboard } from 'lucide-react'
import { useCallback, useState } from 'react'

import { copyCanvasToClipboard } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'

export function CopyButton() {
  const [isLoading, setIsLoading] = useState(false)
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)

  const handleCopy = useCallback(async () => {
    if (!fabricCanvas) return

    setIsLoading(true)
    try {
      const canvas = fabricCanvas.getElement() as HTMLCanvasElement
      await copyCanvasToClipboard(canvas)
    } catch (error) {
      console.error('Copy failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [fabricCanvas])

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading || !fabricCanvas}
      className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#C8A96A] to-[#B8995A] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#D4B376] hover:to-[#C4A366] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Copy to clipboard"
    >
      <Clipboard size={18} />
      <span className="hidden sm:inline">Copy Image to Clipboard</span>
    </button>
  )
}
