import Data from "../API/Data"

export default function Surah({ surah }) {
    if (!surah) {
        return (
            <main className="mx-auto max-w-325 px-4 py-5 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-[#d9d4cd] bg-[#f7f4f1] p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h1 className="mb-4 text-2xl font-bold text-(--text-primary)">
                        لم يتم العثور على السورة
                    </h1>
                    <a
                        href={import.meta.env.BASE_URL}
                        className="text-emerald-700 underline dark:text-emerald-300"
                    >
                        العودة إلى فهرس السور
                    </a>
                </div>
            </main>
        )
    }

    const surahIndex = Data.findIndex((item) => item.surah_number === surah.surah_number)
    const previousSurah = Data[surahIndex - 1]
    const nextSurah = Data[surahIndex + 1]

    return(
        <main className="mx-auto max-w-325 px-4 py-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#d9d4cd] bg-[#f7f4f1] p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h1 className="mb-4 pb-3 border-b-3 text-center text-3xl font-bold tracking-tight text-[#1e2d28] dark:text-emerald-300">
                    {surah.surah_name}
                </h1>
                <p className="par-center">
                    {surah.surah_name_en} ٠ {surah.revelation_place} ٠ آية {surah.ayahs_count}
                </p>
                <audio
                    className="mx-auto mb-6 w-full max-w-2xl"
                    controls
                    preload="none"
                    src={surah.audio_url}
                >
                    متصفحك لا يدعم تشغيل الصوت.
                </audio>
                <nav aria-label="التنقل بين السور" className="mb-6 flex items-center justify-between gap-4">
                    {previousSurah ? (
                        <a
                            href={`${import.meta.env.BASE_URL}surha.html?number=${previousSurah.surah_number}`}
                            className="rounded-lg border border-[#d9d4cd] bg-white px-4 py-2 text-(--text-primary) no-underline shadow-sm hover:bg-[#f5f2ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">
                            <i className="chev chev-r"></i>
                            {previousSurah.surah_name}
                        </a>
                    ) : <span />}
                    <a
                        href={import.meta.env.BASE_URL}
                        className="inline-block rounded-lg border border-[#d9d4cd] bg-white px-4 py-2 text-(--text-primary) no-underline shadow-sm hover:bg-[#f5f2ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                        العودة إلى فهرس السور
                    </a>
                    {nextSurah ? (
                        <a
                            href={`${import.meta.env.BASE_URL}surha.html?number=${nextSurah.surah_number}`}
                            className="text-left rounded-lg border border-[#d9d4cd] bg-white px-4 py-2 text-(--text-primary) no-underline shadow-sm hover:bg-[#f5f2ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                            {nextSurah.surah_name}
                            <i className="chev chev-l"></i>
                        </a>
                    ) : null}
                </nav>
            </div>
        </main>
    )
}