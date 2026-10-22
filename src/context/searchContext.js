import { createContext } from 'react'

/**
 * Context for sharing the surah search term across the app.
 * Kept in its own module so that the provider file only exports a
 * component (required for React Fast Refresh to work correctly).
 */
export const SearchContext = createContext()
