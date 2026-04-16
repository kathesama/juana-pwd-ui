# juana-pwd-ui — Claude Code Project Context

## Identity

Juana UI is the PWA frontend for JuanaIA. React 19 + TypeScript + Vite.
Feature-Based Architecture. Communicates exclusively with the JuanaIA
gateway-server (:8072) — never with internal services directly.

## Canonical Principle

> UI renders. Gateway routes. Soul executes. Never talk to internals directly.

---

## Stack

| Layer | Technology |
|---|---|
| Language | TypeScript (strict) |
| Framework | React 19 + Vite 7 |
| Server state | Redux Toolkit + RTK Query |
| Client state | Redux Toolkit |
| Routing | React Router DOM v7 |
| Forms | React Hook Form + Zod |
| UI | Tailwind CSS (juana palette) + Framer Motion + Lucide React |
| PWA | vite-plugin-pwa + workbox-window |
| Auth | Keycloak (OAuth2/OIDC) |
| Unit/Integration | Vitest + React Testing Library |
| E2E | Playwright |
| Mock API | MSW (Mock Service Worker) |
| Components | Storybook (a11y + Vitest integration) |

---

## Project Structure

```
src/
├── app/                    ← Global config and layouts
├── common/
│   ├── api/
│   │   └── gatewayBaseQuery.ts  ← RTK Query base, auto CSRF injection
│   └── components/              ← Shared UI components
├── features/
│   ├── auth/               ← Login, Keycloak callback
│   ├── chat/               ← Chat interface
│   ├── knowledge/          ← Knowledge management
│   ├── memory/             ← Memory visualization
│   ├── admin/              ← Admin panel
│   └── shell/              ← Main app layout (ShellLayout)
├── router/
│   └── routes.ts           ← ProtectedRoute + lazy loading
├── store/                  ← Redux global store
└── styles/                 ← Tailwind + globals.css
```

---

## Design System — juana palette

| Token | Role |
|---|---|
| `juana.purple.*` | Primary color |
| `juana.gold.*` | Accent color |
| `juana.bg.*` | Backgrounds |
| `juana.surface.*` | Cards and surfaces |

Effects: `backdrop-blur`, radial gradients in `globals.css`.

---

## Coding Conventions

- Functional components only — no class components
- One component per file
- Props always typed with TypeScript — never `any`
- Logic extracted into custom hooks
- Pure components when possible
- Tests co-located with components (`Component.test.tsx`)
- All routes lazy-loaded via `React.lazy()`
- Protected routes via `ProtectedRoute` wrapper

---

## API Communication

- Single entry point: `gatewayBaseQuery` in `src/common/api/`
- CSRF tokens injected automatically on POST, PUT, DELETE
- Auth via Keycloak — token managed by Redux auth slice
- Environment toggle: `VITE_DEV_AUTH_ENABLED=false` uses MSW mocks

---

## Testing

- Unit/Integration: Vitest + React Testing Library
- Test behavior, not implementation details
- Minimum coverage: 80%
- E2E: Playwright — full Keycloak login → logout flow validated
- Storybook: every shared component must have a `.stories.tsx`

---

## What NOT to do

- Do NOT call internal services directly — only gateway-server (:8072)
- Do NOT use `any` in TypeScript
- Do NOT add state management outside Redux Toolkit
- Do NOT use class components
- Do NOT hardcode API URLs — use env vars
- Do NOT skip accessibility (WCAG AA minimum)
- Do NOT add npm/yarn — use pnpm
- Do NOT import from features cross-boundaries — use common/ for shared code

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_GATEWAY_URL` | gateway-server base URL |
| `VITE_DEV_AUTH_ENABLED` | `true` = Keycloak, `false` = MSW mocks |
| `VITE_KEYCLOAK_URL` | Keycloak server URL |
| `VITE_KEYCLOAK_REALM` | Keycloak realm |
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID |

---

## Related

- Backend repo: [JuanaIA](https://github.com/kathesama/JuanaIA)
- ADR-051: Juana UI PWA architecture decision
- gateway-server: :8072 (sole backend entry point)

## SDD Kit

This project uses kathy-sdd-kit.
@.sdd-kit/CLAUDE.md