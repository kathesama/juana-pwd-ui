import { http, HttpResponse, passthrough } from 'msw'

import { devAuthEnabled, devAuthUser } from '@features/auth/config/devAuth'

export const authHandlers = [
  http.get('/auth/session', () => {
    if (!devAuthEnabled) {
      return passthrough()
    }

    return HttpResponse.json({
      authenticated: true,
      user: devAuthUser,
      csrf_token: 'dev-csrf-token',
    })
  }),
  http.get('/auth/logout', () => (devAuthEnabled ? HttpResponse.json(null, { status: 200 }) : passthrough())),
]
