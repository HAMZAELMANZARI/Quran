/**
 * Safe localStorage wrapper that handles errors gracefully
 * Protects against:
 * - Private browsing mode (localStorage not available)
 * - Storage quota exceeded
 * - SSR environments (no window object)
 * - Permission denied errors
 */

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Value to return if not found or error occurs
 * @returns {*} Stored value or default value
 */
export function getItem(key, defaultValue = null) {
  try {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    const item = window.localStorage?.getItem(key)
    return item ?? defaultValue
  } catch (error) {
    console.warn(`Failed to read from localStorage (key: "${key}"):`, error.message)
    return defaultValue
  }
}

/**
 * Safely set item in localStorage
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 * @returns {boolean} True if successful, false otherwise
 */
export function setItem(key, value) {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    window.localStorage?.setItem(key, value)
    return true
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn(`localStorage quota exceeded when setting "${key}"`)
    } else if (error.name === 'SecurityError') {
      console.warn(`Access denied to localStorage when setting "${key}"`)
    } else {
      console.warn(`Failed to write to localStorage (key: "${key}"):`, error.message)
    }
    return false
  }
}

/**
 * Safely remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if successful, false otherwise
 */
export function removeItem(key) {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    window.localStorage?.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Failed to remove from localStorage (key: "${key}"):`, error.message)
    return false
  }
}

/**
 * Safely clear all localStorage items
 * @returns {boolean} True if successful, false otherwise
 */
export function clear() {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    window.localStorage?.clear()
    return true
  } catch (error) {
    console.warn('Failed to clear localStorage:', error.message)
    return false
  }
}

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is accessible
 */
export function isAvailable() {
  try {
    if (typeof window === 'undefined') {
      return false
    }
    const test = '__storage_test__'
    window.localStorage?.setItem(test, test)
    window.localStorage?.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Safely get and parse JSON from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Value to return if not found or parse fails
 * @returns {*} Parsed JSON or default value
 */
export function getJSON(key, defaultValue = null) {
  try {
    const item = getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Failed to parse JSON from localStorage (key: "${key}"):`, error.message)
    return defaultValue
  }
}

/**
 * Safely stringify and save JSON to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to stringify and store
 * @returns {boolean} True if successful, false otherwise
 */
export function setJSON(key, value) {
  try {
    const json = JSON.stringify(value)
    return setItem(key, json)
  } catch (error) {
    console.warn(`Failed to stringify and save to localStorage (key: "${key}"):`, error.message)
    return false
  }
}

// Export as object for consistent API
export const storage = {
  getItem,
  setItem,
  removeItem,
  clear,
  isAvailable,
  getJSON,
  setJSON,
}

export default storage
