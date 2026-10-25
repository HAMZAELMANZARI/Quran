import { useMemo } from 'react'
import { filterSurahs } from '@features/quran/utils/quranData'

/**
 * Custom hook for searching and filtering surahs
 * Memoizes the filtered results to prevent unnecessary recalculations
 *
 * Search fields:
 * - Arabic surah name (surah_name)
 * - English surah name (surah_name_en)
 * - Surah number
 * - Revelation place (Makkah/Madinah)
 *
 * @param {string} searchTerm - Search query string
 * @returns {Array<{item: Object}>} Filtered array of surah objects
 */
/**
 * @param {string} searchTerm - Search query string
 * @returns {import('../data/quran').Surah[]} Filtered array of surah objects
 */
export function useSearch(searchTerm = '') {
  const filteredResults = useMemo(() => {
    return filterSurahs(searchTerm)
  }, [searchTerm])

  return filteredResults
}

export default useSearch
