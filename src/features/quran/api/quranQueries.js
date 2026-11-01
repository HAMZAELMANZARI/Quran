import { fetchSurahs } from './itqanApi'

export const quranQueryKeys = {
  all: ['quran'],
  surahs: (recitationId) => [
    ...quranQueryKeys.all,
    'surahs',
    String(recitationId),
  ],
}

/**
 * Shared query definition for the surah list so the provider and hover
 * prefetching read from and write to the same TanStack Query cache entry.
 * @param {string|number} recitationId
 */
export function surahsQueryOptions(recitationId) {
  return {
    queryKey: quranQueryKeys.surahs(recitationId),
    queryFn: ({ signal }) => fetchSurahs({ signal, recitationId }),
  }
}

/**
 * Start the surah request (or reuse the cached result) on hover.
 * @param {import('@tanstack/react-query').QueryClient} queryClient
 * @param {string|number} recitationId
 */
export function prefetchSurahs(queryClient, recitationId) {
  return queryClient.prefetchQuery(surahsQueryOptions(recitationId))
}

export default surahsQueryOptions
