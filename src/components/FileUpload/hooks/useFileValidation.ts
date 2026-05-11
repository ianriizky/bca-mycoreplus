import { useCallback } from 'react'

import type { ValidationResult } from '../types'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_FORMATS = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
]

export function useFileValidation() {
  const validateFileSize = useCallback((file: File): ValidationResult => {
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: 'File terlalu besar (max 10MB). Pilih file lain?',
      }
    }

    return { valid: true }
  }, [])

  const validateFileFormat = useCallback((file: File): ValidationResult => {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      return {
        valid: false,
        error: 'Format tidak didukung. Gunakan PNG/JPG/SVG/WebP',
      }
    }

    return { valid: true }
  }, [])

  const validateFile = useCallback(
    (file: File): ValidationResult => {
      const sizeValidation = validateFileSize(file)
      if (!sizeValidation.valid) {
        return sizeValidation
      }

      const formatValidation = validateFileFormat(file)
      if (!formatValidation.valid) {
        return formatValidation
      }

      return { valid: true }
    },
    [validateFileSize, validateFileFormat],
  )

  return {
    validateFile,
    validateFileSize,
    validateFileFormat,
  }
}
