import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@common/hooks'

import { ROUTES } from './routes'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-juana-bg text-sm text-juana-text-muted">
        Loading workspace...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (requiredRole && !user?.roles.includes(requiredRole)) {
    return <Navigate to={ROUTES.CHAT} replace />
  }

  return <>{children}</>
}
