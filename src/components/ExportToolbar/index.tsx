import { CopyButton } from './CopyButton'
import { DownloadButton } from './DownloadButton'
import { WhatsAppButton } from './WhatsAppButton'

export function ExportToolbar() {
  return (
    <div
      className="mt-4 flex flex-col gap-3"
      role="toolbar"
      aria-label="Export and sharing options"
    >
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <CopyButton />
        <DownloadButton />
      </div>
      <WhatsAppButton />
    </div>
  )
}
