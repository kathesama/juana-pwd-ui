import { createSlice } from '@reduxjs/toolkit'

import type { ChatMessage, ConnectionStatus, StatusEvent } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ChatState {
  messages: ChatMessage[]
  connectionStatus: ConnectionStatus
  activeStatus: StatusEvent | null
  conversationId: string | null
}

const initialState: ChatState = {
  messages: [],
  connectionStatus: 'disconnected',
  activeStatus: null,
  conversationId: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageReceived: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload)
      state.activeStatus = null
    },
    statusEventReceived: (state, action: PayloadAction<StatusEvent>) => {
      state.activeStatus = action.payload
    },
    connectionStatusChanged: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload
    },
    messageStarToggled: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find((message) => message.id === action.payload)
      if (msg) msg.isStarred = !msg.isStarred
    },
    conversationStarted: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload
      state.messages = []
    },
  },
})

export const {
  messageReceived,
  statusEventReceived,
  connectionStatusChanged,
  messageStarToggled,
  conversationStarted,
} = chatSlice.actions
export default chatSlice.reducer
