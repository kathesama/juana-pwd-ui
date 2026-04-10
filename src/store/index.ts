import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '@features/auth/store/authApi'
import authReducer from '@features/auth/store/authSlice'
import { chatApi } from '@features/chat/store/chatApi'
import chatReducer from '@features/chat/store/chatSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(chatApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
