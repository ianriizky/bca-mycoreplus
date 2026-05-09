import { create } from 'zustand'

interface PreferencesStore {
  theme: 'light' | 'dark'
  fontSize: number
  fontFamily: string
  defaultTextColor: string
  defaultFill: string
  showSafeZone: boolean

  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: number) => void
  setFontFamily: (family: string) => void
  setDefaultTextColor: (color: string) => void
  setDefaultFill: (fill: string) => void
  setShowSafeZone: (show: boolean) => void
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  theme: 'light',
  fontSize: 48,
  fontFamily: 'system-ui',
  defaultTextColor: '#0B1F3A',
  defaultFill: '#FFFFFF',
  showSafeZone: true,

  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setDefaultTextColor: (defaultTextColor) => set({ defaultTextColor }),
  setDefaultFill: (defaultFill) => set({ defaultFill }),
  setShowSafeZone: (showSafeZone) => set({ showSafeZone }),
}))
