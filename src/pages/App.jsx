import Header from '../pages/Header'
import Main from '../pages/Main'
import Footer from '../pages/Footer'
import { useState } from 'react'
import '../css/style.css'
import '../css/normalize.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Main searchTerm={searchTerm} />
        <Footer/>
    </>
  )
}

export default App
