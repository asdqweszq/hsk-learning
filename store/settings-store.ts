import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  uiLanguage: 'zh' | 'en'
  audioSpeed: number
  showPinyin: boolean
  showTranslation: boolean
  autoPlay: boolean
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setUiLanguage: (lang: 'zh' | 'en') => void
  setAudioSpeed: (speed: number) => void
  setShowPinyin: (show: boolean) => void
  setShowTranslation: (show: boolean) => void
  setAutoPlay: (auto: boolean) => void
  loadFromServer: (settings: Partial<SettingsState>) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      uiLanguage: 'zh',
      audioSpeed: 1.0,
      showPinyin: true,
      showTranslation: true,
      autoPlay: false,
      setTheme: (theme) => set({ theme }),
      setUiLanguage: (uiLanguage) => set({ uiLanguage }),
      setAudioSpeed: (audioSpeed) => set({ audioSpeed }),
      setShowPinyin: (showPinyin) => set({ showPinyin }),
      setShowTranslation: (showTranslation) => set({ showTranslation }),
      setAutoPlay: (autoPlay) => set({ autoPlay }),
      loadFromServer: (settings) => set(settings as Partial<SettingsState>),
    }),
    { name: 'hsk-settings' }
  )
)
