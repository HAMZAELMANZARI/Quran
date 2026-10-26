import { createContext } from 'react'

/**
 * @typedef {Object} QuranDataContextValue
 * @property {import('@types/index').Surah[]} surahs
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {() => void} retry
 */

/**
 * @type {import('react').Context<QuranDataContextValue|undefined>}
 */
export const QuranDataContext = createContext(undefined)
