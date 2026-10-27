/**
 * Quran Project Constants
 * Centralized configuration and constants used throughout the application
 */

// ============================================================================
// App Metadata
// ============================================================================
export const APP_NAME = 'Quran Sound'
export const APP_DESCRIPTION = 'استمع إلى القرآن الكريم'
export const APP_TITLE = 'Quran Sound | استمع إلى القرآن الكريم'
export const APP_VERSION = '0.0.1'
export const APP_COPYRIGHT = '© 2026 Quran-sound™'

// ============================================================================
// Quran Data Constants
// ============================================================================
export const QURAN_TOTAL_SURAHS = 114
export const QURAN_TOTAL_AYAHS = 6236

// ============================================================================
// Storage Keys
// ============================================================================
export const STORAGE_KEYS = {
  THEME: 'theme',
  FAVORITES: 'favorites',
  BOOKMARKS: 'bookmarks',
  LAST_SURAH: 'last_surah',
}

// ============================================================================
// Theme Configuration
// ============================================================================
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

export const THEME_COLORS = {
  LIGHT: {
    SURFACE_1: '#f5f2ed',
    SURFACE_2: '#f7f4f1',
    SURFACE_3: '#ffffff',
    BORDER_SOFT: '#d9d4cd',
    BORDER_STRONG: '#c9c3be',
    TEXT_PRIMARY: '#1e2d28',
    TEXT_MUTED: '#6b625b',
    ACCENT: '#5de9b5',
  },
  DARK: {
    SURFACE_1: '#0f172a',
    SURFACE_2: '#111827',
    SURFACE_3: '#1e293b',
    BORDER_SOFT: '#334155',
    BORDER_STRONG: '#475569',
    TEXT_PRIMARY: '#d1fae5',
    TEXT_MUTED: '#cbd5e1',
    ACCENT: '#5de9b5',
  },
}

// ============================================================================
// Routes
// ============================================================================
export const ROUTES = {
  HOME: '/',
  SURAH: '/surah/:number',
  NOT_FOUND: '*',
}

// ============================================================================
// Layout Classes (Tailwind + Custom)
// ============================================================================
export const LAYOUT_CLASSES = {
  CONTAINER: 'mx-auto max-w-325 flex-1 px-4 py-5 sm:px-6 lg:px-8',
  CARD: 'rounded-2xl border border-[#d9d4cd] bg-[#f7f4f1] p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900',
  BUTTON_NAV: 'rounded-lg border border-[#d9d4cd] bg-white px-4 py-2 text-(--text-primary) no-underline shadow-sm transition-colors hover:bg-[#f5f2ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700',
  SURAH_GRID: 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  SURAH_CARD: 'flex h-30 gap-2 items-center justify-center rounded-xl border border-[#d9d4cd] bg-[#f5f2ed] px-2 py-3 text-center text-inherit shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-800 cursor-pointer',
  SURAH_NUMBER: 'num dark:text-slate-300',
  MAIN_HEADING: 'mb-4 pb-3 border-b-3 text-center text-3xl font-bold tracking-tight text-[#1e2d28] dark:text-emerald-300',
}

// ============================================================================
// Arabic Labels & UI Text
// ============================================================================
export const LABELS = {
  // App
  APP_NAME: 'Quran-sound',

  // Navigation
  BACK_TO_INDEX: 'العودة إلى فهرس السور',
  SURAH_INDEX: 'فهرس السور',
  NAVIGATE_SURAHS: 'التنقل بين السور',

  // Search
  SEARCH_PLACEHOLDER: 'ابحث باسم السورة أو رقمها',
  SEARCH_SURAHS: 'Search surahs',
  NO_RESULTS: 'لا توجد سور مطابقة للبحث',

  // Surah Details
  LISTEN_SURAH: 'استمع إلى سورة',
  SURAH_NOT_FOUND: 'لم يتم العثور على السورة',
  AUDIO_NOT_SUPPORTED: 'متصفحك لا يدعم تشغيل الصوت',

  // Data Loading
  DATA_LOAD_ERROR: 'تعذر تحميل بيانات السور',
  DATA_LOAD_ERROR_DETAIL: 'يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
  RETRY: 'إعادة المحاولة',

  // Theme
  SWITCH_TO_LIGHT: 'Switch to light mode',
  SWITCH_TO_DARK: 'Switch to dark mode',

  // Audio
  AUDIO_LOADING: 'Loading audio...',
  AUDIO_ERROR: 'Error loading audio',
  PLAY: 'Play',
  PAUSE: 'Pause',
  LOADING: 'جاري التحميل...',
}

