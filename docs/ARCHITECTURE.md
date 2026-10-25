# Quran Sound - System Architecture

## Overview

Quran Sound is a responsive React web application for browsing and listening to
Quran recitations. It provides a bilingual (Arabic/English) interface with RTL
support, dark mode, and search across all 114 surahs.

**Current state** (after the architecture refactor and test migration):

- Feature-based, vertically sliced source tree (`app/`, `features/`, `shared/`)
- React 19 with React Router 7 and lazy-loaded routes
- Vite 8 build with a single HTML entry point
- Tailwind CSS 4 with CSS custom properties for theming
- JavaScript with JSDoc types, plus a TypeScript definition foundation
- Vitest + Testing Library test suite under `tests/`
- GitHub Pages deployment at the `/Quran/` subdirectory

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.8 | UI framework |
| **React Router** | 7.18.4 | Client-side routing |
| **Vite** | 8.3.0 | Build tool and dev server |
| **Tailwind CSS** | 4.3.3 | Utility-first styling via `@tailwindcss/vite` |
| **Vitest** | 5.0.5 | Test runner |
| **Testing Library** | 16.x | Component and hook testing |
| **TypeScript** | 7.0.2 | Type definitions and JSDoc checking |
| **React Context API** | Built-in | Search term state |
| **Custom Hooks** | - | Business logic extraction |

**Node & package manager**:

- Node.js `>=22.12.0` (Vite 8 / Vitest 5 compatible)
- pnpm `>=12.0.0`, pinned to `pnpm@12.11.2` via `packageManager`
- npm and yarn are rejected by `scripts/check-package-manager.mjs`

---

## Project Structure

### Directory Organization

```
.
├── main.jsx                     # React entry point
├── index.html                   # Vite HTML entry point
├── surha.html                   # Legacy/standalone HTML shell (not built)
│
├── src/
│   ├── app/                     # Application shell and composition root
│   │   ├── App.jsx              # Layout: SkipLink + Header + children + Footer
│   │   ├── AppRouter.jsx        # BrowserRouter, SearchProvider, routes, lazy pages
│   │   └── ErrorBoundary.jsx    # Class-based error boundary with fallback UI
│   │
│   ├── features/                # Feature modules (vertical slices)
│   │   ├── quran/               # Quran domain
│   │   │   ├── pages/
│   │   │   │   ├── IndexPage.jsx    # Home page (all 114 surahs)
│   │   │   │   └── SurahPage.jsx    # Single surah detail page
│   │   │   ├── components/
│   │   │   │   └── SurahCard.jsx    # Memoized surah card button
│   │   │   ├── hooks/
│   │   │   │   └── useSurah.js      # Surah lookup and adjacent navigation
│   │   │   ├── utils/
│   │   │   │   └── quranData.js     # Data access + cached search index
│   │   │   └── data/
│   │   │       └── quran.js         # 114 surahs with metadata and audio URLs
│   │   ├── search/              # Search domain
│   │   │   ├── SearchProvider.jsx   # Search term state provider
│   │   │   ├── searchContext.js     # Context object + JSDoc value type
│   │   │   └── useSearch.js         # Memoized filtering
│   │   ├── theme/               # Theme domain
│   │   │   ├── useDarkMode.js       # localStorage + system preference
│   │   │   └── themeUtils.js        # Theme helpers
│   │   └── audio/               # Audio domain
│   │       └── useAudio.js          # Playback state (available, not wired yet)
│   │
│   ├── shared/                  # Cross-feature foundation
│   │   ├── components/          # Header, Footer, SkipLink
│   │   ├── hooks/               # useDocumentMeta
│   │   ├── utils/               # constants, storage
│   │   ├── config/              # env.js
│   │   ├── styles/              # tailwind.css, normalize.css, all.min.css
│   │   └── assets/              # quran-sound.svg
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── index.ts             # Core interfaces (Surah, SearchResult, etc.)
│   │   └── assets.d.ts          # Asset module declarations
│   │
│   └── plan.drawio              # Architecture diagrams (3 pages)
│
├── public/
│   ├── favicon.svg              # App icon
│   └── robots.txt               # SEO robots directive
│
├── scripts/
│   └── check-package-manager.mjs # pnpm-only install guard
│
├── tests/                       # Vitest suite
│   ├── setup.js                 # jest-dom + localStorage cleanup
│   ├── components/              # ErrorBoundary, IndexPage, SkipLink
│   ├── hooks/                   # useDarkMode, useDocumentMeta, useSurah
│   └── utils/                   # quranData, storage, themeUtils
│
├── docs/                        # Documentation
├── vite.config.js               # Vite configuration and path aliases
├── vitest.config.js             # Vitest configuration and path aliases
├── tsconfig.json                # TypeScript / JSDoc configuration
├── eslint.config.js             # ESLint flat config
├── .env.example                 # Environment variable template
└── package.json                 # Dependencies and scripts
```

