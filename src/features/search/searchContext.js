import { createContext } from 'react'

/**
 * @typedef {Object} SearchContextValue
 * @property {string} searchTerm
 * @property {(term: string) => void} setSearchTerm
 */

/**
 * @type {import('react').Context<SearchContextValue>}
 */
export const SearchContext = createContext()
