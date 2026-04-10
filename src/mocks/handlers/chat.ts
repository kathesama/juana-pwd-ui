import { http, HttpResponse } from 'msw'

export const chatHandlers = [
  http.get('/api/v1/conversations/:id/starred', () => HttpResponse.json([])),
  http.post('/api/v1/conversations/:id/messages/:msgId/star', () => new HttpResponse(null, { status: 200 })),
  http.delete('/api/v1/conversations/:id/messages/:msgId/star', () => new HttpResponse(null, { status: 200 })),
]
