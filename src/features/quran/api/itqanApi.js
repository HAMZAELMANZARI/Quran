import { config } from '@shared/config/env'
import { QURAN_TOTAL_SURAHS } from '@shared/utils/constants'

const PAGE_SIZE = 1000

/**
 * @typedef {import('@types/index').Surah} Surah
 */

/**
 * @param {number} page
 * @param {AbortSignal} [signal]
 * @param {string|number} [recitationId]
 */
async function fetchPage(page, signal, recitationId) {
  const baseUrl = config.apiBaseUrl.replace(/\/+$/, '')
  const id = recitationId ?? config.itqanRecitationId
  const url = new URL(`${baseUrl}/recitations/${encodeURIComponent(id)}/`)
  url.searchParams.set('page', String(page))
  url.searchParams.set('page_size', String(PAGE_SIZE))

  const response = await fetch(url.toString(), {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Itqan API request failed (${response.status})`)
  }

  const body = await response.json()

  if (!body || !Array.isArray(body.results) || !Number.isInteger(body.count)) {
    throw new Error('Unexpected response from the Itqan API')
  }

  return body
}

/**
 * @param {Record<string, unknown>} item
 * @returns {Surah}
 */
function toSurah(item) {
  return {
    surah_number: Number(item.surah_number),
    surah_name: String(item.surah_name || ''),
    surah_name_en: String(item.surah_name_en || ''),
    audio_url: String(item.audio_url || ''),
    duration_ms: Number(item.duration_ms),
    size_bytes: Number(item.size_bytes),
    revelation_order: Number(item.revelation_order),
    revelation_place: item.revelation_place,
    ayahs_count: Number(item.ayahs_count),
    ayahs_timings: Array.isArray(item.ayahs_timings) ? item.ayahs_timings : [],
  }
}

/**
 * @param {Surah[]} surahs
 */
function validateSurahs(surahs) {
  const numbers = new Set()

  for (const surah of surahs) {
    if (
      !Number.isInteger(surah.surah_number) ||
      surah.surah_number < 1 ||
      surah.surah_number > QURAN_TOTAL_SURAHS
    ) {
      throw new Error(`Invalid surah number: ${surah.surah_number}`)
    }

    if (numbers.has(surah.surah_number)) {
      throw new Error(`Duplicate surah number: ${surah.surah_number}`)
    }

    numbers.add(surah.surah_number)

    if (!surah.surah_name || !surah.surah_name_en) {
      throw new Error(`Missing surah name for surah ${surah.surah_number}`)
    }

    if (!surah.audio_url.startsWith('https://')) {
      throw new Error(`Invalid audio URL for surah ${surah.surah_number}`)
    }

    if (!Number.isFinite(surah.duration_ms) || surah.duration_ms <= 0) {
      throw new Error(`Invalid duration for surah ${surah.surah_number}`)
    }

    if (!Number.isFinite(surah.size_bytes) || surah.size_bytes <= 0) {
      throw new Error(`Invalid size for surah ${surah.surah_number}`)
    }

    if (!Number.isInteger(surah.ayahs_count) || surah.ayahs_count <= 0) {
      throw new Error(`Invalid ayah count for surah ${surah.surah_number}`)
    }

    if (surah.revelation_place !== 'Makkah' && surah.revelation_place !== 'Madinah') {
      throw new Error(`Invalid revelation place for surah ${surah.surah_number}`)
    }
  }

  for (let number = 1; number <= QURAN_TOTAL_SURAHS; number += 1) {
    if (!numbers.has(number)) {
      throw new Error(`Missing surah number: ${number}`)
    }
  }
}

/**
 * Fetch the complete surah list from the Itqan CMS API.
 * @param {{ signal?: AbortSignal, recitationId?: string|number }} [options]
 * @returns {Promise<Surah[]>}
 */
export async function fetchSurahs({ signal, recitationId } = {}) {
  const records = []
  let total = null
  let page = 1

  do {
    const body = await fetchPage(page, signal, recitationId)

    if (total === null) {
      total = body.count
    }

    if (body.results.length === 0) {
      break
    }

    records.push(...body.results)
    page += 1
  } while (records.length < total)

  if (total !== QURAN_TOTAL_SURAHS) {
    throw new Error(`Expected ${QURAN_TOTAL_SURAHS} surahs, API reported ${total}`)
  }

  if (records.length !== QURAN_TOTAL_SURAHS) {
    throw new Error(`Expected ${QURAN_TOTAL_SURAHS} surahs, received ${records.length}`)
  }

  const surahs = records
    .map(toSurah)
    .sort((left, right) => left.surah_number - right.surah_number)

  validateSurahs(surahs)

  return surahs
}

export default fetchSurahs
