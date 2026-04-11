# Frontend API Integration

## Overview

This document maps the verified public Juana API surface to the current frontend integration points in `juana-pwd-ui`.

All browser traffic goes through `gateway-server`.

## 1. Canonical integration rule

- The UI consumes only public endpoints exposed by Gateway.
- The UI does not call internal services directly.
- A route present in frontend code is not considered part of the official public contract unless it is backed by the validated Gateway surface.

## 2. Verified public endpoints

| Domain | Method | Route | Current Frontend Status |
|---|---|---|---|
| Auth | `GET` | `/auth/login` | Implemented and verified |
| Auth | `GET` | `/auth/callback` | Implemented and verified |
| Auth | `GET` | `/auth/session` | Implemented and verified |
| Auth | `GET` | `/auth/logout` | Implemented and verified |
| Soul | `POST` | `/api/v1/soul/chat` | Public contract exists; frontend integration pending |
| Knowledge | `POST` | `/api/v1/knowledge/documents/text` | Public contract exists; frontend integration pending |
| Knowledge | `POST` | `/api/v1/knowledge/documents/files` | Public contract exists; frontend integration pending |
| Knowledge | `GET` | `/api/v1/knowledge/jobs/{job_id}` | Public contract exists; frontend integration pending |

## 3. Current RTK Query integration

### `authApi`

Location:

- [authApi.ts](/D:/projects/react/juana-pwd-ui/src/features/auth/store/authApi.ts)

Current endpoints:

- `GET /auth/session`
- `GET /auth/logout`

### `chatApi`

Location:

- [chatApi.ts](/D:/projects/react/juana-pwd-ui/src/features/chat/store/chatApi.ts)

Current frontend routes present in code:

- `GET /api/v1/conversations/{id}/starred`
- `POST /api/v1/conversations/{id}/messages/{messageId}/star`
- `DELETE /api/v1/conversations/{id}/messages/{messageId}/star`

### Important note

Those starred-message routes are implemented in frontend code, but they are not yet treated here as validated public API for the current UI contract.

They should remain classified as one of:

- pending public contract confirmation
- temporary frontend-only assumption to be reconciled
- candidate integration to remove if not adopted by Gateway public surface

## 4. CSRF and credentials

The frontend uses a shared base query that:

- always sends `credentials: 'include'`
- injects `X-CSRF-Token` from Redux memory when required

This is the current browser-authenticated integration model for Gateway.

## 5. Error handling expectations

### Current behavior

- `GET /auth/session` can return unauthenticated state and the UI handles that as a login bootstrap outcome.
- feature APIs rely on RTK Query request state for loading and error handling.

### Near-term target

- standardize session-expiry handling for authenticated feature requests
- define a consistent UX for API failures in business flows such as chat and knowledge upload

## 6. Mocking and local development

MSW supports two modes:

- mock-auth bootstrap for isolated frontend work
- passthrough to real Gateway when `VITE_DEV_AUTH_ENABLED=false`

This allows the same UI to be developed either:

- without backend dependencies
- or against the real BFF integration

## 7. Gaps and target-state items

The following items are intentionally **not** documented here as verified public API:

- WebSocket chat endpoints
- SSE status/event endpoints
- conversation metadata routes beyond the starred-message assumptions already present in frontend code

If those surfaces become official, they should be added here only after they are backed by the validated public contract.

## 8. Example session payload

```json
{
  "authenticated": true,
  "user": {
    "user_id": "136be623-e055-4676-bb43-cdebb76efc78",
    "roles": ["JUANA_ADMIN"],
    "capabilities": []
  },
  "csrf_token": "..."
}
```
