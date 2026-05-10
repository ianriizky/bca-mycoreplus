import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <nav
        className="flex gap-4 border-b border-(--border) p-4"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          activeProps={{ className: 'font-bold' }}
          aria-label="Home page"
        >
          Home
        </Link>
        <Link
          to="/counter"
          activeProps={{ className: 'font-bold' }}
          aria-label="Counter page"
        >
          Counter
        </Link>
        <Link
          to="/editor"
          activeProps={{ className: 'font-bold' }}
          aria-label="Image editor"
        >
          Editor
        </Link>
        <Link
          to="/help"
          activeProps={{ className: 'font-bold' }}
          aria-label="Help and keyboard shortcuts"
        >
          Help
        </Link>
        <Link
          to="/about"
          activeProps={{ className: 'font-bold' }}
          aria-label="About page"
        >
          About
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
