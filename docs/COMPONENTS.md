# Quran Sound - Components API Reference

## Overview

This document describes every React component in the application: its purpose,
props, hooks, behavior, and where it fits in the tree.

---

## Component Inventory

| Component | File Path | Type | Purpose |
|-----------|-----------|------|---------|
| `AppRouter` | `src/app/AppRouter.jsx` | Root | Router, providers, lazy routes |
| `QuranDataProvider` | `src/features/quran/QuranDataProvider.jsx` | Provider | Runtime Itqan fetch, loading/error/retry state |
| `App` | `src/app/App.jsx` | Layout | Skip link, header, page slot, footer |
| `ErrorBoundary` | `src/app/ErrorBoundary.jsx` | Utility | Catches render errors and shows fallback UI |
| `SkipLink` | `src/shared/components/SkipLink.jsx` | Common | Keyboard "skip to content" link |
| `Header` | `src/shared/components/Header.jsx` | Common | Branding, search form, theme toggle |
| `Footer` | `src/shared/components/Footer.jsx` | Common | Links, branding, copyright |
| `SurahCard` | `src/features/quran/components/SurahCard.jsx` | Feature | Memoized surah card button |
| `IndexPage` | `src/features/quran/pages/IndexPage.jsx` | Page | Surah grid + search results |
| `SurahPage` | `src/features/quran/pages/SurahPage.jsx` | Page | Surah detail + audio + navigation |

> There are no separate `SearchBar` or `AudioPlayer` components. The search
> input lives directly in `Header`, and `SurahPage` uses a native
> `<audio controls>` element.

---

## Root Components

### AppRouter

**File**: `src/app/AppRouter.jsx`

**Purpose**: Composition root for routing, global Quran data, search state, and
lazy pages.

**Props**: None

**Responsibilities**:

- Creates `BrowserRouter` with `basename="/Quran/"`
- Wraps the UI in `QuranDataProvider`, then `SearchProvider`
- Renders `App` with the matched route as `children`
- Lazy-loads `IndexPage` and `SurahPage`
- Shows an Arabic loading fallback while a route chunk loads
- Redirects unknown routes to `/`

**Routes**:

| Path | Element |
|------|---------|
| `/` | `<IndexPage />` |
| `/surah/:number` | `<SurahPage />` |
| `*` | `<Navigate to="/" replace />` |

**Example**:

```javascript
// main.jsx
<ErrorBoundary>
  <AppRouter />
</ErrorBoundary>
```

---

### QuranDataProvider

**File**: `src/features/quran/QuranDataProvider.jsx`

**Purpose**: Fetch surah metadata and audio URLs from the Itqan CMS API once on
mount and share the result with the whole app.

**Props**:

```javascript
{
  children: ReactNode
}
```

**Hooks**:

- `useEffect` — calls `fetchSurahs({ signal })` and aborts on unmount
- `useState` — owns `{ surahs, isLoading, error }`
- `useCallback` — `retry()` resets state and increments the request id
- `useMemo` — stabilizes the context value

**Context value**:

```javascript
{
  surahs,    // validated Surah[]
  isLoading, // boolean
  error,     // string | null
  retry,     // () => void
}
```

**Behavior**:

- Starts in the loading state
- Validates that the response contains all 114 unique surahs and required fields
- Shows the first page immediately through `IndexPage` once data resolves
- Exposes a retry action when the request fails
- Does not cache across full page reloads

**Data layer**:

- `src/features/quran/api/itqanApi.js` — `fetchSurahs()` performs the paginated
  request and normalization
- `src/features/quran/quranDataContext.js` — context object
- `src/features/quran/hooks/useQuranData.js` — typed context accessor

---

### App

**File**: `src/app/App.jsx`

**Purpose**: Page layout and shared chrome.

**Props**:

```javascript
{
  children: ReactNode  // Active route element
}
```

**Hooks**:

- `useContext(SearchContext)` — reads `searchTerm` and `setSearchTerm`

**Renders**:

```jsx
<div className="flex min-h-screen flex-col">
  <SkipLink />
  <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
  {children}
  <Footer />
</div>
```

**Side effects**: Imports `tailwind.css` and `normalize.css`.

---

### ErrorBoundary

**File**: `src/app/ErrorBoundary.jsx`

**Purpose**: Catch render/lifecycle errors and show a recoverable fallback.

**Props**:

```javascript
{
  children: ReactNode
}
```

**State**:

- `hasError` — whether the fallback should render
- `error` — the caught error
- `errorInfo` — React component stack

**Behavior**:

- `getDerivedStateFromError` switches to the fallback UI
- `componentDidCatch` logs the error and stores `errorInfo`
- Reload button resets state and calls `window.location.reload()`
- Stack trace is shown only in development (`import.meta.env.DEV`)
- Includes a link to the GitHub issue tracker

