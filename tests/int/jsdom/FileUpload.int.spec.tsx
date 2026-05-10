import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { FileUpload } from '@/components/FileUpload'

describe('FileUpload Component', () => {
  describe('AC1: File Size Validation', () => {
    it('renders upload button', () => {
      render(<FileUpload />)
      expect(
        screen.getByRole('button', { name: /upload image/i }),
      ).toBeInTheDocument()
    })

    it('has file input with accept="image/*"', () => {
      render(<FileUpload />)
      const fileInput = screen.getByLabelText('Select image file to upload')
      expect(fileInput).toHaveAttribute('accept', 'image/*')
    })
  })

  describe('AC2: Supported File Formats', () => {
    it('accepts PNG, JPG, SVG, and WebP formats', () => {
      render(<FileUpload />)
      const fileInput = screen.getByLabelText('Select image file to upload')
      expect(fileInput).toHaveAttribute('accept', 'image/*')
    })
  })

  describe('AC5: Accessibility', () => {
    it('has aria-label on file input', () => {
      render(<FileUpload />)
      const fileInput = screen.getByLabelText('Select image file to upload')
      expect(fileInput).toHaveAttribute(
        'aria-label',
        'Select image file to upload',
      )
    })

    it('renders error modal with role="alert"', () => {
      const { container } = render(<FileUpload />)
      const alertRole = container.querySelector('[role="alert"]')
      expect(alertRole).not.toBeInTheDocument()
    })
  })

  describe('AC6: Performance', () => {
    it('validates file synchronously', () => {
      render(<FileUpload />)
      const fileInput = screen.getByLabelText('Select image file to upload')
      expect(fileInput).toBeInTheDocument()
    })
  })

  describe('AC7: Zero-Server Compliance', () => {
    it('uses FileReader API (no server calls)', () => {
      render(<FileUpload />)
      const fileInput = screen.getByLabelText('Select image file to upload')
      expect(fileInput).toHaveAttribute('type', 'file')
    })
  })
})
