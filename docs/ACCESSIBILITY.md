# Quran Sound - Accessibility Guidelines

## Overview

Quran Sound aims for **WCAG 2.1 Level AA** compliance. This document describes
the implemented patterns, how to test them, and the compliance matrix.

---

## Implemented Features

### 1. Semantic HTML

```html
<header>  <!-- branding, search, theme toggle -->
<main id="main-content">  <!-- route content -->
<nav aria-label="التنقل بين السور">  <!-- surah navigation -->
<footer>  <!-- links and copyright -->
```

Screen readers can navigate by landmark, and the document has one `<h1>` per page.

### 2. ARIA Labels and Roles

- Search form: `role="search"` with a visually hidden label and an accessible
  name on the input
- Theme toggle: `aria-pressed` plus a state-aware `aria-label`
- Surah cards: `aria-label="استمع إلى سورة {name} ({englishName})"`
- Surah navigation: `<nav aria-label>` with descriptive buttons
- Search results: a visually hidden `role="status"` live region announces the
  result count or the no-results state

```jsx
<p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {count === 0 ? LABELS.NO_RESULTS : `عدد النتائج: ${count}`}
</p>
```

### 3. Keyboard Navigation

- Every interactive element is a native `<button>` or `<a>`
- Tab/Shift+Tab move through the header, cards, navigation, and footer
- Enter/Space activate buttons
- The skip link is the first focusable element
- No keyboard traps are implemented or required
- Focus indicators use `focus-visible` styles

### 4. Focus Management

- **Skip link** — visually hidden until focused, then appears at the top
- **Surah navigation** — `SurahPage` focuses the `<h1>` whenever `:number`
  changes, so keyboard/screen-reader users start at the new content
- **Visible focus** — buttons and links use `focus-visible:outline-*` or rings

```javascript
useEffect(() => {
  headingRef.current?.focus()
}, [number])
```

```jsx
<h1 ref={headingRef} tabIndex={-1}>...</h1>
```

### 5. Color Contrast

Theme variables are defined in `src/shared/styles/tailwind.css`.

**Light theme**

- Primary text `#1e2d28` on surface `#f5f2ed` — high contrast
- Muted text `#6b625b` on surfaces — meets 4.5:1 for normal text

**Dark theme**

- Primary text `#d1fae5` on `#0f172a`
- Muted text `#cbd5e1` on dark surfaces
- `color-scheme: dark` is set so native controls match

Verify changes with a contrast analyzer before merging.

### 6. Dark Mode

- `useDarkMode` reads a saved preference, then the system preference
- The `dark` class on `<html>` switches CSS variables
- The toggle exposes `aria-pressed` and a descriptive label
- Preference persists in localStorage; failure to save does not break the toggle

### 7. Arabic RTL Support

```html
<html lang="ar" dir="rtl">
```

- Layout, spacing, and chevron direction are RTL-aware
- `rtl:` utilities are used where needed (for example Footer spacing)
- Numbers use the `.num` badge styling and appropriate direction handling

### 8. Readability and Zoom

- Base text is readable at default browser size
- Responsive type scales with breakpoints
- The viewport meta allows pinch-to-zoom:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```
- Layout reflows at 200% zoom without loss of function

### 9. Touch Targets

- Buttons use padding that aims for 44×44px minimum
- The theme toggle is `h-9 w-9` (36px) with surrounding spacing; verify on mobile
  when changing the header layout
- Surah cards are large grid targets

### 10. Error Handling

`ErrorBoundary` provides:

- A clear Arabic heading and English explanation
- The error text (and a stack trace in development only)
- A reload button
- A link to report the issue

---

## Testing

### Automated tools

| Tool | How to use | Target |
|------|------------|--------|
| **Lighthouse** | DevTools → Lighthouse → Analyze page load | Accessibility 95+ |
| **axe DevTools** | Browser extension → Scan page | 0 critical issues |
| **WAVE** | wave.webaim.org | Review errors/contrast |
| **Color Contrast Analyzer** | TPGI tool | 4.5:1 normal text, 3:1 large |

Run Lighthouse against the production preview:

```bash
pnpm build
pnpm preview
```

### Keyboard checklist

- [ ] Tab moves forward; Shift+Tab moves backward
- [ ] Focus is always visible
- [ ] Focus order matches visual order
- [ ] Skip link appears on first Tab and jumps to `#main-content`
- [ ] Enter and Space activate buttons
- [ ] No keyboard traps
- [ ] Surah navigation moves focus to the new heading

### Screen reader checklist

Test with NVDA (Windows), VoiceOver (macOS/iOS), or TalkBack (Android).

- [ ] Page landmarks are announced
- [ ] Search input has a name and a visible/hidden label
- [ ] Result count changes are announced
- [ ] Each surah card announces its name/metadata
- [ ] Audio controls are usable
- [ ] Heading hierarchy is logical
- [ ] Changing surahs announces the new heading

