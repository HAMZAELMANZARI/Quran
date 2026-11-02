import { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { prefetchSurahs } from '@features/quran/api/quranQueries'
import SurahResults from '@features/quran/components/SurahResults'
import { useQuranData } from '@features/quran/hooks/useQuranData'
import { SearchContext } from '@features/search/searchContext'
import useSearch from '@features/search/useSearch'
import useDocumentMeta from '@shared/hooks/useDocumentMeta'
import {
    APP_DESCRIPTION,
    LABELS,
    LAYOUT_CLASSES,
} from '@shared/utils/constants'

export default function SearchPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { searchTerm, setSearchTerm } = useContext(SearchContext)
    const { isLoading, error, retry, recitationId } = useQuranData()
    const results = useSearch(searchTerm)

    useEffect(() => {
        return () => setSearchTerm('')
    }, [setSearchTerm])

    useDocumentMeta(`${LABELS.SEARCH_TITLE} | Quran Sound`, APP_DESCRIPTION)

    const handleSelect = useCallback((/** @type {number} */ number) => {
        navigate(`/surah/${number}`)
    }, [navigate])

    const handlePrefetch = useCallback(() => {
        prefetchSurahs(queryClient, recitationId)
    }, [queryClient, recitationId])

    const renderSearchField = () => (
        <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="mx-auto w-full max-w-xl"
        >
            <label className="relative block">
                <span className="sr-only">{LABELS.SEARCH_SURAHS}</span>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={LABELS.SEARCH_PLACEHOLDER}
                    aria-label={LABELS.SEARCH_SURAHS}
                    autoFocus
                    className="w-full rounded-lg border border-(--border-soft) bg-(--surface-3) py-2 pl-4 pr-10 text-(--text-primary) shadow-sm outline-none transition focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600/30"
                />
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                </svg>
            </label>
        </form>
    )

    return (
        <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
            <div className={LAYOUT_CLASSES.CARD + ' mb-4'}>
                <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                    {LABELS.SEARCH_TITLE}
                </h1>
                {renderSearchField()}
            </div>

            {isLoading && (
                <div className={LAYOUT_CLASSES.CARD + ' text-center'} role="status" aria-live="polite">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                    <p className="text-(--text-primary)">{LABELS.LOADING}</p>
                </div>
            )}

            {!isLoading && error && (
                <div className={LAYOUT_CLASSES.CARD + ' text-center'}>
                    <h2 className={LAYOUT_CLASSES.MAIN_HEADING}>
                        {LABELS.DATA_LOAD_ERROR}
                    </h2>
                    <p className="mb-4 text-(--text-muted)">
                        {LABELS.DATA_LOAD_ERROR_DETAIL}
                    </p>
                    <button onClick={retry} className={LAYOUT_CLASSES.BUTTON_NAV}>
                        {LABELS.RETRY}
                    </button>
                </div>
            )}

            {!isLoading && !error && (
                <SurahResults
                    surahs={results}
                    heading={LABELS.SEARCH_RESULTS}
                    onSelect={handleSelect}
                    onPrefetch={handlePrefetch}
                />
            )}
        </main>
    )
}