// ============================================================================
// UI Elements & Icons
// ============================================================================
export const UI = {
  SEPARATOR: '٠',
  AUDIO_PRELOAD: 'none',
  CHEVRON_RIGHT: 'chev chev-r',
  CHEVRON_LEFT: 'chev chev-l',
}

// ============================================================================
// Audio Configuration
// ============================================================================
export const AUDIO_CONFIG = {
  CDN: 'https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev',
  PRELOAD: 'none',
  CONTROLS: true,
}

// ============================================================================
// API Endpoints (Future Use)
// ============================================================================
export const API = {
  BASE_URL: 'https://api.quran.example.com',
  ENDPOINTS: {
    SURAHS: '/surahs',
    SURAH_DETAIL: '/surahs/:number',
    AUDIO: '/audio/:number',
  },
}

// ============================================================================
// Riwayat (Recitation Styles)
// ============================================================================
export const RIWAYAT_OPTIONS = [
  { id: '31', label: 'التجويد (ملون)', labelEn: 'Tajweed (color-coded)', description: 'رواية حفص عن عاصم' },
  { id: '33', label: 'شعبة عن عاصم', labelEn: "Shu'bah", description: "رواية شعبة عن عاصم" },
  { id: '19', label: 'قالون عن نافع', labelEn: 'Qalun', description: "رواية قالون عن نافع" },
  { id: '17', label: 'ورش عن نافع', labelEn: 'Warsh', description: "رواية ورش عن نافع" },
  { id: '24', label: 'البزي عن ابن كثير', labelEn: 'Al-Bazzi', description: "رواية البزي عن ابن كثير" },
  { id: '25', label: 'قنبل عن ابن كثير', labelEn: 'Qunbul', description: "رواية قنبل عن ابن كثير" },
  { id: '27', label: 'الدوري عن أبي عمرو', labelEn: 'Al-Duri', description: "رواية الدوري عن أبي عمرو" },
]


// ============================================================================
// Pagination & Limits
// ============================================================================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_RESULTS: 114,
}

// ============================================================================
// Accessibility
// ============================================================================
export const ARIA_LABELS = {
  SEARCH_INPUT: 'Search surahs by name or number',
  TOGGLE_THEME: 'Toggle dark/light mode',
  SURAH_CARD: (name, nameEn) => `Listen to surah ${name} (${nameEn})`,
  PLAY_AUDIO: 'Play audio',
  PAUSE_AUDIO: 'Pause audio',
  PREVIOUS_SURAH: 'Previous surah',
  NEXT_SURAH: 'Next surah',
  BACK_HOME: 'Back to surah index',
  NAVIGATE_BETWEEN_SURAHS: 'Navigate between surahs',
}

// ============================================================================
// Error Messages
// ============================================================================
export const ERROR_MESSAGES = {
  SURAH_NOT_FOUND: 'Surah not found',
  INVALID_SURAH_NUMBER: 'Invalid surah number (must be 1-114)',
  AUDIO_LOAD_FAILED: 'Failed to load audio',
  STORAGE_ERROR: 'Failed to access local storage',
  NETWORK_ERROR: 'Network error occurred',
}

// ============================================================================
// Success Messages
// ============================================================================
export const SUCCESS_MESSAGES = {
  THEME_CHANGED: 'Theme changed successfully',
  FAVORITE_ADDED: 'Added to favorites',
  FAVORITE_REMOVED: 'Removed from favorites',
  BOOKMARK_SAVED: 'Bookmark saved',
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get surah card ARIA label
 * @param {string} surahName - Arabic surah name
 * @param {string} surahNameEn - English surah name
 * @returns {string} ARIA label text
 */
export function getSurahAriaLabel(surahName, surahNameEn) {
  return `استمع إلى سورة ${surahName} (${surahNameEn})`
}

/**
 * Format surah metadata for display
 * @param {Object} surah - Surah object
 * @returns {string} Formatted metadata string
 */
export function formatSurahMetadata(surah) {
  return `${surah.surah_name_en} ${UI.SEPARATOR} ${surah.revelation_place} ${UI.SEPARATOR} آية ${surah.ayahs_count}`
}

/**
 * Get theme class name
 * @param {string} theme - Theme name
 * @returns {string} CSS class name
 */
export function getThemeClassName(theme) {
  return theme === THEMES.DARK ? 'dark' : ''
}
