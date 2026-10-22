import '@testing-library/jest-dom'
import { vi, beforeEach } from 'vitest'

// Setup localStorage spies for mocking
beforeEach(() => {
  // Clear actual localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.clear()
  }

  // Reset all spies
  vi.clearAllMocks()
})