### Key Directories Explained

**`src/app/`**

- Composition root: providers, router, layout, and the top-level error boundary.
- `App.jsx` is a layout component that receives the active route as `children`.
- `AppRouter.jsx` owns `BrowserRouter`, `SearchProvider`, lazy page imports, and
  the `Suspense` loading fallback.

**`src/features/`**

- One folder per domain. A feature owns its pages, components, hooks, utilities,
  and data. Cross-feature imports go through `@features/...`.
- `quran` is the primary feature; `search` and `theme` are supporting features.
- `audio` contains a prepared `useAudio` hook that is not yet wired into the UI.
  `SurahPage` currently renders the browser's native `<audio controls>` element.

**`src/shared/`**

- Reusable, feature-agnostic building blocks: layout components, shared hooks,
  constants, storage helpers, environment config, styles, and static assets.

**`src/types/`**

- TypeScript interfaces and ambient asset declarations. JavaScript files use
  JSDoc imports from `src/types` and local modules where useful.

**`tests/`**

- Mirrors the source domains (`components/`, `hooks/`, `utils/`) instead of being
  colocated with source files.

---

## Component Hierarchy

```
main.jsx
└── StrictMode
    └── ErrorBoundary                 # catches render errors from everything below
        └── AppRouter
            └── BrowserRouter (basename="/Quran/")
                └── SearchProvider    # owns searchTerm state
                    └── App           # layout
                        ├── SkipLink
                        ├── Header
                        │   └── inline search <form> + theme toggle
                        ├── Suspense
                        │   └── Routes
                        │       ├── "/"              → IndexPage
                        │       │   └── SurahCard × N
                        │       └── "/surah/:number" → SurahPage
                        │           ├── native <audio controls>
                        │           └── previous / next / back buttons
                        └── Footer
```

---

## Data Flow

### 1. Application Initialization

```
main.jsx
  → imports AppRouter and ErrorBoundary
  → renders <ErrorBoundary><AppRouter /></ErrorBoundary> inside StrictMode
  → AppRouter creates BrowserRouter with basename="/Quran/"
  → SearchProvider initializes searchTerm = ''
  → App reads SearchContext and renders Header/search/Footer around children
```

### 2. Home Page (IndexPage)

```
User visits: /Quran/
  ↓
Router matches "/" → lazy IndexPage renders
  ↓
IndexPage:
  - reads searchTerm from SearchContext
  - calls useSearch(searchTerm)
  - useSearch memoizes filterSurahs(searchTerm)
  - filterSurahs uses a lazily built, cached search index
  ↓
Maps the filtered surahs to memoized SurahCard buttons
  - click → handleSelect(number) → navigate(`/surah/${number}`)
  - live region announces the result count
```

### 3. Surah Detail Page (SurahPage)

```
User clicks a surah card
  ↓
Router matches "/surah/:number" → lazy SurahPage renders
  ↓
SurahPage:
  - reads :number with useParams()
  - calls useSurah(number)
  - useSurah memoizes getSurahByNumber + getAdjacentSurahs
  - sets document title/description with useDocumentMeta
  ↓
Displays:
  - Arabic name, English name, revelation place, ayah count
  - native HTML5 audio player sourced from surah.audio_url
  - previous / next navigation and back-to-index buttons
  - focus moves to the heading whenever :number changes
```

### 4. Search Flow

```
User types in the Header search input
  ↓
onChange → onSearchChange(value) → SearchProvider.setSearchTerm
  ↓
SearchContext consumers re-render (App → Header and IndexPage)
  ↓
useSearch(searchTerm) → filterSurahs(searchTerm)
  - searches Arabic name, English name, number, revelation place
  - case-insensitive, substring match
  - cached index avoids rebuilding on every keystroke
  ↓
IndexPage re-renders only the affected SurahCards
```

### 5. Dark Mode Flow

