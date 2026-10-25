import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '@features/search/searchContext'
import useSearch from '@features/search/useSearch'
import useDocumentMeta from '@shared/hooks/useDocumentMeta'
import { APP_DESCRIPTION, APP_TITLE, LAYOUT_CLASSES, LABELS } from '@shared/utils/constants'
import SurahCard from '@features/quran/components/SurahCard'

export default function IndexPage() {
    const navigate = useNavigate()
    const { searchTerm } = useContext(SearchContext)
    const filteredData = useSearch(searchTerm)

    useDocumentMeta(APP_TITLE, APP_DESCRIPTION)

    // Stable callback so memoized SurahCards are not re-rendered on
    // every keystroke in the search box.
    const handleSelect = useCallback((number) => {
        navigate(`/surah/${number}`)
    }, [navigate])

    const surahs = filteredData.map((item) => (
        <SurahCard
            key={item.surah_number}
            item={item}
            onSelect={handleSelect}
        />
    ))

    return (
        <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
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
