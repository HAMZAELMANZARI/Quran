
import { useEffect, useState } from 'react'
import { getItem, setItem } from '@shared/utils/storage'

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = getItem('theme')
    if (savedTheme) return savedTheme === 'dark'

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    document.documentElement.classList.toggle('dark', isDarkMode)

    if (getItem('theme')) return
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mediaQuery) return
    /** @type {() => void} */
    const handleChange = (event) => setIsDarkMode(event.matches)

    mediaQuery.addEventListener?.('change', handleChange)

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange)
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    const nextIsDarkMode = !isDarkMode
    const success = setItem('theme', nextIsDarkMode ? 'dark' : 'light')
    if (success) {
      setIsDarkMode(nextIsDarkMode)
    } else {
      console.warn('Failed to save theme preference, using in-memory state')
      // Still update state even if storage fails
      setIsDarkMode(nextIsDarkMode)
    }
  }

  return [isDarkMode, toggleDarkMode]
}