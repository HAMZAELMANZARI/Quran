import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuranDataContext } from './quranDataContext'
import { fetchSurahs } from './api/itqanApi'
import { config } from '@shared/config/env'

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function QuranDataProvider({ children }) {
  const [state, setState] = useState({
    surahs: [],
    isLoading: true,
    error: null,
  })
  const [requestId, setRequestId] = useState(0)
  const [recitationId, setRecitationId] = useState(
    config.itqanRecitationId,
  )

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    fetchSurahs({ signal: controller.signal, recitationId })
      .then((surahs) => {
        if (!cancelled) {
          setState({ surahs, isLoading: false, error: null })
        }
      })
      .catch((error) => {
        if (cancelled || error.name === 'AbortError') {
          return
        }

        setState({
          surahs: [],
          isLoading: false,
          error: error.message || 'Failed to load surah data',
        })
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [requestId, recitationId])

  const retry = useCallback(() => {
    setState({ surahs: [], isLoading: true, error: null })
    setRequestId((current) => current + 1)
  }, [])

  const handleSetRecitationId = useCallback((id) => {
    setState({ surahs: [], isLoading: true, error: null })
    setRecitationId(id)
    setRequestId((current) => current + 1)
  }, [])

  const value = useMemo(
    () => ({ ...state, retry, recitationId, setRecitationId: handleSetRecitationId }),
    [state, retry, recitationId, handleSetRecitationId],
  )

  return (
    <QuranDataContext.Provider value={value}>
      {children}
    </QuranDataContext.Provider>
  )
}

export default QuranDataProvider