**Does not catch**: async errors, event-handler errors, or errors thrown by the
boundary itself.

**Example**:

```javascript
// main.jsx
<ErrorBoundary>
  <AppRouter />
</ErrorBoundary>
```

---

## Shared Components

### SkipLink

**File**: `src/shared/components/SkipLink.jsx`

**Purpose**: Allow keyboard and screen-reader users to jump straight to the main
content.

**Props**: None

**Behavior**:

- Renders `<a href="#main-content">`
- Visually hidden with `sr-only`
- Becomes visible on focus with `focus:not-sr-only`
- Arabic label: `تخطَّ إلى المحتوى الرئيسي`

**Requirement**: Each page's `<main>` must have `id="main-content"`.

---

### Header

**File**: `src/shared/components/Header.jsx`

**Purpose**: Branding, search input, and theme toggle.

**Props**:

```javascript
{
  searchTerm: string,
  onSearchChange: (value: string) => void
}
```

**Hooks**:

- `useDarkMode()` — returns `[isDarkMode, toggleDarkMode]`

**Features**:

- Logo and "Quran-sound" wordmark
- Responsive search form with a visually hidden label and accessible name
- `type="search"` input, `role="search"` form, submit prevented
- Theme toggle with `aria-pressed` and a descriptive `aria-label`
- Inline SVG icons for search and theme (no icon component dependency)

**Example**:

```javascript
<Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
```

---

### Footer

**File**: `src/shared/components/Footer.jsx`

**Purpose**: Footer navigation and branding.

**Props**: None

**Behavior**:

- Logo and wordmark
- Links: About, Privacy Policy, Licensing, Contact
- Dynamic copyright year (`© 2026`)
- Responsive flex layout

---

## Feature Components

### SurahCard

**File**: `src/features/quran/components/SurahCard.jsx`

**Purpose**: Render one surah as a keyboard-accessible button.

**Props**:

```javascript
{
  item: Surah,                    // Surah record
  onSelect: (number: number) => void
}
```

**Optimization**: Wrapped in `React.memo` so only changed cards re-render while
typing in the search box.

**Renders**:

- Surah number badge (`.num`)
- Arabic name
- English name, revelation place, ayah count
- `aria-label`: `استمع إلى سورة {surah_name} ({surah_name_en})`

**Example**:

```javascript
<SurahCard item={surah} onSelect={handleSelect} />
```

---

### IndexPage

**File**: `src/features/quran/pages/IndexPage.jsx`

**Purpose**: Display the searchable grid of all 114 surahs fetched from Itqan.

**Props**: None

**Hooks**:

- `useContext(SearchContext)` — current search term
- `useQuranData()` — `{ isLoading, error, retry }` from the shared data provider
- `useSearch(searchTerm)` — memoized filtered list
- `useNavigate()` — route to a selected surah
- `useCallback()` — stable `handleSelect`
- `useDocumentMeta(title, description)` — page metadata

**Features**:

- Loading state with an animated spinner and Arabic status text
- Error state with a retry button
- Main heading from `LABELS.SURAH_INDEX`
- Responsive grid: 2 → 3 → 4 → 5 → 6 columns
- Empty-state message when nothing matches
- `role="status"` live region announcing the result count / no-results state
- Renders memoized `SurahCard` children

**Structure**:

```jsx
<main id="main-content" tabIndex={-1}>
  <div className={LAYOUT_CLASSES.CARD}>
    {isLoading ? <Spinner /> : error ? <ErrorWithRetry /> : (
      <>
        <h1>{LABELS.SURAH_INDEX}</h1>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {/* result count */}
        </p>
        <section className={LAYOUT_CLASSES.SURAH_GRID}>
          {surahs.length > 0 ? surahs : <p>{LABELS.NO_RESULTS}</p>}
        </section>
      </>
    )}
  </div>
</main>
```

---

### SurahPage

**File**: `src/features/quran/pages/SurahPage.jsx`

**Purpose**: Show a single surah with metadata, audio, and navigation.

**Props**: None

**Route params**: `number` — surah number from `/surah/:number`

**Hooks**:

- `useParams()` — reads `number`
- `useNavigate()` — previous/next/back navigation
- `useSurah(number)` — resolves the surah and adjacent records
- `useQuranData()` — `retry()` for a failed data request
- `useDocumentMeta(title, description)` — route-specific metadata
- `useRef` + `useEffect` — focus the heading when the route or surah changes

**Features**:

- Loading state while the surah list is being fetched
- Error state with retry and back-to-index actions
- Not-found screen with a back button for invalid or missing numbers
- Arabic heading, English name, revelation place, ayah count
- Native HTML5 `<audio controls preload="none">` with `surah.audio_url`
- Previous/next buttons (RTL-aware order and chevrons)
- Back-to-index button
- Heading receives focus after the surah resolves

**Example flow**:

