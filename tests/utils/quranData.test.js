import { describe, it, expect } from 'vitest'
import {
  filterSurahs,
  getSurahByNumber,
  getAdjacentSurahs,
  getSurahIndex,
  isValidSurahNumber,
  createSearchIndex,
  getAllSurahs,
} from '@utils/quranData'

describe('quranData utilities', () => {
  // filterSurahs tests
  it('should filter surahs by Arabic name', () => {
    const results = filterSurahs('الفاتحة')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].surah_number).toBe(1)
  })

  it('should return all surahs on empty search', () => {
    const results = filterSurahs('')
    expect(results.length).toBeGreaterThan(0)
    expect(results.length).toBeLessThanOrEqual(114)
  })

  it('should filter case-insensitive', () => {
    const results1 = filterSurahs('fatihah')
    const results2 = filterSurahs('FATIHAH')
    expect(results1.length).toBe(results2.length)
  })

  // getSurahByNumber tests
  it('should get surah by number', () => {
    const surah = getSurahByNumber(1)
    expect(surah).toBeDefined()
    expect(surah.surah_name).toBe('الفاتحة')
    expect(surah.surah_number).toBe(1)
  })

  it('should return null for invalid number', () => {
    const surah = getSurahByNumber(999)
    expect(surah).toBeNull()
  })

  it('should handle zero and negative numbers', () => {
    expect(getSurahByNumber(0)).toBeNull()
    expect(getSurahByNumber(-1)).toBeNull()
  })

  // getAdjacentSurahs tests
  it('should get previous and next surahs', () => {
    const adj = getAdjacentSurahs(2)
    expect(adj.previous.surah_number).toBe(1)
    expect(adj.next.surah_number).toBe(3)
  })

  it('should return null at start boundary', () => {
    const first = getAdjacentSurahs(1)
    expect(first.previous).toBeNull()
    expect(first.next).toBeDefined()
    expect(first.next.surah_number).toBe(2)
  })

  it('should return null at end boundary', () => {
    const last = getAdjacentSurahs(114)
    expect(last.previous).toBeDefined()
    expect(last.next).toBeNull()
    expect(last.previous.surah_number).toBe(113)
  })

  // Validation tests
  it('should validate surah numbers correctly', () => {
    expect(isValidSurahNumber(1)).toBe(true)
    expect(isValidSurahNumber(114)).toBe(true)
    expect(isValidSurahNumber(57)).toBe(true)
    expect(isValidSurahNumber(0)).toBe(false)
    expect(isValidSurahNumber(115)).toBe(false)
    expect(isValidSurahNumber(-1)).toBe(false)
  })

  // getSurahIndex tests
  it('should get correct index for valid surah', () => {
    const index = getSurahIndex(1)
    expect(index).toBe(0)

    const middleIndex = getSurahIndex(57)
    expect(middleIndex).toBe(55)

    const lastIndex = getSurahIndex(113)
    expect(lastIndex).toBe(111)
  })

  it('should return -1 for invalid surah number', () => {
    expect(getSurahIndex(999)).toBe(-1)
    expect(getSurahIndex(0)).toBe(-1)
  })

  // createSearchIndex tests
  it('should create searchable index', () => {
    const index = createSearchIndex()
    expect(Array.isArray(index)).toBe(true)
    expect(index.length).toBeGreaterThan(0)
    expect(index.length).toBeLessThanOrEqual(114)

    const firstItem = index[0]
    expect(firstItem).toHaveProperty('item')
    expect(firstItem).toHaveProperty('searchValues')
    expect(Array.isArray(firstItem.searchValues)).toBe(true)
  })

  it('should reuse the cached index across calls', () => {
    // The Quran dataset is static, so the index should be built once
    // and reused rather than rebuilt on every keystroke.
    expect(createSearchIndex()).toBe(createSearchIndex())
  })

  // getAllSurahs tests
  it('should return all surahs', () => {
    const all = getAllSurahs()
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBeGreaterThan(0)
    expect(all[0].surah_number).toBe(1)
  })

  it('should maintain data integrity', () => {
    const surah1 = getSurahByNumber(1)
    const surahFromAll = getAllSurahs()[0]

    expect(surah1.surah_name).toBe(surahFromAll.surah_name)
    expect(surah1.surah_number).toBe(surahFromAll.surah_number)
  })
})
