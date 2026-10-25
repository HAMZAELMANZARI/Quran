# Quran Sound - Setup Guide

## Quick Start

```bash
pnpm install
pnpm dev
# Open http://localhost:5173/Quran/
```

---

## Prerequisites

| Software | Version | Check Command |
|----------|---------|---------------|
| **Node.js** | `>=22.12.0` | `node --version` |
| **pnpm** | `>=12.0.0` (pinned `12.11.2`) | `pnpm --version` |
| **Git** | Any recent version | `git --version` |

> **pnpm only.** npm and yarn are not supported. The `preinstall` script
> (`scripts/check-package-manager.mjs`) aborts installation when the user agent
> is not pnpm. If pnpm is missing, run:
>
> ```bash
> corepack enable
> corepack prepare pnpm@12.11.2 --activate
> ```

Recommended:

- VS Code with ESLint and TypeScript extensions
- A modern browser (Chrome, Firefox, Safari, Edge)
- Bash, Zsh, or PowerShell

---

## Installation

### 1. Clone

```bash
git clone https://github.com/HAMZAELMANZARI/Quran.git
cd Quran
```

### 2. Install dependencies

```bash
pnpm install
```

Remove any leftover `package-lock.json` or `yarn.lock`; they are git-ignored and
will not be used.

### 3. Start the dev server

```bash
pnpm dev
```

Expected output:

```
VITE v8.3.0  ready in ~250 ms

➜  Local:   http://localhost:5173/Quran/
```

### 4. Open the app

Visit `http://localhost:5173/Quran/`.

---

## Environment Setup

### 1. Create a local env file

```bash
cp .env.example .env.local
```

### 2. Configure variables

```env
# Application
VITE_APP_NAME=Quran Sound
VITE_APP_VERSION=0.0.1

# API / audio
VITE_API_BASE_URL=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE_MODE=true

# Build
VITE_DEBUG_MODE=false
```

### 3. Access in code

```javascript
import config from '@shared/config/env'

config.appName        // 'Quran Sound'
config.audioCdn       // CDN URL
config.isDevelopment  // true/false
```

`.env.local` and `.env.*.local` are git-ignored. Restart the dev server after
changing environment variables.

---

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite with HMR |
| `pnpm build` | Build the production bundle into `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest in watch mode |
| `pnpm test -- --run` | Run the suite once (CI style) |
| `pnpm test:ui` | Open the Vitest UI |
| `pnpm test:coverage` | Generate a V8 coverage report |
| `pnpm run deploy` | Build and publish `dist/` to `gh-pages` |

Run the dev server on another port:

```bash
pnpm dev --port 3000
```

---

## Project Navigation

### Key files

```
main.jsx                          # React entry point
index.html                        # Vite HTML entry point
src/
├── app/
│   ├── App.jsx                   # Layout: SkipLink + Header + children + Footer
│   ├── AppRouter.jsx             # BrowserRouter, SearchProvider, lazy routes
│   └── ErrorBoundary.jsx         # Top-level error boundary
├── features/
│   ├── quran/
│   │   ├── pages/IndexPage.jsx   # Home (all surahs)
│   │   ├── pages/SurahPage.jsx   # Surah detail
│   │   ├── components/SurahCard.jsx
│   │   ├── hooks/useSurah.js
│   │   ├── utils/quranData.js
│   │   └── data/quran.js         # 114 surah records
│   ├── search/
│   │   ├── SearchProvider.jsx
│   │   ├── searchContext.js
│   │   └── useSearch.js
│   ├── theme/
│   │   ├── useDarkMode.js
│   │   └── themeUtils.js
│   └── audio/useAudio.js         # available, not wired yet
├── shared/
│   ├── components/               # Header, Footer, SkipLink
│   ├── hooks/useDocumentMeta.js
│   ├── utils/                    # constants.js, storage.js
│   ├── config/env.js
│   ├── styles/                   # tailwind.css, normalize.css, all.min.css
│   └── assets/quran-sound.svg
└── types/                        # TypeScript definitions
tests/                            # Vitest suite
docs/                             # Documentation
scripts/check-package-manager.mjs # pnpm-only guard
```

See [map.md](./map.md) for a file-by-file description.

### Path aliases

Defined in both `vite.config.js` and `tsconfig.json`:

| Alias | Target |
|-------|--------|
| `@/` | `src/` |
| `@app/` | `src/app/` |
| `@features/` | `src/features/` |
| `@shared/` | `src/shared/` |
| `@types/` | `src/types/` |

Use aliases instead of deep relative paths:

```javascript
// ✅
import useSearch from '@features/search/useSearch'
import { APP_TITLE } from '@shared/utils/constants'

