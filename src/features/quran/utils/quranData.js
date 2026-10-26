import { QURAN_TOTAL_SURAHS } from '@shared/utils/constants'

/**
 * @typedef {import('@types/index').Surah} Surah
 * @typedef {Object} SearchItem
 * @property {Surah} item - The surah item object
 * @property {string[]} searchValues - Array of searchable values
 */

/**
 * Lazily-built, cached search indexes keyed by surah array.
 * @type {WeakMap<Surah[], Array<SearchItem>>}
 */
const searchIndexCache = new WeakMap()

/**
 * Create a searchable index of surahs with normalized search values.
 * @param {Surah[]} surahs
 * @returns {Array<SearchItem>} Array of {item, searchValues} objects
 */
export function createSearchIndex(surahs) {
  if (!Array.isArray(surahs)) return []

  const cached = searchIndexCache.get(surahs)
  if (cached) return cached

  /** @type {Array<SearchItem>} */
  const index = surahs.map((item) => ({
    item,
    searchValues: [
      item.surah_name.toLocaleLowerCase(),
      item.surah_name_en.toLocaleLowerCase(),
      item.surah_number.toString(),
      item.revelation_place.toLocaleLowerCase(),
    ],
  }))

  searchIndexCache.set(surahs, index)

  return index
}

/**
 * Filter surahs by search term across multiple fields.
 * Searches: Arabic name, English name, number, revelation place.
 * @param {Surah[]} surahs
 * @param {string} searchTerm
 * @returns {Surah[]} Filtered surah list
 */
export function filterSurahs(surahs, searchTerm) {
  if (!Array.isArray(surahs)) return []
  if (!searchTerm || !searchTerm.trim()) return surahs

  const normalized = searchTerm.trim().toLocaleLowerCase()

  return createSearchIndex(surahs)
    .filter(({ searchValues }) => searchValues.some((value) => value.includes(normalized)))
    .map(({ item }) => item)
}

/**
 * Get surah by number (1-114).
 * @param {Surah[]} surahs
 * @param {number} surahNumber
 * @returns {Surah|null} Surah object or null if not found
 */
export function getSurahByNumber(surahs, surahNumber) {
  if (!Array.isArray(surahs)) return null
  return surahs.find((surah) => surah.surah_number === Number(surahNumber)) || null
}

/**
 * Get the index/position of a surah in the data array.
 * @param {Surah[]} surahs
 * @param {number} surahNumber
 * @returns {number} Index in the array (-1 if not found)
 */
export function getSurahIndex(surahs, surahNumber) {
  if (!Array.isArray(surahs)) return -1
  return surahs.findIndex((surah) => surah.surah_number === Number(surahNumber))
}

/**
 * Get previous and next surahs for navigation.
 * @param {Surah[]} surahs
 * @param {number} surahNumber
 * @returns {{ previous: Surah|null, next: Surah|null }}
 */
export function getAdjacentSurahs(surahs, surahNumber) {
  const index = getSurahIndex(surahs, surahNumber)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: index > 0 ? surahs[index - 1] : null,
    next: index < surahs.length - 1 ? surahs[index + 1] : null,
  }
}

/**
 * Get all surahs as a copy.
 * @param {Surah[]} surahs
 * @returns {Surah[]} Full surah list
 */
export function getAllSurahs(surahs) {
  return Array.isArray(surahs) ? [...surahs] : []
}

/**
 * Check if a surah number is valid.
 * @param {number} surahNumber - Surah number to check
 * @returns {boolean} True if valid (1-114)
 */
export function isValidSurahNumber(surahNumber) {
  const num = Number(surahNumber)
  return Number.isInteger(num) && num >= 1 && num <= QURAN_TOTAL_SURAHS
}
