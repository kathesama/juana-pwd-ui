import { describe, expect, it } from 'vitest'

import authReducer, { sessionCleared, sessionLoaded } from './authSlice'

describe('authSlice', () => {
  it('stores authenticated gateway session payload including csrf token', () => {
    const state = authReducer(
      undefined,
      sessionLoaded({
        authenticated: true,
        csrf_token: 'csrf-token-123',
        user: {
          user_id: '136be623-e055-4676-bb43-cdebb76efc78',
          roles: ['JUANA_ADMIN'],
          capabilities: [],
        },
      }),
    )

    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
    expect(state.csrfToken).toBe('csrf-token-123')
    expect(state.user?.user_id).toBe('136be623-e055-4676-bb43-cdebb76efc78')
  })

  it('clears user and csrf token on sessionCleared', () => {
    const loadedState = authReducer(
      undefined,
      sessionLoaded({
        authenticated: true,
        csrf_token: 'csrf-token-123',
        user: {
          user_id: 'dev-user',
          username: 'kathy',
          roles: ['JUANA_ADMIN'],
          capabilities: [],
        },
      }),
    )

    const state = authReducer(loadedState, sessionCleared())

    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.user).toBeNull()
    expect(state.csrfToken).toBeNull()
  })
})
