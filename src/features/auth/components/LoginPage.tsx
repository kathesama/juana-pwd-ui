import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@common/hooks'
import { ROUTES } from '@router/routes'

import { devAuthEnabled, devAuthUser } from '../config/devAuth'
import { sessionLoaded } from '../store/authSlice'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)

  const handleLogin = () => {
    if (import.meta.env.DEV && devAuthEnabled) {
      dispatch(
        sessionLoaded({
          authenticated: true,
          user: devAuthUser,
          csrf_token: 'dev-csrf-token',
        }),
      )
      void navigate(ROUTES.CHAT, { replace: true })
      return
    }

    window.location.href = '/auth/login'
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-juana-bg text-sm text-juana-text-muted">
        Loading session...
      </main>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.CHAT} replace />
  }

  return (
    <main className="juana-grid relative flex min-h-full items-center justify-center overflow-hidden bg-juana-bg px-6 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-juana-gold/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-juana-purple/25 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.9fr]">
        <section className="juana-card flex min-h-[26rem] flex-col justify-between overflow-hidden p-8 lg:p-10">
          <div className="space-y-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-juana-border bg-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-juana-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Juana PWA
            </div>
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-juana-text-muted">Progressive workspace</p>
              <h1 className="max-w-xl font-mono text-4xl leading-tight text-juana-text-primary sm:text-5xl">
                An opinionated frontend foundation for the next Juana interface.
              </h1>
              <p className="max-w-lg text-base leading-7 text-juana-text-muted">
                Authentication, routing, mocks, Storybook, testing, PWA support and typed state are already wired.
                This screen is now a deliberate starting point instead of a blank scaffold.
              </p>
            </div>
          </div>

          <div className="grid gap-4 pt-8 sm:grid-cols-3">
            {[
              ['PWA ready', 'Installable shell with service worker and manifest.'],
              ['MSW active', 'Mock auth and chat endpoints in local development.'],
              ['Typed stack', 'Router, RTK Query, linting and tests aligned.'],
            ].map(([title, description]) => (
              <article key={title} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-juana-text-primary">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-juana-text-muted">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="juana-card relative overflow-hidden p-8 lg:p-10">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-juana-purple-light/60 to-transparent" />
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-juana-text-muted">
              <ShieldCheck className="h-4 w-4 text-juana-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.28em]">Authentication</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-juana-text-primary">Iniciar sesion</h2>
              <p className="text-sm leading-7 text-juana-text-muted">
                En desarrollo, el acceso puede resolverse con una sesion mock configurable por variables de entorno.
                En produccion, este boton puede apuntar al gateway real.
              </p>
            </div>

            <div className="rounded-2xl border border-juana-border bg-black/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-juana-text-muted">
                    Current mode
                  </p>
                  <p className="mt-2 text-lg font-medium text-juana-text-primary">
                    {import.meta.env.DEV && devAuthEnabled ? 'Development bootstrap' : 'External auth'}
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  {import.meta.env.DEV && devAuthEnabled ? 'Ready' : 'Gateway'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="group inline-flex w-full items-center justify-between rounded-2xl bg-juana-purple px-5 py-4 text-sm font-medium text-white transition duration-200 hover:bg-juana-purple-light hover:text-juana-purple-dark"
            >
              <span>Continuar al workspace</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>

            <p className="text-xs leading-6 text-juana-text-muted">
              Configuralo con VITE_DEV_AUTH_ENABLED, VITE_DEV_AUTH_USERNAME y VITE_DEV_AUTH_ROLES.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