### Zoom and mobile checklist

- [ ] Readable and functional at 200% zoom
- [ ] No horizontal scrolling at 200% zoom
- [ ] Touch targets are easy to hit
- [ ] Portrait and landscape both work
- [ ] Pinch-to-zoom works
- [ ] Screen reader works on mobile

---

## Patterns Used

### Semantic landmarks

```jsx
<header>...</header>
<main id="main-content">...</main>
<nav aria-label="...">...</nav>
<footer>...</footer>
```

### Descriptive labels

```jsx
<button aria-label="استمع إلى سورة الفاتحة (Al-Fatihah)">...</button>

<button aria-pressed={isDarkMode} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
  ...
</button>
```

### Form labeling

```jsx
<form role="search" onSubmit={(event) => event.preventDefault()}>
  <label className="relative block">
    <span className="sr-only">Search surahs</span>
    <input type="search" aria-label="Search surahs by name or number" />
  </label>
</form>
```

### Live regions

```jsx
<p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  عدد النتائج: 12
</p>
```

### Skip link

```jsx
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  تخطَّ إلى المحتوى الرئيسي
</a>
```

### Heading hierarchy

```jsx
<h1>{LABELS.SURAH_INDEX}</h1>       // one per page
// Cards use text, not additional headings
```

---

## Component Accessibility Notes

### Header

- Search form is a landmark (`role="search"`)
- Input has an `aria-label` and a hidden `<span>` label
- Theme toggle has `aria-pressed` and a state-aware label
- Icons are `aria-hidden="true"`

### IndexPage

- `<main id="main-content" tabIndex={-1}>` for the skip link target
- Live region for search result counts
- Cards are native buttons in a grid
- Empty state is plain text inside the grid

### SurahCard

- Native `<button>` with a descriptive `aria-label`
- Nearby text (number, names, metadata) is readable by screen readers
- Hover/focus states are visible

### SurahPage

- One `<h1>`; focused on route change
- Native `<audio controls>` for playback
- Navigation buttons include the destination surah name
- Invalid numbers render a clear not-found state with a back button

### Footer

- Links have visible text (no icon-only links)
- External links are normal anchors; add `rel="noopener noreferrer"` if you open
  them in a new tab

---

## WCAG 2.1 Compliance Matrix

| Guideline | Level | Status | Notes |
|-----------|-------|--------|-------|
| Non-text content / images | A | ✅ | Logo has alt text |
| Audio-only content | A | ⏳ | Recitation audio has no transcript/captions |
| Info and relationships | A | ✅ | Semantic landmarks and headings |
| Meaningful sequence | A | ✅ | DOM order matches visual order |
| Sensory characteristics | A | ✅ | No reliance on color/shape alone |
| Keyboard | A | ✅ | All controls are native focusable elements |
| No keyboard trap | A | ✅ | No traps |
| Bypass blocks | A | ✅ | Skip link |
| Page titled | A | ✅ | `useDocumentMeta` sets title |
| Focus order | A | ✅ | Matches visual order |
| Link purpose | A | ✅ | Descriptive link text |
| Language of page | A | ✅ | `lang="ar"` |
| On focus / on input | A | ✅ | No unexpected context changes |
| Error identification | A | ✅ | Not-found and error screens |
| Name, role, value | A | ✅ | Native controls + ARIA where needed |
| Contrast (minimum) | AA | ✅ | Theme variables meet 4.5:1 (verify changes) |
| Resize text | AA | ✅ | Works at 200% zoom |
| Reflow | AA | ✅ | Responsive layout |
| Focus visible | AA | ✅ | `focus-visible` styles |
| Pointer gestures | A | ✅ | No complex gestures |
| Motion | AAA | ⏳ | No reduced-motion media query yet |
| Audio description | AAA | ⏳ | Not applicable to recitation-only audio |

---

## Future Improvements

- [ ] Add `prefers-reduced-motion` support for transitions
- [ ] Add a high-contrast mode
- [ ] Provide transcript/caption options for audio
- [ ] Allow customizable font size
- [ ] Improve result-count announcement copy in both languages
- [ ] Audit 36px controls (theme toggle) against the 44px target
- [ ] Add automated axe checks to CI

---

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [NVDA](https://www.nvaccess.org/), [VoiceOver](https://www.apple.com/voiceover/),
  [TalkBack](https://support.google.com/accessibility/android/answer/6283677)

---

## Reporting Issues

Found an accessibility issue? Open an issue:
<https://github.com/HAMZAELMANZARI/Quran/issues>

Include the page/route, the assistive technology used, steps to reproduce, and
the expected behavior.

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design
- **[COMPONENTS.md](./COMPONENTS.md)** — Component API
- **[SETUP.md](./SETUP.md)** — Development environment
- **[map.md](./map.md)** — Repository file map
- **[README.md](../README.md)** — Project overview
