import { describe, it, expect, beforeEach } from 'vitest'
import {
  getSystemTheme,
  getSavedTheme,
  saveTheme,
  applyTheme,
  getInitialTheme,
} from '@features/theme/themeUtils'

describe('themeUtils', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  // getSavedTheme tests
  it('should get saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    expect(getSavedTheme()).toBe('dark')
  })

  it('should return null if no saved theme', () => {
    expect(getSavedTheme()).toBeNull()
  })

  // saveTheme tests
  it('should save theme to localStorage', () => {
    saveTheme('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should save light theme', () => {
    saveTheme('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  // applyTheme tests
  it('should apply dark theme to document', () => {
    applyTheme('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should apply light theme to document', () => {
    document.documentElement.classList.add('dark')
    applyTheme('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  // getInitialTheme tests
  it('should respect saved theme over system', () => {
    localStorage.setItem('theme', 'light')
    expect(getInitialTheme()).toBe('light')
  })

  it('should fall back to system theme if no saved theme', () => {
    const theme = getInitialTheme()
    expect(['light', 'dark']).toContain(theme)
  })

  // getSystemTheme tests
  it('should return system theme preference', () => {
    const theme = getSystemTheme()
    expect(['light', 'dark']).toContain(theme)
  })

  it('should return a string', () => {
    expect(typeof getSystemTheme()).toBe('string')
  })
})
