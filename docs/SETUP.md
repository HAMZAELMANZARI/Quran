# Quran Sound - Setup Guide

## Quick Start (3 Commands)

Get the app running in under 5 minutes:

```bash
pnpm install
pnpm dev
# Open http://localhost:5173/Quran/
```

---

## Prerequisites

Before you start, ensure you have:

### Required Software

| Software | Version | Check Command |
|----------|---------|---|
| **Node.js** | 18+ (Vite 8 compatible) | `node --version` |
| **pnpm** | 8+ (recommended) | `pnpm --version` |
| **Git** | Any recent version | `git --version` |

### Recommended

- **Text Editor**: VS Code with ESLint and TypeScript extensions
- **Browser**: Chrome, Firefox, Safari, or Edge (modern version)
- **Terminal**: Bash, Zsh, or PowerShell

---

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the project
git clone https://github.com/HAMZAELMANZARI/Quran.git
cd Quran
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended for speed)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

**First time?** This downloads ~500MB of dependencies. Subsequent installs are faster.

### 3. Start Development Server

```bash
pnpm dev
```

You'll see output like:
```
  VITE v8.3.0  ready in 245 ms

  ➜  Local:   http://localhost:5173/Quran/
  ➜  press h to show help
```

### 4. Open in Browser

Click the link or paste `http://localhost:5173/Quran/` into your browser.

---

## Environment Setup

### 1. Create .env.local

```bash
# Copy the template
cp .env.example .env.local
```

### 2. Configure Variables

Edit `.env.local` with your settings:

```env
# Application
VITE_APP_NAME=Quran Sound
VITE_APP_VERSION=0.0.1

# API Configuration
VITE_API_BASE_URL=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE_MODE=true

# Build
VITE_DEBUG_MODE=false
```

### 3. Access in Code

```javascript
import config from '@config/env'

console.log(config.appName)        // 'Quran Sound'
console.log(config.isDevelopment)  // true/false
console.log(config.audioCdn)       // CDN URL
```

**Note**: `.env.local` is git-ignored (never committed).

---

## Available Commands

### Development

```bash
# Start dev server (with HMR)
pnpm dev
# Opens http://localhost:5173/Quran/
# Auto-reloads on file changes

# Start dev server on different port
PORT=3000 pnpm dev
```

### Building

```bash
# Build for production
pnpm build
# Output: dist/

# Preview production build locally
pnpm preview
# Opens http://localhost:5173/Quran/ (production bundle)
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Run tests (when Phase 9 complete)
pnpm test
pnpm test:ui        # Interactive test UI
pnpm test:coverage  # Coverage report
```

### Deployment

```bash
# Build and deploy to GitHub Pages
pnpm run deploy
# Deploys dist/ to gh-pages branch
```

---

## IDE Setup

### VS Code

**Recommended Extensions**:
```
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- ES7+ React/Redux/React-Native snippets (dsznajder.es7-react-js-snippets)
```

**Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### TypeScript Support

Path aliases are auto-configured:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@hooks/` → `src/hooks/`
- `@utils/` → `src/utils/`
- `@data/` → `src/data/`
- `@context/` → `src/context/`
- `@types/` → `src/types/`
- `@config/` → `src/config/`

IDE will provide autocomplete for these paths.

---

## Project Navigation

### Key Files and Their Purpose

```
src/
├── main.jsx                    # Entry point
├── components/
│   ├── App.jsx                # Root component
│   ├── ErrorBoundary.jsx      # Error handling
│   ├── common/
│   │   ├── Header.jsx         # App header + search
│   │   ├── Footer.jsx         # App footer
│   │   ├── SearchBar.jsx      # Search input
│   │   └── AudioPlayer.jsx    # Audio player
│   └── pages/
│       ├── IndexPage.jsx      # Home (all surahs)
│       └── SurahPage.jsx      # Surah detail
├── hooks/
│   ├── useDarkMode.js         # Dark mode logic
│   ├── useSurah.js            # Surah fetching
│   ├── useSearch.js           # Search filtering
│   └── useAudio.js            # Audio player state
├── utils/
│   ├── quranData.js           # Data access (7 functions)
│   ├── themeUtils.js          # Theme helpers (8 functions)
│   ├── constants.js           # Shared constants
│   └── storage.js             # Safe localStorage
├── context/
│   └── SearchContext.jsx      # Search state provider
├── config/
│   └── env.js                 # Environment config
├── types/
│   └── index.ts               # TypeScript interfaces
├── data/
│   └── quran.js               # 114 surahs metadata
├── css/
│   └── tailwind.css           # Tailwind styles
├── router.jsx                 # React Router config
└── main.jsx                   # App entry point

