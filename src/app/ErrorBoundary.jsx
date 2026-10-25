import { Component } from 'react'

/**
 * Error Boundary component that catches React errors
 * Displays user-friendly error message in Arabic/English
 * Provides reload button for recovery
 */
export default class ErrorBoundary extends Component {
  /** @param {import('react').ComponentProps<typeof ErrorBoundary>} props */
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  /** @param {Error} error */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  /** @param {Error} error - The error that was thrown */
  /** @param {import('react').ErrorInfo} errorInfo */
  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReload = () => {
    // Reset state and reload page
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col">
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
              {/* Error Icon */}
              <div className="mb-4 text-4xl">⚠️</div>

              {/* Arabic Error Message */}
              <h1 className="mb-2 text-2xl font-bold text-red-800 dark:text-red-200">
                حدث خطأ في التطبيق
              </h1>

              {/* English Error Message */}
              <p className="mb-4 text-sm text-red-700 dark:text-red-300">
                An error occurred in the application
              </p>

              {/* Error Details */}
              <div className="mb-4 rounded bg-red-100 p-4 font-mono text-xs text-red-900 dark:bg-red-900 dark:text-red-100">
                <p className="mb-2 font-bold">Error Details:</p>
                <p className="break-words">{this.state.error?.toString()}</p>
                {import.meta.env?.DEV && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer font-bold">Stack Trace</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-xs">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              {/* Help Text */}
              <p className="mb-6 text-sm text-red-700 dark:text-red-300">
                Please try reloading the page. If the problem persists, please contact support.
              </p>

              {/* Reload Button */}
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 rounded-lg bg-red-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 dark:focus:ring-offset-red-950"
              >
                <span>🔄</span>
                <span>إعادة تحميل الصفحة</span>
              </button>

              {/* Support Link */}
              <p className="mt-6 text-xs text-red-600 dark:text-red-400">
                If you continue to experience issues, please{' '}
                <a
                  href="https://github.com/HAMZAELMANZARI/Quran/issues"
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  report the issue
                </a>
                .
              </p>
            </div>
          </main>
        </div>
      )
    }

    return this.props.children
  }
}
