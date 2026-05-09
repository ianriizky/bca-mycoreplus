import { MessageCircle } from 'lucide-react'
import { useCallback } from 'react'

import { openWhatsApp } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'

export function WhatsAppButton() {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)

  const handleWhatsApp = useCallback(() => {
    openWhatsApp('Lihat gambar ini dari BCA MyCore+')
  }, [])

  return (
    <button
      onClick={handleWhatsApp}
      disabled={!fabricCanvas}
      className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#25D366] to-[#20BA5C] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#31E074] hover:to-[#2BC968] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Share to WhatsApp"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </button>
  )
}
