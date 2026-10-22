# Quran Sound - Components API Reference

## Overview

This document provides a complete reference for all React components in the Quran Sound application. Each component includes its purpose, props interface, usage examples, and integration points.

---

## Component Inventory

| Component | File Path | Type | Purpose |
|-----------|-----------|------|---------|
| App | `src/components/App.jsx` | Root | Application layout and wrapper |
| ErrorBoundary | `src/components/ErrorBoundary.jsx` | Utility | Error handling and fallback UI |
| Header | `src/components/common/Header.jsx` | Common | Navigation, search, theme toggle |
| Footer | `src/components/common/Footer.jsx` | Common | App information |
| SearchBar | `src/components/common/SearchBar.jsx` | Common | Search input component |
| AudioPlayer | `src/components/common/AudioPlayer.jsx` | Common | HTML5 audio player wrapper |
| IndexPage | `src/components/pages/IndexPage.jsx` | Page | Home page (all 114 surahs) |
| SurahPage | `src/components/pages/SurahPage.jsx` | Page | Single surah detail view |

---

## Page Components

### IndexPage

**File**: `src/components/pages/IndexPage.jsx`

**Purpose**: Display all 114 surahs in a responsive grid with search filtering

**Props**: None (receives SearchContext)

**State**: 
- `searchTerm` - from SearchContext (string)
- `filteredData` - from useSearch hook (Surah[])

**Hooks Used**:
- `useContext(SearchContext)` - get search term
- `useSearch(searchTerm)` - filter surahs
- `useNavigate()` - navigate to surah detail

**Features**:
- Responsive grid (2 cols mobile → 6 cols desktop)
- Search filtering across 4 fields
- Keyboard accessible surah cards
- Click cards to view detail

**Example Usage**:
```javascript
import IndexPage from '@components/pages/IndexPage'

// In router configuration:
<Route path="/" element={<IndexPage />} />
```

**Related**:
- SearchBar component (in Header)
- SearchContext (provides search term)
- useSearch hook (filters data)

---

### SurahPage

**File**: `src/components/pages/SurahPage.jsx`

**Purpose**: Display single surah with metadata, audio player, and navigation

**Props**: None (receives route params)

**Route Params**:
- `number` - Surah number (1-114) from URL path

**State**:
- `surah` - Current surah object or null
- `previous` - Previous surah or null
- `next` - Next surah or null

**Hooks Used**:
- `useParams()` - get surah number from URL
- `useSurah(number)` - fetch surah and navigation
- `useNavigate()` - navigate between surahs

**Features**:
- Surah name (Arabic + English)
- Metadata (revelation place, ayah count)
- HTML5 audio player
- Previous/Next navigation buttons
- Back to Index button
- Responsive layout

**Example Usage**:
```javascript
import SurahPage from '@components/pages/SurahPage'

// In router configuration:
<Route path="/surah/:number" element={<SurahPage />} />

// Navigate to surah:
const navigate = useNavigate()
navigate(`/surah/1`)
```

**Related**:
- AudioPlayer component
- useSurah hook (fetches data)
- useNavigate hook (routing)

---

## Common Components

### Header

**File**: `src/components/common/Header.jsx`

**Purpose**: App header with branding, search bar, and theme toggle

**Props**: None

**State**: 
- `isDark` - from useDarkMode hook (boolean)

**Hooks Used**:
- `useDarkMode()` - manage dark mode
- `useContext(SearchContext)` - get/set search term

**Features**:
- App logo and branding
- SearchBar component integration
- Dark mode toggle button
- RTL Arabic interface
- Sticky positioning

**Example Usage**:
```javascript
// Typically wrapped in main App:
<Header />
```

**Related**:
- SearchBar component (child)
- useDarkMode hook
- SearchContext

---

### Footer

**File**: `src/components/common/Footer.jsx`

**Purpose**: Application footer with information and links

**Props**: None

**State**: None

**Features**:
- App version info
- Links/credits
- Arabic + English text

**Example Usage**:
```javascript
// Typically in App layout:
<Footer />
```

---

### SearchBar

**File**: `src/components/common/SearchBar.jsx`

**Purpose**: Search input component for filtering surahs

**Props**:
```javascript
{
  value: string,           // Current search term
  onChange: (term) => {},  // Callback when search changes
  placeholder: string      // Input placeholder text
}
```

**State**: None (controlled component)

**Features**:
- Controlled input (value + onChange)
- Case-insensitive search
- Searches 4 fields:
  1. Arabic surah name
  2. English surah name
  3. Surah number
  4. Revelation place
- RTL Arabic keyboard support
- Clear button functionality

**Example Usage**:
```javascript
import SearchBar from '@components/common/SearchBar'
import { SearchContext } from '@context/SearchContext'

export function Header() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext)
  
  return (
    <SearchBar
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="ابحث عن السورة"
    />
  )
}
```

**Related**:
- SearchContext (manages state)
- useSearch hook (performs filtering)

