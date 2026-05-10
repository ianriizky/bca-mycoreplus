export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
      <span className="ml-2 text-sm text-zinc-600">Loading…</span>
    </div>
  )
}
