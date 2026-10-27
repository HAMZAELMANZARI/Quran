import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import IndexPage from '@features/quran/pages/IndexPage'
import { SearchContext } from '@features/search/searchContext'
import { QuranDataContext } from '@features/quran/quranDataContext'
import { SURAHS } from '../fixtures/surahs'

const ALL_SURAHS = SURAHS.length

function renderIndexPage(searchTerm = '', dataOverrides = {}) {
  const retry = vi.fn()
  const data = {
    surahs: SURAHS,
    isLoading: false,
    error: null,
    retry,
    ...dataOverrides,
  }

  const result = render(
    <MemoryRouter>
      <QuranDataContext.Provider value={data}>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm: vi.fn() }}>
          <IndexPage />
        </SearchContext.Provider>
      </QuranDataContext.Provider>
    </MemoryRouter>
  )

  return { ...result, retry }
}

describe('IndexPage component', () => {
  it('should render the main heading', () => {
    renderIndexPage()
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.some((h) => h.textContent.includes('فهرس السور'))).toBe(true)
  })

  it('should expose the main content target for the skip link', () => {
    const { container } = renderIndexPage()
    const main = container.querySelector('main')
    expect(main).toHaveAttribute('id', 'main-content')
    // Must be focusable so the skip link can move focus to it
    expect(main).toHaveAttribute('tabindex', '-1')
  })

  it('should render all surahs when no search term is given', () => {
    const { container } = renderIndexPage()
    const sections = container.querySelectorAll('main > div')
    // The last card contains the surahs grid
    const lastCard = sections[sections.length - 1]
    expect(lastCard.querySelectorAll('section button')).toHaveLength(ALL_SURAHS)
  })

  it('should announce the result count in a live region', () => {
    renderIndexPage('الفاتحة')
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status.textContent).toContain('عدد النتائج')
  })

  it('should announce when there are no results', () => {
    renderIndexPage('zzzzzz-not-a-surah')
    const status = screen.getByRole('status')
    expect(status.textContent).toBe('لا توجد سور مطابقة للبحث')
  })

  it('should show a no-results message in the grid', () => {
    const { container } = renderIndexPage('zzzzzz-not-a-surah')
    // The same string also appears in the live region, so scope the query
    // to the visible grid message.
    const sections = container.querySelectorAll('main > div')
    const lastCard = sections[sections.length - 1]
    const gridMessage = lastCard.querySelector('section p')
    expect(gridMessage).toHaveTextContent('لا توجد سور مطابقة للبحث')
  })

  it('should filter surahs by search term', () => {
    const { container } = renderIndexPage('الفاتحة')
    const sections = container.querySelectorAll('main > div')
    const lastCard = sections[sections.length - 1]
    expect(lastCard.querySelectorAll('section button')).toHaveLength(1)
  })

  it('should label each surah card for screen readers', () => {
    renderIndexPage('الفاتحة')
    expect(screen.getByLabelText(/استمع إلى سورة الفاتحة/)).toBeInTheDocument()
  })

  it('should show a loading state while fetching', () => {
    renderIndexPage('', { isLoading: true, surahs: [] })
    expect(screen.getByRole('status')).toHaveTextContent('جاري التحميل...')
  })

  it('should show a retry action when loading fails', () => {
    const { retry } = renderIndexPage('', { isLoading: false, surahs: [], error: 'Network error' })

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.some((h) => h.textContent.includes('تعذر تحميل بيانات السور'))).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'إعادة المحاولة' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })
})
