import { describe, it, expect } from 'vitest'
import {
  filterSurahs,
  getSurahByNumber,
  getAdjacentSurahs,
  getSurahIndex,
  isValidSurahNumber,
  createSearchIndex,
  getAllSurahs,
} from '@features/quran/utils/quranData'
import { SURAHS } from '../fixtures/surahs'

describe('quranData utilities', () => {
  // filterSurahs tests
  it('should filter surahs by Arabic name', () => {
    const results = filterSurahs(SURAHS, 'الفاتحة')
    expect(results.length).toBe(1)
    expect(results[0].surah_number).toBe(1)
  })

  it('should return all surahs on empty search', () => {
    expect(filterSurahs(SURAHS, '')).toBe(SURAHS)
  })

  it('should filter case-insensitive', () => {
    const results1 = filterSurahs(SURAHS, 'fatihah')
    const results2 = filterSurahs(SURAHS, 'FATIHAH')
    expect(results1).toEqual(results2)
    expect(results1).toHaveLength(1)
  })

  // getSurahByNumber tests
  it('should get surah by number', () => {
    const surah = getSurahByNumber(SURAHS, 1)
    expect(surah).toBeDefined()
    expect(surah.surah_name).toBe('الفاتحة')
    expect(surah.surah_number).toBe(1)
  })

  it('should include surah 25 (Al-Furqan)', () => {
    const surah = getSurahByNumber(SURAHS, 25)
    expect(surah).toBeDefined()
    expect(surah.surah_name).toBe('الفرقان')
    expect(surah.surah_name_en).toBe('Al-Furqan')
  })

  it('should return null for invalid number', () => {
    expect(getSurahByNumber(SURAHS, 999)).toBeNull()
  })

  it('should handle zero and negative numbers', () => {
    expect(getSurahByNumber(SURAHS, 0)).toBeNull()
    expect(getSurahByNumber(SURAHS, -1)).toBeNull()
  })

  // getAdjacentSurahs tests
  it('should get previous and next surahs', () => {
    const adj = getAdjacentSurahs(SURAHS, 2)
    expect(adj.previous.surah_number).toBe(1)
    expect(adj.next.surah_number).toBe(3)
  })

  it('should return null at start boundary', () => {
    const first = getAdjacentSurahs(SURAHS, 1)
    expect(first.previous).toBeNull()
    expect(first.next).toBeDefined()
    expect(first.next.surah_number).toBe(2)
  })

  it('should return null at end boundary', () => {
    const last = getAdjacentSurahs(SURAHS, 114)
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
    expect(getSurahIndex(SURAHS, 1)).toBe(0)
    expect(getSurahIndex(SURAHS, 57)).toBe(56)
    expect(getSurahIndex(SURAHS, 113)).toBe(112)
  })

  it('should return -1 for invalid surah number', () => {
    expect(getSurahIndex(SURAHS, 999)).toBe(-1)
    expect(getSurahIndex(SURAHS, 0)).toBe(-1)
  })

  // createSearchIndex tests
  it('should create searchable index', () => {
    const index = createSearchIndex(SURAHS)
    expect(Array.isArray(index)).toBe(true)
    expect(index).toHaveLength(114)

    const firstItem = index[0]
    expect(firstItem).toHaveProperty('item')
    expect(firstItem).toHaveProperty('searchValues')
    expect(Array.isArray(firstItem.searchValues)).toBe(true)
  })

  it('should reuse the cached index across calls', () => {
    expect(createSearchIndex(SURAHS)).toBe(createSearchIndex(SURAHS))
  })

  // getAllSurahs tests
  it('should return all surahs as a copy', () => {
    const all = getAllSurahs(SURAHS)
    expect(Array.isArray(all)).toBe(true)
    expect(all).toHaveLength(114)
    expect(all).not.toBe(SURAHS)
    expect(all[0].surah_number).toBe(1)
    expect(all.at(-1).surah_number).toBe(114)
  })

  it('should contain every surah number exactly once in order', () => {
    const numbers = getAllSurahs(SURAHS).map((surah) => surah.surah_number)
    expect(numbers).toEqual(Array.from({ length: 114 }, (_, index) => index + 1))
  })

  it('should have complete, playable metadata for every surah', () => {
    for (const surah of getAllSurahs(SURAHS)) {
      expect(surah.surah_name).toBeTruthy()
      expect(surah.surah_name_en).toBeTruthy()
      expect(surah.audio_url).toMatch(/^https:\/\//)
      expect(surah.duration_ms).toBeGreaterThan(0)
      expect(surah.size_bytes).toBeGreaterThan(0)
      expect(surah.ayahs_count).toBeGreaterThan(0)
      expect(surah.revelation_place).toMatch(/^(Makkah|Madinah)$/)
      expect(Array.isArray(surah.ayahs_timings)).toBe(true)
    }
  })

  it('should maintain data integrity', () => {
    const surah1 = getSurahByNumber(SURAHS, 1)
    const surahFromAll = getAllSurahs(SURAHS)[0]

    expect(surah1.surah_name).toBe(surahFromAll.surah_name)
    expect(surah1.surah_number).toBe(surahFromAll.surah_number)
  })
})
