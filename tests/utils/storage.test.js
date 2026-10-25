import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as storage from '@shared/utils/storage'

describe('storage utility', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear()
    }
  })

  // getItem tests
  describe('getItem', () => {
    it('should retrieve stored item from localStorage', () => {
      window.localStorage.setItem('test-key', 'test-value')
      expect(storage.getItem('test-key')).toBe('test-value')
    })

    it('should return default value if item does not exist', () => {
      expect(storage.getItem('non-existent', 'default')).toBe('default')
    })

    it('should return null as default if not specified', () => {
      expect(storage.getItem('non-existent')).toBeNull()
    })
  })

  // setItem tests
  describe('setItem', () => {
    it('should store item in localStorage', () => {
      const success = storage.setItem('test-key', 'test-value')
      expect(success).toBe(true)
      expect(window.localStorage.getItem('test-key')).toBe('test-value')
    })

    it('should return true on successful store', () => {
      expect(storage.setItem('key', 'value')).toBe(true)
    })

    it('should handle multiple items', () => {
      storage.setItem('key1', 'value1')
      storage.setItem('key2', 'value2')
      expect(storage.getItem('key1')).toBe('value1')
      expect(storage.getItem('key2')).toBe('value2')
    })

    it('should overwrite existing values', () => {
      storage.setItem('key', 'value1')
      storage.setItem('key', 'value2')
      expect(storage.getItem('key')).toBe('value2')
    })
  })

  // removeItem tests
  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      window.localStorage.setItem('test-key', 'test-value')
      expect(storage.removeItem('test-key')).toBe(true)
      expect(window.localStorage.getItem('test-key')).toBeNull()
    })

    it('should return true even if item does not exist', () => {
      expect(storage.removeItem('non-existent')).toBe(true)
    })

    it('should not affect other items', () => {
      storage.setItem('key1', 'value1')
      storage.setItem('key2', 'value2')
      storage.removeItem('key1')
      expect(storage.getItem('key1')).toBeNull()
      expect(storage.getItem('key2')).toBe('value2')
    })
  })

  // clear tests
  describe('clear', () => {
    it('should clear all localStorage items', () => {
      window.localStorage.setItem('key1', 'value1')
      window.localStorage.setItem('key2', 'value2')
      expect(storage.clear()).toBe(true)
      expect(window.localStorage.length).toBe(0)
    })

    it('should work on empty storage', () => {
      expect(storage.clear()).toBe(true)
    })
  })

  // isAvailable tests
  describe('isAvailable', () => {
    it('should return true if localStorage is available', () => {
      expect(storage.isAvailable()).toBe(true)
    })

    it('should verify storage is writable', () => {
      const result = storage.isAvailable()
      expect(typeof result).toBe('boolean')
      // If available, it should be true in normal environment
      if (typeof window !== 'undefined') {
        expect(result).toBe(true)
      }
    })
  })

  // getJSON tests
  describe('getJSON', () => {
    it('should parse JSON from localStorage', () => {
      const data = { key: 'value', number: 42 }
      window.localStorage.setItem('json-key', JSON.stringify(data))
      expect(storage.getJSON('json-key')).toEqual(data)
    })

    it('should return default value if item does not exist', () => {
      const defaultData = { default: true }
      expect(storage.getJSON('non-existent', defaultData)).toEqual(defaultData)
    })

    it('should return default value if JSON is invalid', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      try {
        window.localStorage.setItem('bad-json', 'not valid json')
        const defaultData = { default: true }
        expect(storage.getJSON('bad-json', defaultData)).toEqual(defaultData)
        expect(warnSpy).toHaveBeenCalledOnce()
      } finally {
        warnSpy.mockRestore()
      }
    })

    it('should handle arrays', () => {
      const array = [1, 2, 3]
      window.localStorage.setItem('array-key', JSON.stringify(array))
      expect(storage.getJSON('array-key')).toEqual(array)
    })

    it('should handle nested objects', () => {
      const data = { nested: { deep: { value: 'test' } } }
      window.localStorage.setItem('nested', JSON.stringify(data))
      expect(storage.getJSON('nested')).toEqual(data)
    })
  })

  // setJSON tests
  describe('setJSON', () => {
    it('should stringify and store JSON', () => {
      const data = { key: 'value', number: 42 }
      expect(storage.setJSON('json-key', data)).toBe(true)
      expect(JSON.parse(window.localStorage.getItem('json-key'))).toEqual(data)
    })

    it('should handle arrays', () => {
      const array = [1, 2, 3]
      expect(storage.setJSON('array-key', array)).toBe(true)
      expect(JSON.parse(window.localStorage.getItem('array-key'))).toEqual(array)
    })

    it('should handle strings', () => {
      expect(storage.setJSON('string-key', 'test-value')).toBe(true)
      expect(storage.getJSON('string-key')).toBe('test-value')
    })

    it('should handle numbers', () => {
      expect(storage.setJSON('number-key', 42)).toBe(true)
      expect(storage.getJSON('number-key')).toBe(42)
    })

    it('should handle booleans', () => {
      expect(storage.setJSON('bool-key', true)).toBe(true)
      expect(storage.getJSON('bool-key')).toBe(true)
    })

    it('should handle null', () => {
      expect(storage.setJSON('null-key', null)).toBe(true)
      expect(storage.getJSON('null-key')).toBe(null)
    })
  })

  // storage object export
  describe('storage object', () => {
    it('should export all methods', () => {
      expect(storage.storage).toHaveProperty('getItem')
      expect(storage.storage).toHaveProperty('setItem')
      expect(storage.storage).toHaveProperty('removeItem')
      expect(storage.storage).toHaveProperty('clear')
      expect(storage.storage).toHaveProperty('isAvailable')
      expect(storage.storage).toHaveProperty('getJSON')
      expect(storage.storage).toHaveProperty('setJSON')
    })

    it('should work the same as individual exports', () => {
      const data = { test: 'data' }
      storage.storage.setJSON('test', data)
      expect(storage.storage.getJSON('test')).toEqual(data)
    })

    it('should be usable for theme storage', () => {
      storage.storage.setItem('theme', 'dark')
      expect(storage.storage.getItem('theme')).toBe('dark')
      storage.storage.setItem('theme', 'light')
      expect(storage.storage.getItem('theme')).toBe('light')
    })
  })

  // Integration tests
  describe('integration', () => {
    it('should work with typical theme use case', () => {
      // Save theme
      storage.setItem('theme', 'dark')
      expect(storage.getItem('theme')).toBe('dark')

      // Update theme
      storage.setItem('theme', 'light')
      expect(storage.getItem('theme')).toBe('light')

      // Remove theme
      storage.removeItem('theme')
      expect(storage.getItem('theme', 'default')).toBe('default')
    })

    it('should work with complex data structures', () => {
      const appState = {
        theme: 'dark',
        user: { name: 'Test', id: 123 },
        preferences: ['a', 'b', 'c'],
      }
      storage.setJSON('app-state', appState)
      expect(storage.getJSON('app-state')).toEqual(appState)
    })
  })
})

