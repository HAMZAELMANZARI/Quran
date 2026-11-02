/** @type {Promise<{ default: import('react').ComponentType }>|undefined} */
let surahPagePromise

/**
 * Load the SurahPage route chunk once and reuse the same promise for
 * subsequent calls, so hovering a card warms the module before navigation.
 * @returns {Promise<{ default: import('react').ComponentType }>}
 */
export function preloadSurahPage() {
  if (!surahPagePromise) {
    surahPagePromise = import('./SurahPage')
  }

  return surahPagePromise
}

export default preloadSurahPage
