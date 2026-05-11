import { Edit2Icon, MessageCircle, PhoneIcon, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { openWhatsApp } from '@/lib/clipboard'
import { useCanvasStore } from '@/stores/canvas'
import { usePreferencesStore } from '@/stores/preferences'

const MAX_MESSAGE_LENGTH = 500

export function WhatsAppButton() {
  const fabricCanvas = useCanvasStore((s) => s.fabricCanvas)
  const addTextObject = useCanvasStore((s) => s.addTextObject)
  const whatsappMessage = usePreferencesStore((s) => s.whatsappMessage)
  const whatsappPhoneNumber = usePreferencesStore((s) => s.whatsappPhoneNumber)
  const setWhatsappMessage = usePreferencesStore((s) => s.setWhatsappMessage)
  const setWhatsappPhoneNumber = usePreferencesStore(
    (s) => s.setWhatsappPhoneNumber,
  )

  const [isEditing, setIsEditing] = useState(false)
  const [localMessage, setLocalMessage] = useState(whatsappMessage)
  const [localPhoneNumber, setLocalPhoneNumber] = useState(whatsappPhoneNumber)
  const [showInsertConfirmation, setShowInsertConfirmation] = useState(false)
  const [isInserting, setIsInserting] = useState(false)
  const [insertError, setInsertError] = useState<string | null>(null)

  const handleWhatsApp = useCallback(() => {
    openWhatsApp(whatsappMessage, whatsappPhoneNumber)
  }, [whatsappMessage, whatsappPhoneNumber])

  const handleSaveMessage = useCallback(() => {
    setWhatsappMessage(localMessage)
    setWhatsappPhoneNumber(localPhoneNumber)
    setIsEditing(false)
  }, [
    localMessage,
    localPhoneNumber,
    setWhatsappMessage,
    setWhatsappPhoneNumber,
  ])

  const handleCancelEdit = useCallback(() => {
    setLocalMessage(whatsappMessage)
    setLocalPhoneNumber(whatsappPhoneNumber)
    setIsEditing(false)
  }, [whatsappMessage, whatsappPhoneNumber])

  const handleInsertMessage = useCallback(() => {
    if (!localMessage.trim()) return
    setShowInsertConfirmation(true)
  }, [localMessage])

  const handleConfirmInsert = useCallback(async () => {
    setIsInserting(true)
    setInsertError(null)

    try {
      await addTextObject({
        content: localMessage,
        fontSize: 48,
        fontFamily: 'Arial',
        fill: '#0B1F3A',
        textAlign: 'center',
      })

      setShowInsertConfirmation(false)
      setIsInserting(false)
    } catch {
      setInsertError('Gagal menambahkan pesan ke canvas. Silakan coba lagi.')
      setIsInserting(false)
    }
  }, [localMessage, addTextObject])

  const handleCancelInsert = useCallback(() => {
    setShowInsertConfirmation(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showInsertConfirmation) {
        handleCancelInsert()
      }
    }

    if (showInsertConfirmation) {
      document.addEventListener('keydown', handleKeyDown)

      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showInsertConfirmation, handleCancelInsert])

  return (
    <div className="flex flex-col gap-2">
      {isEditing ? (
        <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-white p-3">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="whatsapp-phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number (Optional)
            </label>
            <div className="flex items-center gap-2">
              <PhoneIcon
                size={16}
                className="text-gray-400"
                aria-hidden="true"
              />
              <input
                id="whatsapp-phone"
                type="tel"
                value={localPhoneNumber}
                onChange={(e) => setLocalPhoneNumber(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g., 628123456789"
                aria-label="WhatsApp phone number"
              />
            </div>
            <span className="text-xs text-gray-500">
              Format: country code + number (e.g., 62 for Indonesia)
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="whatsapp-message"
              className="text-sm font-medium text-gray-700"
            >
              Message
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
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelEdit}
              className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMessage}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
              aria-label="Save message and phone number"
            >
              Save
            </button>
            <button
              id="btn-insert-whatsapp-message"
              onClick={handleInsertMessage}
              disabled={!localMessage.trim() || isInserting}
              className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Masukkan Pesan WhatsApp ke Canvas"
            >
              {isInserting ? 'Menambahkan...' : 'Insert Message'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            aria-label="Edit WhatsApp message and phone number"
          >
            <Edit2Icon size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Edit Message</span>
            <span className="text-xs sm:hidden">Edit</span>
          </button>
          <button
            onClick={handleWhatsApp}
            disabled={!fabricCanvas}
            className="flex items-center gap-2 rounded-lg bg-linear-to-br from-[#25D366] to-[#20BA5C] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-[#31E074] hover:to-[#2BC968] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Share to WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Send to WhatsApp</span>
            <span className="text-xs sm:hidden">WhatsApp</span>
          </button>
          {whatsappPhoneNumber && (
            <span className="text-sm text-gray-600">
              → {whatsappPhoneNumber}
            </span>
          )}
        </div>
      )}

      {showInsertConfirmation && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div
            className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="dialog-title"
                className="text-lg font-semibold text-gray-900"
              >
                Konfirmasi Masukkan Pesan ke Canvas
              </h2>
              <button
                onClick={handleCancelInsert}
                disabled={isInserting}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              Pesan WhatsApp akan ditambahkan ke canvas sebagai text object.
              Lanjutkan?
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Preview Pesan:
              </label>
              <textarea
                value={localMessage}
                readOnly
                className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                rows={4}
              />
            </div>

            {insertError && (
              <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
                {insertError}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                id="btn-cancel-insert-message"
                onClick={handleCancelInsert}
                disabled={isInserting}
                className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                id="btn-confirm-insert-message"
                onClick={handleConfirmInsert}
                disabled={isInserting}
                className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isInserting ? 'Menambahkan...' : 'Ya, Masukkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
