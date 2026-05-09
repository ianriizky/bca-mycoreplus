export interface FileUploadProps {
  onFileSelected?: (file: File, preview: string) => void
  onError?: (error: string) => void
  className?: string
}

export interface ValidationResult {
  valid: boolean
  error?: string
}
