import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '@features/search/searchContext'
import useSearch from '@features/search/useSearch'
import useDocumentMeta from '@shared/hooks/useDocumentMeta'
import { APP_DESCRIPTION, APP_TITLE, LAYOUT_CLASSES, LABELS, RIWAYAT_OPTIONS } from '@shared/utils/constants'
import SurahCard from '@features/quran/components/SurahCard'
import { useQuranData } from '@features/quran/hooks/useQuranData'

export default function IndexPage() {
    const navigate = useNavigate()
    const { searchTerm } = useContext(SearchContext)
    const { isLoading, error, retry, recitationId, setRecitationId } = useQuranData()
    const filteredData = useSearch(searchTerm)

    useDocumentMeta(APP_TITLE, APP_DESCRIPTION)

    // Stable callback so memoized SurahCards are not re-rendered on
    // every keystroke in the search box.
    const handleSelect = useCallback((number) => {
        navigate(`/surah/${number}`)
    }, [navigate])



    if (isLoading) {
        return (
            <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
                <div className={LAYOUT_CLASSES.CARD + ' mb-4'}>
                    <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                        القرآن الكريم
                    </h1>
                    <section className="mb-6">
                        <h2 className="mb-3 text-center text-base font-semibold text-(--text-primary) sm:text-lg">
                            اختر الرواية / القراءة
                        </h2>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                            {RIWAYAT_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setRecitationId && setRecitationId(option.id)}
                                    className={`w-full rounded-lg border px-2 py-2 text-xs shadow-sm transition-colors sm:px-3 sm:text-sm ${
                                        String(recitationId) === String(option.id)
                                            ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-500'
                                            : 'border-[#d9d4cd] bg-white text-(--text-primary) hover:bg-[#f5f2ed] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
                                    }`}
                                    aria-pressed={String(recitationId) === String(option.id)}
                                    title={option.description || option.labelEn}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
                <div className={LAYOUT_CLASSES.CARD + ' text-center'} role="status" aria-live="polite">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
                    <p className="text-(--text-primary)">{LABELS.LOADING}</p>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
                <div className={LAYOUT_CLASSES.CARD}>
                    <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                        القرآن الكريم
                    </h1>
                    <section className="mb-6">
                        <h2 className="mb-3 text-center text-lg font-semibold text-(--text-primary)">
                            اختر الرواية / القراءة
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {RIWAYAT_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setRecitationId && setRecitationId(option.id)}
                                    className={`rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors ${
                                        String(recitationId) === String(option.id)
                                            ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-500'
                                            : 'border-[#d9d4cd] bg-white text-(--text-primary) hover:bg-[#f5f2ed] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
                                    }`}
                                    aria-pressed={String(recitationId) === String(option.id)}
                                    title={option.description || option.labelEn}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
                <div className={LAYOUT_CLASSES.CARD + ' text-center'}>
                    <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                        {LABELS.DATA_LOAD_ERROR}
                    </h1>
                    <p className="mb-4 text-(--text-muted)">
                        {LABELS.DATA_LOAD_ERROR_DETAIL}
                    </p>
                    <button onClick={retry} className={LAYOUT_CLASSES.BUTTON_NAV}>
                        {LABELS.RETRY}
                    </button>
                </div>
            </main>
        )
    }

    const surahs = filteredData.map((item) => (
        <SurahCard
            key={item.surah_number}
            item={item}
            onSelect={handleSelect}
        />
    ))

    return (
        <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
            <div className={LAYOUT_CLASSES.CARD + ' mb-4'}>
                <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                    القرآن الكريم
                </h1>

                <section className="mb-6">
                    <h2 className="mb-3 text-center text-base font-semibold text-(--text-primary) sm:text-lg">
                        اختر الرواية / القراءة
                    </h2>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                        {RIWAYAT_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setRecitationId && setRecitationId(option.id)}
                                className={`w-full rounded-lg border px-2 py-2 text-xs shadow-sm transition-colors sm:px-3 sm:text-sm ${
                                    String(recitationId) === String(option.id)
                                        ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-500'
                                        : 'border-[#d9d4cd] bg-white text-(--text-primary) hover:bg-[#f5f2ed] dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
                                }`}
                                aria-pressed={String(recitationId) === String(option.id)}
                                title={option.description || option.labelEn}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <div className={LAYOUT_CLASSES.CARD}>
                <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                    {LABELS.SURAH_INDEX}
                </h1>

                {/*
                  Announces the number of matching surahs to screen readers
                  whenever the search results change.
                */}
                <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                    {filteredData.length === 0
                        ? LABELS.NO_RESULTS
                        : `عدد النتائج: ${filteredData.length}`}
                </p>

                <section className={LAYOUT_CLASSES.SURAH_GRID}>
                    {surahs.length > 0 ? surahs : (
                        <p className="col-span-full py-8 text-center text-(--text-muted)">
                            {LABELS.NO_RESULTS}
                        </p>
                    )}
                </section>
            </div>
        </main>
    )
}
