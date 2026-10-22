import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/css/tailwind.css'
import AppRouter from './src/router'
import ErrorBoundary from './src/components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>,
)

