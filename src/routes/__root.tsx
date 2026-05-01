import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <nav className="flex gap-4 border-b border-(--border) p-4">
        <Link to="/" activeProps={{ className: 'font-bold' }}>
          Home
        </Link>
        <Link to="/about" activeProps={{ className: 'font-bold' }}>
          About
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
