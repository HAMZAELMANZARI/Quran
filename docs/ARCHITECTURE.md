# Quran Sound - System Architecture

## Overview

Quran Sound is a responsive, modern React web application for browsing and listening to Quran recitations. The application provides a bilingual (Arabic/English) interface with RTL support, dark mode, and search functionality across 114 surahs of the Quran.

**Current State** (Post Phase 5-7):
- Professional, scalable architecture with separation of concerns
- React 19.2.8 with React Router v6 for client-side routing
- Vite 8.3.0 for fast development and optimized builds
- Tailwind CSS 4.3.3 for utility-first styling
- TypeScript foundation with gradual migration support
- Custom React hooks for business logic extraction
- Centralized configuration management
- Full GitHub Pages deployment support at `/Quran/` subdirectory

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.8 | UI framework |
| **React Router** | 6.30.6 | Client-side routing |
| **Vite** | 8.3.0 | Build tool and dev server |
| **Tailwind CSS** | 4.3.3 | Utility-first styling with @tailwindcss/vite |
| **TypeScript** | (Optional) | Type safety with gradual adoption |
| **React Context API** | Built-in | State management for search |
| **Custom Hooks** | - | Business logic extraction |

**Node & Package Manager**:
- Node.js: Compatible with Vite 8+
- Package Manager: pnpm (preferred for faster installation)

---

## Project Structure

### Directory Organization

```
src/
├── components/              # React components organized by type
│   ├── common/             # Reusable components across app
│   │   ├── Header.jsx      # App header with search and theme toggle
│   │   ├── Footer.jsx      # App footer
│   │   ├── SearchBar.jsx   # Search input component
│   │   └── AudioPlayer.jsx # HTML5 audio player wrapper
│   ├── pages/              # Page-level components for routes
│   │   ├── IndexPage.jsx   # Home page (all 114 surahs)
│   │   └── SurahPage.jsx   # Single surah detail page
│   ├── ErrorBoundary.jsx   # Error handling component
│   ├── App.jsx             # Root app component
│   └── SkipLink.jsx        # Accessibility skip link (future)
│
├── hooks/                  # Custom React hooks
│   ├── useDarkMode.js      # Dark mode with localStorage + system preference
│   ├── useSurah.js         # Surah fetching and navigation logic
│   ├── useSearch.js        # Search filtering with memoization
│   └── useAudio.js         # Audio playback state management
│
├── utils/                  # Pure utility functions
│   ├── quranData.js        # Data access functions (7 functions)
│   ├── themeUtils.js       # Theme management utilities (8 functions)
│   ├── constants.js        # Shared constants (150+ lines)
│   └── storage.js          # Safe localStorage wrapper
│
├── context/                # React Context for state management
│   └── SearchContext.jsx   # Search term state provider
│
├── config/                 # Configuration management
│   └── env.js              # Environment variable wrapper
│
├── types/                  # TypeScript type definitions
│   └── index.ts            # Core interfaces (Surah, SearchResult, etc.)
│
├── data/                   # Data layer
│   └── quran.js            # 114 surahs with metadata and audio URLs
│
├── css/                    # Stylesheets
│   └── tailwind.css        # Tailwind configuration and component layers
│
├── router.jsx              # React Router configuration
├── main.jsx                # Application entry point
└── App.jsx                 # Root component

public/
├── favicon.svg             # App icon
└── robots.txt              # SEO robots directive

Root Level:
├── index.html              # Single HTML entry point
├── vite.config.js          # Vite configuration with path aliases
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variable template
└── package.json            # Dependencies and scripts
```

### Key Directories Explained

