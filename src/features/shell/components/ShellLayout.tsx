import { BrainCircuit, DatabaseZap, Home, Settings, Shield, Sparkles } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@common/hooks'
import { useLogoutMutation } from '@features/auth/store/authApi'
import { sessionCleared } from '@features/auth/store/authSlice'
import { ROUTES } from '@router/routes'

const navigation = [
  { label: 'Chat', to: ROUTES.CHAT, icon: Home },
  { label: 'Knowledge', to: ROUTES.KNOWLEDGE, icon: BrainCircuit },
  { label: 'Memory', to: ROUTES.MEMORY, icon: DatabaseZap },
  { label: 'Settings', to: ROUTES.SETTINGS, icon: Settings },
  { label: 'Admin', to: ROUTES.ADMIN, icon: Shield },
]

export const ShellLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } finally {
      dispatch(sessionCleared())
      void navigate(ROUTES.LOGIN, { replace: true })
    }
  }

  return (
    <div className="min-h-full bg-juana-bg px-4 py-4 text-juana-text-primary md:px-5">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="juana-card relative overflow-hidden p-5 lg:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-juana-gold/80 to-transparent" />
          <div className="flex h-full flex-col gap-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-juana-border bg-black/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-juana-gold">
                <Sparkles className="h-3.5 w-3.5" />
                Juana
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-juana-text-muted">Workspace</p>
                <h1 className="font-mono text-2xl leading-tight">Progressive interface shell</h1>
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'flex items-center justify-between rounded-2xl border px-4 py-3 transition',
                      isActive
                        ? 'border-juana-purple-light/70 bg-juana-purple/20 text-white'
                        : 'border-transparent bg-black/10 text-juana-text-muted hover:border-juana-border hover:bg-white/5 hover:text-juana-text-primary',
                    ].join(' ')
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{label}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Open</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl border border-juana-border bg-black/20 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-juana-text-muted">Current user</p>
              <p className="mt-3 text-base font-semibold text-juana-text-primary">
                {user?.username ?? user?.user_id ?? 'anonymous'}
              </p>
              <p className="mt-1 text-sm text-juana-text-muted">
                {(user?.roles ?? []).join(' / ') || 'No roles loaded'}
              </p>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-juana-border bg-white/5 px-4 py-2 text-sm font-medium text-juana-text-primary transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? 'Closing session...' : 'Cerrar sesion'}
              </button>
            </div>
          </div>
        </aside>

        <section className="juana-card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-juana-purple-light/80 to-transparent" />
          <Outlet />
        </section>
      </div>
    </div>
  )
}
