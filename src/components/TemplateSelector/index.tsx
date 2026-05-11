import { LayoutTemplate, X } from 'lucide-react'
import { useCallback, useReducer } from 'react'

import { TEMPLATES } from '@/assets/templates'
import { useCanvasStore } from '@/stores/canvas'

type TemplateSelectorState = {
  isOpen: boolean
  isApplying: boolean
  selectedTemplateId: string | null
  showConfirmation: boolean
  error: string | null
}

type TemplateSelectorAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SELECT_TEMPLATE'; payload: string }
  | { type: 'SHOW_CONFIRMATION' }
  | { type: 'CANCEL_CONFIRMATION' }
  | { type: 'START_APPLYING' }
  | { type: 'APPLY_SUCCESS' }
  | { type: 'APPLY_ERROR'; payload: string }

function templateSelectorReducer(
  state: TemplateSelectorState,
  action: TemplateSelectorAction,
): TemplateSelectorState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true, error: null }
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
        selectedTemplateId: null,
        showConfirmation: false,
        error: null,
      }
    case 'SELECT_TEMPLATE':
      return { ...state, selectedTemplateId: action.payload }
    case 'SHOW_CONFIRMATION':
      return { ...state, showConfirmation: true }
    case 'CANCEL_CONFIRMATION':
      return { ...state, showConfirmation: false, selectedTemplateId: null }
    case 'START_APPLYING':
      return { ...state, isApplying: true, error: null }
    case 'APPLY_SUCCESS':
      return {
        ...state,
        isApplying: false,
        isOpen: false,
        selectedTemplateId: null,
        showConfirmation: false,
      }
    case 'APPLY_ERROR':
      return { ...state, isApplying: false, error: action.payload }
    default:
      return state
  }
}

const initialState: TemplateSelectorState = {
  isOpen: false,
  isApplying: false,
  selectedTemplateId: null,
  showConfirmation: false,
  error: null,
}

export function TemplateSelector() {
  const [state, dispatch] = useReducer(templateSelectorReducer, initialState)
  const { applyTemplate } = useCanvasStore()

  const handleOpenModal = useCallback(() => {
    dispatch({ type: 'OPEN' })
  }, [])

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'CLOSE' })
  }, [])

  const handleSelectTemplate = useCallback((templateId: string) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: templateId })
    dispatch({ type: 'SHOW_CONFIRMATION' })
  }, [])

  const handleCancelConfirmation = useCallback(() => {
    dispatch({ type: 'CANCEL_CONFIRMATION' })
  }, [])

  const handleConfirmApply = useCallback(async () => {
    if (!state.selectedTemplateId) return

    dispatch({ type: 'START_APPLYING' })

    try {
      await applyTemplate(state.selectedTemplateId)
      dispatch({ type: 'APPLY_SUCCESS' })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Gagal menerapkan template'
      dispatch({ type: 'APPLY_ERROR', payload: errorMessage })
    }
  }, [state.selectedTemplateId, applyTemplate])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (state.showConfirmation) {
          handleCancelConfirmation()
        } else {
          handleCloseModal()
        }
      }
    },
    [state.showConfirmation, handleCancelConfirmation, handleCloseModal],
  )

  return (
    <>
      <button
        id="btn-select-template"
        onClick={handleOpenModal}
        className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        aria-label="Pilih Template Ucapan Selamat"
      >
        <LayoutTemplate size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Select Template</span>
        <span className="sm:hidden">Template</span>
      </button>

      {state.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-modal-title"
          onKeyDown={handleKeyDown}
        >
          <div className="max-h-96 w-full max-w-2xl overflow-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="template-modal-title" className="text-lg font-semibold">
                Pilih Template Ucapan Selamat
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded p-1 hover:bg-gray-100"
                aria-label="Close template modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Object.entries(TEMPLATES).map(([templateId, template]) => (
                <div
                  key={templateId}
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 hover:border-blue-500 hover:bg-blue-50"
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="h-40 w-40 rounded border border-gray-300 object-cover"
                  />
                  <h3 className="text-center text-sm font-medium">
                    {template.name}
                  </h3>
                  <button
                    id={`btn-apply-template-${templateId}`}
                    onClick={() => handleSelectTemplate(templateId)}
                    className="w-full rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    disabled={state.isApplying}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                id="btn-cancel-template-modal"
                onClick={handleCloseModal}
                className="flex-1 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                disabled={state.isApplying}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {state.showConfirmation && state.selectedTemplateId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          onKeyDown={handleKeyDown}
        >
          <div className="max-w-md rounded-lg bg-white p-6">
            <h2 id="confirm-modal-title" className="mb-4 text-lg font-semibold">
              Konfirmasi Penerapan Template
            </h2>

            {(() => {
              const template =
                TEMPLATES[state.selectedTemplateId as keyof typeof TEMPLATES]

              return template ? (
                <div className="mb-6 space-y-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">
                      {template.description}
                    </p>

                    <div className="mb-3 space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-gray-700">
                          Background:
                        </span>
                        <span className="text-gray-600">
                          {template.backgroundImage ? 'Ya' : 'Tidak'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-gray-700">
                          Objects:
                        </span>
                        <span className="text-gray-600">
                          {template.objects.length} item
                          {template.objects.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-medium text-gray-700">
                          WhatsApp Message:
                        </span>
                        <span className="text-gray-600">
                          "{template.whatsappMessage}"
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-amber-700">
                    ⚠️ Menerapkan template ini akan menghapus semua editing yang
                    ada di canvas. Lanjutkan?
                  </p>
                </div>
              ) : null
            })()}

            {state.error && (
              <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
                {state.error}
              </div>
            )}

            <div className="flex gap-2">
              <button
                id="btn-confirm-apply-template"
                onClick={handleConfirmApply}
                disabled={state.isApplying}
                className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {state.isApplying ? 'Menerapkan...' : 'Ya, Terapkan'}
              </button>
              <button
                id="btn-cancel-apply-template"
                onClick={handleCancelConfirmation}
                disabled={state.isApplying}
                className="flex-1 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
