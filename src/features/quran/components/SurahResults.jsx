import { LAYOUT_CLASSES, LABELS } from '@shared/utils/constants'
import SurahCard from '@features/quran/components/SurahCard'

/**
 * @param {Object} props
 * @param {import('@/types/index').Surah[]} props.surahs
 * @param {string} props.heading
 * @param {(number: number) => void} props.onSelect
 * @param {() => void} props.onPrefetch
 */
export default function SurahResults({ surahs, heading, onSelect, onPrefetch }) {
    const resultCount = surahs.length
    const statusText = resultCount === 0
        ? LABELS.NO_RESULTS
        : `عدد النتائج: ${resultCount}`

    return (
        <div className={LAYOUT_CLASSES.CARD}>
            <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                {heading}
            </h1>

            <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {statusText}
            </p>

            <section className={LAYOUT_CLASSES.SURAH_GRID}>
                {resultCount > 0 ? (
                    surahs.map((item) => (
                        <SurahCard
                            key={item.surah_number}
                            item={item}
                            onSelect={onSelect}
                            onPrefetch={onPrefetch}
                        />
                    ))
                ) : (
                    <p className="col-span-full py-8 text-center text-(--text-muted)">
                        {LABELS.NO_RESULTS}
                    </p>
                )}
            </section>
        </div>
    )
}
