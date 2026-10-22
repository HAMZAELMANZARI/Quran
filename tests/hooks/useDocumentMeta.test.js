import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import useDocumentMeta from '@hooks/useDocumentMeta'

describe('useDocumentMeta hook', () => {
  beforeEach(() => {
    document.title = 'Original Title'
    const meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      const created = document.createElement('meta')
      created.setAttribute('name', 'description')
      created.setAttribute('content', 'Original description')
      document.head.appendChild(created)
    } else {
      meta.setAttribute('content', 'Original description')
    }
  })

  it('should set the document title', () => {
    renderHook(() => useDocumentMeta('New Title'))
    expect(document.title).toBe('New Title')
  })

  it('should set the meta description', () => {
    renderHook(() => useDocumentMeta('Title', 'New description'))
    const meta = document.querySelector('meta[name="description"]')
    expect(meta.getAttribute('content')).toBe('New description')
  })

  it('should leave the title unchanged when no title is given', () => {
    renderHook(() => useDocumentMeta())
    expect(document.title).toBe('Original Title')
  })

  it('should restore the previous title on unmount', () => {
    const { unmount } = renderHook(() => useDocumentMeta('Temporary'))
    expect(document.title).toBe('Temporary')
    unmount()
    expect(document.title).toBe('Original Title')
  })

  it('should restore the previous description on unmount', () => {
    const { unmount } = renderHook(() => useDocumentMeta('Title', 'Temporary description'))
    const meta = document.querySelector('meta[name="description"]')
    expect(meta.getAttribute('content')).toBe('Temporary description')
    unmount()
    expect(meta.getAttribute('content')).toBe('Original description')
  })

  it('should update when the title changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentMeta(title), {
      initialProps: { title: 'First' },
    })
    expect(document.title).toBe('First')

    rerender({ title: 'Second' })
    expect(document.title).toBe('Second')
  })
})
