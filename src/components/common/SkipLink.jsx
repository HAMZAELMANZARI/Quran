/**
 * Skip to main content link.
 * Visually hidden until focused via keyboard, then slides into view.
 * Targets the #main-content element rendered by each page.
 */
export default function SkipLink() {
    return (
        <a
            href="#main-content"
            className="sr-only rounded-lg bg-(--surface-3) px-4 py-2 text-(--text-primary) shadow-lg focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50"
        >
            تخطَّ إلى المحتوى الرئيسي
        </a>
    )
}
