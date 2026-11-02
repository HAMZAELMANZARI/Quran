import { Link } from 'react-router-dom'
import quran_sound from '@shared/assets/quran-sound.svg'
import useDarkMode from '@features/theme/useDarkMode'
import { LABELS, ROUTES } from '@shared/utils/constants'

const ICON_BUTTON_CLASSES =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-(--border-soft) bg-(--surface-3) text-(--text-primary) shadow-sm transition-colors hover:bg-(--surface-2) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

const ICON_CLASSES = 'h-4 w-4'

function SearchIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={ICON_CLASSES}
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
    )
}

function SunIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={ICON_CLASSES}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={ICON_CLASSES}
        >
            <path d="M20.985 12.486A9 9 0 1 1 11.514 3.015a7 7 0 0 0 9.471 9.471Z" />
        </svg>
    )
}

export default function Header() {
    const [isDarkMode, toggleDarkMode] = useDarkMode()

    return (
        <header className="border-b border-(--border-soft) bg-(--surface-1) shadow-sm">
            <div className="mx-auto flex max-w-325 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <img
                        className="h-10 w-10 rounded-full border border-(--border-soft) bg-(--surface-3) object-cover shadow-sm"
                        src={quran_sound}
                        alt="Quran sound logo"
                    />
                    <span className="text-lg font-bold tracking-tight text-(--text-primary) sm:text-xl">
                        Quran-sound
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        to={ROUTES.SEARCH}
                        aria-label={LABELS.SEARCH_OPEN}
                        className={ICON_BUTTON_CLASSES}
                    >
                        <SearchIcon />
                    </Link>

                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        aria-pressed={isDarkMode}
                        aria-label={isDarkMode ? LABELS.SWITCH_TO_LIGHT : LABELS.SWITCH_TO_DARK}
                        className={ICON_BUTTON_CLASSES}
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </button>
                </div>
            </div>
        </header>
    )
}
