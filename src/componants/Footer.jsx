import quran_sound from '../assets/quran-sound.svg'

export default function Footer() {
    return (
        <footer className="border-t border-(--border-soft) bg-(--surface-1) shadow-sm">
            <div className="mx-auto w-full max-w-7xl p-4 md:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <a href="#" className="flex items-center justify-center gap-3 sm:justify-start rtl:space-x-reverse">
                        <img src={quran_sound} className="h-10 w-10" alt="Quran-sound Logo" />
                        <span className="logo-name text-lg font-bold tracking-tight text-(--text-primary) sm:text-xl">
                            Quran-sound
                        </span>
                    </a>

                    <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-(--text-muted) sm:justify-end">
                        <li>
                            <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/README.md#" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/CODE_OF_CONDUCT.md" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/LICENSE" className="hover:underline">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/hamza-el-manzari-460739272" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <hr className="my-6 border-(--border-soft) sm:mx-auto lg:my-8" />

                <span className="block text-center text-sm text-(--text-muted)">
                    © 2026 <a href="#" className="hover:underline">Quran-sound™</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}