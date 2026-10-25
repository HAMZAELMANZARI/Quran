import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDarkMode from '@features/theme/useDarkMode'

describe('useDarkMode hook', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('should return current dark mode state as array', () => {
    const { result } = renderHook(() => useDarkMode())
    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current.length).toBe(2)

    const [isDark, toggle] = result.current
    expect(typeof isDark).toBe('boolean')
    expect(typeof toggle).toBe('function')
  })

  it('should toggle dark mode on call', () => {
    const { result } = renderHook(() => useDarkMode())
    const [isDarkBefore] = result.current

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [isDarkAfter] = result.current
    expect(isDarkAfter).toBe(!isDarkBefore)
  })

  it('should persist theme to localStorage on toggle', () => {
    const { result } = renderHook(() => useDarkMode())

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const saved = localStorage.getItem('theme')
    expect(saved).toBeTruthy()
    expect(['light', 'dark']).toContain(saved)
  })

  it('should update document class on toggle', () => {
    const { result } = renderHook(() => useDarkMode())

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [isDark] = result.current
    if (isDark) {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    } else {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    }
  })

  it('should toggle dark mode correctly', () => {
    const { result } = renderHook(() => useDarkMode())
    const [initialState] = result.current

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [afterFirstToggle] = result.current
    expect(afterFirstToggle).toBe(!initialState)
  })
})
