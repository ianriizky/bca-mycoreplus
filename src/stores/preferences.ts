import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PreferencesStore {
  theme: 'light' | 'dark'
  fontSize: number
  fontFamily: string
  defaultTextColor: string
  defaultFill: string
  showSafeZone: boolean
  whatsappMessage: string
  whatsappPhoneNumber: string

  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: number) => void
  setFontFamily: (family: string) => void
  setDefaultTextColor: (color: string) => void
  setDefaultFill: (fill: string) => void
  setShowSafeZone: (show: boolean) => void
  setWhatsappMessage: (message: string) => void
  setWhatsappPhoneNumber: (phone: string) => void
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 48,
      fontFamily: 'system-ui',
      defaultTextColor: '#0B1F3A',
      defaultFill: '#FFFFFF',
      showSafeZone: true,
      whatsappMessage: 'Lihat gambar ini dari BCA MyCore+',
      whatsappPhoneNumber: '',

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setDefaultTextColor: (defaultTextColor) => set({ defaultTextColor }),
      setDefaultFill: (defaultFill) => set({ defaultFill }),
      setShowSafeZone: (showSafeZone) => set({ showSafeZone }),
      setWhatsappMessage: (whatsappMessage) => set({ whatsappMessage }),
      setWhatsappPhoneNumber: (whatsappPhoneNumber) =>
        set({ whatsappPhoneNumber }),
    }),
    {
      name: 'bca-mycoreplus-preferences',
    },
  ),
)
