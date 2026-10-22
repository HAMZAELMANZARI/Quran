import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import useSearch from '../../hooks/useSearch'
import { LAYOUT_CLASSES, LABELS, UI } from '../../utils/constants'

export default function IndexPage() {
    const navigate = useNavigate()
    const { searchTerm } = useContext(SearchContext)
    const filteredData = useSearch(searchTerm)

    const surahs = filteredData.map((item) => (
        <button
            key={item.surah_number}
            onClick={() => navigate(`/surah/${item.surah_number}`)}
            aria-label={`استمع إلى سورة ${item.surah_name} (${item.surah_name_en})`}
            className={LAYOUT_CLASSES.SURAH_CARD}
        >
            <span className={LAYOUT_CLASSES.SURAH_NUMBER}>{item.surah_number}</span>
            <span className="min-w-0 dark:text-slate-300">
                <p>{item.surah_name}</p>
                <small>{item.surah_name_en} {UI.SEPARATOR} {item.revelation_place} {UI.SEPARATOR} آية {item.ayahs_count}</small>
            </span>
        </button>
    ));

    return (
        <main className={LAYOUT_CLASSES.CONTAINER}>
            <div className={LAYOUT_CLASSES.CARD}>
                <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                    {LABELS.SURAH_INDEX}
                </h1>
                <section className={LAYOUT_CLASSES.SURAH_GRID}>
                    {surahs.length > 0 ? surahs : (
                        <p className="col-span-full py-8 text-center text-(--text-muted)">
                            {LABELS.NO_RESULTS}
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}