**`src/components/`**
- **common/**: Reusable components (Header, Footer, SearchBar, AudioPlayer)
- **pages/**: Route-based page components (IndexPage, SurahPage)
- Root level: App layout and ErrorBoundary

**`src/hooks/`**
- Custom React hooks encapsulating business logic
- Enable component reusability and testability
- Patterns: useMemo for performance, useEffect for lifecycle

**`src/utils/`**
- Pure functions with no side effects
- Data access (quranData.js)
- Theme management (themeUtils.js)
- Shared constants (constants.js)
- Storage abstraction (storage.js)

**`src/config/`**
- Centralized environment configuration
- `env.js` provides single point of access to `import.meta.env`

**`src/types/`**
- TypeScript interfaces for main data types
- `index.ts` exports: Surah, SearchResult, Theme, AudioState, etc.

---

## Component Hierarchy

```
App (root layout)
├── ErrorBoundary (error handling)
│   └── SearchProvider (SearchContext)
│       ├── Header (navigation + search)
│       │   └── SearchBar (search input)
│       ├── Router (route switching)
│       │   ├── IndexPage (all 114 surahs)
│       │   │   └── Surah cards grid (buttons)
│       │   └── SurahPage (single surah)
│       │       ├── AudioPlayer (HTML5 audio)
│       │       └── Navigation buttons (previous/next)
│       └── Footer (app information)
```

---

## Data Flow

### 1. Application Initialization
```
main.jsx
  → imports App from App.jsx
  → App wraps with ErrorBoundary and SearchProvider (Context)
  → Router (BrowserRouter) initializes with basename="/Quran/"
```

### 2. Home Page (IndexPage)
```
User visits: /Quran/
  ↓
Router matches "/" → renders IndexPage
  ↓
IndexPage:
  - Gets searchTerm from SearchContext
  - Calls useSearch(searchTerm) hook
  - useSearch hook:
    * Calls filterSurahs(searchTerm) from quranData.js
    * Returns filtered 114 surahs
    * Memoized with useMemo
  ↓
Maps over filtered surahs → renders surah cards
Each card is clickable button:
  - Click → navigate to /surah/{number}
  - Uses React Router navigate()
```

### 3. Surah Detail Page (SurahPage)
```
User clicks surah card
  ↓
Router matches "/surah/:number" → renders SurahPage
  ↓
SurahPage:
  - Gets route param "number" with useParams()
  - Calls useSurah(number) hook
  - useSurah hook:
    * Calls getSurahByNumber(number) from quranData.js
    * Calls getAdjacentSurahs(number) for prev/next
    * Returns {surah, previous, next}
    * Memoized with useMemo
  ↓
Displays:
  - Surah name, English name, revelation place, ayah count
  - HTML5 audio player (src from surah.audio_url)
  - Previous/Next navigation buttons
  - Back to Index button
```

### 4. Search Flow
```
User types in search box
  ↓
SearchBar onChange event fires
  ↓
Updates SearchContext (setSearchTerm)
  ↓
IndexPage (subscribed to SearchContext) re-renders
  ↓
useSearch(searchTerm) hook runs:
  - Filters across 4 fields:
    * Arabic name (surah_name)
    * English name (surah_name_en)
    * Surah number
    * Revelation place
  - Case-insensitive matching
  - Returns filtered array
  ↓
Component re-renders with filtered results
```

### 5. Dark Mode Flow
```
User clicks theme toggle button (in Header)
  ↓
Calls useDarkMode() hook:
  - Toggles theme value
  - Saves to localStorage
  - Updates document.documentElement class
  ↓
CSS variables (@media .dark) apply new theme colors
  ↓
App re-renders with new color scheme
```

---

## State Management

### 1. SearchContext (Application State)
**File**: `src/context/SearchContext.jsx`

```javascript
// Provides global search term state
<SearchProvider>
  <value={{ searchTerm, setSearchTerm }}>
    {children}
  </value>
</SearchProvider>
```

**Usage**: 
- Header.jsx → SearchBar sets searchTerm
- IndexPage.jsx → useContext gets searchTerm and filters

**Why Context**: Search term is needed in multiple places (Header and IndexPage) without prop drilling.

### 2. useDarkMode Hook (Local State)
**File**: `src/hooks/useDarkMode.js`

```javascript
const [isDark, toggleDarkMode] = useDarkMode()
```

**State Management**:
- localStorage.getItem('theme') for persistence
- window.matchMedia('prefers-color-scheme: dark') for system preference
- document.documentElement.classList.toggle('dark') for styling

**Priority**: Saved preference > System preference > Default (light)

### 3. Component Local State
- IndexPage: No local state (uses context)
- SurahPage: No local state (uses useParams for route data)
- Header: No local state (uses context and hooks)

---

## Routing Structure

**React Router v6 Configuration**: `src/router.jsx`

```javascript
<BrowserRouter basename="/Quran/">
  <Routes>
    <Route path="/" element={<IndexPage />} />           // Home page
    <Route path="/surah/:number" element={<SurahPage />} /> // Detail page
    <Route path="*" element={<Navigate to="/" replace />} /> // 404 fallback
  </Routes>
</BrowserRouter>
```

### Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | IndexPage | Display all 114 surahs with search |
| `/surah/:number` | SurahPage | Show single surah details + audio |
| `*` | Navigate to "/" | Catch all invalid routes |

### Navigation Patterns

**Programmatic Navigation**:
```javascript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate(`/surah/${surahNumber}`)  // Navigate to surah
navigate('/')                       // Back to home
```

**Browser History**: Back/Forward buttons work naturally with React Router.

---

## Custom Hooks Architecture

### 1. useSurah
**File**: `src/hooks/useSurah.js`

```javascript
const { surah, previous, next, isValid, error } = useSurah(surahNumber)
```

**Responsibilities**:
- Fetch surah by number (1-114)
- Calculate previous/next surahs for navigation
- Validate surah number
- Handle errors

**Memoization**: useMemo prevents recalculation on renders

### 2. useSearch
**File**: `src/hooks/useSearch.js`

```javascript
const filteredResults = useSearch(searchTerm)
```

**Responsibilities**:
- Filter 114 surahs by search term
- Search across 4 fields (name AR, name EN, number, revelation place)
- Case-insensitive matching

**Memoization**: useMemo prevents O(114) filter on every keystroke

### 3. useAudio
**File**: `src/hooks/useAudio.js`

```javascript
const { audioRef, isPlaying, currentTime, duration, error, play, pause, seek } = useAudio(src)
```

**Responsibilities**:
- Manage HTML5 audio element lifecycle
- Track playback state (playing, time, duration)
- Provide control methods (play, pause, seek)
- Handle errors

**Event Listeners**: loadedmetadata, timeupdate, play, pause, error, ended

### 4. useDarkMode
**File**: `src/hooks/useDarkMode.js`

```javascript
const [isDark, toggleDarkMode] = useDarkMode()
```

**Responsibilities**:
- Manage dark mode preference
- Persist to localStorage
- Respect system preference
- Update document class for CSS

---

## Utility Functions Layer

### quranData.js (7 functions)
```javascript
createSearchIndex()        // Build searchable index
filterSurahs(term)        // Filter by search term
getSurahByNumber(num)     // Get single surah
getSurahIndex(num)        // Get array position
getAdjacentSurahs(num)    // Get prev/next
getAllSurahs()            // Get all 114
isValidSurahNumber(num)   // Validate 1-114
```

**Data Source**: `src/data/quran.js` (114 surahs array)

### themeUtils.js (8 functions)
```javascript
getSystemTheme()          // System preference
getSavedTheme()           // localStorage
saveTheme(theme)          // Persist
applyTheme(theme)         // Update DOM
getInitialTheme()         // Startup logic
```

### constants.js (150+ lines)
```javascript
APP_NAME, APP_DESCRIPTION, APP_VERSION
QURAN_TOTAL_SURAHS (114), QURAN_TOTAL_AYAHS (6236)
THEMES { LIGHT, DARK, SYSTEM }
ROUTES { HOME: '/', SURAH: '/surah/:number' }
STORAGE_KEYS { THEME, FAVORITES, BOOKMARKS, LAST_SURAH }
ARIA_LABELS (Arabic labels for accessibility)
LAYOUT_CLASSES (Tailwind utility combinations)
LABELS (UI text in Arabic/English)
```

### storage.js (Safe wrapper)
```javascript
storage.getItem(key, default)
storage.setItem(key, value)
storage.removeItem(key)
```

Handles: private browsing, localStorage disabled, SSR safety.

---

## Environment Configuration

### Configuration Layers

**1. System Environment** (`import.meta.env`)
- Vite built-in: DEV, PROD, SSR
- Custom VITE_ prefixed variables

**2. .env.example** (Template)
```env
VITE_APP_NAME=Quran Sound
VITE_APP_VERSION=0.0.1
VITE_API_BASE_URL=https://...
VITE_AUDIO_CDN=https://...
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE_MODE=true
VITE_DEBUG_MODE=false
```

**3. .env.local** (User overrides, git-ignored)
- User creates from .env.example
- Local-only configuration

**4. src/config/env.js** (Centralized wrapper)
```javascript
export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'Quran Sound',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.0.1',
  // ... all environment variables
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
```

**Usage**:
```javascript
import config from '@config/env'
console.log(config.appName)
fetch(`${config.apiBaseUrl}/surahs`)
```

---

## Type System

### TypeScript Foundation

**File**: `src/types/index.ts`

**Interfaces**:
```typescript
Surah              // Core data type (114 surahs)
SearchResult       // Search filtering output
Theme              // 'light' | 'dark' | 'system'
AudioState         // Audio playback controls
SurahNavigation    // Previous/next navigation
StorageKeys        // localStorage key constants
AppConfig          // Environment configuration
```

### Gradual Migration Strategy

1. **Current** (Phase 6): JSDoc type hints in .js files
2. **Phase 10+**: Enable `checkJs: true` for stricter checking
3. **Phase 10+**: Convert critical .js files to .ts/.tsx

**IDE Support**: TypeScript paths configured in tsconfig.json and vite.config.js

---

## Build Configuration

### Vite Config (`vite.config.js`)

**Key Settings**:
```javascript
base: "/Quran/"                    // GitHub Pages subdirectory
plugins: [react(), tailwindcss()]  // React + Tailwind
resolve: {
  alias: {
    '@': 'src/',                   // Path aliases for imports
    '@components': 'src/components/',
    '@hooks': 'src/hooks/',
    '@utils': 'src/utils/',
    '@data': 'src/data/',
    '@context': 'src/context/',
    '@types': 'src/types/',
    '@config': 'src/config/',
  }
}
```

**Build Output**:
- Development: HMR enabled, source maps
- Production: Minified, optimized chunks

### TypeScript Config (`tsconfig.json`)

**Key Settings**:
```json
target: "ES2020"           // Modern JavaScript
allowJs: true              // Keep .js files working
checkJs: false             // Optional type checking
strict: true               // Prepare for future TS files
paths: { ... }             // Match vite aliases
noEmit: true               // Vite handles compilation
```

---

## CSS Architecture

### Tailwind CSS with @layer

**File**: `src/css/tailwind.css`

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Light theme CSS variables */
}

