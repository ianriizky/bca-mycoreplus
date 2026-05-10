import { Minus, Plus } from 'lucide-react'
import { useRef } from 'react'

interface ScaleControlProps {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  label: string
  unit?: string
}

export function ScaleControl({
  value,
  min,
  max,
  step,
  onChange,
  label,
  unit = '',
}: ScaleControlProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(newValue)
    if (inputRef.current) {
      inputRef.current.value = newValue.toString()
    }
  }

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(newValue)
    if (inputRef.current) {
      inputRef.current.value = newValue.toString()
    }
  }

  const handleInputBlur = () => {
    if (!inputRef.current) return

    const parsed = parseFloat(inputRef.current.value)
    if (!isNaN(parsed) && parsed > 0) {
      const clamped = Math.max(min, Math.min(max, parsed))
      onChange(clamped)
      inputRef.current.value = clamped.toString()
    } else {
      inputRef.current.value = value.toString()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Decrease ${label}`}
        title={`Decrease ${label}`}
      >
        <Minus size={16} />
      </button>

      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        defaultValue={value.toString()}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="w-16 rounded border border-[#0B1F3A]/30 bg-white px-2 py-1 text-center text-sm text-[#0B1F3A]"
        aria-label={label}
        title={`Current ${label}${unit ? ` (${unit})` : ''}`}
      />

      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex size-8 items-center justify-center rounded text-[#0B1F3A] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`Increase ${label}`}
        title={`Increase ${label}`}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
