import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchSurahs } from '@features/quran/api/itqanApi'
import { SURAHS, makeApiResponse } from '../fixtures/surahs'

function mockResponse(body, init = {}) {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchSurahs', () => {
  it('should fetch and validate all 114 surahs', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse(makeApiResponse()))
    vi.stubGlobal('fetch', fetchMock)

    const surahs = await fetchSurahs()

    expect(surahs).toHaveLength(114)
    expect(surahs[0].surah_number).toBe(1)
    expect(surahs.at(-1).surah_number).toBe(114)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/recitations/28/'),
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    )
  })

  it('should reject an incomplete recitation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(mockResponse(makeApiResponse(SURAHS.slice(0, 113)))),
    )

    await expect(fetchSurahs()).rejects.toThrow('Expected 114 surahs, API reported 113')
  })

  it('should reject duplicate surah numbers', async () => {
    const duplicates = [...SURAHS.slice(0, 113), SURAHS[0]]
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse(makeApiResponse(duplicates))))

    await expect(fetchSurahs()).rejects.toThrow('Duplicate surah number: 1')
  })

  it('should reject a failed HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse(null, { ok: false, status: 500 })))

    await expect(fetchSurahs()).rejects.toThrow('Itqan API request failed (500)')
  })

  it('should reject a malformed API response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse({ results: [] })))

    await expect(fetchSurahs()).rejects.toThrow('Unexpected response from the Itqan API')
  })
})
