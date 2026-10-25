import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import IndexPage from '@features/quran/pages/IndexPage'
import { SearchContext } from '@features/search/searchContext'
import { getAllSurahs } from '@features/quran/utils/quranData'

const ALL_SURAHS = getAllSurahs().length

/**
 * Render IndexPage with a given search term.
 */
function renderIndexPage(searchTerm = '') {
  return render(
    <MemoryRouter>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm: vi.fn() }}>
        <IndexPage />
      </SearchContext.Provider>
    </MemoryRouter>
  )
}

describe('IndexPage component', () => {
  it('should render the main heading', () => {
    renderIndexPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('فهرس السور')
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
    expect(container.querySelectorAll('section button')).toHaveLength(ALL_SURAHS)
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
    const gridMessage = container.querySelector('section p')
    expect(gridMessage).toHaveTextContent('لا توجد سور مطابقة للبحث')
  })

  it('should filter surahs by search term', () => {
    const { container } = renderIndexPage('الفاتحة')
    expect(container.querySelectorAll('section button')).toHaveLength(1)
  })

  it('should label each surah card for screen readers', () => {
    renderIndexPage('الفاتحة')
    expect(screen.getByLabelText(/استمع إلى سورة الفاتحة/)).toBeInTheDocument()
  })
})
