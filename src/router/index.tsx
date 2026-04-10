import { lazy, Suspense } from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { ShellLayout } from '@features/shell/components/ShellLayout'

import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './routes'

const LoginPage = lazy(() => import('@features/auth/components/LoginPage').then((module) => ({ default: module.LoginPage })))
const AuthCallbackPage = lazy(() =>
  import('@features/auth/components/AuthCallbackPage').then((module) => ({ default: module.AuthCallbackPage })),
)
const ChatPage = lazy(() => import('@features/chat/components/ChatPage').then((module) => ({ default: module.ChatPage })))
const LazyAdminPage = lazy(() => import('@features/admin').then((module) => ({ default: module.AdminPage })))
const LazyKnowledgePage = lazy(() => import('@features/knowledge').then((module) => ({ default: module.KnowledgePage })))
const LazyMemoryPage = lazy(() => import('@features/memory').then((module) => ({ default: module.MemoryPage })))
const LazyProfilePage = lazy(() => import('@features/profile').then((module) => ({ default: module.ProfilePage })))
const LazySettingsPage = lazy(() => import('@features/settings').then((module) => ({ default: module.SettingsPage })))
const routeFallback = <div className="flex h-full items-center justify-center text-sm text-juana-text-muted">Loading...</div>

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <Suspense fallback={routeFallback}><LoginPage /></Suspense> },
  { path: ROUTES.AUTH_CALLBACK, element: <Suspense fallback={routeFallback}><AuthCallbackPage /></Suspense> },
  {
    path: ROUTES.CHAT,
    element: (
      <ProtectedRoute>
        <ShellLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={routeFallback}><ChatPage /></Suspense> },
      { path: ROUTES.PROFILE, element: <Suspense fallback={routeFallback}><LazyProfilePage /></Suspense> },
      { path: ROUTES.KNOWLEDGE, element: <Suspense fallback={routeFallback}><LazyKnowledgePage /></Suspense> },
      { path: ROUTES.MEMORY, element: <Suspense fallback={routeFallback}><LazyMemoryPage /></Suspense> },
      { path: ROUTES.SETTINGS, element: <Suspense fallback={routeFallback}><LazySettingsPage /></Suspense> },
      {
        path: ROUTES.ADMIN,
        element: (
          <ProtectedRoute requiredRole="JUANA_ADMIN">
            <Suspense fallback={routeFallback}><LazyAdminPage /></Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
])
