import { getItem, setItem } from '@shared/utils/storage'

/**
 * Get a CSS custom property value from the root element
 * @param {string} varName - CSS variable name (without --)
 * @returns {string} The CSS variable value
 */
export function getThemeVariable(varName) {
  if (typeof window === 'undefined') return ''
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim()
  return value
}

/**
 * Check if dark mode is currently active
 * @returns {boolean} True if dark mode class is present
 */
export function isDarkMode() {
  if (typeof window === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

/**
 * Toggle dark mode class on root element
 * @param {boolean} force - Optional: force on/off (true=on, false=off)
 * @returns {boolean} New dark mode state
 */
export function toggleDarkMode(force) {
  if (typeof window === 'undefined') return false

  const html = document.documentElement
  if (force !== undefined) {
    html.classList.toggle('dark', force)
    return force
  }

  html.classList.toggle('dark')
  return isDarkMode()
}

/**
 * Apply a specific theme (light or dark)
 * @param {string} theme - 'light' or 'dark'
 */
export function applyTheme(theme) {
  if (typeof window === 'undefined') return
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
}

/**
 * Get the current theme value from localStorage
 * Uses safe storage to handle errors gracefully
 * @returns {string|null} Saved theme or null
 */
export function getSavedTheme() {
  if (typeof window === 'undefined') return null
  return getItem('theme', null)
}

/**
 * Save theme preference to localStorage
 * Uses safe storage to handle errors gracefully
 * @param {string} theme - Theme value ('light' or 'dark')
 * @returns {boolean} Success status
 */
export function saveTheme(theme) {
  if (typeof window === 'undefined') return false
  return setItem('theme', theme)
}

/**
 * Get system color scheme preference
 * @returns {string} 'light' or 'dark'
 */
export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * Get initial theme preference
 * Priority: saved preference > system preference > default (light)
 * @returns {string} Theme value ('light' or 'dark')
 */
export function getInitialTheme() {
  const saved = getSavedTheme()
  if (saved) return saved
  return getSystemTheme()
}
