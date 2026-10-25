# Quran Sound - Deployment Guide

## Overview

Quran Sound is deployed to **GitHub Pages** at the `/Quran/` subdirectory. This guide covers the deployment process, configuration, and troubleshooting.

**Deployment URL**: `https://{username}.github.io/Quran/`

---

## Prerequisites

Before deploying, ensure:

- ✅ Local build succeeds: `pnpm build`
- ✅ Repository has GitHub Pages enabled
- ✅ Main branch is up to date
- ✅ All tests pass (when available)

---

## Quick Deploy

### One-Command Deployment

```bash
pnpm run deploy
```

This command:
1. Runs `pnpm build` to create production bundle
2. Pushes `dist/` folder to `gh-pages` branch
3. GitHub Pages automatically serves the content

**Time**: ~1-2 minutes

---

## GitHub Pages Configuration

### Repository Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages (left sidebar)
   - Source: Deploy from a branch
   - Branch: `gh-pages` (created automatically by `pnpm run deploy`)
   - Folder: `/ (root)`
   - Save

2. **Verify Base Path**:
   - Your site will be at: `https://{username}.github.io/Quran/`
   - Vite config must have: `base: "/Quran/"`
   - Already configured ✅

### Custom Domain (Optional)

If you want `https://yourdomain.com/`:

1. Add `CNAME` file to `public/CNAME`:
   ```
   yourdomain.com
   ```

2. Configure DNS records with your registrar

3. GitHub Pages will use your custom domain

---

## Deployment Process

### Local Deployment (Testing)

Test deployment locally before pushing to production:

```bash
# Build production version
pnpm build

# Preview production build locally
pnpm preview

# Opens http://localhost:5173/Quran/
```

Verify:
- ✅ All 114 surahs display
- ✅ Search filtering works
- ✅ Audio plays
- ✅ Navigation works
- ✅ Dark mode works
- ✅ No console errors

### Production Deployment

```bash
# Deploy to GitHub Pages
pnpm run deploy

# Monitor deployment (1-2 minutes)
# Check: https://{username}.github.io/Quran/
```

### Behind the Scenes

```bash
pnpm run deploy
  ├─ pnpm build
  │   └─ Creates dist/ folder with:
  │       ├─ index.html
  │       ├─ assets/main-*.js
  │       ├─ assets/main-*.css
  │       └─ assets/favicon.svg
  │
  └─ gh-pages -d dist
      └─ Pushes dist/ to gh-pages branch
          └─ GitHub Pages serves it
```

---

## Build Process Explained

### What `pnpm build` Does

```bash
pnpm build
```

Output:
```
vite v8.3.0 building client environment for production...
transforming...
✓ 34 modules transformed.
rendering chunks...
computing gzip size...

dist/index.html                         0.71 kB │ gzip:  0.44 kB
dist/assets/quran-sound-*.svg          10.06 kB │ gzip:  4.48 kB
dist/assets/main-*.css                 21.45 kB │ gzip:  5.37 kB
dist/assets/IndexPage-*.js              1.14 kB │ gzip:  0.62 kB
dist/assets/SurahPage-*.js              2.13 kB │ gzip:  0.96 kB
dist/assets/main-*.js                 247.56 kB │ gzip: 78.48 kB

✓ built in 215ms
```

### Optimization Steps

1. **Code Minification**: JavaScript compressed
2. **CSS Purging**: Unused Tailwind classes removed
3. **Tree Shaking**: Unused imports removed
4. **Code Splitting**: Routes split into separate chunks
5. **GZIP Compression**: Assets compressed (shown in output)

---

## Environment-Specific Configuration

### Development Environment

```env
# .env.local (user creates from .env.example)
VITE_DEBUG_MODE=true
VITE_ENABLE_ANALYTICS=false
VITE_AUDIO_CDN=https://dev-cdn.example.com
```

