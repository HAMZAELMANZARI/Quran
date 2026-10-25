/** @typedef {import('@features/search/searchContext').SearchContextValue} SearchContextValue */
import { useContext } from 'react'
import Header from '@shared/components/Header'
import Footer from '@shared/components/Footer'
import SkipLink from '@shared/components/SkipLink'
import { SearchContext } from '@features/search/searchContext'
import '@shared/styles/tailwind.css'
import '@shared/styles/normalize.css'

/**
 * @param {import('react').ReactNode} children - Child components
 */
function App({ children }) {
  /** @type {SearchContextValue} */
  const { searchTerm, setSearchTerm } = useContext(SearchContext)

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {children}
      <Footer/>
    </div>
  )
}

export default App
