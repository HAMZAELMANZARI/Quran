# Quran Sound - Repository Map

A file-by-file guide to the repository. Use this to find where something lives
and what it is responsible for.

- [Root files](#root-files)
- [Configuration and tooling](#configuration-and-tooling)
- [Entry points](#entry-points)
- [src/app](#srcapp)
- [src/features](#srcfeatures)
- [src/shared](#srcshared)
- [src/types](#srctypes)
- [tests](#tests)
- [public](#public)
- [scripts](#scripts)
- [docs](#docs)
- [Generated and ignored directories](#generated-and-ignored-directories)

---

## Directory Overview

```
.
├── main.jsx                     React entry point
├── index.html                   Vite HTML entry
├── surha.html                   Legacy standalone HTML (not built)
├── package.json                 Scripts, dependencies, engines
├── pnpm-lock.yaml               pnpm lockfile
├── vite.config.js               Build config + aliases
├── vitest.config.js             Test config + aliases
├── tsconfig.json                TypeScript / JSDoc config
├── eslint.config.js             ESLint flat config
├── .env.example                 Environment template
│
├── src/
│   ├── app/                     Router, layout, error boundary
│   ├── features/                quran, search, theme, audio
│   ├── shared/                  components, hooks, utils, config, styles, assets
│   ├── types/                   TypeScript definitions
│   └── plan.drawio              Architecture diagrams
│
├── tests/                       Vitest suite
├── docs/                        Documentation (this folder)
├── public/                      Static files copied by Vite
└── scripts/                     Tooling
```

---

## Root files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, features, commands, structure, links. |
| `CONTRIBUTING.md` | Top-level pointer to contribution guidelines. |
| `CODE_OF_CONDUCT.md` | Community behavior expectations. |
| `LICENSE` | Project license. |
| `package.json` | Name, version, `packageManager`, engines, scripts, dependencies. |
| `pnpm-lock.yaml` | Locked dependency graph for pnpm. |
| `.npmrc` | Enforces `engine-strict` and `package-manager-strict`. |
| `.env.example` | Documented `VITE_*` environment variables. |
| `.gitignore` | Ignores build output, coverage, env locals, other lockfiles, editor files. |
| `index.html` | HTML shell: `#root`, favicon, description meta, `lang="ar" dir="rtl"`, loads `main.jsx`. |
| `main.jsx` | Mounts React: `StrictMode` → `ErrorBoundary` → `AppRouter`; imports global styles. |
| `surha.html` | Legacy/standalone HTML shell. Not referenced by the Vite build. |
| `docs/map.md` | This file. |

### Entry point flow

```
index.html
  → <script type="module" src="main.jsx">
  → main.jsx: createRoot(#root).render(<StrictMode><ErrorBoundary><AppRouter/></ErrorBoundary></StrictMode>)
  → AppRouter: BrowserRouter(basename="/Quran/") → QuranDataProvider → SearchProvider → App → Routes
```

---

## Configuration and tooling

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite setup: `base: "/Quran/"`, React + Tailwind plugins, aliases (`@`, `@app`, `@features`, `@shared`, `@types`), `index.html` as the only Rollup input. |
| `vitest.config.js` | Vitest setup: `happy-dom`, globals, `tests/setup.js`, V8 coverage, same aliases as Vite. |
| `tsconfig.json` | `allowJs` + `checkJs`, `strict`, `noEmit`, `jsx: react-jsx`, path aliases matching Vite. |
| `eslint.config.js` | Flat ESLint config: recommended JS rules, React Hooks, React Refresh, browser globals; ignores `dist` and `coverage`. |
| `.vscode/settings.json` | Points VS Code at the local Tailwind CSS custom-data file. |
| `.vscode/tailwind.css-data.json` | Tailwind CSS custom-data for editor IntelliSense. |

### Scripts (`package.json`)

| Script | What it runs |
|--------|--------------|
| `preinstall` | `node scripts/check-package-manager.mjs` (pnpm-only guard). |
| `dev` | `vite` dev server. |
| `build` | `vite build` → `dist/`. |
| `predeploy` | `pnpm run build`. |
| `deploy` | `gh-pages -d dist`. |
| `lint` | `eslint .`. |
| `preview` | `vite preview`. |
| `test` | `vitest` (watch mode). |
| `test:ui` | `vitest --ui`. |
| `test:coverage` | `vitest --coverage`. |

---

## src/app

Application shell and composition root.

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `App.jsx` | Layout: reads `SearchContext`, renders `SkipLink`, `Header`, route `children`, and `Footer`. Imports global styles. | default `App` |
| `AppRouter.jsx` | Creates `BrowserRouter` (`basename="/Quran/"`), wraps in `QuranDataProvider` and `SearchProvider`, lazy-loads pages, defines routes, shows a loading fallback, redirects unknown routes. | default `AppRouter` |
| `ErrorBoundary.jsx` | Class error boundary; catches render errors, logs them, shows a bilingual fallback with reload and issue-report links; stack trace only in dev. | default `ErrorBoundary` |

### Routes defined in `AppRouter.jsx`

| Path | Component |
|------|-----------|
| `/` | `IndexPage` (lazy) |
| `/surah/:number` | `SurahPage` (lazy) |
| `*` | `<Navigate to="/" replace />` |

---

## src/features

Vertical slices. Each feature owns its own pages/components/hooks/utils/data.

### src/features/quran

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `api/itqanApi.js` | Fetches the configured Itqan recitation at runtime, paginates, normalizes, validates all 114 surahs, and returns the sorted list. | `fetchSurahs` (named + default) |
| `QuranDataProvider.jsx` | Fetches once on mount via `useEffect`, owns `{ surahs, isLoading, error, retry }`, and shares it through context. | `QuranDataProvider` (named + default) |
| `quranDataContext.js` | Creates the Quran data context and documents its value shape. | `QuranDataContext` |
| `utils/quranData.js` | Pure lookup/search helpers over the fetched surah array. Caches a normalized search index per array with a `WeakMap`. | `createSearchIndex`, `filterSurahs`, `getSurahByNumber`, `getSurahIndex`, `getAdjacentSurahs`, `getAllSurahs`, `isValidSurahNumber` |
| `hooks/useQuranData.js` | Reads the shared Quran data context. | `useQuranData` (named + default) |
| `hooks/useSurah.js` | Resolves a surah and its neighbors from a route param; validates input; memoized. | `useSurah` (named + default) |
| `components/SurahCard.jsx` | Memoized button for one surah; number badge, names, metadata, ARIA label; calls `onSelect(number)`. | default `SurahCard` |
| `pages/IndexPage.jsx` | Home page: reads search term, filters via `useSearch`, sets document meta, renders loading/error/retry states, the responsive grid, empty state, live result count, and cards. | default `IndexPage` |
| `pages/SurahPage.jsx` | Detail page: reads `:number`, resolves via `useSurah`, sets meta, renders loading/error/not-found states, heading/metadata/audio/prev-next/back; focuses heading on change. | default `SurahPage` |

**Data shape** (returned by `api/itqanApi.js`, typed in `src/types/index.ts`):

```javascript
{
  surah_number, surah_name, surah_name_en,
  audio_url, duration_ms, size_bytes,
  revelation_order, revelation_place, ayahs_count, ayahs_timings
}
```

### src/features/search

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `searchContext.js` | Creates the React context and documents its value shape. | `SearchContext` |
| `SearchProvider.jsx` | Owns `searchTerm` state and provides `{ searchTerm, setSearchTerm }`. | `SearchProvider` |
| `useSearch.js` | Reads the shared surah list, memoizes `filterSurahs(surahs, searchTerm)`, and returns the filtered surah array. | `useSearch` (named + default) |

### src/features/theme

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `useDarkMode.js` | Theme state: saved preference → system preference; toggles `html.dark`; persists via safe storage; listens for system changes until a choice is saved. | default `useDarkMode` |
| `themeUtils.js` | Pure theme helpers: read CSS variables, inspect/toggle/apply theme, read/save theme, read system theme, compute initial theme. | `getThemeVariable`, `isDarkMode`, `toggleDarkMode`, `applyTheme`, `getSavedTheme`, `saveTheme`, `getSystemTheme`, `getInitialTheme` |

### src/features/audio

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `useAudio.js` | Prepared audio hook: ref, playing/time/duration/error state, play/pause/seek, event listeners, resets on `src` change. Not currently wired into the UI. | `useAudio` (named + default) |

---

## src/shared

Cross-feature, reusable foundation.

### src/shared/components

| File | Responsibility | Props |
|------|----------------|-------|
| `Header.jsx` | Logo, inline search form, theme toggle. Uses inline SVG icons. | `{ searchTerm, onSearchChange }` |
| `Footer.jsx` | Branding, About/Privacy/Licensing/Contact links, copyright. | none |
| `SkipLink.jsx` | Hidden-until-focused link to `#main-content`. | none |

### src/shared/hooks

| File | Responsibility | Signature |
|------|----------------|-----------|
| `useDocumentMeta.js` | Sets `document.title` and the description meta tag; restores previous values on unmount. | `useDocumentMeta(title?, description?)` |

### src/shared/utils

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `constants.js` | App metadata, Quran counts, storage keys, themes/colors, routes, layout class strings, Arabic/English labels, UI/ARIA labels, audio/API/pagination config, error/success messages, formatting helpers. | `APP_*`, `QURAN_*`, `STORAGE_KEYS`, `THEMES`, `THEME_COLORS`, `ROUTES`, `LAYOUT_CLASSES`, `LABELS`, `UI`, `ARIA_LABELS`, `ERROR_MESSAGES`, `SUCCESS_MESSAGES`, `AUDIO_CONFIG`, `API`, `PAGINATION`, `getSurahAriaLabel`, `formatSurahMetadata`, `getThemeClassName` |
| `storage.js` | Safe localStorage wrapper: handles SSR, private mode, quota, and security errors; JSON helpers. | `getItem`, `setItem`, `removeItem`, `clear`, `isAvailable`, `getJSON`, `setJSON`, `storage` |

### src/shared/config

| File | Responsibility | Key exports |
|------|----------------|-------------|
| `env.js` | Single access point for `import.meta.env` with defaults for the Itqan API base URL, recitation id, audio CDN, feature flags, and environment booleans. | `config` (named + default) |

### src/shared/styles

| File | Responsibility |
|------|----------------|
| `tailwind.css` | Tailwind import, dark variant, light/dark CSS variables, base `html`/`body` rules, and `@layer components` utilities (`.num`, `.par-center`, `.logo-name`, `.chev*`, link hover). Imported by `main.jsx` and `App.jsx`. |
| `normalize.css` | Vendored CSS reset/normalization. Imported by `App.jsx`. |
| `all.min.css` | Vendored Font Awesome stylesheet. Present but not currently imported by the app. |

### src/shared/assets

| File | Responsibility |
|------|----------------|
| `quran-sound.svg` | Logo used by `Header` and `Footer`. Bundled by Vite with a hashed filename. |

---

## src/types

| File | Responsibility | Contents |
|------|----------------|----------|
| `index.ts` | Core domain and configuration types. | `Surah`, `SearchResult`, `Theme`, `AudioState`, `SurahNavigation`, `StorageKeys`, `AppConfig` |
| `assets.d.ts` | Ambient declarations for static asset imports (for example `.svg`). | module declarations |

---

## src/plan.drawio

Editable draw.io file containing three pages/diagrams:

1. System architecture (entry, app shell, features, shared layer)
2. Feature/data flow
3. Directory tree

Update it when the architecture changes, and keep the docs consistent with it.

---

## tests

Vitest + Testing Library suite. Mirrors source domains.

| File | Covers |
|------|--------|
| `setup.js` | Imports `@testing-library/jest-dom`; clears localStorage and mocks before each test. |
| `fixtures/surahs.js` | Generates a deterministic 114-surah test fixture and API response helper. |
| `components/ErrorBoundary.test.jsx` | Renders children normally; shows fallback on error; reload behavior. |
| `api/itqanApi.test.js` | Successful 114-surah fetch, incomplete/duplicate data, HTTP errors, malformed responses. |
| `components/IndexPage.test.jsx` | Heading, surah rendering, search filtering, empty/loading/error states, live results, retry. |
| `components/QuranDataProvider.test.jsx` | useEffect fetching, loading, error, and retry behavior. |
| `components/SkipLink.test.jsx` | Link target, hidden-until-focus classes, Arabic label. |
| `hooks/useDarkMode.test.js` | Initial state, toggle, persistence, DOM class updates. |
| `hooks/useDocumentMeta.test.js` | Title/description updates and restoration. |
| `hooks/useSurah.test.js` | Valid lookup, adjacent surahs, invalid numbers. |
| `utils/quranData.test.js` | Search across fields, case-insensitivity, lookups, adjacency, validation, index caching. |
| `utils/storage.test.js` | Get/set/remove/clear, defaults, JSON helpers, error paths. |
| `utils/themeUtils.test.js` | Saved/system/initial theme, apply/toggle, CSS variable reads. |

Run:

```bash
pnpm test -- --run
pnpm test:coverage
```

---

## public

| File | Purpose |
|------|---------|
| `favicon.svg` | Browser tab icon; referenced from `index.html`. |
| `robots.txt` | `User-agent: *` / `Allow: /`. |

Files in `public/` are copied to `dist/` unchanged by Vite.

---

## scripts

| File | Purpose |
|------|---------|
| `check-package-manager.mjs` | Reads `npm_config_user_agent`; exits with an error unless it starts with `pnpm/`. Runs on `preinstall`. |

---

## docs

| File | Contents |
|------|----------|
| `ARCHITECTURE.md` | System design, data flow, state, routing, hooks, build, CSS, performance, testing, deployment, future plans. |
| `COMPONENTS.md` | Component inventory, props, hooks, behavior, composition, patterns, testing. |
| `SETUP.md` | Prerequisites, install, environment, commands, structure, aliases, troubleshooting. |
| `DEPLOYMENT.md` | GitHub Pages setup, build/deploy, monitoring, rollback, CI example, checklists. |
| `ACCESSIBILITY.md` | WCAG 2.1 AA features, testing procedures, patterns, compliance matrix. |
| `CONTRIBUTING.md` | Workflow, branch/commit conventions, standards, tests, docs, accessibility, performance. |
| `map.md` | This repository map. |

---

## Generated and ignored directories

These are produced locally and are git-ignored:

| Path | Description |
|------|-------------|
| `node_modules/` | Installed dependencies (pnpm). |
| `dist/` | Vite production build output; published to `gh-pages`. |
| `coverage/` | Vitest V8 coverage HTML/JSON reports. |
| `dist-ssr/` | Reserved for SSR builds (not currently used). |
| `.env.local`, `.env.*.local` | Local environment overrides. |
| `.claude/`, `.idea/`, `.DS_Store`, `*.sw?` | Local editor/OS files. |
| `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock` | Ignored because pnpm is the only supported package manager. |

---

## Where do I change…?

| Task | File(s) |
|------|---------|
| App title, labels, layout class strings | `src/shared/utils/constants.js` |
| Theme colors / global CSS | `src/shared/styles/tailwind.css` |
| Theme toggle behavior | `src/features/theme/useDarkMode.js` |
| Search matching logic | `src/features/quran/utils/quranData.js` |
| Search state plumbing | `src/features/search/*` |
| Surah metadata / audio URLs | `src/features/quran/api/itqanApi.js` (runtime Itqan API) |
| Home page layout | `src/features/quran/pages/IndexPage.jsx` |
| Surah detail layout | `src/features/quran/pages/SurahPage.jsx` |
| Header/search/toggle UI | `src/shared/components/Header.jsx` |
| Footer links | `src/shared/components/Footer.jsx` |
| Routes / lazy loading | `src/app/AppRouter.jsx` |
| App-level error UI | `src/app/ErrorBoundary.jsx` |
| Page title/meta description | `src/shared/hooks/useDocumentMeta.js` + pages |
| Env variables | `.env.example`, `src/shared/config/env.js` |
| Path aliases | `vite.config.js`, `vitest.config.js`, `tsconfig.json` |
| Deploy base path | `vite.config.js` (`base`) + `src/app/AppRouter.jsx` (`basename`) |
| Tests | `tests/` |

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [COMPONENTS.md](./COMPONENTS.md)
- [SETUP.md](./SETUP.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ACCESSIBILITY.md](./ACCESSIBILITY.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [README.md](../README.md)
