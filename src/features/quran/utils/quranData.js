import Data from '../data/quran'

/**
 * @typedef {Object} SearchItem
 * @property {Object} item - The surah item object
 * @property {string[]} searchValues - Array of searchable values
 */

/**
 * Lazily-built, cached search index.
 * The Quran dataset is static, so the index is built once and reused
 * instead of being rebuilt on every keystroke.
 * @type {Array<SearchItem>|null}
 */
let searchIndexCache = null

/**
 * Create a searchable index of surahs with normalized search values
 * The index is memoized - subsequent calls return the cached array.
 * @returns {Array<SearchItem>} Array of {item, searchValues} objects
 */
export function createSearchIndex() {
  if (searchIndexCache) return searchIndexCache

  /** @type {Array<SearchItem>} */
  searchIndexCache = Data.map((item) => ({
    item,
    searchValues: [
      /** @type {string} */(item.surah_name).toLocaleLowerCase(),
      /** @type {string} */(item.surah_name_en).toLocaleLowerCase(),
      /** @type {number} */(item.surah_number).toString(),
      /** @type {string} */(item.revelation_place).toLocaleLowerCase(),
    ],
  }))

  return searchIndexCache
}

/**
 * Filter surahs by search term across multiple fields
 * Searches: Arabic name, English name, number, revelation place
 * @param {string} searchTerm - Search query
 * @returns {Array<{item: Object}>} Filtered surah list
 */
export function filterSurahs(searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return Data

  const normalized = searchTerm.trim().toLocaleLowerCase()
  const searchIndex = createSearchIndex()

  /** @type {Array<{item: Object}>} */
  return searchIndex
    .filter(({ searchValues }) => searchValues.some((value) => value.includes(normalized)))
    .map(({ item }) => item)
}

/**
 * Get surah by number (1-114)
 * @param {number} surahNumber - Surah number
 * @returns {Object|null} Surah object or null if not found
 * @jsxImportSource react
 */
export function getSurahByNumber(surahNumber) {
  return Data.find((s) => s.surah_number === Number(surahNumber)) || null
}

/**
 * Get the index/position of a surah in the data array
 * @param {number} surahNumber - Surah number
 * @returns {number} Index in Data array (-1 if not found)
 */
export function getSurahIndex(surahNumber) {
  return Data.findIndex((s) => s.surah_number === Number(surahNumber))
}

/**
 * Get previous and next surahs for navigation
 * @param {number} surahNumber - Current surah number
 * @returns {Object} {previous, next} objects or null
 */
export function getAdjacentSurahs(surahNumber) {
  const index = getSurahIndex(surahNumber)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: index > 0 ? Data[index - 1] : null,
    next: index < Data.length - 1 ? Data[index + 1] : null,
  }
}

/**
 * Get all surahs
 * @returns {Array} Full list of 114 surahs
 */
export function getAllSurahs() {
  return [...Data]
}

/**
 * Check if a surah number is valid
 * @param {number} surahNumber - Surah number to check
 * @returns {boolean} True if valid (1-114)
 */
export function isValidSurahNumber(surahNumber) {
  const num = Number(surahNumber)
  return Number.isInteger(num) && num >= 1 && num <= 114
}
