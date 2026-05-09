import { UndoRedoButtons } from '@/components/UndoRedoButtons'

import { CopyButton } from './CopyButton'
import { DownloadButton } from './DownloadButton'
import { WhatsAppButton } from './WhatsAppButton'

export function ExportToolbar() {
  return (
    <div
      className="mt-4 flex flex-wrap gap-2 sm:gap-3"
      role="toolbar"
      aria-label="Export and sharing options"
    >
      <UndoRedoButtons />
      <CopyButton />
      <WhatsAppButton />
      <DownloadButton />
    </div>
  )
}
