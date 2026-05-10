import { useCallback, useReducer, useRef } from 'react'

import type { FileUploadProps } from './types'

import { useFileValidation } from './hooks/useFileValidation'

type FileUploadState = {
  selectedFile: File | null
  preview: string | null
  showPreviewModal: boolean
  errorMessage: string | null
  showErrorModal: boolean
}

type FileUploadAction =
  | { type: 'SET_FILE'; payload: { file: File; preview: string } }
  | { type: 'SHOW_ERROR'; payload: string }
  | { type: 'CLOSE_PREVIEW' }
  | { type: 'CLOSE_ERROR' }
  | { type: 'RESET' }

function fileUploadReducer(
  state: FileUploadState,
  action: FileUploadAction,
): FileUploadState {
  switch (action.type) {
    case 'SET_FILE':
      return {
        ...state,
        selectedFile: action.payload.file,
        preview: action.payload.preview,
        errorMessage: null,
        showPreviewModal: true,
        showErrorModal: false,
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        selectedFile: null,
        preview: null,
        errorMessage: action.payload,
        showPreviewModal: false,
        showErrorModal: true,
      }
    case 'CLOSE_PREVIEW':
    case 'CLOSE_ERROR':
    case 'RESET':
      return {
        ...state,
        selectedFile: null,
        preview: null,
        errorMessage: null,
        showPreviewModal: false,
        showErrorModal: false,
      }
    default:
      return state
  }
}

const initialState: FileUploadState = {
  selectedFile: null,
  preview: null,
  showPreviewModal: false,
  errorMessage: null,
  showErrorModal: false,
}

export function FileUpload({
  onFileSelected,
  onError,
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(fileUploadReducer, initialState)
  const { validateFile } = useFileValidation()

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const validation = validateFile(file)
      if (!validation.valid) {
        dispatch({
          type: 'SHOW_ERROR',
          payload: validation.error || 'Validasi gagal',
        })
        onError?.(validation.error || 'Validasi gagal')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        dispatch({ type: 'SET_FILE', payload: { file, preview: dataUrl } })
      }

      reader.onerror = () => {
        dispatch({ type: 'SHOW_ERROR', payload: 'Upload gagal. Coba lagi?' })
        onError?.('Upload gagal. Coba lagi?')
      }

      reader.readAsDataURL(file)
    },
    [validateFile, onError],
  )

  const handleConfirmUpload = useCallback(() => {
    if (state.selectedFile && state.preview) {
      onFileSelected?.(state.selectedFile, state.preview)
      dispatch({ type: 'CLOSE_PREVIEW' })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [state.selectedFile, state.preview, onFileSelected])

  const handleCancelPreview = useCallback(() => {
    dispatch({ type: 'CLOSE_PREVIEW' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleChooseAnother = useCallback(() => {
    dispatch({ type: 'CLOSE_ERROR' })
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleCancelError = useCallback(() => {
    dispatch({ type: 'CLOSE_ERROR' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleRetryError = useCallback(() => {
    dispatch({ type: 'CLOSE_ERROR' })
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        id="file-upload-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        aria-label="Select image file to upload"
        aria-describedby="file-upload-help"
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        aria-label="Upload image (PNG, JPG, SVG, WebP - max 5MB)"
      >
        Upload Image
      </button>

      <div id="file-upload-help" className="sr-only">
        Supported formats: PNG, JPG, SVG, WebP. Maximum file size: 5MB.
      </div>

      {state.showPreviewModal && state.preview && state.selectedFile && (
        <div
          className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-neutral-950"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <div className="w-96 rounded-lg bg-white p-6">
            <h2 id="preview-modal-title" className="mb-4 text-lg font-semibold">
              Preview Gambar
            </h2>

            <img
              src={state.preview}
              alt="Preview"
              className="mb-4 h-48 w-full object-contain"
            />

            <div className="mb-4 space-y-2 text-sm">
              <p>
                <strong>Nama File:</strong> {state.selectedFile.name}
              </p>
              <p>
                <strong>Ukuran:</strong>{' '}
                {(state.selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConfirmUpload}
                className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Konfirmasi Upload
              </button>
              <button
                onClick={handleCancelPreview}
                className="flex-1 rounded-lg bg-zinc-400 px-4 py-2 text-white hover:bg-zinc-500"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {state.showErrorModal && state.errorMessage && (
        <div
          className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-neutral-950"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-message"
        >
          <div className="w-96 rounded-lg bg-white p-6">
            <h2
              id="error-modal-title"
              className="mb-4 text-lg font-semibold text-red-600"
            >
              Error
            </h2>

            <p id="error-modal-message" className="mb-6 text-zinc-700">
              {state.errorMessage}
            </p>

            <div className="flex gap-2">
              {state.errorMessage.includes('Upload gagal') ? (
                <>
                  <button
                    onClick={handleRetryError}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Coba Lagi
                  </button>
                  <button
                    onClick={handleCancelError}
                    className="flex-1 rounded-lg bg-zinc-400 px-4 py-2 text-white hover:bg-zinc-500"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleChooseAnother}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Pilih File Lain
                  </button>
                  <button
                    onClick={handleCancelError}
                    className="flex-1 rounded-lg bg-zinc-400 px-4 py-2 text-white hover:bg-zinc-500"
                  >
                    Batal
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
