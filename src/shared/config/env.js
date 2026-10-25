/**
 * Environment configuration
 * Centralizes all import.meta.env access for the application
 *
 * @typedef {'Quran Sound'} AppName
 * @typedef {string} AppVersion
 * @typedef {string} APIBaseUrl
 * @typedef {string} AudioCdn
 * @typedef {boolean} EnableAnalytics
 * @typedef {boolean} EnableOfflineMode
 * @typedef {boolean} DebugMode
 * @typedef {boolean} IsDevelopment
 * @typedef {boolean} IsProduction
 * @typedef {boolean} IsSSR
 *
 * Application configuration object
 * @type {{
 *   appName: AppName,
 *   appVersion: AppVersion,
 *   apiBaseUrl: APIBaseUrl,
 *   audioCdn: AudioCdn,
 *   enableAnalytics: EnableAnalytics,
 *   enableOfflineMode: EnableOfflineMode,
 *   debugMode: DebugMode,
 *   isDevelopment: IsDevelopment,
 *   isProduction: IsProduction,
 *   isSSR: IsSSR
 * }}
 */
export const config = {
  // Application metadata
  appName: import.meta.env?.VITE_APP_NAME || 'Quran Sound',
  appVersion: import.meta.env?.VITE_APP_VERSION || '0.0.1',

  // API and CDN configuration
  apiBaseUrl: import.meta.env?.VITE_API_BASE_URL || 'https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev',
  audioCdn: import.meta.env?.VITE_AUDIO_CDN || 'https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev',

  // Feature flags
  enableAnalytics: import.meta.env?.VITE_ENABLE_ANALYTICS === 'true',
  enableOfflineMode: import.meta.env?.VITE_ENABLE_OFFLINE_MODE !== 'false',

  // Build environment
  debugMode: import.meta.env?.VITE_DEBUG_MODE === 'true',
  isDevelopment: import.meta.env?.DEV,
  isProduction: import.meta.env?.PROD,
  isSSR: import.meta.env?.SSR,
}

export default config
