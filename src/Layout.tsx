import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { useScrollExperience } from './hooks/useScrollExperience'

// Shared chrome for every page: Nav + Footer + the scroll experience. The
// routed page renders into <Outlet />.
export function Layout() {
  const { pathname } = useLocation()
  useScrollExperience(pathname)

  return (
    <>
      {/* Skip link for keyboard users — visible only when focused. */}
      <a
        href="#main"
        className="sr-only z-[100] rounded-sm border border-brass bg-ink px-4 py-2 font-body text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative z-10">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
