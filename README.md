# Quran Sound

Quran Sound is a responsive, Arabic right-to-left web app for browsing and listening to Quran recitations. The surah index shows each surah's Arabic and English names, revelation place, and ayah count.

## Features

- Browse the Quran's surahs in a responsive index.
- Search by surah name, number, or revelation place.
- Open a surah's recitation from its listing.
- Switch between light and dark themes. The theme follows the system preference until you choose one, then saves your choice in local storage.
- Use the Arabic RTL interface on desktop and mobile screens.

## Requirements

- Node.js supported by Vite 8.
- pnpm.

## Getting started

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite in your terminal.

## Available commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm build` | Build the production site into `dist/`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm lint` | Run ESLint. |
| `pnpm deploy` | Build and publish `dist/` with `gh-pages`. |

## Project structure

- `src/pages/` — React app, header, and surah index.
- `src/componants/useDarkMode.jsx` — theme preference and toggle.
- `src/API/Data.js` — local surah metadata and recitation audio URLs.
- `src/css/` — application styles and CSS reset.
- `public/` — static public assets.

Surah metadata is bundled with the app; recitation audio is loaded from the URLs in `src/API/Data.js`.
