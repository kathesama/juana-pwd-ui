import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { FetchArgs } from '@reduxjs/toolkit/query'
import type { RootState } from '@store/index'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

const requiresCsrfToken = (arg: string | FetchArgs | undefined) => {
  if (arg === undefined) {
    return false
  }

  if (typeof arg === 'string') {
    return false
  }

  const method = (arg.method ?? 'GET').toUpperCase()
  if (arg.url === '/logout') {
    return true
  }

  return !SAFE_METHODS.has(method)
}

export const createGatewayBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootState
      const csrfToken = state.auth.csrfToken
      if (csrfToken && requiresCsrfToken(api.arg as string | FetchArgs | undefined)) {
        headers.set('X-CSRF-Token', csrfToken)
      }
      return headers
    },
  })