---

### AudioPlayer

**File**: `src/components/common/AudioPlayer.jsx`

**Purpose**: Wrapper for HTML5 audio player with controls

**Props**:
```javascript
{
  src: string,           // Audio URL
  title?: string,        // Surah name for accessibility
  onTimeUpdate?: (time) => {}  // Optional callback
}
```

**State**: 
- `isPlaying` - from useAudio hook (boolean)
- `currentTime` - from useAudio hook (number)
- `duration` - from useAudio hook (number)

**Hooks Used**:
- `useAudio(src)` - manage audio state

**Features**:
- Play/pause controls
- Volume control
- Progress bar
- Time display
- Keyboard accessible
- Error handling

**Example Usage**:
```javascript
import AudioPlayer from '@components/common/AudioPlayer'

export function SurahPage() {
  const { surah } = useSurah(number)
  
  return (
    <AudioPlayer
      src={surah.audio_url}
      title={surah.surah_name}
    />
  )
}
```

**Related**:
- useAudio hook (manages playback state)
- Surah data type (audio_url property)

---

## Utility Components

### ErrorBoundary

**File**: `src/components/ErrorBoundary.jsx`

**Purpose**: Catch React errors and show fallback UI

**Props**:
```javascript
{
  children: ReactNode  // Components to wrap
}
```

**State**:
- `hasError` - boolean
- `error` - Error object

**Features**:
- Catches render errors in child components
- Shows Arabic error message
- Provides reload button
- Logs errors to console
- Prevents white screen of death

**Example Usage**:
```javascript
import ErrorBoundary from '@components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        {/* App components */}
      </div>
    </ErrorBoundary>
  )
}
```

**Error Handling**:
```javascript
// Catches errors like:
- Component render errors
- Lifecycle method errors
- Constructor errors
- Event handler errors (with error boundaries in v18+)

// Does NOT catch:
- Async errors (use try/catch or error boundaries from promises)
- Event handlers (use try/catch)
- Server-side rendering errors
- Errors in the error boundary itself
```

**Related**:
- React Error Boundaries documentation

---

### App (Root Component)

**File**: `src/components/App.jsx`

**Purpose**: Root application component with layout and providers

**Props**: None

**Providers**:
- ErrorBoundary - wraps entire app
- SearchProvider - provides search context
- Router - React Router configuration

**Layout**:
```
ErrorBoundary
  └─ SearchProvider
      └─ Router
          ├─ Header
          ├─ Router outlet (IndexPage or SurahPage)
          └─ Footer
```

**Example Code**:
```javascript
import ErrorBoundary from './ErrorBoundary'
import { SearchProvider } from '@context/SearchContext'
import AppRouter from '../router'

export default function App() {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
    </ErrorBoundary>
  )
}
```

**Related**:
- ErrorBoundary component
- SearchContext provider
- Router configuration

---

## Component Patterns

### Controlled Components

**SearchBar** is a controlled component:
```javascript
<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  placeholder="Search..."
/>
```

**Pattern**: Parent manages state, component receives value + callback

### Hook Integration

**All page components use custom hooks**:
```javascript
// IndexPage
const filteredData = useSearch(searchTerm)

// SurahPage
const { surah, previous, next } = useSurah(number)

// Header
const [isDark, toggleDarkMode] = useDarkMode()
```

**Pattern**: Hooks encapsulate logic, components consume results

### Context Integration

**Components access global state via Context**:
```javascript
const { searchTerm, setSearchTerm } = useContext(SearchContext)
```

**Pattern**: Avoid prop drilling, use Context for application state

### Error Boundaries

**ErrorBoundary wraps app tree**:
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Pattern**: Single error boundary at root catches all errors

---

## Component Composition Examples

### Example 1: Complete Index Page Flow

```javascript
// User navigates to home (/)
// Router renders IndexPage
function IndexPage() {
  const navigate = useNavigate()
  const { searchTerm } = useContext(SearchContext)
  const filteredData = useSearch(searchTerm)
  
  // filteredData is 114 surahs or filtered subset
  const surahs = filteredData.map((item) => (
    <button
      key={item.surah_number}
      onClick={() => navigate(`/surah/${item.surah_number}`)}
    >
      <span>{item.surah_number}</span>
      <span>{item.surah_name}</span>
      <small>{item.surah_name_en}</small>
    </button>
  ))
  
  return (
    <main>
      <h1>Quran Surahs</h1>
      <section>{surahs}</section>
    </main>
  )
}
```

### Example 2: Complete Surah Page Flow

