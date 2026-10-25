import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import { SearchProvider } from '@features/search/SearchProvider'

const IndexPage = lazy(() => import('@features/quran/pages/IndexPage'))
const SurahPage = lazy(() => import('@features/quran/pages/SurahPage'))

const LoadingFallback = () => (
  <main className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-(--text-primary)">جاري التحميل...</p>
    </div>
  </main>
)

export default function AppRouter() {
  return (
    <BrowserRouter basename="/Quran/">
      <SearchProvider>
        <App>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/surah/:number" element={<SurahPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </App>
      </SearchProvider>
    </BrowserRouter>
  )
}

