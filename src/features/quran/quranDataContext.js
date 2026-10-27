import { createContext } from 'react'

/**
 * @typedef {Object} QuranDataContextValue
 * @property {import('@types/index').Surah[]} surahs
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {() => void} retry
 * @property {string|number} recitationId
 * @property {(id: string|number) => void} setRecitationId
 */

/**
 * @type {import('react').Context<QuranDataContextValue|undefined>}
 */
export const QuranDataContext = createContext(undefined)

