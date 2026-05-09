import { Eye, EyeOff } from 'lucide-react'

import type { SafeZoneOverlayProps } from './types'

import { useSafeZoneVisibility } from './hooks/useSafeZoneVisibility'

export function SafeZoneOverlay({ className }: SafeZoneOverlayProps) {
  const { isVisible, toggleVisibility } = useSafeZoneVisibility()

  return (
    <div className={className}>
      <div
        role="region"
        aria-label="Brand Safe Zone"
        aria-hidden={!isVisible}
        className={`pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[375px] -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-[#0B1F3A] bg-[rgba(11,31,58,0.02)] p-2.5 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <button
        onClick={toggleVisibility}
        aria-label="Toggle Safe Zone"
        className="absolute right-4 bottom-4 z-10 rounded-lg border border-[#0B1F3A] bg-white p-2 text-[#0B1F3A] transition-colors duration-200 hover:bg-[#0B1F3A] hover:text-white"
      >
        {isVisible ? (
          <Eye size={20} strokeWidth={2} />
        ) : (
          <EyeOff size={20} strokeWidth={2} />
        )}
      </button>
    </div>
  )
}
