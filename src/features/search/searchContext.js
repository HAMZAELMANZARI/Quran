import { createContext } from 'react'

/**
 * @typedef {Object} SearchContextValue
 * @property {string} searchTerm
 * @property {(term: string) => void} setSearchTerm
 */

export const SearchContext = createContext(
  /** @type {SearchContextValue} */ ({
    searchTerm: '',
    setSearchTerm: () => {},
  }),
)
