import { useState } from 'react'
import { SearchContext } from './searchContext'

/** @param {{ children: import('react').ReactNode }} props */
export function SearchProvider({ children }) {
  /** @type {[string, (term: string) => void]} */
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}
