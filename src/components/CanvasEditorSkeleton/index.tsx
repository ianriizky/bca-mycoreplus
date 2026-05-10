export function CanvasEditorSkeleton() {
  return (
    <div className="flex items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="aspect-video animate-pulse rounded-lg bg-zinc-300" />

        <div className="flex gap-2">
          <div className="size-10 animate-pulse rounded bg-zinc-300" />
          <div className="size-10 animate-pulse rounded bg-zinc-300" />
          <div className="size-10 animate-pulse rounded bg-zinc-300" />
        </div>

        <div className="text-center text-sm text-zinc-500">
          Loading canvas editor…
        </div>
      </div>
    </div>
  )
}
