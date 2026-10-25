import { useEffect } from 'react'

/**
 * Update the document title and meta description for the current route.
 *
 * This is a single-page app, so the title and description are set
 * imperatively rather than by the browser parsing a new HTML document.
 * The previous values are restored when the component unmounts.
 *
 * @param {string} [title] - Full document title (left unchanged if omitted)
 * @param {string} [description] - Meta description text (left unchanged if omitted)
 */
export function useDocumentMeta(title, description) {
    useEffect(() => {
        const previousTitle = document.title
        const meta = document.querySelector('meta[name="description"]')
        const previousDescription = meta?.getAttribute('content') ?? null

        if (title) {
            document.title = title
        }

        if (description && meta) {
            meta.setAttribute('content', description)
        }

        return () => {
            document.title = previousTitle
            if (description && meta && previousDescription !== null) {
                meta.setAttribute('content', previousDescription)
            }
        }
    }, [title, description])
}

export default useDocumentMeta
