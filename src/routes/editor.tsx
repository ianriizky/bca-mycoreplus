import { createFileRoute } from '@tanstack/react-router'
import { Suspense, lazy } from 'react'

import { CanvasEditorSkeleton } from '@/components/CanvasEditorSkeleton'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const CanvasEditor = lazy(() =>
  import('@/components/CanvasEditor').then((module) => ({
    default: module.CanvasEditor,
  })),
)

export const Route = createFileRoute('/editor')({
  component: EditorPage,
})

function EditorPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CanvasEditorSkeleton />}>
        <CanvasEditor className="p-4" />
      </Suspense>
    </ErrorBoundary>
  )
}
