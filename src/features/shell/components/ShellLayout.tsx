import { BrainCircuit, DatabaseZap, Home, Settings, Shield, Sparkles } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

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

const routeTitles: Record<string, { title: string; eyebrow: string }> = {
  [ROUTES.CHAT]: { title: 'Chat workspace', eyebrow: 'Conversation' },
  [ROUTES.KNOWLEDGE]: { title: 'Knowledge', eyebrow: 'Context' },
  [ROUTES.MEMORY]: { title: 'Memory', eyebrow: 'Continuity' },
  [ROUTES.SETTINGS]: { title: 'Settings', eyebrow: 'Configuration' },
  [ROUTES.ADMIN]: { title: 'Admin', eyebrow: 'Operations' },
  [ROUTES.PROFILE]: { title: 'Profile', eyebrow: 'Identity' },
}

export const ShellLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector((state) => state.auth.user)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const currentRoute = routeTitles[location.pathname] ?? { title: 'Workspace', eyebrow: 'JuanaIA' }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } finally {
      dispatch(sessionCleared())
      void navigate(ROUTES.LOGIN, { replace: true })
    }
  }

  return (
    <div className="min-h-full px-4 py-4 text-white md:px-5">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col overflow-hidden rounded-3xl border-r border-juana-surface-600 bg-juana-surface-800">
          <div className="flex h-full flex-col gap-8 px-4 py-5 lg:px-5 lg:py-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-juana-gold-400">
                <Sparkles className="h-3.5 w-3.5" />
                Juana
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400">Workspace</p>
                <h1 className="text-xl font-semibold leading-tight text-white">Progressive interface shell</h1>
              </div>
            </div>

            <nav className="space-y-1.5">
              {navigation.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'flex cursor-pointer items-center justify-between gap-3 rounded-r-xl border-l-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'border-l-juana-purple-500 bg-juana-purple-500/15 text-juana-purple-300'
                        : 'border-l-transparent text-zinc-400 hover:bg-white/5 hover:text-white',
                    ].join(' ')
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">Open</span>
                </NavLink>
              ))}
            </nav>

            <div className="juana-panel mt-auto p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">Current user</p>
              <p className="mt-3 text-base font-semibold text-white">
                {user?.username ?? user?.user_id ?? 'anonymous'}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {(user?.roles ?? []).join(' / ') || 'No roles loaded'}
              </p>
              <button
                type="button"
                onClick={() => void handleLogout()}
                disabled={isLoggingOut}
                className="btn-secondary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? 'Closing session...' : 'Cerrar sesion'}
              </button>
            </div>
          </div>
        </aside>

        <section className="juana-card flex min-h-0 flex-col overflow-hidden">
          <header className="flex items-center justify-between gap-4 border-b border-juana-surface-600 bg-juana-surface-800/80 px-5 py-4 backdrop-blur-md">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">{currentRoute.eyebrow}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{currentRoute.title}</h2>
            </div>
            <div className="rounded-full border border-juana-purple-500/30 bg-juana-purple-500/10 px-3 py-1 text-xs font-medium text-juana-purple-300">
              AI-native shell
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-auto">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  )
}
