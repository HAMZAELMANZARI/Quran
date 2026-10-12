import Header from '../pages/Header'
import Main from '../pages/Main'
import { useState } from 'react'
import '../css/style.css'
import '../css/normalize.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      {/* <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"> */}
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Main searchTerm={searchTerm} />
      {/* </div> */}
    </>
  )
}

export default App
