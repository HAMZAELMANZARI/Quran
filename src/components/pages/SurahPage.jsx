import { useParams, useNavigate } from 'react-router-dom'
import useSurah from '../../hooks/useSurah'
import { LAYOUT_CLASSES, LABELS, UI } from '../../utils/constants'

export default function SurahPage() {
    const { number } = useParams()
    const navigate = useNavigate()
    const { surah, previous, next } = useSurah(number)

    if (!surah) {
        return (
            <main className={LAYOUT_CLASSES.CONTAINER}>
                <div className={LAYOUT_CLASSES.CARD + ' text-center'}>
                    <h1 className="mb-4 text-2xl font-bold text-(--text-primary)">
                        {LABELS.SURAH_NOT_FOUND}
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-emerald-700 underline dark:text-emerald-300 hover:no-underline"
                    >
                        {LABELS.BACK_TO_INDEX}
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className={LAYOUT_CLASSES.CONTAINER}>
            <div className={LAYOUT_CLASSES.CARD}>
                <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                    {surah.surah_name}
                </h1>

                <p className="par-center text-center text-base sm:text-lg">
                    {surah.surah_name_en} {UI.SEPARATOR} {surah.revelation_place} {UI.SEPARATOR} آية {surah.ayahs_count}
                </p>

                <audio
                    className="mx-auto mb-6 w-full max-w-2xl"
                    controls
                    preload={UI.AUDIO_PRELOAD}
                    src={surah.audio_url}
                >
                    {LABELS.AUDIO_NOT_SUPPORTED}
                </audio>

                <nav
                    aria-label={LABELS.NAVIGATE_SURAHS}
                    className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                >
                    {previous ? (
                        <button
                            onClick={() => navigate(`/surah/${previous.surah_number}`)}
                            className={LAYOUT_CLASSES.BUTTON_NAV + ' order-2 sm:order-1'}
                        >
                            <i className={UI.CHEVRON_RIGHT} />
                            {previous.surah_name}
                        </button>
                    ) : (
                        <span className="order-2 sm:order-1" />
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className={LAYOUT_CLASSES.BUTTON_NAV + ' order-1 inline-block sm:order-2 text-center'}
                    >
                        {LABELS.BACK_TO_INDEX}
                    </button>

                    {next ? (
                        <button
                            onClick={() => navigate(`/surah/${next.surah_number}`)}
                            className={LAYOUT_CLASSES.BUTTON_NAV + ' order-3 text-left'}
                        >
                            {next.surah_name}
                            <i className={UI.CHEVRON_LEFT} />
                        </button>
                    ) : null}
                </nav>
            </div>
        </main>
    )
}