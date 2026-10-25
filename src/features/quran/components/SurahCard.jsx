import { memo } from 'react'
import { LAYOUT_CLASSES, UI } from '@shared/utils/constants'

/**
 * @typedef {import('@features/quran/data/quran').Surah} Surah
 * @typedef {Object} SurahCardProps
 * @property {Surah} item
 * @property {(number: number) => void} onSelect
 */

/**
 * A single surah card. Memoized so that typing in the search box only
 * re-renders the cards whose data actually changed.
 * @param {SurahCardProps} props
 */
const SurahCard = memo(function SurahCard({ item, onSelect }) {
    return (
        <button
            onClick={() => onSelect(item.surah_number)}
            aria-label={`استمع إلى سورة ${item.surah_name} (${item.surah_name_en})`}
            className={LAYOUT_CLASSES.SURAH_CARD}
        >
            <span className={LAYOUT_CLASSES.SURAH_NUMBER}>{item.surah_number}</span>
            <span className="min-w-0 dark:text-slate-300">
                <p>{item.surah_name}</p>
                <small>{item.surah_name_en} {UI.SEPARATOR} {item.revelation_place} {UI.SEPARATOR} آية {item.ayahs_count}</small>
            </span>
        </button>
    )
})

export default SurahCard