**Features**:
- Debug mode enabled (console logs)
- Analytics disabled
- Local/test URLs

### Production Environment

```env
# .env.local (production deployment)
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
VITE_AUDIO_CDN=https://pub-9ee413c8af4041c6bd5223d08f5d0f0f.r2.dev
```

**Features**:
- Debug mode disabled
- Analytics enabled
- Production CDN
- Production audio URLs

### Switching Environments

```bash
# Development
cp .env.development .env.local
pnpm dev

# Staging
cp .env.staging .env.local
pnpm build && pnpm preview

# Production
cp .env.production .env.local
pnpm run deploy
```

---

## Monitoring Deployment

### Check Deployment Status

1. **GitHub Actions** (if configured):
   - Go to repository Actions tab
   - Check workflow status
   - View build logs if failed

2. **GitHub Pages Status**:
   - Go to Settings → Pages
   - Check "Your site is live at..."
   - View deployment history

3. **Manual Verification**:
   ```bash
   # Check site is accessible
   curl https://{username}.github.io/Quran/
   
   # Should return HTML content
   ```

### View Deployment History

```bash
# See gh-pages branch history
git log --oneline gh-pages

# Latest deployments listed
```

---

## Rollback Procedures

### Rollback to Previous Version

If deployment has issues, revert:

```bash
# Option 1: Revert to previous commit
git revert HEAD
pnpm run deploy

# Option 2: Rebuild and redeploy
git checkout <previous-commit>
pnpm run deploy

# Option 3: Manual gh-pages branch revert
git checkout gh-pages
git log --oneline  # Find good commit
git reset --hard <commit-hash>
git push origin gh-pages --force-with-lease
```

**Time**: ~2 minutes

---

## Troubleshooting Deployment

### Issue: 404 Error After Deploy

**Problem**: Site shows 404 error

**Causes**:
- Base path mismatch (should be `/Quran/`)
- Assets not loading
- Build failed silently

**Solution**:
1. Check `vite.config.js`: `base: "/Quran/"`
2. Run `pnpm build` locally and verify output
3. Check browser console for errors
4. Redeploy: `pnpm run deploy`

### Issue: Styles Not Loading

**Problem**: Page loads but no CSS styling

**Causes**:
- CSS file not built
- Base path issue
- Cache problem

**Solution**:
```bash
# Clear browser cache
Ctrl+Shift+Delete (Windows/Linux)
Cmd+Shift+Delete (macOS)

# Verify build includes CSS
pnpm build
ls -la dist/assets/*.css

# Redeploy if missing
pnpm run deploy
```

### Issue: Assets Not Found (404)

**Problem**: Browser console shows 404 for .js or .css files

**Causes**:
- Asset paths incorrect
- Base path configuration missing

**Solution**:
1. Open browser DevTools (F12)
2. Check Network tab
3. Verify paths are correct (should start with `/Quran/`)
4. Check `vite.config.js` base path
5. Rebuild and redeploy

### Issue: Build Fails

**Problem**: `pnpm build` produces errors

**Causes**:
- Syntax errors in code
- Missing dependencies
- Configuration issues

**Solution**:
```bash
# Check for errors
pnpm build

# Verify dependencies
pnpm install

# Check syntax
pnpm lint

# Try again
pnpm build
```

### Issue: Blank Page

**Problem**: Site loads but shows nothing

**Causes**:
- React failed to mount
- JavaScript error
- Wrong base path

**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Verify `index.html` loads
5. Check `src/main.jsx` for mount errors

---

## GitHub Actions CI/CD (Future)

Automated deployment workflow:

