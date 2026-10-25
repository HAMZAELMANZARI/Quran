# Quran Sound - Contributing Guide

## Welcome

Thanks for contributing to Quran Sound. This guide covers the workflow, coding
standards, and expectations for changes.

Please also read the [Code of Conduct](../CODE_OF_CONDUCT.md).

---

## Ways to Contribute

### Report issues

1. Search existing issues first
2. Open a new issue with:
   - A clear title
   - What you expected vs. what happened
   - Steps to reproduce
   - Browser/OS/Node/pnpm versions
   - Screenshots or error output when useful

### Suggest features

Open an issue describing the use case, the proposed behavior, and any
alternatives considered.

### Improve documentation

Documentation lives in `docs/`. Keep links working and update related documents
in the same PR.

### Submit code

1. Fork the repository
2. Create a branch (see naming below)
3. Make focused changes
4. Add or update tests
5. Run lint, tests, and a production build
6. Commit with a clear message
7. Open a pull request

---

## Development Workflow

### Setup

```bash
git clone https://github.com/YOUR_USERNAME/Quran.git
cd Quran
pnpm install
pnpm dev
# http://localhost:5173/Quran/
```

See [SETUP.md](./SETUP.md) for details. This project uses **pnpm only**.

### Branch naming

```
feature/description
bugfix/description
docs/description
refactor/description
chore/description
test/description
perf/description
```

Examples:

```bash
git checkout -b feature/add-ayah-search
git checkout -b bugfix/audio-not-loading
git checkout -b docs/update-map
```

### Verify before committing

```bash
pnpm lint
pnpm test -- --run
pnpm build
pnpm preview
```

---

## Commit Messages

Format:

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`.

Examples:

```bash
git commit -m "feat: add ayah-level search

- Add ayah filtering utility
- Expose results through useSearch
- Add unit tests"

git commit -m "fix: audio player not resetting between surahs

- Reset playback state when src changes
- Add regression test"
```

---

## Pull Requests

### Checklist

- [ ] Branch is based on the latest `main`
- [ ] Change is focused (avoid unrelated refactors)
- [ ] Lint passes (`pnpm lint`)
- [ ] Tests pass (`pnpm test -- --run`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Tests added/updated for behavior changes
- [ ] Documentation updated when behavior or APIs change
- [ ] Accessibility considered
- [ ] No console errors/warnings

### PR description template

```markdown
## Description
Brief summary of the change.

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation
- [ ] Refactor / chore

## Related issues
Closes #123

## Changes
- ...
- ...

## Testing
How you verified the change.

## Screenshots (UI changes)
```

### Review

Maintainers review for correctness, readability, tests, accessibility, and
consistency with the existing architecture. Address feedback in new commits;
avoid force-pushing over review history unless asked.

---

## Coding Standards

### File organization

```javascript
// 1. External imports
import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Internal aliased imports
import { SearchContext } from '@features/search/searchContext'
import useSearch from '@features/search/useSearch'
import { LAYOUT_CLASSES } from '@shared/utils/constants'

// 3. Component / function
export default function MyComponent({ value }) {
  // Hooks
  const navigate = useNavigate()

  // Derived values / handlers
  const handleClick = useCallback(() => navigate('/'), [navigate])

  // JSX
  return <button onClick={handleClick}>{value}</button>
}
```

### Naming

| Kind | Convention | Example |
|------|------------|---------|
| Components | PascalCase file/name | `SurahCard.jsx` |
| Hooks | camelCase with `use` | `useSurah.js` |
| Utilities | camelCase | `quranData.js` |
| Constants | UPPER_SNAKE_CASE | `APP_TITLE` |
| Booleans | `is`/`has` prefix | `isDarkMode` |
| Handlers | `handle` prefix | `handleSelect` |

### Imports

Use the configured aliases:

```javascript
// ✅
import useSurah from '@features/quran/hooks/useSurah'
import { APP_TITLE } from '@shared/utils/constants'

// ❌ deep relative traversal
import useSurah from '../../../features/quran/hooks/useSurah'
```

Aliases are declared in `vite.config.js`, `vitest.config.js`, and
`tsconfig.json`; keep them in sync.

### JSDoc

Add JSDoc to non-obvious functions and hook return shapes:

```javascript
/**
 * Filter surahs by search term.
 * @param {string} searchTerm
 * @returns {import('../data/quran').Surah[]}
 */
