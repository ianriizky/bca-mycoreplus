import { Edit2Icon, MessageCircle } from 'lucide-react'
import { useCallback, useState } from 'react'

import { openWhatsApp } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'
import { usePreferencesStore } from '@/stores/preferences'

const MAX_MESSAGE_LENGTH = 500

export function WhatsAppButton() {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const whatsappMessage = usePreferencesStore((s) => s.whatsappMessage)
  const setWhatsappMessage = usePreferencesStore((s) => s.setWhatsappMessage)

  const [isEditing, setIsEditing] = useState(false)
  const [localMessage, setLocalMessage] = useState(whatsappMessage)

  const handleWhatsApp = useCallback(() => {
    openWhatsApp(whatsappMessage)
  }, [whatsappMessage])

  const handleSaveMessage = useCallback(() => {
    setWhatsappMessage(localMessage)
    setIsEditing(false)
  }, [localMessage, setWhatsappMessage])

  const handleCancelEdit = useCallback(() => {
    setLocalMessage(whatsappMessage)
    setIsEditing(false)
  }, [whatsappMessage])

  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <div className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-3">
          <label
            htmlFor="whatsapp-message"
            className="text-sm font-medium text-gray-700"
          >
            WhatsApp Message
          </label>
          <textarea
            id="whatsapp-message"
            value={localMessage}
            onChange={(e) =>
              setLocalMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))
            }
            className="min-h-20 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Write WhatsApp message..."
            maxLength={MAX_MESSAGE_LENGTH}
            aria-label="WhatsApp message text"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {localMessage.length}/{MAX_MESSAGE_LENGTH}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                aria-label="Cancel editing message"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMessage}
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                aria-label="Save message"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            aria-label="Edit WhatsApp message"
          >
            <Edit2Icon size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Edit Message</span>
          </button>
          <button
            onClick={handleWhatsApp}
            disabled={!fabricCanvas}
            className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#25D366] to-[#20BA5C] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#31E074] hover:to-[#2BC968] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Share to WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Send Message to WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  )
}
