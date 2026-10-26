import { QURAN_TOTAL_SURAHS } from '@shared/utils/constants'

const NAMED_SURAHS = {
  1: { surah_name: 'الفاتحة', surah_name_en: 'Al-Fatihah' },
  2: { surah_name: 'البقرة', surah_name_en: 'Al-Baqarah', revelation_place: 'Madinah' },
  25: { surah_name: 'الفرقان', surah_name_en: 'Al-Furqan' },
  114: { surah_name: 'الناس', surah_name_en: 'An-Nas' },
}

export function makeSurah(number, overrides = {}) {
  return {
    surah_number: number,
    surah_name: `سورة ${number}`,
    surah_name_en: `Surah ${number}`,
    audio_url: `https://example.test/audio/${number}.mp3`,
    duration_ms: 1000 + number,
    size_bytes: 2000 + number,
    revelation_order: number,
    revelation_place: 'Makkah',
    ayahs_count: 1,
    ayahs_timings: [],
    ...overrides,
  }
}

export const SURAHS = Array.from(
  { length: QURAN_TOTAL_SURAHS },
  (_, index) => makeSurah(index + 1, NAMED_SURAHS[index + 1]),
)

export function makeApiResponse(results = SURAHS) {
  return {
    count: results.length,
    results,
  }
}
