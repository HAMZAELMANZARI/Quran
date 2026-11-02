import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { queryClient } from './queryClient'
import { QuranDataProvider } from '@features/quran/QuranDataProvider'
import { SearchProvider } from '@features/search/SearchProvider'
import { preloadSurahPage } from '@features/quran/pages/surahPageLoader'
import { ROUTES } from '@shared/utils/constants'

const IndexPage = lazy(() => import('@features/quran/pages/IndexPage'))
const SearchPage = lazy(() => import('@features/search/SearchPage'))
const SurahPage = lazy(preloadSurahPage)

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/Quran/">
        <QuranDataProvider>
          <SearchProvider>
            <App>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path={ROUTES.HOME} element={<IndexPage />} />
                  <Route path={ROUTES.SEARCH} element={<SearchPage />} />
                  <Route path={ROUTES.SURAH} element={<SurahPage />} />
                  <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
              </Suspense>
            </App>
          </SearchProvider>
        </QuranDataProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

