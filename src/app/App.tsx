import { useEffect } from 'react'

import { RouterProvider } from 'react-router-dom'

import { useAppDispatch } from '@common/hooks'
import { useGetSessionQuery } from '@features/auth/store/authApi'
import { sessionCleared, sessionLoaded } from '@features/auth/store/authSlice'
import { router } from '@router/index'

const AuthBootstrap = () => {
  const dispatch = useAppDispatch()
  const { data, isError, isSuccess } = useGetSessionQuery()

  useEffect(() => {
    if (isSuccess) {
      dispatch(sessionLoaded(data ?? null))
      return
    }

    if (isError) {
      dispatch(sessionCleared())
    }
  }, [dispatch, data, isError, isSuccess])

  return <RouterProvider router={router} />
}

export const App = () => <AuthBootstrap />
