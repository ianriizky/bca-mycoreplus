import { useCallback, useRef, useState } from 'react'

import type { FileUploadProps } from './types'

import { useFileValidation } from './hooks/useFileValidation'

export function FileUpload({
  onFileSelected,
  onError,
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const { validateFile } = useFileValidation()

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const validation = validateFile(file)
      if (!validation.valid) {
        setErrorMessage(validation.error || 'Validasi gagal')
        setShowErrorModal(true)
        onError?.(validation.error || 'Validasi gagal')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        return
      }

      setSelectedFile(file)
      setErrorMessage(null)

      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setPreview(dataUrl)
        setShowPreviewModal(true)
      }

      reader.onerror = () => {
        setErrorMessage('Upload gagal. Coba lagi?')
        setShowErrorModal(true)
        onError?.('Upload gagal. Coba lagi?')
      }

      reader.readAsDataURL(file)
    },
    [validateFile, onError],
  )

  const handleConfirmUpload = useCallback(() => {
    if (selectedFile && preview) {
      onFileSelected?.(selectedFile, preview)
      setShowPreviewModal(false)
      setSelectedFile(null)
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }, [selectedFile, preview, onFileSelected])

  const handleCancelPreview = useCallback(() => {
    setShowPreviewModal(false)
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleChooseAnother = useCallback(() => {
    setShowErrorModal(false)
    setErrorMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleCancelError = useCallback(() => {
    setShowErrorModal(false)
    setErrorMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const handleRetryError = useCallback(() => {
    setShowErrorModal(false)
    setErrorMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        aria-label="Upload Image"
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Upload Image
      </button>

      {showPreviewModal && preview && selectedFile && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div className="w-96 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Preview Gambar</h2>

            <img
              src={preview}
              alt="Preview"
              className="mb-4 h-48 w-full object-contain"
            />

            <div className="mb-4 space-y-2 text-sm">
              <p>
                <strong>Nama File:</strong> {selectedFile.name}
              </p>
              <p>
                <strong>Ukuran:</strong>{' '}
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
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
                className="flex-1 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && errorMessage && (
        <div
          className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black"
          role="alert"
          aria-live="polite"
        >
          <div className="w-96 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-red-600">Error</h2>

            <p className="mb-6 text-gray-700">{errorMessage}</p>

            <div className="flex gap-2">
              {errorMessage.includes('Upload gagal') ? (
                <>
                  <button
                    onClick={handleRetryError}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Coba Lagi
                  </button>
                  <button
                    onClick={handleCancelError}
                    className="flex-1 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
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
                    className="flex-1 rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
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
