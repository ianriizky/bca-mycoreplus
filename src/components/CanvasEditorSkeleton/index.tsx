export function CanvasEditorSkeleton() {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="aspect-video animate-pulse rounded-lg bg-gray-300" />

        <div className="flex gap-2">
          <div className="h-10 w-24 animate-pulse rounded bg-gray-300" />
          <div className="h-10 w-24 animate-pulse rounded bg-gray-300" />
          <div className="h-10 w-24 animate-pulse rounded bg-gray-300" />
        </div>

        <div className="text-center text-sm text-gray-500">
          Loading canvas editor...
        </div>
      </div>
    </div>
  )
}
