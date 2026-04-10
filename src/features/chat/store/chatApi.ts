import { createApi } from '@reduxjs/toolkit/query/react'

import { createGatewayBaseQuery } from '@common/api/gatewayBaseQuery'

import type { ChatMessage } from '../types'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: createGatewayBaseQuery('/api/v1'),
  tagTypes: ['StarredMessages'],
  endpoints: (builder) => ({
    getStarredMessages: builder.query<ChatMessage[], string>({
      query: (conversationId) => `/conversations/${conversationId}/starred`,
      providesTags: ['StarredMessages'],
    }),
    starMessage: builder.mutation<void, { conversationId: string; messageId: string }>({
      query: ({ conversationId, messageId }) => ({
        url: `/conversations/${conversationId}/messages/${messageId}/star`,
        method: 'POST',
      }),
      invalidatesTags: ['StarredMessages'],
    }),
    unstarMessage: builder.mutation<void, { conversationId: string; messageId: string }>({
      query: ({ conversationId, messageId }) => ({
        url: `/conversations/${conversationId}/messages/${messageId}/star`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StarredMessages'],
    }),
  }),
})

export const { useGetStarredMessagesQuery, useStarMessageMutation, useUnstarMessageMutation } = chatApi
