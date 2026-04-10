import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { createGatewayBaseQuery } from './gatewayBaseQuery'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true,
    user: null,
    csrfToken: 'csrf-token-123',
    isLoading: false,
  },
  reducers: {},
})

describe('createGatewayBaseQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('adds X-CSRF-Token for state-changing requests', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const api = createApi({
      reducerPath: 'testApi',
      baseQuery: createGatewayBaseQuery('http://gateway.local/auth'),
      endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
          query: () => ({ url: '/logout', method: 'GET' }),
        }),
      }),
    })

    const store = configureStore({
      reducer: {
        auth: authSlice.reducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })

    await store.dispatch(api.endpoints.logout.initiate())

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(request.headers.get('X-CSRF-Token')).toBe('csrf-token-123')
  })
})
