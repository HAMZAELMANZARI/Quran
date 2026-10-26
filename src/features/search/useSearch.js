import { useMemo } from 'react'
import { filterSurahs } from '@features/quran/utils/quranData'
import { useQuranData } from '@features/quran/hooks/useQuranData'

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
 * @returns {import('@types/index').Surah[]} Filtered array of surah objects
 */
export function useSearch(searchTerm = '') {
  const { surahs } = useQuranData()

  return useMemo(() => {
    return filterSurahs(surahs, searchTerm)
  }, [surahs, searchTerm])
}

export default useSearch
