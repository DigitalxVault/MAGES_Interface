import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppState {
  // Volume preferences
  musicVolume: number
  effectsVolume: number

  // Actions
  setMusicVolume: (volume: number) => void
  setEffectsVolume: (volume: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Default volume values
      musicVolume: 0.5,
      effectsVolume: 0.7,

      // Actions
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setEffectsVolume: (volume) => set({ effectsVolume: volume }),
    }),
    {
      name: 'rt-lofi-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist volume settings
      partialize: (state) => ({
        musicVolume: state.musicVolume,
        effectsVolume: state.effectsVolume,
      }),
    }
  )
)
