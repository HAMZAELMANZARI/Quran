/**
 * Custom TypeScript declarations for development-only assets
 */

// Type declaration for CSS modules (allowing side-effect imports)
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

// Type declaration for SVG assets
declare module '*.svg' {
  const content: { __esModule: true; default: string }
  export default content
}

// ImportMeta extension for browser-specific environment variables
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ITQAN_RECITATION_ID: string
  readonly VITE_AUDIO_CDN: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_OFFLINE_MODE: string
  readonly VITE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}