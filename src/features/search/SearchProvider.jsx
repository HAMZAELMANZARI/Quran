import { useState } from 'react'
import { SearchContext } from './searchContext'

/** @typedef {{ searchTerm: string, setSearchTerm: (term: string) => void }} SearchContextValue */
/** @param {import('react').ReactNode} children */
export function SearchProvider({ children }) {
  /** @type {[string, (term: string) => void]} */
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}
