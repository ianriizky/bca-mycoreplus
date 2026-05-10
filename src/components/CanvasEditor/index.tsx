import { useCallback, useEffect, useReducer, useRef } from 'react'

import { ExportToolbar } from '@/components/ExportToolbar'
import { FileUpload } from '@/components/FileUpload'
import { FloatingToolbar } from '@/components/FloatingToolbar'
import { SafeZoneOverlay } from '@/components/SafeZoneOverlay'
import { ToastContainer } from '@/components/Toast'
import { loadFabric } from '@/lib/fabric-loader'
import { useCanvasStore } from '@/stores/canvas'

import { useCanvasEvents } from './hooks/useCanvasEvents'
import { useCopyShortcut } from './hooks/useCopyShortcut'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import { useUndoRedoShortcuts } from './hooks/useUndoRedoShortcuts'

interface CanvasEditorProps {
  className?: string
}

type CanvasEditorState = {
  isLoading: boolean
  error: string | null
}

type CanvasEditorAction =
  | { type: 'START_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'FINISH_LOADING' }

function canvasEditorReducer(
  state: CanvasEditorState,
  action: CanvasEditorAction,
): CanvasEditorState {
  switch (action.type) {
    case 'START_LOADING':
      return { isLoading: true, error: null }
    case 'SET_ERROR':
      return { isLoading: false, error: action.payload }
    case 'FINISH_LOADING':
      return { isLoading: false, error: null }
    default:
      return state
  }
}

const initialState: CanvasEditorState = {
  isLoading: true,
  error: null,
}

export function CanvasEditor({ className }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, dispatch] = useReducer(canvasEditorReducer, initialState)
  const { initCanvas, disposeCanvas, addObject, initClipboardSupport } =
    useCanvasStore()

  useCanvasEvents()
  useCopyShortcut()
  useKeyboardNav()
  useUndoRedoShortcuts()

  useEffect(() => {
    if (!canvasRef.current) return

    let isMounted = true

    const initializeFabric = async () => {
      try {
        dispatch({ type: 'START_LOADING' })
        await loadFabric()

        if (!isMounted) return

        await initCanvas(canvasRef.current!)
        initClipboardSupport()
        dispatch({ type: 'FINISH_LOADING' })
      } catch (err) {
        if (isMounted) {
          dispatch({
            type: 'SET_ERROR',
            payload:
              err instanceof Error ? err.message : 'Failed to load Fabric.js',
          })
        }
      }
    }

    initializeFabric()

    return () => {
      isMounted = false
      disposeCanvas()
    }
  }, [initCanvas, disposeCanvas, initClipboardSupport])

  const handleFileSelected = useCallback(
    (_file: File, preview: string) => {
      addObject('image', { imageUrl: preview })
    },
    [addObject],
  )

  const handleFileError = useCallback((error: string) => {
    console.error('File upload error:', error)
  }, [])

  if (state.error) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-red-600">
          <h2 className="text-lg font-semibold">
            Failed to load canvas editor
          </h2>
          <p className="text-sm">{state.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="mb-4 flex gap-2">
        <FileUpload
          onFileSelected={handleFileSelected}
          onError={handleFileError}
        />
      </div>

      <div className="relative">
        {state.isLoading && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-white">
            <div className="size-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
          </div>
        )}
        <canvas
          ref={canvasRef}
          role="application"
          aria-label="Image editor canvas"
          className="w-full lg:w-full"
        />

        <SafeZoneOverlay />
      </div>

      <ExportToolbar />
      <FloatingToolbar />
      <ToastContainer />
    </div>
  )
}
