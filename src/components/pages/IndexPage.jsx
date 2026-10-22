import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import Data from "../../data/quran"

const searchableData = Data.map((item) => ({
    item,
    searchValues: [
        item.surah_name.toLocaleLowerCase(),
        item.surah_name_en.toLocaleLowerCase(),
        item.surah_number.toString(),
        item.revelation_place.toLocaleLowerCase(),
    ],
}))

export default function IndexPage() {
    const navigate = useNavigate()
    const { searchTerm } = useContext(SearchContext)
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
    const filteredData = normalizedSearch
        ? searchableData
            .filter(({ searchValues }) => searchValues.some((value) => value.includes(normalizedSearch)))
            .map(({ item }) => item)
        : Data
    const surahs = filteredData.map((item) => (
        <button
            key={item.surah_number}
            onClick={() => navigate(`/surah/${item.surah_number}`)}
            aria-label={`استمع إلى سورة ${item.surah_name} (${item.surah_name_en})`}
            className="flex h-30 gap-2 items-center justify-center rounded-xl border border-[#d9d4cd] bg-[#f5f2ed] px-2 py-3 text-center text-inherit shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
        >
            <span className="num dark:text-slate-300">{item.surah_number}</span>
            <span className="min-w-0 dark:text-slate-300">
                <p>{item.surah_name}</p>
                <small>{item.surah_name_en} ٠ {item.revelation_place} ٠ آية {item.ayahs_count}</small>
            </span>
        </button>
    ));

    return (
        <main className="mx-auto max-w-325 flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#d9d4cd] bg-[#f7f4f1] p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h1 className="mb-4 pb-3 border-b-3 text-center text-3xl font-bold tracking-tight text-[#1e2d28] dark:text-emerald-300">
                    فهرس السور
                </h1>
                <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {surahs.length > 0 ? surahs : (
                        <p className="col-span-full py-8 text-center text-(--text-muted)">
                            لا توجد سور مطابقة للبحث
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}