export function filterSurahs(searchTerm) {
  // ...
}
```

### React patterns

- Keep business logic in hooks and pure utilities
- Memoize expensive work (`useMemo`, `useCallback`, `React.memo`)
- Prefer native elements (`<button>`, `<a>`, `<audio>`) for accessibility
- Use the shared constants for UI text and layout classes
- Do not add global state unless it is genuinely cross-feature

### Styling

- Prefer Tailwind utilities in `className`
- Use the theme CSS variables (`--surface-*`, `--text-*`, `--border-*`) instead
  of hard-coded colors where possible
- Shared component utilities live in `@layer components` in
  `src/shared/styles/tailwind.css`
- Support both light and dark themes (`dark:` variants / variables)

---

## Project Structure

```
src/
├── app/          # Router, layout, error boundary
├── features/     # Feature slices (quran, search, theme, audio)
├── shared/       # Cross-feature components, hooks, utils, config, styles
└── types/        # TypeScript definitions
tests/            # Vitest suite mirroring source domains
docs/             # Documentation
scripts/          # Tooling (pnpm guard)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [map.md](./map.md).

---

## Testing

### Commands

```bash
pnpm test              # watch mode
pnpm test -- --run     # one-off run
pnpm test:ui           # interactive UI
pnpm test:coverage     # V8 coverage
```

### Guidelines

- Tests live in `tests/components`, `tests/hooks`, or `tests/utils`
- Test behavior, not implementation details
- Cover edge cases (empty search, invalid surah number, storage failures)
- Use Testing Library queries by role/label where possible
- Mock browser APIs (matchMedia, localStorage) rather than networking
- Keep tests deterministic

Example:

```javascript
import { describe, it, expect } from 'vitest'
import { filterSurahs } from '@features/quran/utils/quranData'

describe('filterSurahs', () => {
  it('filters by Arabic name', () => {
    const results = filterSurahs('الفاتحة')
    expect(results[0].surah_number).toBe(1)
  })

  it('is case-insensitive', () => {
    expect(filterSurahs('fatihah')).toEqual(filterSurahs('FATIHAH'))
  })
})
```

---

## Documentation

Update documentation when you change:

- User-visible behavior → `README.md` and/or `docs/`
- Architecture or data flow → `docs/ARCHITECTURE.md`
- Components or props → `docs/COMPONENTS.md`
- Setup/commands/aliases → `docs/SETUP.md`
- Deployment → `docs/DEPLOYMENT.md`
- Accessibility → `docs/ACCESSIBILITY.md`
- File layout → `docs/map.md`

Guidelines:

- Use clear language and working code examples
- Keep relative links valid
- Update related docs in the same PR
- Update the "Last Updated" date in the README when appropriate

---

## Accessibility Requirements

Every UI change should consider:

- [ ] Keyboard accessible
- [ ] Accessible name/role for controls
- [ ] Visible focus state
- [ ] Color contrast (light and dark)
- [ ] Touch target size
- [ ] No unexpected focus loss
- [ ] Screen-reader-friendly announcements for dynamic results

See [ACCESSIBILITY.md](./ACCESSIBILITY.md).

---

## Performance Requirements

- Avoid unnecessary re-renders (memoize cards, callbacks, derived data)
- Keep route-level code splitting intact
- Do not import the full surah dataset into unrelated features
- Avoid adding heavy dependencies for small features
- Check bundle output after dependency changes (`pnpm build`)
- Keep the search index cached rather than rebuilt per keystroke

---

## Git Workflow

### Keep your fork current

```bash
git remote add upstream https://github.com/HAMZAELMANZARI/Quran.git
git fetch upstream
git rebase upstream/main
git push --force-with-lease origin feature/your-feature
```

### Squash fixups

```bash
git rebase -i upstream/main
# mark fixup commits with "s" / "f"
```

---

## Releases

The project follows [Semantic Versioning](https://semver.org/).

1. Update the version in `package.json`
2. Update `README.md` / docs if needed
3. Commit the release
4. Tag it:
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```
5. Deploy:
   ```bash
   pnpm run deploy
   ```

---

## Getting Help

- Read [SETUP.md](./SETUP.md), [ARCHITECTURE.md](./ARCHITECTURE.md), and
  [COMPONENTS.md](./COMPONENTS.md)
- Search existing issues
- Open an issue with a minimal reproduction and environment details

---

## Recognition

Contributors are credited in release notes and the repository history. Thanks for
helping improve Quran Sound.

---

## Quick Reference

```bash
# Setup
git clone https://github.com/YOUR_USERNAME/Quran.git
cd Quran
pnpm install

# Develop
pnpm dev
pnpm lint
pnpm test -- --run
pnpm build

# Branch and commit
git checkout -b feature/description
git commit -m "feat: description"
git push origin feature/description
```

---

**Last Updated**: 2026-10-25