// ❌
import useSearch from '../../../features/search/useSearch'
```

---

## First Change Walkthrough

**Change the visible app name**

1. Open `src/shared/utils/constants.js`
2. Edit `APP_NAME` (or `APP_TITLE`)
3. Save; Vite HMR reloads the page

**Change the theme default**

1. Open `src/features/theme/useDarkMode.js`
2. Adjust the initial-state logic
3. Save and reload

**Add a searchable field**

1. Open `src/features/quran/utils/quranData.js`
2. Add the value to `createSearchIndex()`'s `searchValues`
3. Search again — the cached index rebuilds on a full page reload

**Run tests**

```bash
pnpm test -- --run
pnpm test:coverage
```

**Build and preview**

```bash
pnpm build
pnpm preview
```

---

## IDE Setup

### Recommended VS Code extensions

- ESLint (`dbaeumer.vscode-eslint`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript/JavaScript language features (built in)

### Suggested settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## Static Analysis and Tests

### ESLint

`eslint.config.js` uses the flat config format with:

- `@eslint/js` recommended rules
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- Browser globals
- Ignores `dist/` and `coverage/`

```bash
pnpm lint
```

### TypeScript / JSDoc

`tsconfig.json` enables `allowJs` and `checkJs`, so JSDoc annotations in `.js`
files are type-checked. There is no dedicated `typecheck` script; editors use the
project `tsconfig.json` directly.

### Vitest

```bash
pnpm test -- --run     # one-off run
pnpm test              # watch mode
pnpm test:coverage     # coverage
```

- Environment: `happy-dom`
- Setup: `tests/setup.js` (jest-dom + localStorage cleanup)
- Tests mirror source domains under `tests/components`, `tests/hooks`,
  `tests/utils`

---

## Troubleshooting

### Port already in use

```bash
pnpm dev --port 3000

# or free the port (Linux/macOS)
lsof -ti:5173 | xargs kill -9
```

### `Cannot find module '@features/...'`

- Confirm the alias exists in both `vite.config.js` and `tsconfig.json`
- Confirm the file exists at the expected path
- Restart the dev server and reload the IDE window

### npm/yarn install is blocked

This is intentional. Use pnpm:

```bash
corepack enable
corepack prepare pnpm@12.11.2 --activate
pnpm install
```

### Environment variables are undefined

- The file must be `.env.local` (or another Vite env file), not `.env`
- Variables must start with `VITE_`
- Restart `pnpm dev` after edits
- Read them through `src/shared/config/env.js`

### Dark mode toggle does nothing

- Check `useDarkMode.js` is the source of the toggle
- Verify `document.documentElement` gets the `dark` class
- Check `src/shared/styles/tailwind.css` is loaded
- In the browser console: `localStorage.getItem('theme')`

### Search does not filter

- Confirm `SearchProvider` wraps `App` in `AppRouter.jsx`
- Confirm `IndexPage` calls `useSearch(searchTerm)`
- Check the console for errors

### Audio does not play

- Inspect the `src` on the `<audio>` element (`surah.audio_url`)
- Verify the CDN is reachable
- Some browsers block autoplay; press play manually

### Tests fail on `localStorage`

`tests/setup.js` clears storage before each test. If you add a custom mock,
reset it with `vi.clearAllMocks()` in `beforeEach`.

---

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Browse [COMPONENTS.md](./COMPONENTS.md) for component APIs
3. Use [map.md](./map.md) to locate files quickly
4. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR
5. Review [DEPLOYMENT.md](./DEPLOYMENT.md) when preparing a release

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design
- **[COMPONENTS.md](./COMPONENTS.md)** — Component API
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Production deployment
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** — Accessibility
- **[map.md](./map.md)** — Repository file map
- **[README.md](../README.md)** — Project overview
