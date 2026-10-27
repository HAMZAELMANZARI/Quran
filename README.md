# Quran Sound

Quran Sound is a responsive, modern web application for browsing and listening to Quran recitations. Built with React, React Router, and Tailwind CSS, it provides a bilingual (Arabic/English) interface with RTL support, dark mode, and comprehensive search functionality across all 114 surahs. Surah metadata and audio URLs are fetched at runtime from the [Itqan CMS API](https://api.cms.itqan.dev).

## ✨ Features

- 🌍 **Complete Quran**: All 114 surahs with metadata
- 🔍 **Smart Search**: Filter by Arabic name, English name, surah number, or revelation place
- 🎵 **Audio Playback**: HTML5 audio player for each surah
- 🌙 **Dark Mode**: Light/dark theme with system preference support
- ⌨️ **Full Keyboard Navigation**: Complete keyboard accessibility
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🇸🇦 **Arabic RTL**: Proper right-to-left text layout and support
- ♿ **Accessible**: WCAG 2.1 Level AA compliant
- 🚀 **Fast**: Optimized with Vite, React Router code splitting, and Tailwind CSS
- 📚 **Type Safe**: TypeScript foundation with gradual migration support

## Quick Start

This project uses **pnpm exclusively**. npm, yarn, and other package managers are not supported.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173/Quran/
```

See [docs/SETUP.md](./docs/SETUP.md) for detailed setup instructions.

## 📖 Documentation

Complete documentation is available in the `docs/` directory:

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System design, component hierarchy, and data flow
- **[COMPONENTS.md](./docs/COMPONENTS.md)** - React component API reference
- **[SETUP.md](./docs/SETUP.md)** - Development environment setup and troubleshooting
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - GitHub Pages deployment guide
- **[ACCESSIBILITY.md](./docs/ACCESSIBILITY.md)** - WCAG 2.1 compliance and testing
- **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Contribution guidelines
- **[map.md](./docs/map.md)** - Complete file-by-file map of the repository

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Build optimized production bundle |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Check code quality with ESLint |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:ui` | Run Vitest with the interactive UI |
| `pnpm test:coverage` | Run tests and generate a coverage report |
| `pnpm run deploy` | Build and deploy to GitHub Pages |

## Project Structure

```
main.jsx                 # React entry point (providers + ErrorBoundary)
index.html               # Vite HTML entry point
src/
├── app/                 # Application shell
│   ├── App.jsx          # Layout: Header + page + Footer
│   ├── AppRouter.jsx    # BrowserRouter, data/search providers, lazy loading
│   └── ErrorBoundary.jsx
├── features/            # Feature modules (vertical slices)
│   ├── quran/           # pages, components, hooks, utils, API, data provider
│   ├── search/          # SearchProvider, context, useSearch
│   ├── theme/           # useDarkMode, themeUtils
│   └── audio/           # useAudio (available, not wired yet)
├── shared/              # Cross-feature foundation
│   ├── components/      # Header, Footer, SkipLink
│   ├── hooks/           # useDocumentMeta
│   ├── utils/           # constants, storage
│   ├── config/          # env.js
│   ├── styles/          # tailwind.css, normalize.css, all.min.css
│   └── assets/          # quran-sound.svg
├── types/               # TypeScript definitions
└── plan.drawio          # Architecture diagrams

docs/                    # Comprehensive documentation
public/                  # Static assets
scripts/                 # Tooling (pnpm-only install guard)
tests/                   # Vitest unit and component tests
vite.config.js           # Vite configuration
vitest.config.js         # Vitest configuration
tsconfig.json            # TypeScript configuration
.env.example             # Environment variable template
```

See [docs/map.md](./docs/map.md) for a file-by-file description of every source, test, and configuration file.

## Technology Stack

- **React** 19.2.8 - UI framework
- **React Router** 7.18.4 - Client-side routing
- **Vite** 8.3.0 - Build tool and dev server
- **Tailwind CSS** 4.3.3 - Utility-first styling
- **Vitest** 5.0.5 + Testing Library - Unit and component tests
- **TypeScript** - Optional type safety with gradual migration

## Requirements

- **Node.js** 22.12+ (Vite 8 and Vitest 5 compatible)
- **pnpm** 12.11.2 (pinned via `packageManager`; use Corepack to install it)
- npm and yarn are not supported; dependency installation is blocked for them.

## Features Detail

### 📡 Runtime Data
- One paginated request to the Itqan CMS API on mount
- `QuranDataProvider` shares the 114 validated surahs with all pages
- Loading, error, and retry states for the surah grid and detail page
- Audio URLs come from the API and play on demand
- Configurable through `VITE_API_BASE_URL` and `VITE_ITQAN_RECITATION_ID`

### 🔍 Search Across 4 Fields
- Arabic surah name
- English surah name
- Surah number
- Revelation place (Makkah/Madinah)

### 🎨 Theming
- Light and dark modes
- System preference detection
- Persistent user preference (localStorage)
- WCAG AA color contrast compliance

### ♿ Accessibility
- Full keyboard navigation
- Screen reader compatible
- Semantic HTML structure
- ARIA labels and roles
- Touch targets sized for mobile use
- High color contrast ratios

### ⚡ Performance
- Code splitting with React Router
- Memoized expensive computations
- Optimized bundle (~78KB gzipped)
- Fast development with HMR
- Lazy-loaded routes

### 🔒 Configuration
- Environment-based configuration
- Centralized config management
- Security-focused (no hardcoded secrets)
- Development/production modes

## Getting Started as a Developer

1. **Read [SETUP.md](./docs/SETUP.md)** for environment setup
2. **Read [ARCHITECTURE.md](./docs/ARCHITECTURE.md)** for system design
3. **Explore [COMPONENTS.md](./docs/COMPONENTS.md)** for component reference
4. **Browse [map.md](./docs/map.md)** for a file-by-file repository map
5. **See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)** for contribution guidelines

