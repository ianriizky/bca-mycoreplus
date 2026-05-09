import { Suspense, lazy } from 'react'

import { CanvasEditorSkeleton } from '@/components/CanvasEditorSkeleton'

const CanvasEditorComponent = lazy(() =>
  import('@/components/CanvasEditor').then((module) => ({
    default: module.CanvasEditor,
  })),
)

interface CanvasEditorLazyProps {
  className?: string
}

export function CanvasEditorLazy({ className }: CanvasEditorLazyProps) {
  return (
    <Suspense fallback={<CanvasEditorSkeleton />}>
      <CanvasEditorComponent className={className} />
    </Suspense>
  )
}
