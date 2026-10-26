# Quran Sound - Deployment Guide

## Overview

Quran Sound deploys to **GitHub Pages** at the `/Quran/` subdirectory.

**Deployment URL**: `https://{username}.github.io/Quran/`

The build is produced by Vite (`pnpm build`) and published with `gh-pages`
(`pnpm run deploy`).

---

## Prerequisites

Before deploying:

- Local build succeeds (`pnpm build`)
- Tests and lint pass (`pnpm test -- --run`, `pnpm lint`)
- The repository has GitHub Pages available
- The default branch is up to date
- Node.js `>=22.12.0` and pnpm `>=12.0.0` are installed

---

## Quick Deploy

```bash
pnpm run deploy
```

This runs the `predeploy` script first:

1. `pnpm run build` → creates `dist/`
2. `gh-pages -d dist` → pushes `dist/` to the `gh-pages` branch
3. GitHub Pages serves the new commit

Typical duration: 1–2 minutes (plus GitHub Pages propagation).

---

## GitHub Pages Configuration

### Repository setup

1. Open **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages`, folder `/ (root)`
4. Save

### Base path

The site is served from a subdirectory, so two settings must stay aligned:

- `vite.config.js` → `base: "/Quran/"`
- `src/app/AppRouter.jsx` → `<BrowserRouter basename="/Quran/">`

If the repository name changes, update both values.

### Custom domain (optional)

1. Add `public/CNAME` containing your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS with your registrar
3. Rebuild and redeploy

---

## Deployment Process

### 1. Verify locally

```bash
pnpm lint
pnpm test -- --run
pnpm build
pnpm preview
```

`pnpm preview` serves the production bundle at the configured
`http://localhost:4173/Quran/` (Vite's default preview port).

Verify:

- The Itqan API request succeeds and all 114 surahs render
- Search filters by Arabic name, English name, number, and revelation place
- Audio plays from the URL returned by the API
- Previous/next navigation and back button work
- Dark mode persists across reloads
- No console errors

### 2. Deploy

```bash
pnpm run deploy
```

### 3. Confirm

Open `https://{username}.github.io/Quran/` and re-check the same list.

### What happens behind the scenes

```
pnpm run deploy
├─ predeploy: pnpm run build
│   └─ dist/
│       ├─ index.html
│       ├─ favicon.svg
│       └─ assets/
│           ├─ main-*.js
│           ├─ main-*.css
│           ├─ IndexPage-*.js
│           └─ SurahPage-*.js
└─ gh-pages -d dist
    └─ pushes dist/ to the gh-pages branch
```

Only `index.html` is a Rollup entry. `surha.html` at the repository root is a
legacy standalone shell and is **not** included in the build.

---

## Build Details

### Command

```bash
pnpm build
```

### Optimization performed by Vite/Tailwind

| Optimization | Effect |
|--------------|--------|
| Minification | JS/CSS compressed |
| Tree shaking | Unused imports removed |
| Route splitting | `IndexPage` and `SurahPage` become separate chunks |
| CSS purging | Only used Tailwind utilities are emitted |
| Asset hashing | Long-term caching via hashed filenames |
| GZIP | GitHub Pages serves compressed assets |

Exact sizes vary by dependency and code changes; check the Vite build output
rather than relying on fixed numbers.

---

## Environment-Specific Configuration

Vite loads `.env`, `.env.local`, and mode-specific files. `.env.local` is
git-ignored and intended for machine-specific values.

### Development

```env
VITE_API_BASE_URL=https://api.cms.itqan.dev
VITE_ITQAN_RECITATION_ID=28
VITE_DEBUG_MODE=true
VITE_ENABLE_ANALYTICS=false
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
```

### Production

```env
VITE_API_BASE_URL=https://api.cms.itqan.dev
VITE_ITQAN_RECITATION_ID=28
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=false
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
```

> `pnpm run deploy` reads the environment available in the shell where it runs.
> If you need different deployment values, create the appropriate env file (or
> export the variables) before building.

### Switching environments

```bash
# Development
pnpm dev

# Staging/preview
pnpm build
pnpm preview

# Production
pnpm run deploy
```

---

## Monitoring

### Check deployment status

1. **Settings → Pages** — shows the live URL and deployment history
2. **Actions** — workflow runs, if you add a CI workflow
3. **Manual check**:

```bash
curl -I https://{username}.github.io/Quran/
# HTTP/2 200
# content-type: text/html
```

### Inspect the published branch

```bash
git log --oneline gh-pages
```

---

## Rollback

### Option 1 — Revert the source commit and redeploy

```bash
git revert HEAD
pnpm run deploy
```

### Option 2 — Rebuild from a known-good commit