## Deployment

Quran Sound is deployed to GitHub Pages at `https://{username}.github.io/Quran/`

```bash
# Deploy in one command
pnpm run deploy
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for:
- How to report bugs
- How to suggest features
- How to submit pull requests
- Coding standards and guidelines
- Testing requirements

## Support & Help

- **Questions?** Check the [documentation](./docs/)
- **Found a bug?** [Create an issue](https://github.com/HAMZAELMANZARI/Quran/issues)
- **Want to help?** See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## License

See LICENSE file for details.

## Acknowledgments

- 114 surahs of Quran metadata
- Audio recitations from public sources
- Built with modern web technologies
- Inspired by community feedback

---

**Project Status**: ✅ Active Development  
**Last Updated**: 2026-10-25  
**Current Phase**: Architecture refactor and test migration complete

For detailed project roadmap, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md#future-architecture-considerations)

## Recent Updates (October 2025)

### New Features
- **Multi-Riwayat Support**: Added support for multiple Quran recitations/riwayat directly from the home page
  - Tajweed (color-coded) - Hafs 'an 'Asim (recitation 31)
  - Shu'bah 'an 'Asim (recitation 33)
  - Qalun 'an Nafi' (recitation 19)
  - Warsh 'an Nafi' (recitation 17)
  - Al-Bazzi 'an Ibn Kathir (recitation 24)
  - Qunbul 'an Ibn Kathir (recitation 25)
  - Al-Duri 'an Abi 'Amr (recitation 27)
- **Riwayat Selector**: New section above the Surah index on the home page allows users to switch between different recitation styles
- **Responsive Design**: Riwayat selector adapts to all screen sizes with grid layout (2 columns on mobile, up to 7 columns on large screens)

### Technical Changes
- **API Layer**: Extended `fetchSurahs()` to accept optional `recitationId` parameter for fetching different recitations
- **State Management**: Enhanced `QuranDataProvider` to manage selected recitation with automatic refetching
- **Context**: Updated `QuranDataContext` to expose `recitationId` and `setRecitationId`
- **Constants**: Added `RIWAYAT_OPTIONS` configuration with recitation IDs and labels