```
User clicks the theme toggle in Header
  ↓
toggleDarkMode() from useDarkMode
  - writes 'theme' = 'dark' | 'light' to localStorage
  - updates isDarkMode state (works even if storage fails)
  ↓
useEffect toggles the `dark` class on <html>
  ↓
CSS custom properties under html.dark are applied
  ↓
Tailwind `dark:` utilities and CSS variables update the UI
```

**Priority**: saved preference → system preference → light.

---

## State Management

### 1. SearchContext (application state)

**Files**: `src/features/search/searchContext.js`,
`src/features/search/SearchProvider.jsx`

```javascript
const [searchTerm, setSearchTerm] = useState('')

<SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
  {children}
</SearchContext.Provider>
```

**Consumers**:

- `Header.jsx` (through `App.jsx`) sets the search term
- `IndexPage.jsx` reads it and filters the surah list

Context avoids prop drilling between the header and the page.

### 2. useDarkMode (feature state)

**File**: `src/features/theme/useDarkMode.js`

```javascript
const [isDarkMode, toggleDarkMode] = useDarkMode()
```

- Initial state: saved `theme` from localStorage, otherwise system preference
- Persists the user choice with the safe storage wrapper
- Updates `document.documentElement` `dark` class
- Subscribes to `prefers-color-scheme` changes until the user makes a choice

### 3. Local component state

- `ErrorBoundary`: `hasError`, `error`, `errorInfo`
- `IndexPage`, `SurahPage`, `Header`, `Footer`: no local state beyond hooks
- `SurahCard`: memoized, no state

---

## Routing Structure

**File**: `src/app/AppRouter.jsx`

```javascript
<BrowserRouter basename="/Quran/">
  <SearchProvider>
    <App>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/surah/:number" element={<SurahPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </App>
  </SearchProvider>
</BrowserRouter>
```

### Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `IndexPage` | All 114 surahs with search |
| `/surah/:number` | `SurahPage` | Single surah details + audio |
| `*` | `Navigate to "/"` | Catch-all redirect |

Pages are imported with `React.lazy()`, so each route gets its own chunk and a
shared `Suspense` fallback is shown while loading.

### Navigation

```javascript
const navigate = useNavigate()

navigate(`/surah/${surahNumber}`) // open a surah
navigate('/')                     // back to the index
```

Browser back/forward works through the History API managed by React Router.

---

## Custom Hooks

### `useSurah`

**File**: `src/features/quran/hooks/useSurah.js`

```javascript
const { surah, previous, next, isValid, isLoading, error } = useSurah(number)
```

- Looks up a surah by number (1–114)
- Returns adjacent surahs for navigation
- Validates the number and reports an error for invalid input
- Memoized; `isLoading` is always `false` because data is bundled

### `useSearch`

**File**: `src/features/search/useSearch.js`

```javascript
const filteredSurahs = useSearch(searchTerm)
```

- Memoizes `filterSurahs(searchTerm)` on the search term
- Returns the full list for an empty term
- Delegates matching logic to `quranData.js`

### `useDarkMode`

**File**: `src/features/theme/useDarkMode.js`

```javascript
const [isDarkMode, toggleDarkMode] = useDarkMode()
```

- Manages theme state, persistence, and the `dark` class
- Reads system preference when the user has not chosen a theme

### `useDocumentMeta`

**File**: `src/shared/hooks/useDocumentMeta.js`

```javascript
useDocumentMeta(title, description)
```

- Imperatively updates `document.title` and the description `<meta>` tag
- Restores previous values on unmount
- Used by `IndexPage` and `SurahPage` for route-specific SEO metadata

### `useAudio` (available, not wired)

**File**: `src/features/audio/useAudio.js`

```javascript
const { audioRef, isPlaying, currentTime, duration, error, play, pause, seek } = useAudio(src)
```

- Manages an HTML5 audio element, playback state, and error handling
- Not currently used; `SurahPage` renders native audio controls instead

---

## Utility Functions

### `quranData.js`

**File**: `src/features/quran/utils/quranData.js`

```javascript
createSearchIndex()       // lazily build and cache searchable values
filterSurahs(term)        // filter across 4 fields
getSurahByNumber(num)     // single surah or null
getSurahIndex(num)        // array position or -1
getAdjacentSurahs(num)    // { previous, next }
getAllSurahs()            // copy of all 114 surahs
isValidSurahNumber(num)   // integer check for 1–114
```

