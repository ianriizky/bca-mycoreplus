import { X } from 'lucide-react'

import type { Toast as ToastType } from '@/stores/toast'

import { useToastStore } from '@/stores/toast'

interface ToastProps {
  toast: ToastType
}

const toastIcons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
}

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((s) => s.removeToast)

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
  }[toast.type]

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
    warning: 'text-yellow-800',
  }[toast.type]

  return (
    <div
      className={`pointer-events-auto mb-3 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${bgColor}`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-lg">{toastIcons[toast.type]}</span>
      <div className="flex-1">
        <p className={`text-sm font-medium ${textColor}`}>{toast.message}</p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className={`mt-1 text-xs font-semibold underline ${textColor} hover:opacity-80`}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className={`shrink-0 ${textColor} hover:opacity-70`}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  )
}