```bash
git checkout <good-commit>
pnpm install
pnpm run deploy
```

### Option 3 — Reset the `gh-pages` branch

```bash
git checkout gh-pages
git log --oneline          # find a good commit
git reset --hard <commit>
git push origin gh-pages --force-with-lease
```

Rollback time: ~2 minutes.

---

## Troubleshooting

### 404 after deploy

**Causes**: wrong base path, missing assets, or a failed build.

1. Confirm `base: "/Quran/"` in `vite.config.js`
2. Confirm `basename="/Quran/"` in `AppRouter.jsx`
3. Run `pnpm build` locally and inspect `dist/`
4. Check the browser console/Network tab
5. Redeploy

### Styles missing

```bash
pnpm build
ls dist/assets/*.css
```

If no CSS is emitted, check that `tailwind.css` is imported (it is imported by
`main.jsx` and `App.jsx`). Clear the browser cache and redeploy.

### Assets 404

- Asset URLs should start with `/Quran/`
- Verify the base path and repository name match
- Check that `dist/` was published, not the repository root

### Build fails

```bash
pnpm install
pnpm lint
pnpm test -- --run
pnpm build
```

Common causes: syntax errors, missing imports, or an alias that exists in one
config but not the other. Keep `vite.config.js`, `vitest.config.js`, and
`tsconfig.json` aliases in sync.

### Blank page

1. Open DevTools → Console
2. Look for a failed module or React render error
3. Confirm `index.html` loads `main.jsx`
4. Confirm `ErrorBoundary`/`AppRouter` mount without errors

### Routing 404 on refresh

GitHub Pages has no SPA fallback by default. In-app navigation works, but a hard
refresh on `/Quran/surah/2` can 404. Options:

- Keep the hash-free routing and add a `404.html` redirect copy of
  `index.html`, or
- Switch to `HashRouter`, or
- Use a host with SPA rewrites

If you add `404.html`, document the approach here and in the build step.

---

## Optional GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 12.11.2
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test -- --run
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Benefits: automatic deploys, tests before publishing, and a deployment history.

---

## Performance

### Lighthouse

1. `pnpm build && pnpm preview`
2. Open Chrome DevTools → Lighthouse
3. Analyze the production preview
4. Target: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+

### Tips

- Keep route chunks small
- Keep the Itqan API response as the single source of truth
- Keep the API request to one paginated call and validate 114 surahs
- Load audio from the returned URL on demand
- Avoid adding large runtime dependencies
- Re-check bundle output after dependency changes

---

## Security Checklist

- [ ] No secrets committed (only `VITE_*` public values)
- [ ] `.env.local` and `.env.*.local` are git-ignored
- [ ] HTTPS is provided by GitHub Pages
- [ ] External links use `rel="noopener noreferrer"` where applicable
- [ ] No sensitive data in `console.log`
- [ ] User input is only used for client-side filtering
- [ ] `api.cms.itqan.dev` and `storage.cms.itqan.dev` are trusted origins
- [ ] No Itqan API key is bundled; the app only uses public reads

---

## Deployment Checklist

**Code quality**

- [ ] `pnpm lint` passes
- [ ] `pnpm test -- --run` passes
- [ ] `pnpm build` succeeds
- [ ] `pnpm preview` works

**Functionality**

- [ ] Itqan API request succeeds and all 114 surahs display
- [ ] Loading, error, and retry states behave correctly
- [ ] Search and empty state work
- [ ] Audio plays from the API-provided URL
- [ ] Previous/next/back navigation works
- [ ] Dark mode persists
- [ ] Keyboard navigation and skip link work
- [ ] No console errors
- [ ] Mobile layout is responsive

**Configuration**

- [ ] `base` and `basename` still match the repository path
- [ ] `VITE_API_BASE_URL` points to `https://api.cms.itqan.dev`
- [ ] `VITE_ITQAN_RECITATION_ID` is the intended recitation (`28` by default)
- [ ] Audio URLs resolve and play
- [ ] Debug mode disabled in production
- [ ] Version number updated if releasing

**Final**

- [ ] Changes committed and pushed
- [ ] `pnpm run deploy` completed
- [ ] Live URL verified

---

## Timeline

| Task | Duration |
|------|----------|
| Local build | ~30 sec |
| Local preview/manual QA | ~5 min |
| Deploy | 1–2 min |
| GitHub Pages propagation | ~30 sec |
| **Total** | **~8–10 min** |

---

## Related Documentation

- **[SETUP.md](./SETUP.md)** — Development environment
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design
- **[COMPONENTS.md](./COMPONENTS.md)** — Component reference
- **[map.md](./map.md)** — Repository file map
- **[README.md](../README.md)** — Project overview