html.dark {
  /* Dark theme CSS variables */
}

@layer components {
  /* Component utilities (.num, .chev, .par-center, etc.) */
}

@layer utilities {
  /* Custom utilities */
}
```

**Theme Variables**:
- `--surface-1`, `--surface-2`, `--surface-3`: Background colors
- `--border-soft`, `--border-strong`: Border colors
- `--text-primary`, `--text-muted`: Text colors
- `--logo-name-hover`, `--i-hover`: Interactive states

**Dark Mode**: `.dark` class on `html` element toggles CSS variables

---

## Performance Optimizations

### 1. Code Splitting
- React Router lazy loads page components with React.lazy()
- Separate chunks for IndexPage and SurahPage

### 2. Memoization
- useSearch hook: useMemo prevents O(114) filter on every keystroke
- useSurah hook: useMemo prevents recalculation
- Components: memo() for expensive renders

### 3. Bundle Size
- Tailwind purges unused CSS (only used utilities included)
- Vite tree-shakes unused code
- GZIP compression in production

### 4. Data Access
- All 114 surahs bundled (no network delay)
- Audio loaded from CDN on demand
- localStorage for theme persistence (no requests)

---

## Error Handling

### ErrorBoundary Component
**File**: `src/components/ErrorBoundary.jsx`

- Catches React render errors
- Shows user-friendly fallback UI in Arabic
- Provides reload button
- Logs error for debugging

### Storage Errors
- Safe storage wrapper handles disabled localStorage
- Graceful degradation if storage unavailable
- Useful in private browsing mode

### Audio Errors
- useAudio hook tracks error state
- HTML5 audio element reports errors
- Can show user feedback if needed

---

## Deployment Architecture

### GitHub Pages at `/Quran/` subdirectory

**Build Process**:
```bash
pnpm run build  # Outputs to dist/
pnpm run deploy # Pushes dist/ to gh-pages branch
```

**Base Path Configuration**:
- vite.config.js: `base: "/Quran/"`
- Router: `<BrowserRouter basename="/Quran/">`
- Ensures all assets load from /Quran/ path

**Environment-Specific Config**:
- Development: Debug mode ON, local URLs
- Production: Debug OFF, CDN URLs

---

## Future Architecture Considerations

### API Integration Path
1. Current: Bundled 114 surahs in src/data/quran.js
2. Future: Replace with API calls in useSearch and useSurah hooks
3. Caching: Use ErrorBoundary + offline storage strategy

### Feature Expansion
- Favorites/bookmarks (localStorage or API)
- Reading history
- Ayah-level search
- Multiple reciters/translations
- Offline mode with service workers

### Scalability
- Current structure supports unlimited surahs
- Custom hooks make API migration straightforward
- Context API sufficient for this scale (114 surahs)
- Redux/Zustand optional for larger state

---

## Related Documentation

- **[SETUP.md](./SETUP.md)** - Development environment setup
- **[COMPONENTS.md](./COMPONENTS.md)** - Component API documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - GitHub Pages deployment
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - WCAG compliance
- **[README.md](../README.md)** - Project overview
