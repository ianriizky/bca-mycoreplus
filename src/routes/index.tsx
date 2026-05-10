import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className="flex grow flex-col items-center justify-center gap-6.25 max-lg:gap-4.5 max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/routes/index.tsx</code> and save to test{' '}
            <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="mb-6 rounded-[5px] border-2 border-transparent bg-(--accent-bg) px-2.5 py-1.25 font-mono text-base text-(--accent) transition-[border-color] duration-300 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section className="flex border-t border-(--border) text-left max-lg:flex-col max-lg:text-center">
        <div className="flex-1 border-r border-(--border) p-8 max-lg:border-r-0 max-lg:border-b max-lg:px-5 max-lg:py-6">
          <svg className="mb-4 size-5.5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul className="mt-8 flex list-none gap-2 p-0 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://vite.dev/"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <img className="h-4.5" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <img className="size-4.5" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8 max-lg:px-5 max-lg:py-6" id="social">
          <svg className="mb-4 size-5.5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul className="mt-8 flex list-none gap-2 p-0 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <svg
                  className="size-4.5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://chat.vite.dev/"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <svg
                  className="size-4.5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://x.com/vite_js"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <svg
                  className="size-4.5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li className="max-lg:box-border max-lg:flex-[1_1_calc(50%-8px)]">
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-md bg-(--social-bg) px-3 py-1.5 text-base text-(--text-h) no-underline transition-shadow duration-300 hover:shadow-(--shadow) max-lg:w-full max-lg:justify-center"
              >
                <svg
                  className="size-4.5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section className="h-22 border-t border-(--border) max-lg:h-12"></section>
    </>
  )
}
