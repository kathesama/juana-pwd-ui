import { createApi } from '@reduxjs/toolkit/query/react'

import { createGatewayBaseQuery } from '@common/api/gatewayBaseQuery'

import type { AuthSessionResponse } from '../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createGatewayBaseQuery('/auth'),
  endpoints: (builder) => ({
    getSession: builder.query<AuthSessionResponse | null, void>({
      query: () => '/session',
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/logout', method: 'GET' }),
    }),
  }),
})

export const { useGetSessionQuery, useLogoutMutation } = authApi
