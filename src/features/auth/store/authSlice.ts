import { createSlice } from '@reduxjs/toolkit'

import type { AuthSessionResponse, AuthUser } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  csrfToken: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  csrfToken: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionLoaded: (state, action: PayloadAction<AuthSessionResponse | null>) => {
      state.user = action.payload?.authenticated ? action.payload.user ?? null : null
      state.csrfToken = action.payload?.authenticated ? action.payload.csrf_token ?? null : null
      state.isAuthenticated = action.payload?.authenticated === true && action.payload.user !== undefined
      state.isLoading = false
    },
    sessionCleared: (state) => {
      state.user = null
      state.csrfToken = null
      state.isAuthenticated = false
      state.isLoading = false
    },
  },
})

export const { sessionLoaded, sessionCleared } = authSlice.actions
export default authSlice.reducer
