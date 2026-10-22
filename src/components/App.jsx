import { useContext } from 'react'
import Header from './common/Header'
import Footer from './common/Footer'
import { SearchContext } from '../context/searchContext'
import '../css/tailwind.css'
import '../css/normalize.css'

function App({ children }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext)

  return (
    <div className="flex min-h-screen flex-col">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {children}
      <Footer/>
    </div>
  )
}

export default App
