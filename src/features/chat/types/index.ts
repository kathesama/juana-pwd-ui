export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting' | 'error'

export type MessageRole = 'user' | 'assistant'

export type StatusEventType =
  | 'READING_MEMORY'
  | 'RETRIEVING_KNOWLEDGE'
  | 'PLANNING'
  | 'EXECUTING_TOOL'
  | 'GENERATING'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  isStarred: boolean
}

export interface StatusEvent {
  type: StatusEventType
  detail?: string
}
