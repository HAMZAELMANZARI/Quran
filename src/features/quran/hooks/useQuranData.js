import { useContext } from 'react'
import { QuranDataContext } from '../quranDataContext'

/**
 * Access the shared Quran data fetched from the Itqan API.
 * @returns {import('../quranDataContext').QuranDataContextValue}
 */
export function useQuranData() {
  const context = useContext(QuranDataContext)

  if (!context) {
    throw new Error('useQuranData must be used within a QuranDataProvider')
  }

  return context
}

export default useQuranData
