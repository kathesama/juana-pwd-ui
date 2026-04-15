import { Link } from 'react-router-dom'

import { ROUTES } from '@router/routes'

export const HomePage = () => (
  <main className="min-h-full text-juana-text-primary">
    <section className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-6 px-6 py-16">
      <span className="font-mono text-sm uppercase tracking-[0.24em] text-juana-gold-400">Juana PWD UI</span>
      <div className="space-y-4">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Clean React foundation for the Juana progressive web app.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Tailwind, Storybook, Vitest, PWA support, MSW, routing, store wiring, and typed aliases are ready.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to={ROUTES.LOGIN} className="btn-primary">
          Open login stub
        </Link>
        <a
          href="/storybook"
          className="btn-secondary"
        >
          Storybook script ready
        </a>
      </div>
    </section>
  </main>
)
