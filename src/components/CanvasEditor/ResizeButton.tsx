import { Maximize2, Minus, Plus, X } from 'lucide-react'
import { useCallback, useState } from 'react'

import { useCanvasStore } from '@/stores/canvas'

export function ResizeButton() {
  const [showModal, setShowModal] = useState(false)
  const canvasWidth = useCanvasStore((s) => s.canvasWidth)
  const canvasHeight = useCanvasStore((s) => s.canvasHeight)
  const resizeCanvas = useCanvasStore((s) => s.resizeCanvas)

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  const handleWidthChange = (delta: number) => {
    resizeCanvas(canvasWidth + delta, canvasHeight)
  }

  const handleHeightChange = (delta: number) => {
    resizeCanvas(canvasWidth, canvasHeight + delta)
  }

  const handleWidthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      resizeCanvas(value, canvasHeight)
    }
  }

  const handleHeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      resizeCanvas(canvasWidth, value)
    }
  }

  const handlePresetSize = (width: number, height: number) => {
    resizeCanvas(width, height)
    setShowModal(false)
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#0B1F3A] shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-xl"
        aria-label="Resize Canvas"
      >
        <Maximize2 size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Resize Canvas</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resize-modal-title"
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/20 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 rounded-lg p-1 text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h2
              id="resize-modal-title"
              className="mb-6 text-xl font-bold text-[#0B1F3A]"
            >
              Resize Canvas
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-16 text-sm font-semibold text-[#0B1F3A]">
                  Width:
                </span>
                <button
                  onClick={() => handleWidthChange(-10)}
                  disabled={canvasWidth <= 200}
                  className="flex size-10 items-center justify-center rounded-lg border border-[#0B1F3A]/30 bg-white text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Decrease width"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={canvasWidth}
                  onChange={handleWidthInput}
                  min={200}
                  max={2000}
                  className="w-24 rounded-lg border border-[#0B1F3A]/30 bg-white px-3 py-2 text-center text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:outline-none"
                  aria-label="Canvas width"
                />
                <button
                  onClick={() => handleWidthChange(10)}
                  disabled={canvasWidth >= 2000}
                  className="flex size-10 items-center justify-center rounded-lg border border-[#0B1F3A]/30 bg-white text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Increase width"
                >
                  <Plus size={16} />
                </button>
                <span className="text-sm text-[#0B1F3A]">px</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-16 text-sm font-semibold text-[#0B1F3A]">
                  Height:
                </span>
                <button
                  onClick={() => handleHeightChange(-10)}
                  disabled={canvasHeight <= 200}
                  className="flex size-10 items-center justify-center rounded-lg border border-[#0B1F3A]/30 bg-white text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Decrease height"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={canvasHeight}
                  onChange={handleHeightInput}
                  min={200}
                  max={2000}
                  className="w-24 rounded-lg border border-[#0B1F3A]/30 bg-white px-3 py-2 text-center text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:outline-none"
                  aria-label="Canvas height"
                />
                <button
                  onClick={() => handleHeightChange(10)}
                  disabled={canvasHeight >= 2000}
                  className="flex size-10 items-center justify-center rounded-lg border border-[#0B1F3A]/30 bg-white text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Increase height"
                >
                  <Plus size={16} />
                </button>
                <span className="text-sm text-[#0B1F3A]">px</span>
              </div>

              <div className="border-t border-[#0B1F3A]/10 pt-4">
                <p className="mb-3 text-sm font-semibold text-[#0B1F3A]">
                  Quick Presets:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handlePresetSize(375, 500)}
                    className="rounded-lg border border-[#0B1F3A]/30 bg-white px-4 py-2 text-sm text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10"
                    aria-label="Set canvas to default size (375×500)"
                  >
                    Default
                    <span className="ml-1 text-xs opacity-60">375×500</span>
                  </button>
                  <button
                    onClick={() => handlePresetSize(1080, 1080)}
                    className="rounded-lg border border-[#0B1F3A]/30 bg-white px-4 py-2 text-sm text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10"
                    aria-label="Set canvas to Instagram size (1080×1080)"
                  >
                    Instagram
                    <span className="ml-1 text-xs opacity-60">1080×1080</span>
                  </button>
                  <button
                    onClick={() => handlePresetSize(1080, 1920)}
                    className="rounded-lg border border-[#0B1F3A]/30 bg-white px-4 py-2 text-sm text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A]/10"
                    aria-label="Set canvas to Story size (1080×1920)"
                  >
                    Story
                    <span className="ml-1 text-xs opacity-60">1080×1920</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#0B1F3A]/10 pt-4">
                <p className="text-xs text-[#0B1F3A]/60">
                  Min: 200×200px | Max: 2000×2000px
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
