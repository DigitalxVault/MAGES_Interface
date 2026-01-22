'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { Howler } from 'howler'
import { useAppStore } from '@/stores/appStore'

interface AudioContextValue {
  isUnlocked: boolean
  unlock: () => Promise<void>
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Rehydrate Zustand store from localStorage on client mount
  useEffect(() => {
    useAppStore.persist.rehydrate()
  }, [])

  const unlock = async () => {
    // Early return if already unlocked
    if (isUnlocked) return

    // Check if Howler audio context exists and is suspended
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      await Howler.ctx.resume()
    }

    setIsUnlocked(true)
  }

  return (
    <AudioContext.Provider value={{ isUnlocked, unlock }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
