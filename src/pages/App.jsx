import Header from '../pages/Header'
import Main from '../pages/Main'
import Footer from '../pages/Footer'
import Surah from '../pages/Surah'
import { useState } from 'react'
import Data from '../API/Data'
import '../css/style.css'
import '../css/normalize.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const isSurahPage = window.location.pathname.endsWith('/surha.html')
  const surahNumber = Number(new URLSearchParams(window.location.search).get('number'))
  const selectedSurah = Data.find((item) => item.surah_number === surahNumber)

  return (
    <>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {isSurahPage ? (
          <Surah surah={selectedSurah} />
        ) : (
          <Main searchTerm={searchTerm} />
        )}
        <Footer/>
    </>
  )
}

export default App
