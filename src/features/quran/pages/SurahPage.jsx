import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSurah from '@features/quran/hooks/useSurah'
import { useQuranData } from '@features/quran/hooks/useQuranData'
import useDocumentMeta from '@shared/hooks/useDocumentMeta'
import { APP_TITLE, LAYOUT_CLASSES, LABELS, UI } from '@shared/utils/constants'

export default function SurahPage() {
    const { number } = useParams()
    const navigate = useNavigate()
    const { surah, previous, next, isValid, isLoading, error } = useSurah(number)
    const { retry } = useQuranData()
    const headingRef = useRef(null)

    // Move focus to the heading when navigating between surahs so keyboard
    // and screen reader users are not left at the top of the page.
    useEffect(() => {
        if (surah) {
            headingRef.current?.focus()
        }
    }, [number, surah])

    const surahTitle = surah ? `${surah.surah_name} (${surah.surah_name_en}) | Quran Sound` : APP_TITLE
    const surahDescription = surah
        ? `استمع إلى سورة ${surah.surah_name} (${surah.surah_name_en}) - ${surah.ayahs_count} آية`
        : LABELS.SURAH_NOT_FOUND

    useDocumentMeta(surahTitle, surahDescription)

    if (!isValid) {
        return (
            <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
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

    if (isLoading) {
        return (
            <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
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
                <div className={LAYOUT_CLASSES.CARD + ' text-center'}>
                    <h1 className={LAYOUT_CLASSES.MAIN_HEADING}>
                        {LABELS.DATA_LOAD_ERROR}
                    </h1>
                    <p className="mb-4 text-(--text-muted)">
                        {LABELS.DATA_LOAD_ERROR_DETAIL}
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <button onClick={retry} className={LAYOUT_CLASSES.BUTTON_NAV}>
                            {LABELS.RETRY}
                        </button>
                        <button onClick={() => navigate('/')} className={LAYOUT_CLASSES.BUTTON_NAV}>
                            {LABELS.BACK_TO_INDEX}
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    if (!surah) {
        return (
            <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
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
        <main id="main-content" tabIndex={-1} className={LAYOUT_CLASSES.CONTAINER}>
            <div className={LAYOUT_CLASSES.CARD}>
                <h1 ref={headingRef} tabIndex={-1} className={LAYOUT_CLASSES.MAIN_HEADING}>
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