Root Level:
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
├── .env.example               # Environment template
└── .gitignore                 # Git ignore rules
```

### Making Your First Change

**Example**: Change the app name

1. Open `src/utils/constants.js`
2. Find `APP_NAME`
3. Change `'Quran Sound'` to your name
4. Save file
5. Browser auto-reloads (HMR)
6. Page shows new name

---

## Understanding the Structure

### Component Architecture
- **pages/**: Full-page components (IndexPage, SurahPage)
- **common/**: Reusable components (Header, Footer, SearchBar, AudioPlayer)
- **App.jsx**: Root layout and providers
- **ErrorBoundary.jsx**: Error handling wrapper

### State Management
- **SearchContext.jsx**: Global search state
- **useDarkMode.js**: Dark mode state with persistence
- **useSearch.js**: Search filtering hook
- **useSurah.js**: Surah fetching hook

### Data Layer
- **src/data/quran.js**: 114 surahs (bundled data)
- **src/utils/quranData.js**: 7 data access functions

### Styling
- **src/css/tailwind.css**: All styles
- Tailwind CSS v4 with @layer components
- CSS variables for theming

### Configuration
- **vite.config.js**: Build configuration
- **tsconfig.json**: TypeScript setup
- **src/config/env.js**: Environment variables

---

## Troubleshooting

### Port 5173 Already in Use

```bash
# Use different port
PORT=3000 pnpm dev

# Or kill process using port (macOS/Linux)
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Errors

**Problem**: `Cannot find module '@hooks/useSearch'`

**Solution**: 
- Check path aliases in `vite.config.js` and `tsconfig.json` match
- Verify file exists at correct location
- IDE may need reload

```bash
# Restart dev server
pnpm dev
```

### Import Path Issues

**Problem**: `import useSearch from '../../hooks/useSearch'` doesn't work

**Solution**: Use path aliases instead

```javascript
// ❌ Don't do this
import useSearch from '../../hooks/useSearch'

// ✅ Do this
import useSearch from '@hooks/useSearch'
```

### TypeScript "Cannot find module" Warning

**Problem**: IDE shows red squiggles on imports

**Solution**:
1. Ensure `tsconfig.json` has paths configured
2. Restart IDE/reload window
3. Run `pnpm dev` again

### Build Fails with "Module not found"

**Problem**: Build succeeds locally but fails on CI/deploy

**Solution**:
- Check all imports use correct paths
- Ensure all files exist
- Run `pnpm build` locally to verify

```bash
pnpm build
pnpm preview  # Test production build
```

### Environment Variables Not Loading

**Problem**: `config.appName` is undefined

**Solution**:
1. Ensure `.env.local` exists and has `VITE_APP_NAME=...`
2. Restart dev server after changing `.env.local`
3. Check variable is prefixed with `VITE_`

```bash
# Check env is being read
pnpm dev  # Should show no errors
```

### Dark Mode Not Working

**Problem**: Dark mode toggle doesn't change theme

**Solution**:
1. Check `useDarkMode.js` is imported correctly
2. Verify localStorage not disabled in browser
3. Check CSS file is loaded (`src/css/tailwind.css`)

```bash
# Check in browser console
localStorage.getItem('theme')  # Should return 'light' or 'dark'
```

### Audio Not Playing

**Problem**: Audio player shows but no sound

**Solution**:
1. Check audio URL in browser console
2. Verify CDN is accessible
3. Check browser allows autoplay

```javascript
// In browser console
import config from '@config/env'
console.log(config.audioCdn)  # Should show CDN URL
```

### Search Not Filtering

**Problem**: Search box appears but doesn't filter

**Solution**:
1. Check SearchContext is wrapping components
2. Verify useSearch hook is called in IndexPage
3. Check browser console for errors

