import { useMemo } from 'react'
import { getSurahByNumber, getAdjacentSurahs, isValidSurahNumber } from '../utils/quranData'
import { useQuranData } from './useQuranData'

/**
 * Custom hook for resolving a surah and its neighbors from fetched data.
 *
 * @param {number|string} surahNumber - The surah number (1-114)
 * @returns {Object} Object containing:
 *   - surah: The surah object or null
 *   - previous: Previous surah object or null
 *   - next: Next surah object or null
 *   - isValid: Whether the surah number is valid
 *   - isLoading: Whether the surah list is still loading
 *   - error: Error message if any
 */
export function useSurah(surahNumber) {
  const { surahs, isLoading, error: loadError } = useQuranData()

  const isValid = useMemo(() => {
    return isValidSurahNumber(Number(surahNumber))
  }, [surahNumber])

  const surah = useMemo(() => {
    if (!surahNumber || !isValid) return null
    return getSurahByNumber(surahs, Number(surahNumber))
  }, [surahs, surahNumber, isValid])

  const { previous, next } = useMemo(() => {
    if (!surah) return { previous: null, next: null }
    return getAdjacentSurahs(surahs, surah.surah_number)
  }, [surahs, surah])

  return {
    surah,
    previous,
    next,
    isValid,
    isLoading,
    error: loadError || (surahNumber && !isValid ? 'Invalid surah number' : null),
  }
}

export default useSurah