```yaml
# .github/workflows/deploy.yml (example)
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

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
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test -- --run
      - run: pnpm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Benefits:
- ✅ Automatic deployment on push to main
- ✅ Runs tests before deploy
- ✅ Prevents broken code from deploying
- ✅ History of all deployments

---

## Performance Optimization

### Deployment Performance

Check Lighthouse scores:

1. **Build Production Version**:
   ```bash
   pnpm build
   pnpm preview
   ```

2. **Open Chrome DevTools**:
   - Press F12
   - Go to Lighthouse tab
   - Click "Analyze page load"

3. **Target Scores**:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 95+

### Performance Tips

**For Developers**:
- Keep bundle size small
- Use code splitting (already done)
- Memoize expensive computations (already done)
- Lazy load images (future)

**For Deployment**:
- Enable GZIP compression (GitHub Pages does this)
- Use CDN for audio files (already done)
- Cache assets with service workers (future)

---

## Security Checklist

Before deploying to production:

- [ ] No hardcoded secrets in code
- [ ] Environment variables for sensitive data
- [ ] `.env.local` is git-ignored
- [ ] HTTPS is enabled (GitHub Pages provides this)
- [ ] Content Security Policy headers configured
- [ ] No console.log() statements with sensitive data
- [ ] Validate all user input
- [ ] Use HTTPS for all API calls

---

## Deployment Checklist

Before running `pnpm run deploy`:

**Code Quality**:
- [ ] All tests pass: `pnpm test`
- [ ] No linting errors: `pnpm lint`
- [ ] Local build succeeds: `pnpm build`
- [ ] Production preview works: `pnpm preview`

**Functionality**:
- [ ] All 114 surahs display
- [ ] Search filtering works
- [ ] Audio player works
- [ ] Navigation works (back/forward buttons)
- [ ] Dark mode works
- [ ] No console errors
- [ ] Mobile responsive

**Environment**:
- [ ] `.env.local` has production config
- [ ] Analytics enabled (if applicable)
- [ ] Debug mode disabled
- [ ] Correct API URLs

**Documentation**:
- [ ] CHANGELOG.md updated
- [ ] Version number updated
- [ ] README.md updated if needed

**Final**:
- [ ] All files committed to git
- [ ] Main branch is up to date
- [ ] No uncommitted changes

---

## Deployment Timeline

| Task | Duration | Notes |
|------|----------|-------|
| Local build | 30 sec | `pnpm build` |
| Local preview | 1 min | `pnpm preview` |
| Manual testing | 5 min | Verify all features |
| Deploy | 1-2 min | `pnpm run deploy` |
| GitHub Pages update | 30 sec | Automatic |
| Total | ~8-10 min | End to end |

---

## Monitoring Live Site

### Daily Checks

```bash
# Check site is accessible
curl -I https://{username}.github.io/Quran/

# Should return:
# HTTP/2 200
# Content-Type: text/html
```

### Weekly Checks

- Monitor error reports (if applicable)
- Check Lighthouse scores
- Test all features in browser
- Check analytics (if enabled)

### Monthly Checks

- Review deployment history
- Audit security
- Update dependencies
- Check performance metrics

---

## Related Documentation

- **[SETUP.md](./SETUP.md)** - Development environment
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[COMPONENTS.md](./COMPONENTS.md)** - Component reference
- **[README.md](../README.md)** - Project overview

---

## Quick Reference

```bash
# Common commands
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm lint             # Check code quality
pnpm test             # Run tests
pnpm run deploy       # Deploy to GitHub Pages

# Check deployment
https://{username}.github.io/Quran/

# Rollback
git checkout gh-pages
git log --oneline
git reset --hard <commit>
git push origin gh-pages --force-with-lease

# Monitor
- GitHub Actions tab (if configured)
- Settings → Pages (deployment status)
- Lighthouse scores in DevTools
```

---

## Summary

**Deployment Process**:
1. ✅ Make changes locally
2. ✅ Run tests and build locally
3. ✅ Commit to main branch
4. ✅ Run `pnpm run deploy`
5. ✅ Monitor site at `https://{username}.github.io/Quran/`

**Time Required**: ~10 minutes total

**Rollback Time**: ~2 minutes if needed
