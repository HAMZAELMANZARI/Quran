import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuranDataContext } from './quranDataContext'
import { fetchSurahs } from './api/itqanApi'

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

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    fetchSurahs({ signal: controller.signal })
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
  }, [requestId])

  const retry = useCallback(() => {
    setState({ surahs: [], isLoading: true, error: null })
    setRequestId((current) => current + 1)
  }, [])

  const value = useMemo(
    () => ({ ...state, retry }),
    [state, retry],
  )

  return (
    <QuranDataContext.Provider value={value}>
      {children}
    </QuranDataContext.Provider>
  )
}

export default QuranDataProvider
