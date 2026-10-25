import { useMemo } from 'react'
import { getSurahByNumber, getAdjacentSurahs, isValidSurahNumber } from '../utils/quranData'

/**
 * Custom hook for fetching and managing surah data
 * Handles surah lookup, previous/next navigation, and error states
 *
 * @param {number|string} surahNumber - The surah number (1-114)
 * @returns {Object} Object containing:
 *   - surah: The surah object or null
 *   - previous: Previous surah object or null
 *   - next: Next surah object or null
 *   - isValid: Whether the surah number is valid
 *   - error: Error message if any
 */
export function useSurah(surahNumber) {
  const surah = useMemo(() => {
    if (!surahNumber) return null

    const num = Number(surahNumber)
    if (!isValidSurahNumber(num)) {
      return null
    }

    return getSurahByNumber(num)
  }, [surahNumber])

  const { previous, next } = useMemo(() => {
    if (!surah) return { previous: null, next: null }
    return getAdjacentSurahs(surah.surah_number)
  }, [surah])

  const isValid = useMemo(() => {
    return isValidSurahNumber(Number(surahNumber))
  }, [surahNumber])

  return {
    surah,
    previous,
    next,
    isValid,
    isLoading: false, // No async loading for bundled data
    error: surahNumber && !isValid ? 'Invalid surah number' : null,
  }
}

export default useSurah
