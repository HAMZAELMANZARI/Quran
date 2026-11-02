import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QuranDataContext } from './quranDataContext'
import { surahsQueryOptions } from './api/quranQueries'
import { config } from '@shared/config/env'

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function QuranDataProvider({ children }) {
  const [recitationId, setRecitationIdState] = useState(
    /** @type {string|number} */ (config.itqanRecitationId),
  )
  const { data, isPending, error, refetch } = useQuery(
    surahsQueryOptions(recitationId),
  )

  const setRecitationId = useCallback((/** @type {string|number} */ id) => {
    setRecitationIdState(id)
  }, [])

  const retry = useCallback(() => {
    refetch()
  }, [refetch])

  const value = useMemo(
    () => ({
      surahs: data ?? [],
      isLoading: isPending,
      error: error ? error.message || 'Failed to load surah data' : null,
      retry,
      recitationId,
      setRecitationId,
    }),
    [data, isPending, error, retry, recitationId, setRecitationId],
  )

  return (
    <QuranDataContext.Provider value={value}>
      {children}
    </QuranDataContext.Provider>
  )
}

export default QuranDataProvider