**Data source**: `src/features/quran/data/quran.js`.

### `themeUtils.js`

**File**: `src/features/theme/themeUtils.js`

```javascript
getThemeVariable(name)    // read a CSS custom property
isDarkMode()              // check the html.dark class
toggleDarkMode(force?)    // toggle or force the dark class
applyTheme(theme)         // apply 'light' | 'dark'
getSavedTheme()           // read localStorage
saveTheme(theme)          // write localStorage
getSystemTheme()          // prefers-color-scheme
getInitialTheme()         // saved → system → light
```

### `constants.js`

**File**: `src/shared/utils/constants.js`

- App metadata (`APP_NAME`, `APP_TITLE`, `APP_DESCRIPTION`, `APP_VERSION`)
- Quran constants (114 surahs, 6236 ayahs)
- `STORAGE_KEYS`, `THEMES`, `THEME_COLORS`
- `ROUTES` and `LAYOUT_CLASSES`
- Arabic/English `LABELS`, `UI` helpers, `ARIA_LABELS`
- Audio/API/pagination configuration
- Error and success message strings
- Small formatting helpers (`formatSurahMetadata`, `getSurahAriaLabel`)

### `storage.js`

**File**: `src/shared/utils/storage.js`

Safe localStorage wrapper:

```javascript
getItem(key, default)  setItem(key, value)  removeItem(key)
clear()  isAvailable()  getJSON(key, default)  setJSON(key, value)
```

It degrades gracefully when storage is unavailable, full, blocked, or when
running without a `window` object.

---

## Environment Configuration

### Layers

1. **`import.meta.env`** — Vite built-ins (`DEV`, `PROD`, `SSR`) and `VITE_*`
2. **`.env.example`** — documented template
3. **`.env.local`** — local overrides, git-ignored
4. **`src/shared/config/env.js`** — centralized, typed access

### Template

```env
VITE_APP_NAME=Quran Sound
VITE_APP_VERSION=0.0.1
VITE_API_BASE_URL=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE_MODE=true
VITE_DEBUG_MODE=false
```

### Usage

```javascript
import config from '@shared/config/env'

config.appName          // 'Quran Sound'
config.audioCdn         // default R2 CDN
config.isDevelopment    // import.meta.env.DEV
```

`env.js` is the only module that reads `import.meta.env` directly. It also uses
optional chaining (`import.meta.env?.…`) so it stays safe in non-Vite contexts.

---

## Type System

### TypeScript foundation

**File**: `src/types/index.ts`

```typescript
Surah              // core surah record
SearchResult       // { item, searchValues }
Theme              // 'light' | 'dark' | 'system'
AudioState         // audio ref, playback state, controls
SurahNavigation    // surah/previous/next/isValid/error/isLoading
StorageKeys        // known storage keys
AppConfig          // environment configuration
```

`src/types/assets.d.ts` declares static asset modules (for example `.svg`
imports).

### Migration strategy

1. JavaScript source with JSDoc annotations (current)
2. `tsconfig.json` uses `allowJs: true` and `checkJs: true` so JSDoc is checked
3. Convert high-value modules to `.ts`/`.tsx` incrementally

Path aliases are declared in both `vite.config.js` and `tsconfig.json`.

---

## Build Configuration

### Vite (`vite.config.js`)

```javascript
base: "/Quran/",
plugins: [react(), tailwindcss()],
resolve: {
  alias: {
    '@': 'src/',
    '@app': 'src/app/',
    '@features': 'src/features/',
    '@shared': 'src/shared/',
    '@types': 'src/types/',
  },
},
build: {
  rollupOptions: {
    input: { main: 'index.html' },
  },
}
```

- `base: "/Quran/"` makes assets resolve under the GitHub Pages subpath
- Route-level `React.lazy()` produces separate page chunks
- Only `index.html` is a Rollup entry; `surha.html` is not built

### TypeScript (`tsconfig.json`)

```json
target: "ES2020"
allowJs: true
checkJs: true
strict: true
noEmit: true
jsx: "react-jsx"
paths: { "@/*": ["./src/*"], "@app/*": ..., "@features/*": ..., "@shared/*": ..., "@types/*": ... }
```

### Vitest (`vitest.config.js`)

- Environment: `happy-dom`
- Globals enabled
- Setup file: `tests/setup.js`
- Coverage: V8 provider (`text`, `json`, `html`)
- Same aliases as Vite

---

## CSS Architecture

