import quran_sound from '../assets/quran-sound.svg'

export default function Footer(){
    return(
            <footer className="border-t border-(--border-soft) bg-(--surface-1) shadow-sm">
                <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={quran_sound} className="logo h-10 w-10" alt="Quran-sound Logo" />
                            <span className="logo-name text-lg font-bold tracking-tight text-(--text-primary) sm:text-xl">Quran-sound</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
                            <li>
                                <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/README.md#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/CODE_OF_CONDUCT.md" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="https://github.com/HAMZAELMANZARI/Quran/blob/main/LICENSE" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/hamza-el-manzari-460739272" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                    <span className="block text-sm text-body sm:text-center  :space-x-1.5">© 2026 <a href="#" className="hover:underline">Quran-sound™</a>. All Rights Reserved.</span>
                </div>
            </footer>
    )
}