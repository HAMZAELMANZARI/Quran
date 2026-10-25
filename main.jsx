import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './src/shared/styles/tailwind.css'
import AppRouter from './src/app/AppRouter'
import ErrorBoundary from './src/app/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>,
)