```javascript
const { number } = useParams()
const { surah, previous, next, isValid, isLoading, error } = useSurah(number)

if (!isValid) return <NotFound />
if (isLoading) return <Loading />
if (error) return <ErrorWithRetry />
if (!surah) return <NotFound />

navigate(`/surah/${next.surah_number}`)
navigate('/')
```

---

## Component Composition

### Index page flow

```javascript
function IndexPage() {
  const navigate = useNavigate()
  const { searchTerm } = useContext(SearchContext)
  const { isLoading, error, retry } = useQuranData()
  const filteredData = useSearch(searchTerm)

  const handleSelect = useCallback((number) => {
    navigate(`/surah/${number}`)
  }, [navigate])

  if (isLoading) return <Loading />
  if (error) return <ErrorWithRetry onRetry={retry} />

  return filteredData.map((item) => (
    <SurahCard key={item.surah_number} item={item} onSelect={handleSelect} />
  ))
}
```

### Surah page flow

```javascript
function SurahPage() {
  const { number } = useParams()
  const { surah, previous, next, isValid, isLoading, error } = useSurah(number)
  const { retry } = useQuranData()

  if (!isValid) return <NotFound />
  if (isLoading) return <Loading />
  if (error) return <ErrorWithRetry onRetry={retry} />
  if (!surah) return <NotFound />

  return (
    <>
      <h1 tabIndex={-1}>{surah.surah_name}</h1>
      <audio controls src={surah.audio_url} />
      {previous && <button>{previous.surah_name}</button>}
      {next && <button>{next.surah_name}</button>}
    </>
  )
}
```

### Data and search flow

```javascript
// AppRouter mounts the data provider
<QuranDataProvider>
  <SearchProvider>
    <App />
  </SearchProvider>
</QuranDataProvider>

// QuranDataProvider fetches once on mount
useEffect(() => {
  fetchSurahs({ signal })
}, [requestId])

// Header writes the search term to context
<Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

// IndexPage filters the shared surah list
const { searchTerm } = useContext(SearchContext)
const filteredData = useSearch(searchTerm)
```

---

## Component Tree

```
main.jsx
└── StrictMode
    └── ErrorBoundary
        └── AppRouter
            └── BrowserRouter (basename="/Quran/")
                └── QuranDataProvider
                    └── SearchProvider
                        └── App
                            ├── SkipLink
                            ├── Header
                            │   ├── logo
                            │   ├── search form
                            │   └── theme toggle
                            ├── Suspense
                            │   └── Routes
                            │       ├── "/" → IndexPage
                            │       │   ├── loading / error / retry
                            │       │   └── SurahCard × N
                            │       └── "/surah/:number" → SurahPage
                            │           ├── loading / error / not-found
                            │           ├── native <audio>
                            │           └── navigation buttons
                            └── Footer
```

---

## Patterns and Conventions

### Controlled input

`Header` is controlled by `SearchProvider`; it receives `searchTerm` and
`onSearchChange` and never keeps a local copy.

### Hooks over inline logic

Business logic lives in hooks (`useSearch`, `useSurah`, `useDarkMode`,
`useDocumentMeta`) and pure utilities (`quranData`, `themeUtils`, `storage`).
Components focus on rendering.

### Context for shared state

The search term and the fetched surah list are global. Loading, error, and retry
state live in `QuranDataProvider`; route-specific values are derived from
`useParams`.

### Memoization

- `useMemo` inside `useSearch` and `useSurah`
- `WeakMap` search-index cache keyed by the fetched surah array
- `useCallback` for the card selection handler and retry action
- `React.memo` for `SurahCard`

### Data loading

- `useEffect` in `QuranDataProvider` starts the request on mount
- `AbortController` cancels the request on unmount or retry
- `fetchSurahs` validates 114 unique surahs before publishing data
- `IndexPage` and `SurahPage` render loading and error states instead of
  assuming the data is already present

### Accessibility

- Semantic `<header>`, `<main>`, `<nav>`, `<footer>`
- Skip link targeting `#main-content`
- Live region for search result counts
- Focus management on surah navigation
- Visible `focus-visible` styles
- Descriptive Arabic/English ARIA labels

---

## Testing Components

Tests live in `tests/components/` and use Testing Library with MemoryRouter when
routing is involved.

```javascript
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import IndexPage from '@features/quran/pages/IndexPage'
import { SearchContext } from '@features/search/searchContext'

render(
  <MemoryRouter>
    <SearchContext.Provider value={{ searchTerm: '', setSearchTerm: vi.fn() }}>
      <IndexPage />
    </SearchContext.Provider>
  </MemoryRouter>
)
```

Run with:

```bash
pnpm test -- --run
pnpm test:coverage
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design and data flow
- **[SETUP.md](./SETUP.md)** — Development environment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Production deployment
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** — Accessibility details
- **[map.md](./map.md)** — File-by-file repository map
- **[README.md](../README.md)** — Project overview
