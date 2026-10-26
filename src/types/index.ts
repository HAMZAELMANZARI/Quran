/**
 * Core type definitions for the Quran Sound application
 */

/**
 * Surah object from Quran data
 */
export interface Surah {
  surah_number: number
  surah_name: string
  surah_name_en: string
  audio_url: string
  duration_ms: number
  size_bytes: number
  revelation_order: number
  revelation_place: 'Makkah' | 'Madinah'
  ayahs_count: number
  ayahs_timings: unknown[]
}

/**
 * Search result item with searchable values
 */
export interface SearchResult {
  item: Surah
  searchValues: string[]
}

/**
 * Theme type for dark mode system
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * Audio playback state
 */
export interface AudioState {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  currentTime: number
  duration: number
  error: string | null
  play: () => void
  pause: () => void
  seek: (time: number) => void
}

/**
 * Surah navigation state
 */
export interface SurahNavigation {
  surah: Surah | null
  previous: Surah | null
  next: Surah | null
  isValid: boolean
  error: string | null
  isLoading: boolean
}

/**
 * Storage configuration
 */
export interface StorageKeys {
  THEME: string
  FAVORITES: string
  BOOKMARKS: string
  LAST_SURAH: string
}

/**
 * Application configuration
 */
export interface AppConfig {
  appName: string
  appVersion: string
  apiBaseUrl: string
  itqanRecitationId: string
  audioCdn: string
  enableAnalytics: boolean
  enableOfflineMode: boolean
  debugMode: boolean
  isDevelopment: boolean
  isProduction: boolean
}