```bash
# Clear browser cache
Ctrl+Shift+Delete (Windows/Linux)
Cmd+Shift+Delete (macOS)
```

---

## Next Steps After Setup

### 1. Read the Architecture

```bash
# Open in editor
cat docs/ARCHITECTURE.md

# Or in browser if published
```

Key concepts:
- Component hierarchy
- Data flow
- State management
- Routing structure

### 2. Explore Components

```bash
# Look at key files
- src/components/pages/IndexPage.jsx (home page)
- src/components/pages/SurahPage.jsx (surah detail)
- src/hooks/useSearch.js (search logic)
- src/utils/quranData.js (data access)
```

### 3. Make a Small Change

Try one of these:

**Option A**: Change app title
- Edit `src/utils/constants.js`
- Find `APP_NAME`
- Change and save
- Page reloads automatically

**Option B**: Change dark mode default
- Edit `src/hooks/useDarkMode.js`
- Find default theme logic
- Change and save
- Reload page

**Option C**: Add a new search field
- Edit `src/utils/quranData.js`
- Modify `createSearchIndex()` to include new field
- Retest search
- See results update

### 4. Run Tests (Phase 9+)

```bash
pnpm test           # Run all tests
pnpm test:ui        # Interactive UI
pnpm test:coverage  # Coverage report
```

### 5. Deploy Locally

```bash
pnpm build          # Create production build
pnpm preview        # Preview built version
```

---

## Learning Resources

### Official Documentation
- **[React Docs](https://react.dev)** - React fundamentals
- **[React Router Docs](https://reactrouter.com)** - Routing
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[Vite Docs](https://vitejs.dev)** - Build tool
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript

### Project-Specific
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[COMPONENTS.md](./COMPONENTS.md)** - Component reference
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment

---

## Common Development Workflows

### Creating a New Component

1. Create file: `src/components/MyComponent.jsx`
2. Write component code
3. Import in parent component
4. Browser hot-reloads automatically

```javascript
// src/components/MyComponent.jsx
export default function MyComponent() {
  return <div>Hello</div>
}

// In parent:
import MyComponent from '@components/MyComponent'
```

### Adding a New Utility Function

1. Create file or add to existing: `src/utils/myUtils.js`
2. Export function with JSDoc
3. Import in components/hooks

```javascript
// src/utils/myUtils.js
/**
 * Does something useful
 * @param {string} input - Input text
 * @returns {string} Output text
 */
export function doSomething(input) {
  return input.toUpperCase()
}

// Usage in components:
import { doSomething } from '@utils/myUtils'
```

### Modifying Styles

All styles are in `src/css/tailwind.css`:
- Theme variables: lines 5-35
- Component utilities: @layer components
- Custom utilities: @layer utilities

```css
:root {
  --surface-1: #f5f2ed;
  /* Change these colors */
}
```

### Adding Environment Variables

1. Add to `.env.example`
2. Add to `.env.local` (user's file)
3. Access in code via `src/config/env.js`

```env
# .env.example
VITE_MY_VARIABLE=default_value
```

```javascript
// src/config/env.js
export const config = {
  // ... existing config
  myVariable: import.meta.env.VITE_MY_VARIABLE || 'default',
}

// Usage:
import config from '@config/env'
console.log(config.myVariable)
```

---

## Performance Tips

### Keep Development Fast
- Use `pnpm` instead of `npm` (faster)
- Use HMR (automatic reload on save)
- Check browser DevTools Network tab for slow assets

### For Production
- Run `pnpm build` to verify
- Check bundle size: `pnpm build && du -sh dist/`
- Use `pnpm preview` to test production version

---

## Getting Help

### Check These First
1. **[SETUP.md](./SETUP.md)** (this file) - Troubleshooting section
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
3. **[COMPONENTS.md](./COMPONENTS.md)** - Component reference

### Search for Issues
- Check GitHub issues: `github.com/HAMZAELMANZARI/Quran/issues`
- Look for similar error messages

### Ask for Help
- Create GitHub issue with:
  - Error message
  - Steps to reproduce
  - Your Node/pnpm versions
  - OS (Windows/macOS/Linux)

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[COMPONENTS.md](./COMPONENTS.md)** - Component API
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment
- **[README.md](../README.md)** - Project overview
