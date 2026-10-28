/**
 * Security utilities
 * Provides helper functions for secure coding practices
 */

/**
 * Sanitize error message for display to users
 * Removes sensitive information like file paths, stack traces in production
 * @param {Error|string} error
 * @returns {string}
 */
export function sanitizeErrorMessage(error) {
  if (import.meta.env?.DEV) {
    return error instanceof Error ? error.message : String(error)
  }
  
  if (error instanceof Error) {
    // In production, return generic message
    return 'An error occurred. Please try again.'
  }
  
  return 'An error occurred. Please try again.'
}

/**
 * Validate URL is safe (HTTPS only for external resources)
 * @param {string} url
 * @returns {boolean}
 */
export function isSafeUrl(url) {
  try {
    const parsed = new URL(url)
    // Only allow HTTPS for external resources
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Create a fetch request with timeout
 * @param {string} url
 * @param {RequestInit} options
 * @param {number} timeoutMs
 * @returns {Promise<Response>}
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Check if running in secure context
 * @returns {boolean}
 */
export function isSecureContext() {
  if (typeof window === 'undefined') return true
  return window.isSecureContext || location.protocol === 'https:'
}

export default {
  sanitizeErrorMessage,
  isSafeUrl,
  fetchWithTimeout,
  isSecureContext,
}
