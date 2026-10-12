import quran_sound from '../assets/quran-sound.svg'
import useDarkMode from '../componants/useDarkMode'

export default function Header({ searchTerm, onSearchChange }) {
    const [isDarkMode, toggleDarkMode] = useDarkMode()

    return (
        <header className="border-b border-(--border-soft) bg-(--surface-1) shadow-sm">
            <div className="mx-auto flex max-w-325 flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
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

                <form
                    role="search"
                    onSubmit={(event) => event.preventDefault()}
                    className="order-3 basis-full sm:order-0 sm:ml-auto sm:flex-1 sm:max-w-md"
                >
                    <label className="relative block">
                        <span className="sr-only">Search surahs</span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="ابحث باسم السورة أو رقمها"
                            aria-label="Search surahs by name or number"
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

                <button
                    type="button"
                    onClick={toggleDarkMode}
                    aria-pressed={isDarkMode}
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-(--border-soft) bg-(--surface-3) text-(--text-primary) shadow-sm transition-colors hover:bg-(--surface-2) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:ml-0"
                >
                    {isDarkMode ? (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                        </svg>
                    ) : (
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M20.985 12.486A9 9 0 1 1 11.514 3.015a7 7 0 0 0 9.471 9.471Z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    )
}