### Tailwind + CSS variables

**Files**: `src/shared/styles/tailwind.css`, `normalize.css`, `all.min.css`

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

:root { /* light theme custom properties */ }

html.dark { /* dark theme custom properties */ }

@layer components {
  /* .num, .par-center, .logo-name, .chev, .chev-l, .chev-r */
}
```

**Theme variables**:

- `--surface-1`, `--surface-2`, `--surface-3`
- `--border-soft`, `--border-strong`
- `--text-primary`, `--text-muted`
- `--logo-name-hover`, `--i-hover`, `--text-hover`

The `dark` class on `<html>` switches the variable set. `normalize.css` is
imported by `App.jsx`; `all.min.css` (vendored Font Awesome) is available in the
styles folder but is not currently imported by the app.

---

## Performance Optimizations

1. **Route code splitting** — `React.lazy()` for `IndexPage` and `SurahPage`
2. **Memoized search index** — built once in `quranData.js` and cached
3. **Memoized filtering** — `useSearch` uses `useMemo`
4. **Stable card callback** — `IndexPage` uses `useCallback` for `onSelect`
5. **Memoized cards** — `SurahCard` is wrapped in `React.memo`
6. **Bundled data** — all 114 surahs ship with the app (no data API request)
7. **On-demand audio** — audio is fetched from the CDN when played
8. **Purged CSS** — Tailwind includes only used utilities
9. **Local storage** — theme reads/writes avoid network calls

---

## Error Handling

### ErrorBoundary

**File**: `src/app/ErrorBoundary.jsx`

- Class component wrapping the whole app in `main.jsx`
- Catches render/lifecycle errors below it
- Shows a bilingual fallback with the error message, a reload button, and a link
  to report the issue
- Shows the component stack only in development (`import.meta.env.DEV`)

### Storage errors

The safe storage wrapper catches read/write/remove failures, logs a warning, and
returns a fallback value so the app keeps working.

### Invalid routes and surahs

- Unknown routes redirect to `/` with `<Navigate replace />`
- Invalid `:number` values make `useSurah` return `surah: null`; `SurahPage`
  renders a "surah not found" screen with a back button

### Audio errors

The native audio element handles its own controls. The unused `useAudio` hook is
prepared to track `error` state and reset playback on source changes.

---

## Testing

**Config**: `vitest.config.js` · **Setup**: `tests/setup.js`

| Area | Files |
|------|-------|
| Components | `tests/components/ErrorBoundary.test.jsx`, `IndexPage.test.jsx`, `SkipLink.test.jsx` |
| Hooks | `tests/hooks/useDarkMode.test.js`, `useDocumentMeta.test.js`, `useSurah.test.js` |
| Utilities | `tests/utils/quranData.test.js`, `storage.test.js`, `themeUtils.test.js` |

Commands:

```bash
pnpm test             # watch mode
pnpm test -- --run    # single run
pnpm test:ui          # interactive UI
pnpm test:coverage    # V8 coverage report
```

---

## Deployment Architecture

### GitHub Pages at `/Quran/`

```bash
pnpm build      # outputs dist/
pnpm run deploy # predeploy runs build, then gh-pages publishes dist/
```

- `vite.config.js`: `base: "/Quran/"`
- `AppRouter.jsx`: `basename="/Quran/"`
- `index.html` references `./favicon.svg` relatively
- GitHub Pages serves the `gh-pages` branch

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full procedure.

---

## Future Architecture Considerations

### API integration

1. Current: bundled records in `src/features/quran/data/quran.js`
2. Future: swap data access behind `quranData.js` / hooks for API calls
3. Add caching and offline support as needed

### Feature expansion

- Favorites/bookmarks (localStorage or API)
- Reading history and "last surah"
- Ayah-level search and timings
- Multiple reciters/translations
- Wire `useAudio` into a reusable player component
- Offline mode with a service worker

### Scalability

- The feature-slice layout supports adding new domains without cross-coupling
- Context is sufficient for the current single-value search state
- A dedicated store (Zustand/Redux) is only warranted if shared state grows

---

## Related Documentation

- **[COMPONENTS.md](./COMPONENTS.md)** — Component API reference
- **[SETUP.md](./SETUP.md)** — Development environment setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — GitHub Pages deployment
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** — WCAG compliance
- **[map.md](./map.md)** — File-by-file repository map
- **[README.md](../README.md)** — Project overview
