import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@common/hooks'
import { ROUTES } from '@router/routes'

import { useGetSessionQuery } from '../store/authApi'
import { sessionCleared, sessionLoaded } from '../store/authSlice'

export const AuthCallbackPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data, isError, isSuccess } = useGetSessionQuery()

  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(sessionLoaded(data))
        void navigate(ROUTES.CHAT, { replace: true })
        return
      }

      dispatch(sessionCleared())
      void navigate(ROUTES.LOGIN, { replace: true })
      return
    }

    if (isError) {
      dispatch(sessionCleared())
      void navigate(ROUTES.LOGIN, { replace: true })
    }
  }, [dispatch, data, isError, isSuccess, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-juana-bg text-sm text-juana-text-muted">
      Autenticando...
    </div>
  )
}
