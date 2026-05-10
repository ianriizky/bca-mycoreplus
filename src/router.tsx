import { createRouter, createHashHistory, Link } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
  basepath: import.meta.env.VITE_BASE_PATH || '/',
  defaultNotFoundComponent: () => (
    <div>
      <p>Not found!</p>
      <Link to="/">Go home</Link>
    </div>
  ),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
