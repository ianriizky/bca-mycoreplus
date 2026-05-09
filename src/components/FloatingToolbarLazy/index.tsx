import { lazy, Suspense } from 'react'

const FloatingToolbarComponent = lazy(() =>
  import('@/components/FloatingToolbar').then((m) => ({
    default: m.FloatingToolbar,
  })),
)

function FloatingToolbarSkeleton() {
  return (
    <div className="fixed z-50 flex animate-pulse items-center gap-2 rounded-xl border border-white/20 bg-white/80 p-3 shadow-lg backdrop-blur-[15px]">
      <div className="h-12 w-12 rounded-lg bg-gray-300" />
      <div className="h-12 w-12 rounded-lg bg-gray-300" />
      <div className="h-12 w-12 rounded-lg bg-gray-300" />
    </div>
  )
}

export function FloatingToolbarLazy() {
  return (
    <Suspense fallback={<FloatingToolbarSkeleton />}>
      <FloatingToolbarComponent />
    </Suspense>
  )
}
