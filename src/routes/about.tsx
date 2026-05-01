import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="p-8 text-center">
      <h1>About Page</h1>
      <p>This is a new page created with TanStack Router file-based routing.</p>
      <Link to="/" className="text-[#646cff] underline">
        Back to Home
      </Link>
    </div>
  )
}
