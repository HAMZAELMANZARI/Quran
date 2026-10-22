import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkipLink from '@components/common/SkipLink'

describe('SkipLink component', () => {
  it('should render a skip link', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('should point to the main content anchor', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('should be visually hidden until focused', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    // sr-only keeps it out of the visual flow; focus:not-sr-only reveals it
    expect(link.className).toContain('sr-only')
    expect(link.className).toContain('focus:not-sr-only')
  })

  it('should have an accessible label in Arabic', () => {
    render(<SkipLink />)
    expect(screen.getByText(/تخطَّ إلى المحتوى الرئيسي/)).toBeInTheDocument()
  })
})
