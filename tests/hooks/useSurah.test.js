import { createElement } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSurah } from '@features/quran/hooks/useSurah'
import { QuranDataContext } from '@features/quran/quranDataContext'
import { SURAHS } from '../fixtures/surahs'

function createWrapper(overrides = {}) {
  const value = {
    surahs: SURAHS,
    isLoading: false,
    error: null,
    retry: vi.fn(),
    ...overrides,
  }

  return function Wrapper({ children }) {
    return createElement(QuranDataContext.Provider, { value }, children)
  }
}

describe('useSurah hook', () => {
  it('should resolve surah by number', () => {
    const { result } = renderHook(() => useSurah(1), { wrapper: createWrapper() })
    expect(result.current.surah).toBeDefined()
    expect(result.current.surah.surah_number).toBe(1)
    expect(result.current.surah.surah_name).toBe('الفاتحة')
  })

  it('should provide adjacent surahs for middle surah', () => {
    const { result } = renderHook(() => useSurah(2), { wrapper: createWrapper() })
    expect(result.current.previous).toBeDefined()
    expect(result.current.previous.surah_number).toBe(1)
    expect(result.current.next).toBeDefined()
    expect(result.current.next.surah_number).toBe(3)
  })

  it('should return null for invalid surah', () => {
    const { result } = renderHook(() => useSurah(999), { wrapper: createWrapper() })
    expect(result.current.surah).toBeNull()
    expect(result.current.isValid).toBe(false)
  })

  it('should handle first surah (no previous)', () => {
    const { result } = renderHook(() => useSurah(1), { wrapper: createWrapper() })
    expect(result.current.previous).toBeNull()
    expect(result.current.next).toBeDefined()
    expect(result.current.next.surah_number).toBe(2)
    expect(result.current.isValid).toBe(true)
  })

  it('should handle last surah (no next)', () => {
    const { result } = renderHook(() => useSurah(114), { wrapper: createWrapper() })
    expect(result.current.previous).toBeDefined()
    expect(result.current.previous.surah_number).toBe(113)
    expect(result.current.next).toBeNull()
    expect(result.current.isValid).toBe(true)
  })

  it('should have isValid true for valid surahs', () => {
    const { result: result1 } = renderHook(() => useSurah(1), { wrapper: createWrapper() })
    expect(result1.current.isValid).toBe(true)

    const { result: result57 } = renderHook(() => useSurah(57), { wrapper: createWrapper() })
    expect(result57.current.isValid).toBe(true)

    const { result: result114 } = renderHook(() => useSurah(114), { wrapper: createWrapper() })
    expect(result114.current.isValid).toBe(true)
  })

  it('should have isValid false for invalid surahs', () => {
    const { result: resultZero } = renderHook(() => useSurah(0), { wrapper: createWrapper() })
    expect(resultZero.current.isValid).toBe(false)

    const { result: resultNegative } = renderHook(() => useSurah(-1), { wrapper: createWrapper() })
    expect(resultNegative.current.isValid).toBe(false)

    const { result: resultOver } = renderHook(() => useSurah(115), { wrapper: createWrapper() })
    expect(resultOver.current.isValid).toBe(false)
  })

  it('should expose the loading state from the provider', () => {
    const { result } = renderHook(() => useSurah(1), {
      wrapper: createWrapper({ surahs: [], isLoading: true }),
    })
    expect(result.current.isLoading).toBe(true)
    expect(result.current.surah).toBeNull()
  })

  it('should have null error for valid surahs', () => {
    const { result } = renderHook(() => useSurah(1), { wrapper: createWrapper() })
    expect(result.current.error).toBeNull()
  })

  it('should expose provider errors', () => {
    const { result } = renderHook(() => useSurah(1), {
      wrapper: createWrapper({ error: 'Network error' }),
    })
    expect(result.current.error).toBe('Network error')
  })
})