```javascript
// User clicks surah 1
// Router renders SurahPage with :number = 1
function SurahPage() {
  const { number } = useParams()
  const navigate = useNavigate()
  const { surah, previous, next } = useSurah(number)
  
  if (!surah) {
    return <div>Surah not found</div>
  }
  
  return (
    <main>
      <h1>{surah.surah_name}</h1>
      <p>{surah.surah_name_en}</p>
      
      <AudioPlayer src={surah.audio_url} title={surah.surah_name} />
      
      <nav>
        {previous && (
          <button onClick={() => navigate(`/surah/${previous.surah_number}`)}>
            Previous
          </button>
        )}
        <button onClick={() => navigate('/')}>Back</button>
        {next && (
          <button onClick={() => navigate(`/surah/${next.surah_number}`)}>
            Next
          </button>
        )}
      </nav>
    </main>
  )
}
```

### Example 3: Search Flow with Context

```javascript
// User types in Header SearchBar
function Header() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext)
  
  return (
    <header>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}  // Updates context
        placeholder="Search..."
      />
    </header>
  )
}

// IndexPage automatically updates
function IndexPage() {
  const { searchTerm } = useContext(SearchContext)  // Gets updated value
  const filteredData = useSearch(searchTerm)         // Filters based on new term
  
  return (
    <main>
      {filteredData.map(surah => (
        <button key={surah.surah_number}>
          {surah.surah_name}
        </button>
      ))}
    </main>
  )
}
```

---

## Best Practices

### 1. Use Custom Hooks for Business Logic
✅ **Good**:
```javascript
const { surah, previous, next } = useSurah(number)
```

❌ **Avoid**:
```javascript
const surah = Data.find(s => s.surah_number === number)
const index = Data.findIndex(...)
```

### 2. Use Context for Global State
✅ **Good**:
```javascript
const { searchTerm, setSearchTerm } = useContext(SearchContext)
```

❌ **Avoid**:
```javascript
<SearchBar searchTerm={prop1} setSearchTerm={prop2} ... />
// With many layers of prop drilling
```

### 3. Memoize Expensive Computations
✅ **Good**:
```javascript
const filteredData = useSearch(searchTerm)  // Uses useMemo internally
```

❌ **Avoid**:
```javascript
const filtered = filterSurahs(searchTerm)  // Called on every render
```

### 4. Keep Components Focused
✅ **Good**:
```javascript
// IndexPage - just displays, uses hooks
// SurahPage - just displays, uses hooks
// SearchBar - just input, no logic
```

❌ **Avoid**:
```javascript
// One giant component doing everything
```

### 5. Use ErrorBoundary at Root
✅ **Good**:
```javascript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

❌ **Avoid**:
```javascript
// No error handling
```

---

## Creating New Components

### Template for New Component

```javascript
// src/components/MyComponent.jsx
import { useContext } from 'react'
import { SearchContext } from '@context/SearchContext'

export default function MyComponent({ prop1, prop2 }) {
  // 1. Hooks first
  const { searchTerm } = useContext(SearchContext)
  
  // 2. Logic/calculations
  const result = someCalculation(prop1)
  
  // 3. Event handlers
  const handleClick = () => {
    // ...
  }
  
  // 4. JSX return
  return (
    <div>
      <button onClick={handleClick}>{prop1}</button>
      <p>{result}</p>
    </div>
  )
}
```

### Export Pattern

```javascript
// Option 1: Named export (preferred for utilities)
export function MyComponent() { ... }

// Option 2: Default export (used for pages and main components)
export default function MyComponent() { ... }

// Import:
import MyComponent from '@components/MyComponent'
import { MyComponent } from '@components/MyComponent'
```

---

## Component Testing Patterns

### Testing Page Components

```javascript
// src/components/pages/IndexPage.test.jsx
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SearchProvider } from '@context/SearchContext'
import IndexPage from './IndexPage'

test('displays all 114 surahs', () => {
  render(
    <BrowserRouter>
      <SearchProvider>
        <IndexPage />
      </SearchProvider>
    </BrowserRouter>
  )
  
  const surah1 = screen.getByText('الفاتحة')
  expect(surah1).toBeInTheDocument()
})
```

### Testing Common Components

```javascript
// src/components/common/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

test('calls onChange when typing', () => {
  const onChange = jest.fn()
  render(
    <SearchBar
      value=""
      onChange={onChange}
      placeholder="Search..."
    />
  )
  
  const input = screen.getByRole('searchbox')
  fireEvent.change(input, { target: { value: 'الفاتحة' } })
  
  expect(onChange).toHaveBeenCalledWith('الفاتحة')
})
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design and data flow
- **[SETUP.md](./SETUP.md)** - Development environment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment
- **[README.md](../README.md)** - Project overview

---

## Component Tree Visualization

```
App
├── ErrorBoundary
│   └── SearchProvider
│       └── BrowserRouter
│           ├── Header
│           │   └── SearchBar
│           ├── Routes
│           │   ├── Route: "/" → IndexPage
│           │   │   └── Surah cards (buttons)
│           │   └── Route: "/surah/:number" → SurahPage
│           │       ├── AudioPlayer
│           │       └── Navigation buttons
│           └── Footer
```

All components are located in `src/components/` with subdirectories for organization.
