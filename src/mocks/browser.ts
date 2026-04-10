import { setupWorker } from 'msw/browser'

import { authHandlers } from './handlers/auth'
import { chatHandlers } from './handlers/chat'

export const worker = setupWorker(...authHandlers, ...chatHandlers)
