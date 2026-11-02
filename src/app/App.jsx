import Header from '@shared/components/Header'
import Footer from '@shared/components/Footer'
import SkipLink from '@shared/components/SkipLink'
import '@shared/styles/tailwind.css'
import '@shared/styles/normalize.css'

/**
 * @param {{ children: import('react').ReactNode }} props
 */
function App({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default App
