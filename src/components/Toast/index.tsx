import { useToastStore } from '@/stores/toast'

import { Toast } from './Toast'

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col gap-2 md:right-6 md:bottom-6"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
