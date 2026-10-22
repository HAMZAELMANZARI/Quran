import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '@components/ErrorBoundary'

// Suppress console.error for these tests (it's expected)
const originalError = console.error
beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalError
})

// Test component that throws an error
function ThrowError({ shouldThrow = false }) {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

describe('ErrorBoundary component', () => {
  it('should render children when there is no error', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )
    expect(container.textContent).toContain('Test content')
  })

  it('should display error message when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText(/حدث خطأ في التطبيق/i)).toBeInTheDocument()
    expect(screen.getByText(/An error occurred in the application/i)).toBeInTheDocument()
  })

  it('should display error details', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument()
  })

  it('should have a reload button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    const reloadButton = screen.getByRole('button', { name: /إعادة تحميل الصفحة/i })
    expect(reloadButton).toBeInTheDocument()
  })

  it('should show error icon and details section', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(container.textContent).toContain('⚠️')
    expect(screen.getByText(/Error Details:/i)).toBeInTheDocument()
  })

  it('should show support link', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    const supportLink = screen.getByText(/report the issue/i)
    expect(supportLink).toBeInTheDocument()
    expect(supportLink.closest('a')).toHaveAttribute('href', expect.stringContaining('github.com'))
  })

  it('should be accessible with proper structure', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
